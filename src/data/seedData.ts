import type { Skill, JobRole, Industry, Location, DataSource, TaxonomyNode, CurriculumAnalysis, Recommendation } from '@/types'

// ============================================================
// SKILLS DATABASE — 300+ skills with realistic demand data
// ============================================================

export const skills: Skill[] = [
  // ---- Programming ----
  { id: 'python', name: 'Python', category: 'Programming', demand: 82, growth: 18.2, jobCount: 10201, aliases: ['Python3', 'CPython'], relatedSkills: ['sql', 'pandas', 'numpy', 'fastapi'], pairedSkills: ['sql', 'pandas', 'numpy', 'scikit-learn', 'aws'], roles: ['Data Scientist', 'ML Engineer', 'Backend Developer', 'Data Analyst'], industries: ['Technology', 'Finance', 'Healthcare', 'E-commerce'], description: 'General-purpose programming language widely used in data science, AI, web development, and automation.', trendData: [{ period: 'Q1 2024', demand: 72 }, { period: 'Q2 2024', demand: 74 }, { period: 'Q3 2024', demand: 76 }, { period: 'Q4 2024', demand: 78 }, { period: 'Q1 2025', demand: 79 }, { period: 'Q2 2025', demand: 80 }, { period: 'Q3 2025', demand: 81 }, { period: 'Q4 2025', demand: 82 }], childSkills: ['django', 'flask', 'fastapi'] },
  { id: 'javascript', name: 'JavaScript', category: 'Programming', demand: 78, growth: 8.4, jobCount: 9712, aliases: ['JS', 'ECMAScript'], relatedSkills: ['typescript', 'react', 'nodejs'], pairedSkills: ['typescript', 'react', 'html', 'css', 'nodejs'], roles: ['Frontend Developer', 'Full Stack Developer', 'Software Developer'], industries: ['Technology', 'E-commerce', 'Media', 'Finance'], description: 'Core web programming language for frontend and backend development.', trendData: [{ period: 'Q1 2024', demand: 74 }, { period: 'Q2 2024', demand: 75 }, { period: 'Q3 2024', demand: 76 }, { period: 'Q4 2024', demand: 76 }, { period: 'Q1 2025', demand: 77 }, { period: 'Q2 2025', demand: 77 }, { period: 'Q3 2025', demand: 78 }, { period: 'Q4 2025', demand: 78 }] },
  { id: 'typescript', name: 'TypeScript', category: 'Programming', demand: 68, growth: 28.5, jobCount: 8456, aliases: ['TS'], relatedSkills: ['javascript', 'react', 'angular', 'nodejs'], pairedSkills: ['react', 'nodejs', 'nextjs', 'angular'], roles: ['Frontend Developer', 'Full Stack Developer', 'Software Developer'], industries: ['Technology', 'Finance', 'SaaS'], description: 'Typed superset of JavaScript that compiles to plain JavaScript.', trendData: [{ period: 'Q1 2024', demand: 52 }, { period: 'Q2 2024', demand: 55 }, { period: 'Q3 2024', demand: 58 }, { period: 'Q4 2024', demand: 60 }, { period: 'Q1 2025', demand: 63 }, { period: 'Q2 2025', demand: 65 }, { period: 'Q3 2025', demand: 67 }, { period: 'Q4 2025', demand: 68 }] },
  { id: 'java', name: 'Java', category: 'Programming', demand: 72, growth: -2.1, jobCount: 8934, aliases: ['Java SE', 'Java EE', 'Jakarta EE'], relatedSkills: ['spring', 'kotlin', 'maven'], pairedSkills: ['spring', 'sql', 'maven', 'microservices'], roles: ['Backend Developer', 'Software Developer', 'Android Developer'], industries: ['Enterprise', 'Finance', 'Healthcare'], description: 'Enterprise-grade object-oriented programming language.', trendData: [{ period: 'Q1 2024', demand: 75 }, { period: 'Q2 2024', demand: 74 }, { period: 'Q3 2024', demand: 74 }, { period: 'Q4 2024', demand: 73 }, { period: 'Q1 2025', demand: 73 }, { period: 'Q2 2025', demand: 72 }, { period: 'Q3 2025', demand: 72 }, { period: 'Q4 2025', demand: 72 }] },
  { id: 'cpp', name: 'C++', category: 'Programming', demand: 45, growth: -4.2, jobCount: 5612, aliases: ['C Plus Plus', 'CPP'], relatedSkills: ['c', 'rust', 'embedded'], pairedSkills: ['linux', 'algorithms', 'oop'], roles: ['Systems Programmer', 'Game Developer', 'Embedded Engineer'], industries: ['Gaming', 'Automotive', 'Aerospace'], description: 'High-performance programming language for system-level development.', trendData: [{ period: 'Q1 2024', demand: 48 }, { period: 'Q2 2024', demand: 47 }, { period: 'Q3 2024', demand: 47 }, { period: 'Q4 2024', demand: 46 }, { period: 'Q1 2025', demand: 46 }, { period: 'Q2 2025', demand: 45 }, { period: 'Q3 2025', demand: 45 }, { period: 'Q4 2025', demand: 45 }] },
  { id: 'go', name: 'Go', category: 'Programming', demand: 42, growth: 22.6, jobCount: 5234, aliases: ['Golang'], relatedSkills: ['docker', 'kubernetes', 'microservices'], pairedSkills: ['docker', 'kubernetes', 'grpc', 'cloud'], roles: ['Backend Developer', 'DevOps Engineer', 'Cloud Engineer'], industries: ['Technology', 'Cloud', 'Fintech'], description: 'Fast, compiled language designed for scalable cloud services.', trendData: [{ period: 'Q1 2024', demand: 33 }, { period: 'Q2 2024', demand: 35 }, { period: 'Q3 2024', demand: 36 }, { period: 'Q4 2024', demand: 38 }, { period: 'Q1 2025', demand: 39 }, { period: 'Q2 2025', demand: 40 }, { period: 'Q3 2025', demand: 41 }, { period: 'Q4 2025', demand: 42 }] },
  { id: 'rust', name: 'Rust', category: 'Programming', demand: 28, growth: 45.3, jobCount: 3489, aliases: ['Rust Lang'], relatedSkills: ['cpp', 'go', 'wasm'], pairedSkills: ['linux', 'wasm', 'systems'], roles: ['Systems Programmer', 'Blockchain Developer'], industries: ['Technology', 'Blockchain', 'Cybersecurity'], description: 'Memory-safe systems programming language with growing industry adoption.', trendData: [{ period: 'Q1 2024', demand: 18 }, { period: 'Q2 2024', demand: 20 }, { period: 'Q3 2024', demand: 22 }, { period: 'Q4 2024', demand: 23 }, { period: 'Q1 2025', demand: 25 }, { period: 'Q2 2025', demand: 26 }, { period: 'Q3 2025', demand: 27 }, { period: 'Q4 2025', demand: 28 }] },
  { id: 'kotlin', name: 'Kotlin', category: 'Programming', demand: 35, growth: 12.4, jobCount: 4356, aliases: ['Kotlin JVM'], relatedSkills: ['java', 'android', 'spring'], pairedSkills: ['android', 'spring', 'gradle'], roles: ['Android Developer', 'Backend Developer'], industries: ['Mobile', 'Technology', 'Finance'], description: 'Modern JVM language, officially supported for Android development.', trendData: [{ period: 'Q1 2024', demand: 30 }, { period: 'Q2 2024', demand: 31 }, { period: 'Q3 2024', demand: 32 }, { period: 'Q4 2024', demand: 33 }, { period: 'Q1 2025', demand: 33 }, { period: 'Q2 2025', demand: 34 }, { period: 'Q3 2025', demand: 35 }, { period: 'Q4 2025', demand: 35 }] },
  { id: 'swift', name: 'Swift', category: 'Programming', demand: 30, growth: 5.2, jobCount: 3745, aliases: ['Swift UI'], relatedSkills: ['ios', 'xcode', 'objective-c'], pairedSkills: ['ios', 'xcode', 'swiftui'], roles: ['iOS Developer', 'Mobile Developer'], industries: ['Mobile', 'Technology'], description: 'Apple\'s programming language for iOS/macOS development.', trendData: [{ period: 'Q1 2024', demand: 28 }, { period: 'Q2 2024', demand: 29 }, { period: 'Q3 2024', demand: 29 }, { period: 'Q4 2024', demand: 29 }, { period: 'Q1 2025', demand: 30 }, { period: 'Q2 2025', demand: 30 }, { period: 'Q3 2025', demand: 30 }, { period: 'Q4 2025', demand: 30 }] },
  { id: 'csharp', name: 'C#', category: 'Programming', demand: 52, growth: 1.8, jobCount: 6478, aliases: ['C Sharp', 'CSharp'], relatedSkills: ['dotnet', 'unity', 'azure'], pairedSkills: ['dotnet', 'sql', 'azure'], roles: ['Software Developer', 'Game Developer', 'Backend Developer'], industries: ['Enterprise', 'Gaming', 'Finance'], description: 'Microsoft\'s object-oriented language for .NET ecosystem.', trendData: [{ period: 'Q1 2024', demand: 51 }, { period: 'Q2 2024', demand: 51 }, { period: 'Q3 2024', demand: 51 }, { period: 'Q4 2024', demand: 52 }, { period: 'Q1 2025', demand: 52 }, { period: 'Q2 2025', demand: 52 }, { period: 'Q3 2025', demand: 52 }, { period: 'Q4 2025', demand: 52 }] },
  { id: 'r', name: 'R', category: 'Programming', demand: 25, growth: -8.6, jobCount: 3112, aliases: ['R Language', 'R Programming'], relatedSkills: ['python', 'statistics', 'ggplot'], pairedSkills: ['statistics', 'ggplot', 'bioinformatics'], roles: ['Data Analyst', 'Biostatistician', 'Researcher'], industries: ['Healthcare', 'Pharma', 'Academia'], description: 'Statistical computing and graphics language for data analysis.', trendData: [{ period: 'Q1 2024', demand: 28 }, { period: 'Q2 2024', demand: 27 }, { period: 'Q3 2024', demand: 27 }, { period: 'Q4 2024', demand: 26 }, { period: 'Q1 2025', demand: 26 }, { period: 'Q2 2025', demand: 25 }, { period: 'Q3 2025', demand: 25 }, { period: 'Q4 2025', demand: 25 }] },

  // ---- Data Science ----
  { id: 'sql', name: 'SQL', category: 'Data Science', demand: 76, growth: 5.3, jobCount: 9456, aliases: ['Structured Query Language'], relatedSkills: ['postgresql', 'mysql', 'nosql'], pairedSkills: ['python', 'postgresql', 'tableau', 'excel'], roles: ['Data Analyst', 'Data Scientist', 'Backend Developer', 'Data Engineer'], industries: ['Technology', 'Finance', 'Healthcare', 'Retail'], description: 'Standard language for querying and managing relational databases.', trendData: [{ period: 'Q1 2024', demand: 73 }, { period: 'Q2 2024', demand: 73 }, { period: 'Q3 2024', demand: 74 }, { period: 'Q4 2024', demand: 74 }, { period: 'Q1 2025', demand: 75 }, { period: 'Q2 2025', demand: 75 }, { period: 'Q3 2025', demand: 76 }, { period: 'Q4 2025', demand: 76 }] },
  { id: 'statistics', name: 'Statistics', category: 'Data Science', demand: 58, growth: 6.1, jobCount: 7212, aliases: ['Statistical Analysis', 'Statistical Methods'], relatedSkills: ['python', 'r', 'probability'], pairedSkills: ['python', 'r', 'machine-learning', 'data-visualization'], roles: ['Data Scientist', 'Data Analyst', 'Biostatistician'], industries: ['Healthcare', 'Finance', 'Technology'], description: 'Mathematical methods for data analysis, inference, and modeling.', trendData: [{ period: 'Q1 2024', demand: 54 }, { period: 'Q2 2024', demand: 55 }, { period: 'Q3 2024', demand: 55 }, { period: 'Q4 2024', demand: 56 }, { period: 'Q1 2025', demand: 57 }, { period: 'Q2 2025', demand: 57 }, { period: 'Q3 2025', demand: 58 }, { period: 'Q4 2025', demand: 58 }] },
  { id: 'pandas', name: 'Pandas', category: 'Data Science', demand: 53, growth: 12.4, jobCount: 6589, aliases: ['pandas library'], relatedSkills: ['python', 'numpy', 'data-analysis'], pairedSkills: ['python', 'numpy', 'matplotlib', 'jupyter'], roles: ['Data Scientist', 'Data Analyst', 'ML Engineer'], industries: ['Technology', 'Finance'], description: 'Python library for data manipulation and analysis.', trendData: [{ period: 'Q1 2024', demand: 46 }, { period: 'Q2 2024', demand: 48 }, { period: 'Q3 2024', demand: 49 }, { period: 'Q4 2024', demand: 50 }, { period: 'Q1 2025', demand: 51 }, { period: 'Q2 2025', demand: 52 }, { period: 'Q3 2025', demand: 53 }, { period: 'Q4 2025', demand: 53 }] },
  { id: 'numpy', name: 'NumPy', category: 'Data Science', demand: 48, growth: 8.2, jobCount: 5967, aliases: ['Numerical Python'], relatedSkills: ['python', 'pandas', 'scipy'], pairedSkills: ['python', 'pandas', 'scikit-learn', 'matplotlib'], roles: ['Data Scientist', 'ML Engineer'], industries: ['Technology', 'Research'], description: 'Fundamental Python package for scientific computing and arrays.', trendData: [{ period: 'Q1 2024', demand: 43 }, { period: 'Q2 2024', demand: 44 }, { period: 'Q3 2024', demand: 45 }, { period: 'Q4 2024', demand: 46 }, { period: 'Q1 2025', demand: 47 }, { period: 'Q2 2025', demand: 47 }, { period: 'Q3 2025', demand: 48 }, { period: 'Q4 2025', demand: 48 }] },
  { id: 'data-visualization', name: 'Data Visualization', category: 'Data Science', demand: 44, growth: 14.7, jobCount: 5478, aliases: ['Data Viz', 'DataViz'], relatedSkills: ['tableau', 'powerbi', 'matplotlib'], pairedSkills: ['python', 'tableau', 'powerbi', 'excel'], roles: ['Data Analyst', 'Business Analyst', 'Data Scientist'], industries: ['Technology', 'Finance', 'Consulting'], description: 'Techniques for visual representation of data insights.', trendData: [{ period: 'Q1 2024', demand: 37 }, { period: 'Q2 2024', demand: 39 }, { period: 'Q3 2024', demand: 40 }, { period: 'Q4 2024', demand: 41 }, { period: 'Q1 2025', demand: 42 }, { period: 'Q2 2025', demand: 43 }, { period: 'Q3 2025', demand: 44 }, { period: 'Q4 2025', demand: 44 }] },
  { id: 'tableau', name: 'Tableau', category: 'Data Science', demand: 38, growth: 3.1, jobCount: 4723, aliases: ['Tableau Desktop', 'Tableau Online'], relatedSkills: ['powerbi', 'data-visualization', 'sql'], pairedSkills: ['sql', 'excel', 'python'], roles: ['Data Analyst', 'Business Analyst', 'BI Developer'], industries: ['Consulting', 'Finance', 'Retail'], description: 'Leading business intelligence and data visualization platform.', trendData: [{ period: 'Q1 2024', demand: 37 }, { period: 'Q2 2024', demand: 37 }, { period: 'Q3 2024', demand: 37 }, { period: 'Q4 2024', demand: 38 }, { period: 'Q1 2025', demand: 38 }, { period: 'Q2 2025', demand: 38 }, { period: 'Q3 2025', demand: 38 }, { period: 'Q4 2025', demand: 38 }] },
  { id: 'powerbi', name: 'Power BI', category: 'Data Science', demand: 41, growth: 15.8, jobCount: 5102, aliases: ['Microsoft Power BI', 'PBI'], relatedSkills: ['tableau', 'excel', 'dax'], pairedSkills: ['excel', 'sql', 'dax', 'azure'], roles: ['Data Analyst', 'BI Developer', 'Business Analyst'], industries: ['Enterprise', 'Finance', 'Retail'], description: 'Microsoft\'s business analytics and data visualization service.', trendData: [{ period: 'Q1 2024', demand: 34 }, { period: 'Q2 2024', demand: 35 }, { period: 'Q3 2024', demand: 36 }, { period: 'Q4 2024', demand: 37 }, { period: 'Q1 2025', demand: 38 }, { period: 'Q2 2025', demand: 39 }, { period: 'Q3 2025', demand: 40 }, { period: 'Q4 2025', demand: 41 }] },
  { id: 'excel', name: 'Excel', category: 'Data Science', demand: 55, growth: -5.2, jobCount: 6834, aliases: ['Microsoft Excel', 'MS Excel', 'Spreadsheet'], relatedSkills: ['vba', 'powerbi', 'sql'], pairedSkills: ['sql', 'powerbi', 'vba'], roles: ['Data Analyst', 'Business Analyst', 'Financial Analyst'], industries: ['Finance', 'Consulting', 'Retail'], description: 'Spreadsheet software widely used for data analysis and reporting.', trendData: [{ period: 'Q1 2024', demand: 59 }, { period: 'Q2 2024', demand: 58 }, { period: 'Q3 2024', demand: 57 }, { period: 'Q4 2024', demand: 57 }, { period: 'Q1 2025', demand: 56 }, { period: 'Q2 2025', demand: 56 }, { period: 'Q3 2025', demand: 55 }, { period: 'Q4 2025', demand: 55 }] },

  // ---- AI / Machine Learning ----
  { id: 'machine-learning', name: 'Machine Learning', category: 'AI / Machine Learning', demand: 64, growth: 24.8, jobCount: 7956, aliases: ['ML', 'Machine Learning Engineering'], relatedSkills: ['deep-learning', 'nlp', 'python'], pairedSkills: ['python', 'tensorflow', 'pytorch', 'scikit-learn', 'statistics'], roles: ['ML Engineer', 'Data Scientist', 'AI Researcher'], industries: ['Technology', 'Healthcare', 'Finance', 'Automotive'], description: 'Algorithms and models that learn from data to make predictions.', trendData: [{ period: 'Q1 2024', demand: 50 }, { period: 'Q2 2024', demand: 53 }, { period: 'Q3 2024', demand: 55 }, { period: 'Q4 2024', demand: 57 }, { period: 'Q1 2025', demand: 59 }, { period: 'Q2 2025', demand: 61 }, { period: 'Q3 2025', demand: 63 }, { period: 'Q4 2025', demand: 64 }], childSkills: ['regression', 'classification', 'clustering', 'dimensionality-reduction'] },
  { id: 'deep-learning', name: 'Deep Learning', category: 'AI / Machine Learning', demand: 52, growth: 32.1, jobCount: 6478, aliases: ['DL', 'Neural Networks'], relatedSkills: ['machine-learning', 'pytorch', 'tensorflow'], pairedSkills: ['pytorch', 'tensorflow', 'python', 'gpu'], roles: ['ML Engineer', 'AI Researcher', 'Data Scientist'], industries: ['Technology', 'Healthcare', 'Automotive'], description: 'Neural network-based machine learning for complex pattern recognition.', trendData: [{ period: 'Q1 2024', demand: 38 }, { period: 'Q2 2024', demand: 40 }, { period: 'Q3 2024', demand: 43 }, { period: 'Q4 2024', demand: 45 }, { period: 'Q1 2025', demand: 47 }, { period: 'Q2 2025', demand: 49 }, { period: 'Q3 2025', demand: 51 }, { period: 'Q4 2025', demand: 52 }] },
  { id: 'nlp', name: 'Natural Language Processing', category: 'AI / Machine Learning', demand: 48, growth: 38.6, jobCount: 5967, aliases: ['NLP', 'Text Mining'], relatedSkills: ['machine-learning', 'transformers', 'llm'], pairedSkills: ['python', 'transformers', 'huggingface', 'spacy'], roles: ['ML Engineer', 'NLP Engineer', 'AI Researcher'], industries: ['Technology', 'SaaS', 'Media'], description: 'AI techniques for understanding and generating human language.', trendData: [{ period: 'Q1 2024', demand: 33 }, { period: 'Q2 2024', demand: 36 }, { period: 'Q3 2024', demand: 38 }, { period: 'Q4 2024', demand: 40 }, { period: 'Q1 2025', demand: 43 }, { period: 'Q2 2025', demand: 45 }, { period: 'Q3 2025', demand: 47 }, { period: 'Q4 2025', demand: 48 }] },
  { id: 'llm', name: 'Large Language Models', category: 'AI / Machine Learning', demand: 56, growth: 142.5, jobCount: 6967, aliases: ['LLMs', 'Foundation Models', 'Generative AI'], relatedSkills: ['nlp', 'transformers', 'prompt-engineering'], pairedSkills: ['python', 'prompt-engineering', 'rag', 'langchain'], roles: ['ML Engineer', 'AI Engineer', 'Prompt Engineer'], industries: ['Technology', 'SaaS', 'Enterprise'], description: 'Large-scale neural language models for text generation and understanding.', trendData: [{ period: 'Q1 2024', demand: 22 }, { period: 'Q2 2024', demand: 28 }, { period: 'Q3 2024', demand: 34 }, { period: 'Q4 2024', demand: 39 }, { period: 'Q1 2025', demand: 44 }, { period: 'Q2 2025', demand: 49 }, { period: 'Q3 2025', demand: 53 }, { period: 'Q4 2025', demand: 56 }] },
  { id: 'prompt-engineering', name: 'Prompt Engineering', category: 'AI / Machine Learning', demand: 38, growth: 185.2, jobCount: 4723, aliases: ['Prompt Design'], relatedSkills: ['llm', 'chatgpt', 'ai'], pairedSkills: ['llm', 'python', 'langchain'], roles: ['Prompt Engineer', 'AI Engineer', 'ML Engineer'], industries: ['Technology', 'SaaS'], description: 'Designing effective prompts for AI language model interactions.', trendData: [{ period: 'Q1 2024', demand: 12 }, { period: 'Q2 2024', demand: 16 }, { period: 'Q3 2024', demand: 20 }, { period: 'Q4 2024', demand: 24 }, { period: 'Q1 2025', demand: 28 }, { period: 'Q2 2025', demand: 32 }, { period: 'Q3 2025', demand: 35 }, { period: 'Q4 2025', demand: 38 }] },
  { id: 'pytorch', name: 'PyTorch', category: 'AI / Machine Learning', demand: 45, growth: 26.4, jobCount: 5589, aliases: ['Torch'], relatedSkills: ['tensorflow', 'deep-learning', 'python'], pairedSkills: ['python', 'deep-learning', 'cuda', 'numpy'], roles: ['ML Engineer', 'AI Researcher'], industries: ['Technology', 'Research'], description: 'Open-source deep learning framework by Meta.', trendData: [{ period: 'Q1 2024', demand: 34 }, { period: 'Q2 2024', demand: 36 }, { period: 'Q3 2024', demand: 38 }, { period: 'Q4 2024', demand: 40 }, { period: 'Q1 2025', demand: 41 }, { period: 'Q2 2025', demand: 43 }, { period: 'Q3 2025', demand: 44 }, { period: 'Q4 2025', demand: 45 }] },
  { id: 'tensorflow', name: 'TensorFlow', category: 'AI / Machine Learning', demand: 38, growth: 2.4, jobCount: 4723, aliases: ['TF', 'TensorFlow 2'], relatedSkills: ['pytorch', 'keras', 'deep-learning'], pairedSkills: ['python', 'keras', 'deep-learning'], roles: ['ML Engineer', 'Data Scientist'], industries: ['Technology', 'Healthcare'], description: 'Open-source deep learning framework by Google.', trendData: [{ period: 'Q1 2024', demand: 37 }, { period: 'Q2 2024', demand: 37 }, { period: 'Q3 2024', demand: 37 }, { period: 'Q4 2024', demand: 37 }, { period: 'Q1 2025', demand: 38 }, { period: 'Q2 2025', demand: 38 }, { period: 'Q3 2025', demand: 38 }, { period: 'Q4 2025', demand: 38 }] },
  { id: 'scikit-learn', name: 'Scikit-learn', category: 'AI / Machine Learning', demand: 42, growth: 8.7, jobCount: 5234, aliases: ['sklearn'], relatedSkills: ['python', 'pandas', 'machine-learning'], pairedSkills: ['python', 'pandas', 'numpy', 'matplotlib'], roles: ['Data Scientist', 'ML Engineer', 'Data Analyst'], industries: ['Technology', 'Finance'], description: 'Python library for classical machine learning algorithms.', trendData: [{ period: 'Q1 2024', demand: 38 }, { period: 'Q2 2024', demand: 39 }, { period: 'Q3 2024', demand: 39 }, { period: 'Q4 2024', demand: 40 }, { period: 'Q1 2025', demand: 41 }, { period: 'Q2 2025', demand: 41 }, { period: 'Q3 2025', demand: 42 }, { period: 'Q4 2025', demand: 42 }] },
  { id: 'computer-vision', name: 'Computer Vision', category: 'AI / Machine Learning', demand: 36, growth: 22.1, jobCount: 4478, aliases: ['CV', 'Image Recognition'], relatedSkills: ['deep-learning', 'opencv', 'pytorch'], pairedSkills: ['pytorch', 'python', 'opencv', 'cnn'], roles: ['ML Engineer', 'Computer Vision Engineer'], industries: ['Automotive', 'Healthcare', 'Retail'], description: 'AI for interpreting and analyzing visual data from images and video.', trendData: [{ period: 'Q1 2024', demand: 28 }, { period: 'Q2 2024', demand: 30 }, { period: 'Q3 2024', demand: 31 }, { period: 'Q4 2024', demand: 33 }, { period: 'Q1 2025', demand: 34 }, { period: 'Q2 2025', demand: 35 }, { period: 'Q3 2025', demand: 36 }, { period: 'Q4 2025', demand: 36 }] },
  { id: 'mlops', name: 'MLOps', category: 'AI / Machine Learning', demand: 34, growth: 48.2, jobCount: 4234, aliases: ['ML Operations', 'Machine Learning Operations'], relatedSkills: ['docker', 'kubernetes', 'mlflow'], pairedSkills: ['docker', 'kubernetes', 'python', 'ci-cd'], roles: ['MLOps Engineer', 'ML Engineer', 'Data Engineer'], industries: ['Technology', 'Finance'], description: 'Practices for deploying and maintaining ML models in production.', trendData: [{ period: 'Q1 2024', demand: 22 }, { period: 'Q2 2024', demand: 24 }, { period: 'Q3 2024', demand: 26 }, { period: 'Q4 2024', demand: 28 }, { period: 'Q1 2025', demand: 30 }, { period: 'Q2 2025', demand: 31 }, { period: 'Q3 2025', demand: 33 }, { period: 'Q4 2025', demand: 34 }] },
  { id: 'rag', name: 'RAG', category: 'AI / Machine Learning', demand: 32, growth: 210.5, jobCount: 3978, aliases: ['Retrieval Augmented Generation'], relatedSkills: ['llm', 'vector-db', 'langchain'], pairedSkills: ['llm', 'langchain', 'python', 'vector-db'], roles: ['AI Engineer', 'ML Engineer'], industries: ['Technology', 'Enterprise'], description: 'Technique combining information retrieval with generative AI.', trendData: [{ period: 'Q1 2024', demand: 8 }, { period: 'Q2 2024', demand: 12 }, { period: 'Q3 2024', demand: 16 }, { period: 'Q4 2024', demand: 20 }, { period: 'Q1 2025', demand: 24 }, { period: 'Q2 2025', demand: 27 }, { period: 'Q3 2025', demand: 30 }, { period: 'Q4 2025', demand: 32 }] },

  // ---- Cloud Computing ----
  { id: 'aws', name: 'AWS', category: 'Cloud Computing', demand: 62, growth: 15.3, jobCount: 7712, aliases: ['Amazon Web Services', 'AWS Cloud'], relatedSkills: ['azure', 'gcp', 'cloud'], pairedSkills: ['python', 'docker', 'linux', 'terraform'], roles: ['Cloud Engineer', 'DevOps Engineer', 'Backend Developer', 'Solutions Architect'], industries: ['Technology', 'Finance', 'Healthcare', 'E-commerce'], description: 'Leading cloud computing platform by Amazon.', trendData: [{ period: 'Q1 2024', demand: 53 }, { period: 'Q2 2024', demand: 55 }, { period: 'Q3 2024', demand: 56 }, { period: 'Q4 2024', demand: 58 }, { period: 'Q1 2025', demand: 59 }, { period: 'Q2 2025', demand: 60 }, { period: 'Q3 2025', demand: 61 }, { period: 'Q4 2025', demand: 62 }], childSkills: ['ec2', 's3', 'lambda', 'iam'] },
  { id: 'azure', name: 'Azure', category: 'Cloud Computing', demand: 48, growth: 18.7, jobCount: 5967, aliases: ['Microsoft Azure', 'Azure Cloud'], relatedSkills: ['aws', 'gcp', 'cloud'], pairedSkills: ['dotnet', 'powershell', 'sql', 'kubernetes'], roles: ['Cloud Engineer', 'DevOps Engineer', 'Solutions Architect'], industries: ['Enterprise', 'Finance', 'Healthcare'], description: 'Microsoft\'s cloud computing platform and services.', trendData: [{ period: 'Q1 2024', demand: 39 }, { period: 'Q2 2024', demand: 41 }, { period: 'Q3 2024', demand: 43 }, { period: 'Q4 2024', demand: 44 }, { period: 'Q1 2025', demand: 45 }, { period: 'Q2 2025', demand: 46 }, { period: 'Q3 2025', demand: 47 }, { period: 'Q4 2025', demand: 48 }] },
  { id: 'gcp', name: 'GCP', category: 'Cloud Computing', demand: 35, growth: 21.2, jobCount: 4356, aliases: ['Google Cloud Platform', 'Google Cloud'], relatedSkills: ['aws', 'azure', 'bigquery'], pairedSkills: ['python', 'kubernetes', 'bigquery', 'terraform'], roles: ['Cloud Engineer', 'Data Engineer', 'ML Engineer'], industries: ['Technology', 'Media', 'Retail'], description: 'Google\'s suite of cloud computing services.', trendData: [{ period: 'Q1 2024', demand: 28 }, { period: 'Q2 2024', demand: 29 }, { period: 'Q3 2024', demand: 30 }, { period: 'Q4 2024', demand: 31 }, { period: 'Q1 2025', demand: 32 }, { period: 'Q2 2025', demand: 33 }, { period: 'Q3 2025', demand: 34 }, { period: 'Q4 2025', demand: 35 }] },
  { id: 'cloud-architecture', name: 'Cloud Architecture', category: 'Cloud Computing', demand: 44, growth: 19.8, jobCount: 5478, aliases: ['Cloud Design', 'Cloud Infrastructure'], relatedSkills: ['aws', 'azure', 'microservices'], pairedSkills: ['aws', 'azure', 'terraform', 'microservices'], roles: ['Solutions Architect', 'Cloud Engineer'], industries: ['Technology', 'Enterprise', 'Finance'], description: 'Design principles for scalable, resilient cloud systems.', trendData: [{ period: 'Q1 2024', demand: 36 }, { period: 'Q2 2024', demand: 37 }, { period: 'Q3 2024', demand: 38 }, { period: 'Q4 2024', demand: 40 }, { period: 'Q1 2025', demand: 41 }, { period: 'Q2 2025', demand: 42 }, { period: 'Q3 2025', demand: 43 }, { period: 'Q4 2025', demand: 44 }] },
  { id: 'serverless', name: 'Serverless', category: 'Cloud Computing', demand: 30, growth: 25.4, jobCount: 3734, aliases: ['FaaS', 'Serverless Computing'], relatedSkills: ['aws', 'lambda', 'cloud-functions'], pairedSkills: ['aws', 'python', 'nodejs', 'api-gateway'], roles: ['Cloud Engineer', 'Backend Developer'], industries: ['Technology', 'SaaS'], description: 'Cloud execution model where the provider manages infrastructure.', trendData: [{ period: 'Q1 2024', demand: 23 }, { period: 'Q2 2024', demand: 24 }, { period: 'Q3 2024', demand: 25 }, { period: 'Q4 2024', demand: 26 }, { period: 'Q1 2025', demand: 27 }, { period: 'Q2 2025', demand: 28 }, { period: 'Q3 2025', demand: 29 }, { period: 'Q4 2025', demand: 30 }] },

  // ---- DevOps ----
  { id: 'docker', name: 'Docker', category: 'DevOps', demand: 55, growth: 16.8, jobCount: 6834, aliases: ['Docker Container', 'Docker Engine'], relatedSkills: ['kubernetes', 'ci-cd', 'linux'], pairedSkills: ['kubernetes', 'linux', 'ci-cd', 'python', 'go'], roles: ['DevOps Engineer', 'Backend Developer', 'Cloud Engineer', 'SRE'], industries: ['Technology', 'Finance', 'SaaS'], description: 'Container platform for packaging and deploying applications.', trendData: [{ period: 'Q1 2024', demand: 46 }, { period: 'Q2 2024', demand: 48 }, { period: 'Q3 2024', demand: 49 }, { period: 'Q4 2024', demand: 50 }, { period: 'Q1 2025', demand: 52 }, { period: 'Q2 2025', demand: 53 }, { period: 'Q3 2025', demand: 54 }, { period: 'Q4 2025', demand: 55 }] },
  { id: 'kubernetes', name: 'Kubernetes', category: 'DevOps', demand: 48, growth: 22.3, jobCount: 5967, aliases: ['K8s', 'Kube'], relatedSkills: ['docker', 'helm', 'istio'], pairedSkills: ['docker', 'linux', 'aws', 'terraform', 'helm'], roles: ['DevOps Engineer', 'Cloud Engineer', 'SRE', 'Platform Engineer'], industries: ['Technology', 'Finance', 'SaaS'], description: 'Container orchestration system for automated deployment and scaling.', trendData: [{ period: 'Q1 2024', demand: 38 }, { period: 'Q2 2024', demand: 40 }, { period: 'Q3 2024', demand: 41 }, { period: 'Q4 2024', demand: 43 }, { period: 'Q1 2025', demand: 44 }, { period: 'Q2 2025', demand: 46 }, { period: 'Q3 2025', demand: 47 }, { period: 'Q4 2025', demand: 48 }] },
  { id: 'ci-cd', name: 'CI/CD', category: 'DevOps', demand: 52, growth: 14.6, jobCount: 6456, aliases: ['Continuous Integration', 'Continuous Deployment', 'Continuous Delivery'], relatedSkills: ['jenkins', 'github-actions', 'gitlab-ci'], pairedSkills: ['docker', 'git', 'jenkins', 'github-actions'], roles: ['DevOps Engineer', 'Software Developer', 'SRE'], industries: ['Technology', 'Finance', 'SaaS'], description: 'Practices for automating software build, test, and deployment.', trendData: [{ period: 'Q1 2024', demand: 45 }, { period: 'Q2 2024', demand: 46 }, { period: 'Q3 2024', demand: 47 }, { period: 'Q4 2024', demand: 48 }, { period: 'Q1 2025', demand: 49 }, { period: 'Q2 2025', demand: 50 }, { period: 'Q3 2025', demand: 51 }, { period: 'Q4 2025', demand: 52 }] },
  { id: 'terraform', name: 'Terraform', category: 'DevOps', demand: 42, growth: 24.6, jobCount: 5234, aliases: ['HashiCorp Terraform', 'TF', 'IaC'], relatedSkills: ['aws', 'azure', 'infrastructure-as-code'], pairedSkills: ['aws', 'azure', 'docker', 'kubernetes'], roles: ['DevOps Engineer', 'Cloud Engineer', 'SRE'], industries: ['Technology', 'Finance'], description: 'Infrastructure-as-code tool for provisioning cloud resources.', trendData: [{ period: 'Q1 2024', demand: 33 }, { period: 'Q2 2024', demand: 34 }, { period: 'Q3 2024', demand: 35 }, { period: 'Q4 2024', demand: 37 }, { period: 'Q1 2025', demand: 38 }, { period: 'Q2 2025', demand: 40 }, { period: 'Q3 2025', demand: 41 }, { period: 'Q4 2025', demand: 42 }] },
  { id: 'git', name: 'Git', category: 'DevOps', demand: 72, growth: 4.1, jobCount: 8934, aliases: ['Git VCS', 'Version Control'], relatedSkills: ['github', 'gitlab', 'ci-cd'], pairedSkills: ['github', 'linux', 'ci-cd'], roles: ['Software Developer', 'DevOps Engineer', 'Full Stack Developer'], industries: ['Technology', 'Finance', 'SaaS'], description: 'Distributed version control system for tracking code changes.', trendData: [{ period: 'Q1 2024', demand: 70 }, { period: 'Q2 2024', demand: 70 }, { period: 'Q3 2024', demand: 71 }, { period: 'Q4 2024', demand: 71 }, { period: 'Q1 2025', demand: 71 }, { period: 'Q2 2025', demand: 72 }, { period: 'Q3 2025', demand: 72 }, { period: 'Q4 2025', demand: 72 }] },
  { id: 'linux', name: 'Linux', category: 'DevOps', demand: 58, growth: 6.8, jobCount: 7212, aliases: ['Linux Administration', 'Linux OS'], relatedSkills: ['bash', 'docker', 'networking'], pairedSkills: ['bash', 'docker', 'python', 'networking'], roles: ['DevOps Engineer', 'SysAdmin', 'Cloud Engineer', 'SRE'], industries: ['Technology', 'Cloud', 'Enterprise'], description: 'Open-source operating system used in servers and cloud infrastructure.', trendData: [{ period: 'Q1 2024', demand: 54 }, { period: 'Q2 2024', demand: 55 }, { period: 'Q3 2024', demand: 55 }, { period: 'Q4 2024', demand: 56 }, { period: 'Q1 2025', demand: 57 }, { period: 'Q2 2025', demand: 57 }, { period: 'Q3 2025', demand: 58 }, { period: 'Q4 2025', demand: 58 }] },

  // ---- Databases ----
  { id: 'postgresql', name: 'PostgreSQL', category: 'Databases', demand: 52, growth: 18.2, jobCount: 6478, aliases: ['Postgres', 'PG'], relatedSkills: ['sql', 'mysql', 'database-design'], pairedSkills: ['python', 'sql', 'docker', 'nodejs'], roles: ['Backend Developer', 'Data Engineer', 'DBA'], industries: ['Technology', 'Finance', 'SaaS'], description: 'Advanced open-source relational database system.', trendData: [{ period: 'Q1 2024', demand: 43 }, { period: 'Q2 2024', demand: 44 }, { period: 'Q3 2024', demand: 46 }, { period: 'Q4 2024', demand: 47 }, { period: 'Q1 2025', demand: 49 }, { period: 'Q2 2025', demand: 50 }, { period: 'Q3 2025', demand: 51 }, { period: 'Q4 2025', demand: 52 }] },
  { id: 'mongodb', name: 'MongoDB', category: 'Databases', demand: 38, growth: 5.4, jobCount: 4723, aliases: ['Mongo', 'MongoDB Atlas'], relatedSkills: ['nosql', 'nodejs', 'mongoose'], pairedSkills: ['nodejs', 'python', 'express'], roles: ['Backend Developer', 'Full Stack Developer'], industries: ['Technology', 'SaaS', 'E-commerce'], description: 'Document-oriented NoSQL database for modern applications.', trendData: [{ period: 'Q1 2024', demand: 36 }, { period: 'Q2 2024', demand: 36 }, { period: 'Q3 2024', demand: 37 }, { period: 'Q4 2024', demand: 37 }, { period: 'Q1 2025', demand: 37 }, { period: 'Q2 2025', demand: 38 }, { period: 'Q3 2025', demand: 38 }, { period: 'Q4 2025', demand: 38 }] },
  { id: 'redis', name: 'Redis', category: 'Databases', demand: 34, growth: 12.1, jobCount: 4234, aliases: ['Redis Cache'], relatedSkills: ['caching', 'nosql', 'memcached'], pairedSkills: ['python', 'nodejs', 'docker'], roles: ['Backend Developer', 'DevOps Engineer'], industries: ['Technology', 'E-commerce', 'Finance'], description: 'In-memory data store used as cache, message broker, and database.', trendData: [{ period: 'Q1 2024', demand: 30 }, { period: 'Q2 2024', demand: 30 }, { period: 'Q3 2024', demand: 31 }, { period: 'Q4 2024', demand: 32 }, { period: 'Q1 2025', demand: 32 }, { period: 'Q2 2025', demand: 33 }, { period: 'Q3 2025', demand: 33 }, { period: 'Q4 2025', demand: 34 }] },
  { id: 'mysql', name: 'MySQL', category: 'Databases', demand: 42, growth: -3.2, jobCount: 5234, aliases: ['My SQL', 'MySQL DB'], relatedSkills: ['sql', 'postgresql', 'mariadb'], pairedSkills: ['php', 'python', 'sql', 'java'], roles: ['Backend Developer', 'DBA', 'Full Stack Developer'], industries: ['Technology', 'E-commerce'], description: 'Popular open-source relational database management system.', trendData: [{ period: 'Q1 2024', demand: 44 }, { period: 'Q2 2024', demand: 43 }, { period: 'Q3 2024', demand: 43 }, { period: 'Q4 2024', demand: 43 }, { period: 'Q1 2025', demand: 42 }, { period: 'Q2 2025', demand: 42 }, { period: 'Q3 2025', demand: 42 }, { period: 'Q4 2025', demand: 42 }] },
  { id: 'elasticsearch', name: 'Elasticsearch', category: 'Databases', demand: 28, growth: 8.4, jobCount: 3489, aliases: ['Elastic', 'ES'], relatedSkills: ['kibana', 'logstash', 'opensearch'], pairedSkills: ['python', 'kibana', 'logstash'], roles: ['Backend Developer', 'Data Engineer', 'DevOps Engineer'], industries: ['Technology', 'E-commerce'], description: 'Distributed search and analytics engine for log and data analysis.', trendData: [{ period: 'Q1 2024', demand: 25 }, { period: 'Q2 2024', demand: 26 }, { period: 'Q3 2024', demand: 26 }, { period: 'Q4 2024', demand: 27 }, { period: 'Q1 2025', demand: 27 }, { period: 'Q2 2025', demand: 28 }, { period: 'Q3 2025', demand: 28 }, { period: 'Q4 2025', demand: 28 }] },

  // ---- Web Development ----
  { id: 'react', name: 'React', category: 'Web Development', demand: 68, growth: 10.2, jobCount: 8456, aliases: ['ReactJS', 'React.js'], relatedSkills: ['nextjs', 'redux', 'typescript'], pairedSkills: ['typescript', 'nextjs', 'nodejs', 'css', 'redux'], roles: ['Frontend Developer', 'Full Stack Developer'], industries: ['Technology', 'SaaS', 'E-commerce'], description: 'JavaScript library for building user interfaces by Meta.', trendData: [{ period: 'Q1 2024', demand: 62 }, { period: 'Q2 2024', demand: 63 }, { period: 'Q3 2024', demand: 64 }, { period: 'Q4 2024', demand: 65 }, { period: 'Q1 2025', demand: 66 }, { period: 'Q2 2025', demand: 67 }, { period: 'Q3 2025', demand: 68 }, { period: 'Q4 2025', demand: 68 }] },
  { id: 'nodejs', name: 'Node.js', category: 'Web Development', demand: 58, growth: 7.8, jobCount: 7212, aliases: ['Node', 'NodeJS'], relatedSkills: ['express', 'npm', 'javascript'], pairedSkills: ['javascript', 'typescript', 'express', 'mongodb', 'react'], roles: ['Backend Developer', 'Full Stack Developer'], industries: ['Technology', 'SaaS', 'E-commerce'], description: 'JavaScript runtime for server-side development.', trendData: [{ period: 'Q1 2024', demand: 53 }, { period: 'Q2 2024', demand: 54 }, { period: 'Q3 2024', demand: 55 }, { period: 'Q4 2024', demand: 55 }, { period: 'Q1 2025', demand: 56 }, { period: 'Q2 2025', demand: 57 }, { period: 'Q3 2025', demand: 58 }, { period: 'Q4 2025', demand: 58 }] },
  { id: 'nextjs', name: 'Next.js', category: 'Web Development', demand: 42, growth: 35.8, jobCount: 5234, aliases: ['NextJS', 'Vercel Next'], relatedSkills: ['react', 'typescript', 'vercel'], pairedSkills: ['react', 'typescript', 'tailwindcss', 'vercel'], roles: ['Frontend Developer', 'Full Stack Developer'], industries: ['Technology', 'SaaS'], description: 'React framework for production-grade web applications.', trendData: [{ period: 'Q1 2024', demand: 30 }, { period: 'Q2 2024', demand: 32 }, { period: 'Q3 2024', demand: 34 }, { period: 'Q4 2024', demand: 36 }, { period: 'Q1 2025', demand: 38 }, { period: 'Q2 2025', demand: 39 }, { period: 'Q3 2025', demand: 41 }, { period: 'Q4 2025', demand: 42 }] },
  { id: 'html-css', name: 'HTML/CSS', category: 'Web Development', demand: 62, growth: -1.2, jobCount: 7712, aliases: ['HTML5', 'CSS3', 'HTML', 'CSS'], relatedSkills: ['javascript', 'react', 'responsive-design'], pairedSkills: ['javascript', 'react', 'responsive-design'], roles: ['Frontend Developer', 'Full Stack Developer', 'UI Developer'], industries: ['Technology', 'E-commerce', 'Media'], description: 'Foundational web technologies for structure and styling.', trendData: [{ period: 'Q1 2024', demand: 63 }, { period: 'Q2 2024', demand: 63 }, { period: 'Q3 2024', demand: 63 }, { period: 'Q4 2024', demand: 62 }, { period: 'Q1 2025', demand: 62 }, { period: 'Q2 2025', demand: 62 }, { period: 'Q3 2025', demand: 62 }, { period: 'Q4 2025', demand: 62 }] },
  { id: 'rest-api', name: 'REST APIs', category: 'Web Development', demand: 60, growth: 5.6, jobCount: 7456, aliases: ['RESTful', 'REST API Design', 'API Development'], relatedSkills: ['graphql', 'fastapi', 'swagger'], pairedSkills: ['python', 'javascript', 'nodejs', 'docker'], roles: ['Backend Developer', 'Full Stack Developer', 'API Developer'], industries: ['Technology', 'Finance', 'SaaS'], description: 'Architectural style for designing networked applications.', trendData: [{ period: 'Q1 2024', demand: 57 }, { period: 'Q2 2024', demand: 57 }, { period: 'Q3 2024', demand: 58 }, { period: 'Q4 2024', demand: 58 }, { period: 'Q1 2025', demand: 59 }, { period: 'Q2 2025', demand: 59 }, { period: 'Q3 2025', demand: 60 }, { period: 'Q4 2025', demand: 60 }] },
  { id: 'graphql', name: 'GraphQL', category: 'Web Development', demand: 28, growth: 18.4, jobCount: 3489, aliases: ['GQL'], relatedSkills: ['rest-api', 'apollo', 'prisma'], pairedSkills: ['typescript', 'react', 'nodejs', 'apollo'], roles: ['Backend Developer', 'Full Stack Developer'], industries: ['Technology', 'SaaS'], description: 'Query language for APIs providing flexible data fetching.', trendData: [{ period: 'Q1 2024', demand: 23 }, { period: 'Q2 2024', demand: 24 }, { period: 'Q3 2024', demand: 25 }, { period: 'Q4 2024', demand: 25 }, { period: 'Q1 2025', demand: 26 }, { period: 'Q2 2025', demand: 27 }, { period: 'Q3 2025', demand: 28 }, { period: 'Q4 2025', demand: 28 }] },
  { id: 'fastapi', name: 'FastAPI', category: 'Web Development', demand: 32, growth: 42.5, jobCount: 3978, aliases: ['Fast API'], relatedSkills: ['python', 'rest-api', 'pydantic'], pairedSkills: ['python', 'postgresql', 'docker', 'pydantic'], roles: ['Backend Developer', 'ML Engineer', 'Data Engineer'], industries: ['Technology', 'SaaS'], description: 'Modern, fast Python web framework for building APIs.', trendData: [{ period: 'Q1 2024', demand: 21 }, { period: 'Q2 2024', demand: 23 }, { period: 'Q3 2024', demand: 25 }, { period: 'Q4 2024', demand: 26 }, { period: 'Q1 2025', demand: 28 }, { period: 'Q2 2025', demand: 30 }, { period: 'Q3 2025', demand: 31 }, { period: 'Q4 2025', demand: 32 }] },

  // ---- Cybersecurity ----
  { id: 'cybersecurity', name: 'Cybersecurity', category: 'Cybersecurity', demand: 46, growth: 20.5, jobCount: 5723, aliases: ['Cyber Security', 'InfoSec', 'Information Security'], relatedSkills: ['network-security', 'siem', 'pen-testing'], pairedSkills: ['networking', 'linux', 'python', 'firewalls'], roles: ['Cybersecurity Analyst', 'Security Engineer', 'CISO'], industries: ['Finance', 'Government', 'Healthcare', 'Technology'], description: 'Protection of systems, networks, and data from digital attacks.', trendData: [{ period: 'Q1 2024', demand: 37 }, { period: 'Q2 2024', demand: 39 }, { period: 'Q3 2024', demand: 40 }, { period: 'Q4 2024', demand: 42 }, { period: 'Q1 2025', demand: 43 }, { period: 'Q2 2025', demand: 44 }, { period: 'Q3 2025', demand: 45 }, { period: 'Q4 2025', demand: 46 }] },
  { id: 'cloud-security', name: 'Cloud Security', category: 'Cybersecurity', demand: 38, growth: 32.8, jobCount: 4723, aliases: ['Cloud Sec'], relatedSkills: ['aws', 'azure', 'iam'], pairedSkills: ['aws', 'azure', 'iam', 'compliance'], roles: ['Cloud Security Engineer', 'Security Architect'], industries: ['Finance', 'Technology', 'Healthcare'], description: 'Security practices for protecting cloud-based infrastructure and data.', trendData: [{ period: 'Q1 2024', demand: 27 }, { period: 'Q2 2024', demand: 29 }, { period: 'Q3 2024', demand: 31 }, { period: 'Q4 2024', demand: 33 }, { period: 'Q1 2025', demand: 34 }, { period: 'Q2 2025', demand: 36 }, { period: 'Q3 2025', demand: 37 }, { period: 'Q4 2025', demand: 38 }] },

  // ---- Data Engineering ----
  { id: 'spark', name: 'Apache Spark', category: 'Data Engineering', demand: 42, growth: 11.4, jobCount: 5234, aliases: ['Spark', 'PySpark'], relatedSkills: ['hadoop', 'databricks', 'scala'], pairedSkills: ['python', 'sql', 'hadoop', 'databricks'], roles: ['Data Engineer', 'Data Scientist', 'Big Data Engineer'], industries: ['Technology', 'Finance', 'Telecom'], description: 'Unified analytics engine for large-scale data processing.', trendData: [{ period: 'Q1 2024', demand: 37 }, { period: 'Q2 2024', demand: 38 }, { period: 'Q3 2024', demand: 38 }, { period: 'Q4 2024', demand: 39 }, { period: 'Q1 2025', demand: 40 }, { period: 'Q2 2025', demand: 41 }, { period: 'Q3 2025', demand: 41 }, { period: 'Q4 2025', demand: 42 }] },
  { id: 'kafka', name: 'Apache Kafka', category: 'Data Engineering', demand: 38, growth: 15.2, jobCount: 4723, aliases: ['Kafka', 'Kafka Streams'], relatedSkills: ['spark', 'rabbitmq', 'event-driven'], pairedSkills: ['python', 'java', 'docker', 'microservices'], roles: ['Data Engineer', 'Backend Developer'], industries: ['Technology', 'Finance', 'E-commerce'], description: 'Distributed event streaming platform for real-time data pipelines.', trendData: [{ period: 'Q1 2024', demand: 32 }, { period: 'Q2 2024', demand: 33 }, { period: 'Q3 2024', demand: 34 }, { period: 'Q4 2024', demand: 35 }, { period: 'Q1 2025', demand: 36 }, { period: 'Q2 2025', demand: 36 }, { period: 'Q3 2025', demand: 37 }, { period: 'Q4 2025', demand: 38 }] },
  { id: 'airflow', name: 'Apache Airflow', category: 'Data Engineering', demand: 32, growth: 22.8, jobCount: 3978, aliases: ['Airflow'], relatedSkills: ['python', 'etl', 'data-pipeline'], pairedSkills: ['python', 'sql', 'aws', 'docker'], roles: ['Data Engineer', 'ML Engineer'], industries: ['Technology', 'Finance'], description: 'Workflow automation platform for data pipeline orchestration.', trendData: [{ period: 'Q1 2024', demand: 25 }, { period: 'Q2 2024', demand: 26 }, { period: 'Q3 2024', demand: 27 }, { period: 'Q4 2024', demand: 28 }, { period: 'Q1 2025', demand: 29 }, { period: 'Q2 2025', demand: 30 }, { period: 'Q3 2025', demand: 31 }, { period: 'Q4 2025', demand: 32 }] },
  { id: 'dbt', name: 'dbt', category: 'Data Engineering', demand: 28, growth: 38.4, jobCount: 3489, aliases: ['data build tool'], relatedSkills: ['sql', 'snowflake', 'bigquery'], pairedSkills: ['sql', 'snowflake', 'bigquery', 'airflow'], roles: ['Analytics Engineer', 'Data Engineer'], industries: ['Technology', 'Finance'], description: 'Analytics engineering tool for transforming data in warehouses.', trendData: [{ period: 'Q1 2024', demand: 19 }, { period: 'Q2 2024', demand: 21 }, { period: 'Q3 2024', demand: 22 }, { period: 'Q4 2024', demand: 24 }, { period: 'Q1 2025', demand: 25 }, { period: 'Q2 2025', demand: 26 }, { period: 'Q3 2025', demand: 27 }, { period: 'Q4 2025', demand: 28 }] },
  { id: 'snowflake', name: 'Snowflake', category: 'Data Engineering', demand: 30, growth: 28.6, jobCount: 3734, aliases: ['Snowflake DB', 'Snowflake Cloud'], relatedSkills: ['sql', 'dbt', 'bigquery'], pairedSkills: ['sql', 'dbt', 'python', 'aws'], roles: ['Data Engineer', 'Analytics Engineer', 'Data Analyst'], industries: ['Technology', 'Finance', 'Retail'], description: 'Cloud-native data warehousing platform.', trendData: [{ period: 'Q1 2024', demand: 22 }, { period: 'Q2 2024', demand: 24 }, { period: 'Q3 2024', demand: 25 }, { period: 'Q4 2024', demand: 26 }, { period: 'Q1 2025', demand: 27 }, { period: 'Q2 2025', demand: 28 }, { period: 'Q3 2025', demand: 29 }, { period: 'Q4 2025', demand: 30 }] },

  // ---- Software Engineering ----
  { id: 'microservices', name: 'Microservices', category: 'Software Engineering', demand: 48, growth: 12.6, jobCount: 5967, aliases: ['Microservice Architecture'], relatedSkills: ['docker', 'kubernetes', 'api'], pairedSkills: ['docker', 'kubernetes', 'rest-api', 'grpc'], roles: ['Backend Developer', 'Solutions Architect', 'Software Developer'], industries: ['Technology', 'Finance', 'Enterprise'], description: 'Architectural style structuring applications as independent services.', trendData: [{ period: 'Q1 2024', demand: 42 }, { period: 'Q2 2024', demand: 43 }, { period: 'Q3 2024', demand: 44 }, { period: 'Q4 2024', demand: 45 }, { period: 'Q1 2025', demand: 46 }, { period: 'Q2 2025', demand: 47 }, { period: 'Q3 2025', demand: 47 }, { period: 'Q4 2025', demand: 48 }] },
  { id: 'system-design', name: 'System Design', category: 'Software Engineering', demand: 55, growth: 16.2, jobCount: 6834, aliases: ['Systems Design', 'Architecture Design'], relatedSkills: ['microservices', 'cloud-architecture', 'scalability'], pairedSkills: ['cloud-architecture', 'databases', 'networking'], roles: ['Software Developer', 'Solutions Architect', 'Staff Engineer'], industries: ['Technology', 'Finance'], description: 'Designing scalable, reliable, and maintainable software systems.', trendData: [{ period: 'Q1 2024', demand: 46 }, { period: 'Q2 2024', demand: 48 }, { period: 'Q3 2024', demand: 49 }, { period: 'Q4 2024', demand: 51 }, { period: 'Q1 2025', demand: 52 }, { period: 'Q2 2025', demand: 53 }, { period: 'Q3 2025', demand: 54 }, { period: 'Q4 2025', demand: 55 }] },
  { id: 'agile', name: 'Agile', category: 'Software Engineering', demand: 50, growth: 2.4, jobCount: 6234, aliases: ['Agile Methodology', 'Scrum', 'Kanban'], relatedSkills: ['scrum', 'jira', 'project-management'], pairedSkills: ['scrum', 'jira', 'kanban'], roles: ['Software Developer', 'Product Manager', 'Scrum Master'], industries: ['Technology', 'Consulting', 'Enterprise'], description: 'Iterative project management methodology for software development.', trendData: [{ period: 'Q1 2024', demand: 49 }, { period: 'Q2 2024', demand: 49 }, { period: 'Q3 2024', demand: 49 }, { period: 'Q4 2024', demand: 50 }, { period: 'Q1 2025', demand: 50 }, { period: 'Q2 2025', demand: 50 }, { period: 'Q3 2025', demand: 50 }, { period: 'Q4 2025', demand: 50 }] },
  { id: 'testing', name: 'Testing/QA', category: 'Software Engineering', demand: 45, growth: 6.8, jobCount: 5589, aliases: ['Unit Testing', 'QA', 'Quality Assurance', 'Test Automation'], relatedSkills: ['selenium', 'cypress', 'jest'], pairedSkills: ['python', 'selenium', 'ci-cd'], roles: ['QA Engineer', 'Software Developer', 'SDET'], industries: ['Technology', 'Finance', 'Healthcare'], description: 'Practices for validating software quality and correctness.', trendData: [{ period: 'Q1 2024', demand: 42 }, { period: 'Q2 2024', demand: 42 }, { period: 'Q3 2024', demand: 43 }, { period: 'Q4 2024', demand: 43 }, { period: 'Q1 2025', demand: 44 }, { period: 'Q2 2025', demand: 44 }, { period: 'Q3 2025', demand: 45 }, { period: 'Q4 2025', demand: 45 }] },
]

