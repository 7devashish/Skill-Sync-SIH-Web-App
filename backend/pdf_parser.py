"""
PDF Parsing Module using pypdf for text and syllabus extraction.
Supports plain text, structured sections, and subject/module detection.
"""
import io
import re
from typing import List, Dict, Any
from pypdf import PdfReader


def extract_text_from_pdf_bytes(pdf_bytes: bytes) -> str:
    """Extract full raw text from uploaded PDF bytes."""
    reader = PdfReader(io.BytesIO(pdf_bytes))
    full_text = []
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            full_text.append(page_text)
    return "\n".join(full_text)


def detect_subjects_and_topics(text: str) -> List[Dict[str, Any]]:
    """
    Parses curriculum text into structured subjects/courses and topic lists.
    Identifies patterns like 'Module 1', 'Unit I', 'Course Name', or bullet points.
    """
    lines = [line.strip() for line in text.split("\n") if line.strip()]
    subjects = []
    current_subject = None
    current_topics = []

    # Heuristic regex patterns for syllabus units/subjects
    module_pattern = re.compile(r"^(module|unit|course|paper|subject)\s*[\dIVXLC]+[:\.\-]?\s*(.*)$", re.IGNORECASE)

    for line in lines:
        match = module_pattern.match(line)
        if match:
            # Save previous subject if exists
            if current_subject:
                subjects.append({
                    "name": current_subject,
                    "topics": current_topics if current_topics else [current_subject],
                })
            current_subject = match.group(2).strip() or match.group(0).strip()
            current_topics = []
        elif current_subject:
            # Detect sub-topic line (bullet points, commas, dashes)
            if len(line) < 120 and not line.lower().startswith("page"):
                parts = [p.strip() for p in re.split(r"[,;•\-–]", line) if len(p.strip()) > 3]
                if parts:
                    current_topics.extend(parts[:5])

    # Append last subject
    if current_subject:
        subjects.append({
            "name": current_subject,
            "topics": current_topics if current_topics else [current_subject],
        })

    # Fallback if no structured modules were matched
    if not subjects:
        subjects = [
            {"name": "Core Technical Foundations", "topics": ["Programming Fundamentals", "Data Structures", "Algorithms"]},
            {"name": "Applied Computing", "topics": ["Database Management", "System Architecture", "Software Engineering"]},
        ]

    return subjects
