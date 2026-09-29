// ---- Core Skill Types ----

export type SkillCategory =
  | 'Programming'
  | 'Data Science'
  | 'AI / Machine Learning'
  | 'Cloud Computing'
  | 'DevOps'
  | 'Databases'
  | 'Web Development'
  | 'Cybersecurity'
  | 'Networking'
  | 'Data Engineering'
  | 'Software Engineering'
  | 'Tools & Platforms'

export type CoverageStatus = 'covered' | 'partial' | 'missing'

export type GapSeverity = 'high' | 'medium' | 'low'

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  demand: number // percentage 0-100
  growth: number // percentage change
  jobCount: number
  aliases: string[]
  relatedSkills: string[]
  pairedSkills: string[]
  roles: string[]
  industries: string[]
  description: string
  trendData: TrendPoint[]
  parentSkill?: string
  childSkills?: string[]
}

export interface TrendPoint {
  period: string
  demand: number
}

// ---- Job Market Types ----

export interface JobRole {
  id: string
  name: string
  category: string
  avgSalary: string
  topSkills: RoleSkill[]
  totalPostings: number
  growth: number
}

export interface RoleSkill {
  skillId: string
  skillName: string
  demand: number
}

export interface Industry {
  id: string
  name: string
  topSkills: string[]
  totalPostings: number
  growth: number
}

export interface Location {
  id: string
  name: string
  country: string
  totalPostings: number
  topSkills: string[]
}

// ---- Curriculum Types ----

export interface CurriculumAnalysis {
  id: string
  name: string
  institution: string
  uploadDate: string
  subjectsDetected: number
  skillsDetected: number
  industryMatched: number
  gapCount: number
  alignmentScore: number
  subjects: CurriculumSubject[]
  coveredSkills: CurriculumSkill[]
  partialSkills: CurriculumSkill[]
  missingSkills: CurriculumSkill[]
  recommendations: Recommendation[]
}

export interface CurriculumSubject {
  name: string
  topics: string[]
  detectedSkills: string[]
}

export interface CurriculumSkill {
  skillId: string
  skillName: string
  category: SkillCategory
  industryDemand: number
  coverage: CoverageStatus
  coverageDetail?: string
  gap?: GapSeverity
}

// ---- Gap & Recommendation Types ----

export interface SkillGap {
  skillId: string
  skillName: string
  category: SkillCategory
  industryDemand: number
  coverage: CoverageStatus
  severity: GapSeverity
  relatedSkills: string[]
  suggestedTopics: string[]
}

export interface Recommendation {
  skillName: string
  category: SkillCategory
  priority: GapSeverity
  industryDemand: number
  learningPath: string[]
  estimatedHours: number
  relatedSkills: string[]
}

// ---- Dataset Types ----

export interface DataSource {
  id: string
  name: string
  type: string
  records: number
  collectionPeriod: string
  lastUpdated: string
  status: 'active' | 'processing' | 'archived'
  description: string
}

// ---- Taxonomy Types ----

export interface TaxonomyNode {
  id: string
  name: string
  children: TaxonomyNode[]
  skillCount: number
  aliases?: string[]
}

// ---- Dashboard Types ----

export interface KPICard {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: string
  description?: string
}