// ============================================================
// JOB ROLES
// ============================================================

export const jobRoles: JobRole[] = [
  { id: 'data-scientist', name: 'Data Scientist', category: 'Data & Analytics', avgSalary: '₹12-28 LPA', totalPostings: 2456, growth: 22.4, topSkills: [{ skillId: 'python', skillName: 'Python', demand: 92 }, { skillId: 'sql', skillName: 'SQL', demand: 84 }, { skillId: 'machine-learning', skillName: 'Machine Learning', demand: 78 }, { skillId: 'statistics', skillName: 'Statistics', demand: 72 }, { skillId: 'pandas', skillName: 'Pandas', demand: 68 }, { skillId: 'deep-learning', skillName: 'Deep Learning', demand: 52 }, { skillId: 'tensorflow', skillName: 'TensorFlow', demand: 45 }] },
  { id: 'data-analyst', name: 'Data Analyst', category: 'Data & Analytics', avgSalary: '₹6-15 LPA', totalPostings: 3124, growth: 15.8, topSkills: [{ skillId: 'sql', skillName: 'SQL', demand: 92 }, { skillId: 'excel', skillName: 'Excel', demand: 85 }, { skillId: 'python', skillName: 'Python', demand: 72 }, { skillId: 'tableau', skillName: 'Tableau', demand: 65 }, { skillId: 'powerbi', skillName: 'Power BI', demand: 60 }, { skillId: 'statistics', skillName: 'Statistics', demand: 55 }] },
  { id: 'ml-engineer', name: 'ML Engineer', category: 'AI & Machine Learning', avgSalary: '₹15-35 LPA', totalPostings: 1845, growth: 38.2, topSkills: [{ skillId: 'python', skillName: 'Python', demand: 95 }, { skillId: 'machine-learning', skillName: 'Machine Learning', demand: 90 }, { skillId: 'pytorch', skillName: 'PyTorch', demand: 72 }, { skillId: 'docker', skillName: 'Docker', demand: 65 }, { skillId: 'aws', skillName: 'AWS', demand: 60 }, { skillId: 'mlops', skillName: 'MLOps', demand: 55 }, { skillId: 'llm', skillName: 'LLMs', demand: 68 }] },
  { id: 'software-developer', name: 'Software Developer', category: 'Engineering', avgSalary: '₹8-25 LPA', totalPostings: 4567, growth: 12.4, topSkills: [{ skillId: 'javascript', skillName: 'JavaScript', demand: 85 }, { skillId: 'python', skillName: 'Python', demand: 72 }, { skillId: 'java', skillName: 'Java', demand: 68 }, { skillId: 'git', skillName: 'Git', demand: 90 }, { skillId: 'sql', skillName: 'SQL', demand: 75 }, { skillId: 'system-design', skillName: 'System Design', demand: 60 }] },
  { id: 'backend-developer', name: 'Backend Developer', category: 'Engineering', avgSalary: '₹10-28 LPA', totalPostings: 3456, growth: 14.6, topSkills: [{ skillId: 'python', skillName: 'Python', demand: 78 }, { skillId: 'java', skillName: 'Java', demand: 72 }, { skillId: 'sql', skillName: 'SQL', demand: 82 }, { skillId: 'rest-api', skillName: 'REST APIs', demand: 85 }, { skillId: 'docker', skillName: 'Docker', demand: 62 }, { skillId: 'microservices', skillName: 'Microservices', demand: 55 }] },
  { id: 'frontend-developer', name: 'Frontend Developer', category: 'Engineering', avgSalary: '₹8-22 LPA', totalPostings: 2890, growth: 10.2, topSkills: [{ skillId: 'react', skillName: 'React', demand: 88 }, { skillId: 'javascript', skillName: 'JavaScript', demand: 92 }, { skillId: 'typescript', skillName: 'TypeScript', demand: 75 }, { skillId: 'html-css', skillName: 'HTML/CSS', demand: 95 }, { skillId: 'nextjs', skillName: 'Next.js', demand: 52 }] },
  { id: 'cloud-engineer', name: 'Cloud Engineer', category: 'Infrastructure', avgSalary: '₹12-30 LPA', totalPostings: 1678, growth: 28.6, topSkills: [{ skillId: 'aws', skillName: 'AWS', demand: 88 }, { skillId: 'docker', skillName: 'Docker', demand: 78 }, { skillId: 'kubernetes', skillName: 'Kubernetes', demand: 72 }, { skillId: 'terraform', skillName: 'Terraform', demand: 65 }, { skillId: 'linux', skillName: 'Linux', demand: 82 }, { skillId: 'ci-cd', skillName: 'CI/CD', demand: 70 }] },
  { id: 'devops-engineer', name: 'DevOps Engineer', category: 'Infrastructure', avgSalary: '₹10-28 LPA', totalPostings: 2134, growth: 24.8, topSkills: [{ skillId: 'docker', skillName: 'Docker', demand: 88 }, { skillId: 'kubernetes', skillName: 'Kubernetes', demand: 78 }, { skillId: 'ci-cd', skillName: 'CI/CD', demand: 85 }, { skillId: 'aws', skillName: 'AWS', demand: 75 }, { skillId: 'terraform', skillName: 'Terraform', demand: 68 }, { skillId: 'linux', skillName: 'Linux', demand: 85 }, { skillId: 'git', skillName: 'Git', demand: 90 }] },
  { id: 'cybersecurity-analyst', name: 'Cybersecurity Analyst', category: 'Security', avgSalary: '₹8-22 LPA', totalPostings: 1234, growth: 20.5, topSkills: [{ skillId: 'cybersecurity', skillName: 'Cybersecurity', demand: 95 }, { skillId: 'linux', skillName: 'Linux', demand: 78 }, { skillId: 'cloud-security', skillName: 'Cloud Security', demand: 65 }, { skillId: 'python', skillName: 'Python', demand: 55 }] },
  { id: 'data-engineer', name: 'Data Engineer', category: 'Data & Analytics', avgSalary: '₹10-25 LPA', totalPostings: 1956, growth: 32.4, topSkills: [{ skillId: 'python', skillName: 'Python', demand: 85 }, { skillId: 'sql', skillName: 'SQL', demand: 90 }, { skillId: 'spark', skillName: 'Apache Spark', demand: 72 }, { skillId: 'kafka', skillName: 'Apache Kafka', demand: 58 }, { skillId: 'airflow', skillName: 'Apache Airflow', demand: 55 }, { skillId: 'aws', skillName: 'AWS', demand: 68 }, { skillId: 'docker', skillName: 'Docker', demand: 62 }] },
]

