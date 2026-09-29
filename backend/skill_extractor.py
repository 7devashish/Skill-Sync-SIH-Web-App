"""
NLP & Skill Extraction & Normalization Engine.
Extracts skill mentions from raw curriculum text and normalizes them into canonical skills.
"""
import re
from typing import List, Dict, Any, Tuple

# Comprehensive Industry Skill Benchmark Database with Aliases & Demand Weights
BENCHMARK_SKILLS: List[Dict[str, Any]] = [
    {
        "id": "python",
        "name": "Python",
        "category": "Programming",
        "demand": 82,
        "aliases": ["python", "python3", "cpython", "py"],
        "keywords": ["python", "pandas", "numpy", "django", "flask"],
    },
    {
        "id": "sql",
        "name": "SQL",
        "category": "Data Science",
        "demand": 76,
        "aliases": ["sql", "structured query language", "ansi sql", "plsql", "t-sql"],
        "keywords": ["sql", "rdbms", "queries", "joins", "subqueries"],
    },
    {
        "id": "machine-learning",
        "name": "Machine Learning",
        "category": "AI / Machine Learning",
        "demand": 64,
        "aliases": ["ml", "machine learning", "supervised learning", "unsupervised learning"],
        "keywords": ["regression", "classification", "clustering", "random forest", "decision tree", "gradient boosting"],
    },
    {
        "id": "deep-learning",
        "name": "Deep Learning",
        "category": "AI / Machine Learning",
        "demand": 52,
        "aliases": ["dl", "deep learning", "neural networks", "artificial neural networks"],
        "keywords": ["cnn", "rnn", "lstm", "backpropagation", "convolutional neural network"],
    },
    {
        "id": "nlp",
        "name": "Natural Language Processing",
        "category": "AI / Machine Learning",
        "demand": 48,
        "aliases": ["nlp", "natural language processing", "text mining", "computational linguistics"],
        "keywords": ["tokenization", "lemmatization", "tf-idf", "named entity recognition", "bert"],
    },
    {
        "id": "llm",
        "name": "Large Language Models",
        "category": "AI / Machine Learning",
        "demand": 56,
        "aliases": ["llm", "llms", "large language models", "generative ai", "foundation models"],
        "keywords": ["transformers", "prompt engineering", "fine-tuning", "rag", "langchain"],
    },
    {
        "id": "aws",
        "name": "AWS",
        "category": "Cloud Computing",
        "demand": 62,
        "aliases": ["aws", "amazon web services", "aws cloud"],
        "keywords": ["ec2", "s3", "lambda", "iam", "cloudwatch"],
    },
    {
        "id": "azure",
        "name": "Azure",
        "category": "Cloud Computing",
        "demand": 48,
        "aliases": ["azure", "microsoft azure", "azure cloud"],
        "keywords": ["azure devops", "azure blob", "azure vm", "azure active directory"],
    },
    {
        "id": "docker",
        "name": "Docker",
        "category": "DevOps",
        "demand": 55,
        "aliases": ["docker", "docker container", "docker compose", "containerization"],
        "keywords": ["dockerfile", "containers", "image building", "container runtime"],
    },
    {
        "id": "kubernetes",
        "name": "Kubernetes",
        "category": "DevOps",
        "demand": 48,
        "aliases": ["k8s", "kubernetes", "kube"],
        "keywords": ["pods", "deployments", "cluster orchestration", "helm", "ingress"],
    },
    {
        "id": "ci-cd",
        "name": "CI/CD",
        "category": "DevOps",
        "demand": 52,
        "aliases": ["ci/cd", "continuous integration", "continuous deployment", "continuous delivery"],
        "keywords": ["jenkins", "github actions", "gitlab ci", "pipeline automation"],
    },
    {
        "id": "git",
        "name": "Git",
        "category": "DevOps",
        "demand": 72,
        "aliases": ["git", "version control", "github", "gitlab"],
        "keywords": ["branches", "commits", "pull requests", "vcs"],
    },
    {
        "id": "linux",
        "name": "Linux",
        "category": "DevOps",
        "demand": 58,
        "aliases": ["linux", "unix", "bash", "shell scripting"],
        "keywords": ["terminal", "shell", "kernel", "permissions", "posix"],
    },
    {
        "id": "spark",
        "name": "Apache Spark",
        "category": "Data Engineering",
        "demand": 46,
        "aliases": ["spark", "apache spark", "pyspark"],
        "keywords": ["rdd", "spark sql", "dataframes", "distributed computing"],
    },
    {
        "id": "react",
        "name": "React",
        "category": "Web Development",
        "demand": 65,
        "aliases": ["react", "react.js", "reactjs"],
        "keywords": ["jsx", "virtual dom", "hooks", "components", "redux"],
    },
    {
        "id": "javascript",
        "name": "JavaScript",
        "category": "Programming",
        "demand": 78,
        "aliases": ["javascript", "js", "ecmascript"],
        "keywords": ["dom", "async/await", "promises", "node.js", "es6"],
    },
    {
        "id": "java",
        "name": "Java",
        "category": "Programming",
        "demand": 72,
        "aliases": ["java", "java se", "java ee", "jakarta ee"],
        "keywords": ["jvm", "oop", "multithreading", "spring", "spring boot"],
    },
    {
        "id": "cpp",
        "name": "C++",
        "category": "Programming",
        "demand": 45,
        "aliases": ["c++", "cpp", "c plus plus"],
        "keywords": ["pointers", "stl", "memory management", "templates"],
    },
    {
        "id": "postgresql",
        "name": "PostgreSQL",
        "category": "Databases",
        "demand": 52,
        "aliases": ["postgres", "postgresql", "pg"],
        "keywords": ["relational", "acid", "indices", "stored procedures"],
    },
    {
        "id": "mongodb",
        "name": "MongoDB",
        "category": "Databases",
        "demand": 44,
        "aliases": ["mongodb", "mongo", "nosql"],
        "keywords": ["bson", "documents", "collections", "aggregation pipeline"],
    },
]


def extract_and_normalize_skills(text: str) -> List[Dict[str, Any]]:
    """
    Scans text for occurrences of skills, aliases, and associated technical keywords.
    Returns matched skills with confidence score, matched phrase, and canonical info.
    """
    text_lower = text.lower()
    matches = []

    for skill in BENCHMARK_SKILLS:
        confidence = 0
        matched_phrase = ""

        # Check exact skill name
        if re.search(r"\b" + re.escape(skill["name"].lower()) + r"\b", text_lower):
            confidence = 96
            matched_phrase = skill["name"]
        else:
            # Check aliases
            for alias in skill.get("aliases", []):
                if re.search(r"\b" + re.escape(alias) + r"\b", text_lower):
                    confidence = 92
                    matched_phrase = alias
                    break

            # If no direct alias, check cluster keywords
            if not matched_phrase:
                found_keywords = [kw for kw in skill.get("keywords", []) if re.search(r"\b" + re.escape(kw) + r"\b", text_lower)]
                if len(found_keywords) >= 2:
                    confidence = 78
                    matched_phrase = f"Keywords: {', '.join(found_keywords[:2])}"
                elif len(found_keywords) == 1:
                    confidence = 55
                    matched_phrase = f"Mention: {found_keywords[0]}"

        if confidence >= 50:
            matches.append({
                "skillId": skill["id"],
                "skillName": skill["name"],
                "category": skill["category"],
                "industryDemand": skill["demand"],
                "confidence": confidence,
                "matchedPhrase": matched_phrase,
            })

    return matches
