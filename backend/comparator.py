"""
Curriculum vs Industry Demand Comparison Engine.
Computes alignment score, separates skills into Covered, Partial, and Missing gaps,
and assigns priority severity based on industry demand.
"""
from typing import List, Dict, Any
from skill_extractor import BENCHMARK_SKILLS


def compare_curriculum_against_industry(
    extracted_skills: List[Dict[str, Any]],
    syllabus_title: str = "Curriculum Syllabus",
    institution: str = "Academic Department"
) -> Dict[str, Any]:
    """
    Compares detected curriculum skills against the benchmark industry skills matrix.
    Calculates weighted alignment score:
    Score = [ Sum(Covered * 1.0) + Sum(Partial * 0.5) ] / Sum(Total Demand) * 100
    """
    extracted_skill_ids = {s["skillId"]: s for s in extracted_skills}

    covered_skills = []
    partial_skills = []
    missing_skills = []

    total_industry_demand = sum(s["demand"] for s in BENCHMARK_SKILLS)
    earned_demand_score = 0.0

    for benchmark in BENCHMARK_SKILLS:
        b_id = benchmark["id"]
        demand = benchmark["demand"]

        if b_id in extracted_skill_ids:
            item = extracted_skill_ids[b_id]
            conf = item.get("confidence", 80)

            if conf >= 85:
                covered_skills.append({
                    "skillId": b_id,
                    "skillName": benchmark["name"],
                    "category": benchmark["category"],
                    "industryDemand": demand,
                    "coverage": "covered",
                })
                earned_demand_score += demand * 1.0
            else:
                partial_skills.append({
                    "skillId": b_id,
                    "skillName": benchmark["name"],
                    "category": benchmark["category"],
                    "industryDemand": demand,
                    "coverage": "partial",
                    "coverageDetail": f"Partial keywords detected ({item.get('matchedPhrase', '')})",
                })
                earned_demand_score += demand * 0.5
        else:
            # Assign gap severity based on demand
            severity = "high" if demand >= 50 else ("medium" if demand >= 35 else "low")
            missing_skills.append({
                "skillId": b_id,
                "skillName": benchmark["name"],
                "category": benchmark["category"],
                "industryDemand": demand,
                "coverage": "missing",
                "gap": severity,
            })

    alignment_score = round((earned_demand_score / total_industry_demand) * 100) if total_industry_demand > 0 else 0

    # Generate recommendations for top missing skills
    recommendations = []
    for miss in sorted(missing_skills, key=lambda x: x["industryDemand"], reverse=True)[:5]:
        recommendations.append({
            "skillName": miss["skillName"],
            "category": miss["category"],
            "priority": miss["gap"],
            "industryDemand": miss["industryDemand"],
            "learningPath": [
                f"{miss['skillName']} Architectural Fundamentals",
                f"Core Tools & Hands-on Lab Environment",
                f"Production Integration & Capstone Project",
            ],
            "estimatedHours": 30 if miss["gap"] == "high" else 20,
            "relatedSkills": [miss["category"]],
        })

    return {
        "id": "analysis-" + syllabus_title.lower().replace(" ", "-"),
        "name": syllabus_title,
        "institution": institution,
        "alignmentScore": alignment_score,
        "subjectsDetected": max(4, len(extracted_skills) // 2),
        "skillsDetected": len(extracted_skills),
        "industryMatched": len(covered_skills) + len(partial_skills),
        "gapCount": len(missing_skills),
        "coveredSkills": covered_skills,
        "partialSkills": partial_skills,
        "missingSkills": missing_skills,
        "recommendations": recommendations,
    }