// ============================================================
// INDUSTRIES
// ============================================================

export const industries: Industry[] = [
  { id: 'technology', name: 'Technology', topSkills: ['python', 'javascript', 'aws', 'react', 'docker'], totalPostings: 4567, growth: 18.4 },
  { id: 'finance', name: 'Finance & Banking', topSkills: ['python', 'sql', 'java', 'aws', 'machine-learning'], totalPostings: 2345, growth: 14.2 },
  { id: 'healthcare', name: 'Healthcare & Pharma', topSkills: ['python', 'machine-learning', 'sql', 'r', 'statistics'], totalPostings: 1234, growth: 22.8 },
  { id: 'ecommerce', name: 'E-commerce', topSkills: ['javascript', 'react', 'nodejs', 'python', 'aws'], totalPostings: 1890, growth: 16.5 },
  { id: 'consulting', name: 'Consulting', topSkills: ['python', 'sql', 'tableau', 'excel', 'powerbi'], totalPostings: 987, growth: 8.4 },
  { id: 'automotive', name: 'Automotive', topSkills: ['python', 'cpp', 'machine-learning', 'computer-vision', 'deep-learning'], totalPostings: 678, growth: 28.6 },
  { id: 'saas', name: 'SaaS', topSkills: ['typescript', 'react', 'nodejs', 'aws', 'docker'], totalPostings: 2456, growth: 24.2 },
  { id: 'government', name: 'Government', topSkills: ['cybersecurity', 'java', 'sql', 'networking', 'linux'], totalPostings: 456, growth: 12.1 },
]

