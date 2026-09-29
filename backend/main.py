"""
SkillSync FastAPI Application.
Industry Skill Intelligence & Curriculum Gap Analysis Backend.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

# Add backend directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from api.routes import router

app = FastAPI(
    title="SkillSync — Industry Skill Intelligence API",
    description="Intelligent platform comparing academic curricula with real-time job-market requirements (SIH26134)",
    version="1.0.0",
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "platform": "SkillSync",
        "description": "Industry Skill Intelligence & Curriculum Gap Analyzer API",
        "status": "online",
        "docs": "/docs",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
