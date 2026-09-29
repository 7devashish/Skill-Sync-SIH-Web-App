import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Brain, AlertTriangle, TrendingUp, ArrowRight, Zap, Target, BookOpen } from 'lucide-react'
import KPICard from '@/components/ui/KPICard'
import SkillCard from '@/components/ui/SkillCard'
import Modal from '@/components/ui/Modal'
import DemandTrendChart from '@/components/charts/DemandTrendChart'
import SkillBarChart from '@/components/charts/SkillBarChart'
import { dashboardKPIs, getTopSkills, getFastestGrowingSkills, demandTrendData, sampleCurriculumAnalysis, getSkillById } from '@/data/seedData'
import type { Skill } from '@/types'
import { useNavigate } from 'react-router-dom'
import SkillBadge from '@/components/ui/SkillBadge'

const trendLines = [
  { key: 'Python', color: '#3b82f6', name: 'Python' },
  { key: 'JavaScript', color: '#f59e0b', name: 'JavaScript' },
  { key: 'AWS', color: '#f97316', name: 'AWS' },
  { key: 'Machine Learning', color: '#8b5cf6', name: 'ML' },
  { key: 'Docker', color: '#06b6d4', name: 'Docker' },
  { key: 'TypeScript', color: '#10b981', name: 'TypeScript' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const topSkills = getTopSkills(10)
  const growingSkills = getFastestGrowingSkills(8)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

  const topSkillsBarData = topSkills.slice(0, 8).map(s => ({ name: s.name, value: s.demand }))

  const gapHighlight = sampleCurriculumAnalysis.missingSkills
    .filter(s => s.gap === 'high')
    .slice(0, 4)

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 via-card/80 to-card/60 p-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-xs font-medium text-primary uppercase tracking-wider">Industry Intelligence</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Good evening, <span className="gradient-text">User</span>
          </h1>
          <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
            Understand what the market demands. Identify what your curriculum is missing.
            Bridge the skill gap between education and industry.
          </p>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => navigate('/curriculum')}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              Analyze Curriculum
            </button>
            <button
              onClick={() => navigate('/skills')}
              className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/60 px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
            >
              <Target className="h-4 w-4" />
              Explore Skills
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Job Postings Analyzed"
          value={dashboardKPIs.totalJobPostings.toLocaleString()}
          change={`+${dashboardKPIs.totalJobPostingsGrowth}%`}
          changeType="positive"
          icon={<Briefcase className="h-5 w-5" />}
          description="From public datasets"
          delay={0.1}
          onClick={() => navigate('/datasets')}
        />
        <KPICard
          title="Skills Tracked"
          value={dashboardKPIs.skillsTracked.toLocaleString()}
          change={`+${dashboardKPIs.newSkillsThisMonth} this month`}
          changeType="positive"
          icon={<Brain className="h-5 w-5" />}
          delay={0.15}
          onClick={() => navigate('/skills')}
        />
        <KPICard
          title="Skill Gaps Detected"
          value={dashboardKPIs.skillGaps}
          change={`${dashboardKPIs.highPriorityGaps} high priority`}
          changeType="negative"
          icon={<AlertTriangle className="h-5 w-5" />}
          delay={0.2}
          onClick={() => navigate('/gap')}
        />
        <KPICard
          title="Avg. Demand Growth"
          value={`+${dashboardKPIs.avgDemandGrowth}%`}
          change="Year over year"
          changeType="positive"
          icon={<TrendingUp className="h-5 w-5" />}
          delay={0.25}
          onClick={() => navigate('/trends')}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemandTrendChart
          data={demandTrendData}
          lines={trendLines}
          title="Industry Demand Trends"
          height={280}
        />
        <SkillBarChart
          data={topSkillsBarData}
          title="Top Skills by Demand"
          height={280}
          layout="vertical"
        />
      </div>

      {/* Top Skills + Gap Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fastest Growing Skills */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Fastest Growing Skills</h2>
            <button
              onClick={() => navigate('/skills')}
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {growingSkills.slice(0, 6).map((skill, i) => (
              <SkillCard
                key={skill.id}
                name={skill.name}
                demand={skill.demand}
                growth={skill.growth}
                category={skill.category}
                jobCount={skill.jobCount}
                delay={0.05 * i}
                compact
                onClick={() => setSelectedSkill(skill)}
              />
            ))}
          </div>
        </div>

        {/* Gap Overview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Critical Skill Gaps</h2>
            <button
              onClick={() => navigate('/gap')}
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              Full report <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm p-4 space-y-3"
          >
            <p className="text-xs text-muted-foreground mb-3">
              Based on latest curriculum analysis
            </p>
            {gapHighlight.map((skill) => (
              <div key={skill.skillId} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                <div>
                  <p className="text-sm font-medium">{skill.skillName}</p>
                  <p className="text-xs text-muted-foreground">{skill.category}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium">{skill.industryDemand}%</span>
                  <SkillBadge status="missing" />
                </div>
              </div>
            ))}
            <button
              onClick={() => navigate('/curriculum')}
              className="w-full mt-2 rounded-lg border border-border/50 bg-muted/30 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              Analyze Your Curriculum
            </button>
          </motion.div>
        </div>
      </div>

      {/* Skill Detail Modal */}
      <Modal
        open={!!selectedSkill}
        onClose={() => setSelectedSkill(null)}
        title={selectedSkill?.name || ''}
        size="lg"
      >
        {selectedSkill && <SkillDetailContent skill={selectedSkill} />}
      </Modal>
    </div>
  )
}

function SkillDetailContent({ skill }: { skill: Skill }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-lg bg-muted/30 p-3 text-center">
          <p className="text-xs text-muted-foreground">Demand</p>
          <p className="text-xl font-bold text-primary">{skill.demand}%</p>
        </div>
        <div className="rounded-lg bg-muted/30 p-3 text-center">
          <p className="text-xs text-muted-foreground">Job Postings</p>
          <p className="text-xl font-bold">{skill.jobCount.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-muted/30 p-3 text-center">
          <p className="text-xs text-muted-foreground">Growth</p>
          <p className={`text-xl font-bold ${skill.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {skill.growth > 0 ? '+' : ''}{skill.growth}%
          </p>
        </div>
        <div className="rounded-lg bg-muted/30 p-3 text-center">
          <p className="text-xs text-muted-foreground">Category</p>
          <p className="text-sm font-medium mt-1">{skill.category}</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">{skill.description}</p>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2">Commonly Paired With</h4>
        <div className="flex flex-wrap gap-2">
          {skill.pairedSkills.map(id => {
            const s = getSkillById(id)
            return (
              <span key={id} className="rounded-full border border-border/50 bg-muted/30 px-3 py-1 text-xs font-medium">
                {s?.name || id}
              </span>
            )
          })}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2">Common Roles</h4>
        <div className="flex flex-wrap gap-2">
          {skill.roles.map(role => (
            <span key={role} className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              {role}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2">Industries</h4>
        <div className="flex flex-wrap gap-2">
          {skill.industries.map(ind => (
            <span key={ind} className="rounded-full border border-border/50 bg-muted/30 px-3 py-1 text-xs font-medium">
              {ind}
            </span>
          ))}
        </div>
      </div>

      {skill.aliases.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-2">Also Known As</h4>
          <div className="flex flex-wrap gap-2">
            {skill.aliases.map(a => (
              <span key={a} className="rounded-full bg-muted/30 px-3 py-1 text-xs text-muted-foreground">
                {a}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