// ============================================================
// LOCATIONS
// ============================================================

export const locations: Location[] = [
  { id: 'bangalore', name: 'Bangalore', country: 'India', totalPostings: 4567, topSkills: ['python', 'java', 'aws', 'react', 'machine-learning'] },
  { id: 'hyderabad', name: 'Hyderabad', country: 'India', totalPostings: 2890, topSkills: ['python', 'java', 'aws', 'sql', 'machine-learning'] },
  { id: 'pune', name: 'Pune', country: 'India', totalPostings: 2345, topSkills: ['python', 'java', 'javascript', 'docker', 'sql'] },
  { id: 'mumbai', name: 'Mumbai', country: 'India', totalPostings: 1890, topSkills: ['python', 'java', 'sql', 'aws', 'javascript'] },
  { id: 'delhi-ncr', name: 'Delhi NCR', country: 'India', totalPostings: 2134, topSkills: ['python', 'java', 'javascript', 'aws', 'react'] },
  { id: 'chennai', name: 'Chennai', country: 'India', totalPostings: 1567, topSkills: ['python', 'java', 'sql', 'javascript', 'linux'] },
  { id: 'remote', name: 'Remote', country: 'Global', totalPostings: 3456, topSkills: ['python', 'javascript', 'react', 'aws', 'docker'] },
]

