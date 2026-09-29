# SkillSync — Industry Skill Intelligence & Curriculum Gap Analyzer

> **Smart India Hackathon (SIH26134)**  
> *Challenges in aligning skill development programs with industry requirements and emerging job market demands.*

---

## 🎯 Overview

**SkillSync** is an AI and data intelligence platform that analyzes real-time job-market skill demands and benchmarks them against college syllabi and training curricula. It automatically detects missing competencies, classifies coverage into high/medium/low priority tiers, and generates tailored curriculum improvement roadmaps.

---

## 🚀 Key Features

- **Executive Analytics Dashboard**: Real-time KPI metrics, demand growth leaders, gap summaries, and multi-quarter industry trajectory trends.
- **Interactive Skill Relationship Graph**: Interactive network visualizer representing skill co-occurrence ("Frequently Paired Together"), cluster categories, and cross-functional role demands.
- **Curriculum Analyzer & PDF Extraction**:
  - Drag-and-drop syllabus upload (PDF / DOCX / TXT) or raw syllabus text ingestion.
  - Multi-step parsing pipeline (*Uploading → Extracting → Analyzing → Identifying Skills → Comparing Demand → Generating Report*).
  - **NLP Skill Normalization Review**: Canonical mapping with confidence ratings and interactive Accept / Reject controls.
  - **Mathematical Alignment Scoring**: Weighted readiness formula:
    $$\text{Alignment Score} = \left[ \frac{\sum (D_i \times C_i)}{\sum D_i} \right] \times 100$$
  - **Executive Report & PDF Export**: Instant printable report generator (`window.print()`) and downloadable JSON summary.
- **Curriculum Skill Gap Breakdown**: Tiered severity segmentation (High / Medium / Low priority) with expandable recommendations and prerequisite mappings.
- **Curriculum Recommendation Engine**: Step-by-step modular learning paths with estimated hours and foundational topics.
- **Skill Taxonomy Management**: Interactive hierarchy tree with live modal dialogs to **Add Skill Nodes**, **Merge Duplicates**, and define canonical aliases.
- **Role Analyzer & Industry Trends**: Role-specific required toolsets (Data Scientist, ML Engineer, DevOps, etc.) and longitudinal quarterly trend curves.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Glassmorphism Dark Mode
- **Animations**: Framer Motion
- **Visualizations**: Recharts + Custom Interactive SVG Network Graph
- **Icons**: Lucide React

### Backend
- **Framework**: Python FastAPI + Uvicorn
- **Document Processing**: PyPDF (`pypdf`) text and module extractor
- **NLP Engine**: N-gram extraction, alias normalization, and fuzzy string matching
- **Mathematical Modeling**: Weighted curriculum alignment & gap severity classifier

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
Frontend runs at: `http://localhost:5173/`

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python requirements
pip install -r requirements.txt
# (or: pip install fastapi uvicorn pypdf python-multipart)

# Start FastAPI server
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
API Documentation: `http://127.0.0.1:8000/docs`

---

## 📄 License
MIT License. Built for Smart India Hackathon.
