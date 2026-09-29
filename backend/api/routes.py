"""
FastAPI Route Handlers for SkillSync API.
Endpoints for curriculum analysis, skills search, trends, roles, and taxonomy.
"""
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional, List, Dict, Any
from pydantic import BaseModel

from pdf_parser import extract_text_from_pdf_bytes, detect_subjects_and_topics
from skill_extractor import extract_and_normalize_skills, BENCHMARK_SKILLS
from comparator import compare_curriculum_against_industry

router = APIRouter(prefix="/api")


class TextAnalysisRequest(BaseModel):
    title: str = "Custom Syllabus"
    institution: str = "Department of Computer Science"
    text: str


@router.post("/curriculum/analyze")
async def analyze_curriculum_file(
    file: Optional[UploadFile] = File(None),
    title: Optional[str] = Form("Uploaded Curriculum"),
    institution: Optional[str] = Form("Academic Institution"),
    pasted_text: Optional[str] = Form(None)
):
    """
    Analyzes an uploaded syllabus file (PDF, TXT) or raw pasted syllabus text.
    Extracts text, identifies technical skills, normalizes against taxonomy,
    compares with industry demand, and returns alignment scores & gaps.
    """
    raw_text = ""

    if file:
        content = await file.read()
        filename = file.filename.lower()
        if filename.endswith(".pdf"):
            try:
                raw_text = extract_text_from_pdf_bytes(content)
            except Exception as e:
                raise HTTPException(status_code=400, detail=f"Failed to parse PDF document: {str(e)}")
        else:
            # Plain text / fallback
            raw_text = content.decode("utf-8", errors="ignore")
        if not title or title == "Uploaded Curriculum":
            title = file.filename.replace(".pdf", "").replace(".txt", "")

    elif pasted_text:
        raw_text = pasted_text
    else:
        raise HTTPException(status_code=400, detail="Please upload a file or provide syllabus text.")

    if not raw_text.strip():
        raise HTTPException(status_code=400, detail="The provided curriculum document contains no readable text.")

    # Execute extraction and comparison pipeline
    extracted_skills = extract_and_normalize_skills(raw_text)
    subjects = detect_subjects_and_topics(raw_text)
    report = compare_curriculum_against_industry(
        extracted_skills=extracted_skills,
        syllabus_title=title,
        institution=institution or "Academic Institution"
    )
    report["subjects"] = subjects

    return {
        "status": "success",
        "data": report,
        "extractedSkillsSummary": extracted_skills
    }


@router.post("/curriculum/analyze-text")
async def analyze_curriculum_text(request: TextAnalysisRequest):
    """Analyze directly using JSON body."""
    extracted_skills = extract_and_normalize_skills(request.text)
    subjects = detect_subjects_and_topics(request.text)
    report = compare_curriculum_against_industry(
        extracted_skills=extracted_skills,
        syllabus_title=request.title,
        institution=request.institution
    )
    report["subjects"] = subjects
    return {
        "status": "success",
        "data": report,
        "extractedSkillsSummary": extracted_skills
    }


@router.get("/skills")
def get_skills(category: Optional[str] = None, search: Optional[str] = None):
    """Get industry benchmark skills with optional category or keyword filtering."""
    results = BENCHMARK_SKILLS
    if category and category != "All":
        results = [s for s in results if s["category"].lower() == category.lower()]
    if search:
        q = search.lower()
        results = [s for s in results if q in s["name"].lower() or any(q in a.lower() for a in s.get("aliases", []))]
    return {"status": "success", "count": len(results), "skills": results}


@router.get("/health")
def api_health():
    """Health check endpoint for frontend connection verification."""
    return {"status": "online", "version": "1.0.0", "service": "SkillSync Python NLP Engine"}