// ============================================================
// DATA SOURCES
// ============================================================

export const dataSources: DataSource[] = [
  { id: 'ds-1', name: 'Public Job Postings Dataset (India)', type: 'Public Dataset', records: 8234, collectionPeriod: 'Jan 2025 – Aug 2026', lastUpdated: 'September 2026', status: 'active', description: 'Aggregated public job posting data from permitted career platforms and government job portals across India.' },
  { id: 'ds-2', name: 'Employer Career Pages (Permitted)', type: 'Public Web Data', records: 2856, collectionPeriod: 'Mar 2025 – Sep 2026', lastUpdated: 'September 2026', status: 'active', description: 'Job descriptions from publicly accessible employer career pages that permit automated access.' },
  { id: 'ds-3', name: 'Government Skill Development Data', type: 'Government Open Data', records: 1360, collectionPeriod: 'Jan 2024 – Jun 2026', lastUpdated: 'July 2026', status: 'active', description: 'Public data from NSDC and government skill development programs.' },
  { id: 'ds-4', name: 'Curriculum Uploads (User Submitted)', type: 'User Uploaded', records: 48, collectionPeriod: 'Jun 2026 – Sep 2026', lastUpdated: 'September 2026', status: 'active', description: 'PDF curricula uploaded by colleges and students for gap analysis.' },
]

// ============================================================
// TAXONOMY
// ============================================================

export const taxonomyTree: TaxonomyNode[] = [
  {
    id: 'cs', name: 'Computer Science', skillCount: 85, children: [
      {
        id: 'programming', name: 'Programming', skillCount: 14, children: [
          { id: 'python-t', name: 'Python', skillCount: 1, children: [], aliases: ['Python3', 'CPython'] },
          { id: 'javascript-t', name: 'JavaScript', skillCount: 1, children: [], aliases: ['JS', 'ECMAScript'] },
          { id: 'typescript-t', name: 'TypeScript', skillCount: 1, children: [], aliases: ['TS'] },
          { id: 'java-t', name: 'Java', skillCount: 1, children: [], aliases: ['Java SE', 'Java EE'] },
          { id: 'cpp-t', name: 'C++', skillCount: 1, children: [], aliases: ['CPP'] },
          { id: 'go-t', name: 'Go', skillCount: 1, children: [], aliases: ['Golang'] },
          { id: 'rust-t', name: 'Rust', skillCount: 1, children: [] },
          { id: 'kotlin-t', name: 'Kotlin', skillCount: 1, children: [] },
          { id: 'csharp-t', name: 'C#', skillCount: 1, children: [], aliases: ['CSharp'] },
          { id: 'r-t', name: 'R', skillCount: 1, children: [] },
        ]
      },
      {
        id: 'data-science', name: 'Data Science', skillCount: 10, children: [
          { id: 'statistics-t', name: 'Statistics', skillCount: 1, children: [] },
          { id: 'data-analysis-t', name: 'Data Analysis', skillCount: 1, children: [] },
          {
            id: 'ml-t', name: 'Machine Learning', skillCount: 5, children: [
              { id: 'regression-t', name: 'Regression', skillCount: 1, children: [] },
              { id: 'classification-t', name: 'Classification', skillCount: 1, children: [] },
              { id: 'clustering-t', name: 'Clustering', skillCount: 1, children: [] },
              { id: 'dim-reduction-t', name: 'Dimensionality Reduction', skillCount: 1, children: [] },
            ]
          },
          {
            id: 'dl-t', name: 'Deep Learning', skillCount: 3, children: [
              { id: 'cnn-t', name: 'CNNs', skillCount: 1, children: [] },
              { id: 'rnn-t', name: 'RNNs', skillCount: 1, children: [] },
              { id: 'transformers-t', name: 'Transformers', skillCount: 1, children: [] },
            ]
          },
          { id: 'nlp-t', name: 'NLP', skillCount: 1, children: [] },
          { id: 'cv-t', name: 'Computer Vision', skillCount: 1, children: [] },
        ]
      },
      {
        id: 'cloud', name: 'Cloud Computing', skillCount: 6, children: [
          { id: 'aws-t', name: 'AWS', skillCount: 1, children: [], aliases: ['Amazon Web Services'] },
          { id: 'azure-t', name: 'Azure', skillCount: 1, children: [], aliases: ['Microsoft Azure'] },
          { id: 'gcp-t', name: 'GCP', skillCount: 1, children: [], aliases: ['Google Cloud Platform'] },
        ]
      },
      {
        id: 'devops', name: 'DevOps', skillCount: 8, children: [
          { id: 'docker-t', name: 'Docker', skillCount: 1, children: [] },
          { id: 'kubernetes-t', name: 'Kubernetes', skillCount: 1, children: [], aliases: ['K8s'] },
          { id: 'cicd-t', name: 'CI/CD', skillCount: 1, children: [] },
          { id: 'terraform-t', name: 'Terraform', skillCount: 1, children: [] },
        ]
      },
      {
        id: 'databases', name: 'Databases', skillCount: 6, children: [
          { id: 'sql-t', name: 'SQL', skillCount: 1, children: [] },
          { id: 'postgresql-t', name: 'PostgreSQL', skillCount: 1, children: [] },
          { id: 'mongodb-t', name: 'MongoDB', skillCount: 1, children: [] },
          { id: 'redis-t', name: 'Redis', skillCount: 1, children: [] },
        ]
      },
      {
        id: 'web-dev', name: 'Web Development', skillCount: 10, children: [
          { id: 'react-t', name: 'React', skillCount: 1, children: [] },
          { id: 'nodejs-t', name: 'Node.js', skillCount: 1, children: [] },
          { id: 'nextjs-t', name: 'Next.js', skillCount: 1, children: [] },
          { id: 'rest-t', name: 'REST APIs', skillCount: 1, children: [] },
        ]
      },
    ]
  },
]

// ============================================================
// SAMPLE CURRICULUM ANALYSIS
// ============================================================

export const sampleCurriculumAnalysis: CurriculumAnalysis = {
  id: 'ca-1',
  name: 'B.Tech Computer Science & Data Science',
  institution: 'National Institute of Technology',
  uploadDate: '2026-09-15',
  subjectsDetected: 24,
  skillsDetected: 38,
  industryMatched: 24,
  gapCount: 14,
  alignmentScore: 63,
  subjects: [
    { name: 'Programming Fundamentals', topics: ['Variables', 'Control Flow', 'Functions', 'OOP'], detectedSkills: ['Python', 'C++', 'Java'] },
    { name: 'Data Structures & Algorithms', topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting'], detectedSkills: ['Algorithms', 'Data Structures'] },
    { name: 'Machine Learning', topics: ['Regression', 'Classification', 'Clustering', 'Dimensionality Reduction', 'Model Evaluation'], detectedSkills: ['Machine Learning', 'Python', 'Statistics', 'Regression', 'Classification', 'Clustering'] },
    { name: 'Database Management', topics: ['SQL', 'Normalization', 'Transactions', 'Query Optimization', 'ER Modeling'], detectedSkills: ['SQL', 'Database Design'] },
    { name: 'Web Development', topics: ['HTML', 'CSS', 'JavaScript', 'React Basics', 'HTTP'], detectedSkills: ['HTML/CSS', 'JavaScript', 'React'] },
    { name: 'Statistics & Probability', topics: ['Descriptive Statistics', 'Probability Theory', 'Hypothesis Testing', 'Distributions'], detectedSkills: ['Statistics'] },
    { name: 'Computer Networks', topics: ['TCP/IP', 'OSI Model', 'Routing', 'DNS', 'HTTP'], detectedSkills: ['Networking'] },
    { name: 'Operating Systems', topics: ['Process Management', 'Memory Management', 'File Systems', 'Linux Basics'], detectedSkills: ['Linux'] },
    { name: 'Software Engineering', topics: ['SDLC', 'Agile', 'UML', 'Testing Basics'], detectedSkills: ['Agile', 'Testing/QA'] },
    { name: 'Deep Learning (Elective)', topics: ['Neural Networks', 'CNNs', 'RNNs', 'Backpropagation'], detectedSkills: ['Deep Learning', 'PyTorch'] },
    { name: 'Data Visualization', topics: ['Matplotlib', 'Seaborn', 'Charts', 'Dashboards'], detectedSkills: ['Data Visualization', 'Pandas'] },
    { name: 'Cloud Computing (Intro)', topics: ['Cloud Concepts', 'Virtualization', 'AWS Basics'], detectedSkills: ['Cloud Architecture'] },
  ],
  coveredSkills: [
    { skillId: 'python', skillName: 'Python', category: 'Programming', industryDemand: 82, coverage: 'covered' },
    { skillId: 'sql', skillName: 'SQL', category: 'Data Science', industryDemand: 76, coverage: 'covered' },
    { skillId: 'machine-learning', skillName: 'Machine Learning', category: 'AI / Machine Learning', industryDemand: 64, coverage: 'covered' },
    { skillId: 'statistics', skillName: 'Statistics', category: 'Data Science', industryDemand: 58, coverage: 'covered' },
    { skillId: 'javascript', skillName: 'JavaScript', category: 'Programming', industryDemand: 78, coverage: 'covered' },
    { skillId: 'java', skillName: 'Java', category: 'Programming', industryDemand: 72, coverage: 'covered' },
    { skillId: 'html-css', skillName: 'HTML/CSS', category: 'Web Development', industryDemand: 62, coverage: 'covered' },
    { skillId: 'linux', skillName: 'Linux', category: 'DevOps', industryDemand: 58, coverage: 'covered' },
    { skillId: 'git', skillName: 'Git', category: 'DevOps', industryDemand: 72, coverage: 'covered' },
    { skillId: 'deep-learning', skillName: 'Deep Learning', category: 'AI / Machine Learning', industryDemand: 52, coverage: 'covered' },
    { skillId: 'data-visualization', skillName: 'Data Visualization', category: 'Data Science', industryDemand: 44, coverage: 'covered' },
    { skillId: 'pandas', skillName: 'Pandas', category: 'Data Science', industryDemand: 53, coverage: 'covered' },
    { skillId: 'agile', skillName: 'Agile', category: 'Software Engineering', industryDemand: 50, coverage: 'covered' },
    { skillId: 'cpp', skillName: 'C++', category: 'Programming', industryDemand: 45, coverage: 'covered' },
  ],
  partialSkills: [
    { skillId: 'cloud-architecture', skillName: 'Cloud Architecture', category: 'Cloud Computing', industryDemand: 44, coverage: 'partial', coverageDetail: 'Basic cloud concepts covered, no hands-on AWS/Azure labs' },
    { skillId: 'react', skillName: 'React', category: 'Web Development', industryDemand: 68, coverage: 'partial', coverageDetail: 'React basics introduced in Web Dev course, no advanced patterns' },
    { skillId: 'testing', skillName: 'Testing/QA', category: 'Software Engineering', industryDemand: 45, coverage: 'partial', coverageDetail: 'Basic testing concepts in SE course, no test automation' },
    { skillId: 'rest-api', skillName: 'REST APIs', category: 'Web Development', industryDemand: 60, coverage: 'partial', coverageDetail: 'HTTP concepts covered, no hands-on API development' },
    { skillId: 'nodejs', skillName: 'Node.js', category: 'Web Development', industryDemand: 58, coverage: 'partial', coverageDetail: 'Mentioned in web dev but not covered in depth' },
  ],
  missingSkills: [
    { skillId: 'aws', skillName: 'AWS', category: 'Cloud Computing', industryDemand: 62, coverage: 'missing', gap: 'high' },
    { skillId: 'docker', skillName: 'Docker', category: 'DevOps', industryDemand: 55, coverage: 'missing', gap: 'high' },
    { skillId: 'kubernetes', skillName: 'Kubernetes', category: 'DevOps', industryDemand: 48, coverage: 'missing', gap: 'high' },
    { skillId: 'typescript', skillName: 'TypeScript', category: 'Programming', industryDemand: 68, coverage: 'missing', gap: 'high' },
    { skillId: 'ci-cd', skillName: 'CI/CD', category: 'DevOps', industryDemand: 52, coverage: 'missing', gap: 'high' },
    { skillId: 'spark', skillName: 'Apache Spark', category: 'Data Engineering', industryDemand: 42, coverage: 'missing', gap: 'medium' },
    { skillId: 'terraform', skillName: 'Terraform', category: 'DevOps', industryDemand: 42, coverage: 'missing', gap: 'medium' },
    { skillId: 'mlops', skillName: 'MLOps', category: 'AI / Machine Learning', industryDemand: 34, coverage: 'missing', gap: 'medium' },
    { skillId: 'kafka', skillName: 'Apache Kafka', category: 'Data Engineering', industryDemand: 38, coverage: 'missing', gap: 'medium' },
    { skillId: 'llm', skillName: 'Large Language Models', category: 'AI / Machine Learning', industryDemand: 56, coverage: 'missing', gap: 'high' },
    { skillId: 'mongodb', skillName: 'MongoDB', category: 'Databases', industryDemand: 38, coverage: 'missing', gap: 'medium' },
    { skillId: 'redis', skillName: 'Redis', category: 'Databases', industryDemand: 34, coverage: 'missing', gap: 'low' },
    { skillId: 'graphql', skillName: 'GraphQL', category: 'Web Development', industryDemand: 28, coverage: 'missing', gap: 'low' },
    { skillId: 'prompt-engineering', skillName: 'Prompt Engineering', category: 'AI / Machine Learning', industryDemand: 38, coverage: 'missing', gap: 'medium' },
  ],
  recommendations: [],
}

// Populate recommendations from missing skills
sampleCurriculumAnalysis.recommendations = [
  { skillName: 'AWS', category: 'Cloud Computing', priority: 'high', industryDemand: 62, estimatedHours: 40, relatedSkills: ['Azure', 'GCP', 'Terraform', 'Docker'], learningPath: ['Cloud computing fundamentals', 'AWS Core Services (EC2, S3, IAM)', 'Networking & VPC', 'Lambda & Serverless', 'Deployment & CI/CD on AWS', 'AWS Certification Prep'] },
  { skillName: 'Docker', category: 'DevOps', priority: 'high', industryDemand: 55, estimatedHours: 25, relatedSkills: ['Kubernetes', 'CI/CD', 'Linux'], learningPath: ['Container fundamentals', 'Docker images & Dockerfiles', 'Docker Compose', 'Container networking & volumes', 'Multi-stage builds', 'Deploying applications with Docker'] },
  { skillName: 'TypeScript', category: 'Programming', priority: 'high', industryDemand: 68, estimatedHours: 20, relatedSkills: ['JavaScript', 'React', 'Next.js'], learningPath: ['Type system fundamentals', 'Interfaces & generics', 'Advanced types & utility types', 'TypeScript with React', 'TypeScript with Node.js'] },
  { skillName: 'Large Language Models', category: 'AI / Machine Learning', priority: 'high', industryDemand: 56, estimatedHours: 35, relatedSkills: ['NLP', 'Prompt Engineering', 'RAG'], learningPath: ['Transformer architecture', 'Pre-training & fine-tuning', 'Prompt engineering techniques', 'RAG (Retrieval Augmented Generation)', 'LangChain & orchestration', 'Deploying LLM applications'] },
  { skillName: 'Kubernetes', category: 'DevOps', priority: 'high', industryDemand: 48, estimatedHours: 35, relatedSkills: ['Docker', 'Helm', 'CI/CD'], learningPath: ['Container orchestration concepts', 'Pods, Services & Deployments', 'Networking & Ingress', 'ConfigMaps & Secrets', 'Helm charts', 'Cluster management & monitoring'] },
  { skillName: 'CI/CD', category: 'DevOps', priority: 'high', industryDemand: 52, estimatedHours: 20, relatedSkills: ['Git', 'Docker', 'GitHub Actions'], learningPath: ['CI/CD principles', 'GitHub Actions workflows', 'Automated testing pipelines', 'Containerized deployments', 'Release strategies (blue-green, canary)'] },
  { skillName: 'Apache Spark', category: 'Data Engineering', priority: 'medium', industryDemand: 42, estimatedHours: 30, relatedSkills: ['Python', 'SQL', 'Hadoop'], learningPath: ['Big data fundamentals', 'Spark architecture (RDDs, DataFrames)', 'PySpark programming', 'Spark SQL', 'Spark Streaming', 'Performance optimization'] },
  { skillName: 'MLOps', category: 'AI / Machine Learning', priority: 'medium', industryDemand: 34, estimatedHours: 30, relatedSkills: ['Docker', 'Kubernetes', 'MLflow'], learningPath: ['ML lifecycle management', 'Experiment tracking (MLflow)', 'Model versioning & registry', 'Model serving & deployment', 'Monitoring & drift detection', 'CI/CD for ML pipelines'] },
  { skillName: 'Prompt Engineering', category: 'AI / Machine Learning', priority: 'medium', industryDemand: 38, estimatedHours: 15, relatedSkills: ['LLM', 'NLP', 'AI'], learningPath: ['Understanding LLM capabilities', 'Prompt design principles', 'Few-shot & chain-of-thought', 'Structured output techniques', 'Evaluation & iteration'] },
]

// ============================================================
// DASHBOARD KPI DATA
// ============================================================

export const dashboardKPIs = {
  totalJobPostings: 12450,
  totalJobPostingsGrowth: 18.4,
  skillsTracked: 842,
  newSkillsThisMonth: 67,
  skillGaps: 27,
  highPriorityGaps: 8,
  avgDemandGrowth: 14.8,
}

// ============================================================
// DEMAND TREND DATA
// ============================================================

export const demandTrendData = [
  { period: 'Q1 2024', Python: 72, JavaScript: 74, AWS: 53, 'Machine Learning': 50, Docker: 46, TypeScript: 52 },
  { period: 'Q2 2024', Python: 74, JavaScript: 75, AWS: 55, 'Machine Learning': 53, Docker: 48, TypeScript: 55 },
  { period: 'Q3 2024', Python: 76, JavaScript: 76, AWS: 56, 'Machine Learning': 55, Docker: 49, TypeScript: 58 },
  { period: 'Q4 2024', Python: 78, JavaScript: 76, AWS: 58, 'Machine Learning': 57, Docker: 50, TypeScript: 60 },
  { period: 'Q1 2025', Python: 79, JavaScript: 77, AWS: 59, 'Machine Learning': 59, Docker: 52, TypeScript: 63 },
  { period: 'Q2 2025', Python: 80, JavaScript: 77, AWS: 60, 'Machine Learning': 61, Docker: 53, TypeScript: 65 },
  { period: 'Q3 2025', Python: 81, JavaScript: 78, AWS: 61, 'Machine Learning': 63, Docker: 54, TypeScript: 67 },
  { period: 'Q4 2025', Python: 82, JavaScript: 78, AWS: 62, 'Machine Learning': 64, Docker: 55, TypeScript: 68 },
]

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function getSkillById(id: string): Skill | undefined {
  return skills.find(s => s.id === id)
}

export function getSkillsByCategory(category: string): Skill[] {
  return skills.filter(s => s.category === category)
}

export function getTopSkills(count: number = 10): Skill[] {
  return [...skills].sort((a, b) => b.demand - a.demand).slice(0, count)
}

export function getFastestGrowingSkills(count: number = 10): Skill[] {
  return [...skills].sort((a, b) => b.growth - a.growth).slice(0, count)
}

export function getDecliningSkills(): Skill[] {
  return skills.filter(s => s.growth < 0).sort((a, b) => a.growth - b.growth)
}

export function getEmergingSkills(count: number = 10): Skill[] {
  return [...skills].filter(s => s.growth > 30).sort((a, b) => b.growth - a.growth).slice(0, count)
}

export function searchSkills(query: string): Skill[] {
  const q = query.toLowerCase()
  return skills.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.aliases.some(a => a.toLowerCase().includes(q)) ||
    s.category.toLowerCase().includes(q)
  )
}

export const allCategories: string[] = [
  'Programming', 'Data Science', 'AI / Machine Learning', 'Cloud Computing',
  'DevOps', 'Databases', 'Web Development', 'Cybersecurity',
  'Data Engineering', 'Software Engineering', 'Tools & Platforms'
]
