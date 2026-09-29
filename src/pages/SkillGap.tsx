import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, AlertCircle, Info, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { sampleCurriculumAnalysis, getSkillById } from '@/data/seedData'
import SkillBadge from '@/components/ui/SkillBadge'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

export default function SkillGapPage() {
  const navigate = useNavigate()
  const analysis = sampleCurriculumAnalysis
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)

  const highPriority = analysis.missingSkills.filter(s => s.gap === 'high')
  const mediumPriority = analysis.missingSkills.filter(s => s.gap === 'medium')
  const lowPriority = analysis.missingSkills.filter(s => s.gap === 'low')

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold tracking-tight">Skill Gap Analysis</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Based on: <span className="font-medium text-foreground">{analysis.name}</span> — {analysis.institution}
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <p className="text-xs font-medium text-red-400">High Priority</p>
          </div>
          <p className="text-2xl font-bold text-red-400">{highPriority.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Missing critical skills</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="h-4 w-4 text-amber-400" />
            <p className="text-xs font-medium text-amber-400">Medium Priority</p>
          </div>
          <p className="text-2xl font-bold text-amber-400">{mediumPriority.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Growing industry need</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Info className="h-4 w-4 text-blue-400" />
            <p className="text-xs font-medium text-blue-400">Low Priority</p>
          </div>
          <p className="text-2xl font-bold text-blue-400">{lowPriority.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Nice to have</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="h-4 w-4 text-amber-400" />
            <p className="text-xs font-medium text-amber-400">Partially Covered</p>
          </div>
          <p className="text-2xl font-bold text-amber-400">{analysis.partialSkills.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Need deeper coverage</p>
        </motion.div>
      </div>

      {/* High Priority Gaps */}
      <GapSection
        title="High Priority Gaps"
        description="These skills have significant industry demand but are completely absent from the curriculum."
        icon={<AlertTriangle className="h-4 w-4 text-red-400" />}
        borderColor="border-red-500/20"
        skills={highPriority}
        expandedSkill={expandedSkill}
        onToggle={(id) => setExpandedSkill(expandedSkill === id ? null : id)}
      />

      {/* Medium Priority Gaps */}
      <GapSection
        title="Medium Priority Gaps"
        description="Growing industry demand. Consider adding these to stay competitive."
        icon={<AlertCircle className="h-4 w-4 text-amber-400" />}
        borderColor="border-amber-500/20"
        skills={mediumPriority}
        expandedSkill={expandedSkill}
        onToggle={(id) => setExpandedSkill(expandedSkill === id ? null : id)}
      />

      {/* Low Priority */}
      <GapSection
        title="Low Priority Gaps"
        description="Nice-to-have skills with moderate industry demand."
        icon={<Info className="h-4 w-4 text-blue-400" />}
        borderColor="border-blue-500/20"
        skills={lowPriority}
        expandedSkill={expandedSkill}
        onToggle={(id) => setExpandedSkill(expandedSkill === id ? null : id)}
      />

      {/* Partial Coverage */}
      <div className="rounded-xl border border-amber-500/20 bg-card/60 overflow-hidden">
        <div className="px-6 py-4 border-b border-border/50 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-400" />
          <h2 className="text-base font-semibold">Partially Covered Skills</h2>
        </div>
        <div className="divide-y divide-border/20">
          {analysis.partialSkills.map((skill) => (
            <div key={skill.skillId} className="px-6 py-4 hover:bg-muted/10 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{skill.skillName}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{skill.coverageDetail}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium">{skill.industryDemand}% demand</span>
                  <SkillBadge status="partial" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate('/recommendations')}
          className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          View Recommendations
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => navigate('/curriculum')}
          className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/60 px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
        >
          Analyze Another Curriculum
        </button>
      </div>
    </div>
  )
}

interface GapSectionProps {
  title: string
  description: string
  icon: React.ReactNode
  borderColor: string
  skills: typeof sampleCurriculumAnalysis.missingSkills
  expandedSkill: string | null
  onToggle: (id: string) => void
}

function GapSection({ title, description, icon, borderColor, skills, expandedSkill, onToggle }: GapSectionProps) {
  if (skills.length === 0) return null

  return (
    <div className={cn('rounded-xl border bg-card/60 overflow-hidden', borderColor)}>
      <div className="px-6 py-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-base font-semibold">{title}</h2>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">{skills.length}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="divide-y divide-border/20">
        {skills.map((skill) => {
          const fullSkill = getSkillById(skill.skillId)
          const isExpanded = expandedSkill === skill.skillId
          return (
            <div key={skill.skillId}>
              <button
                onClick={() => onToggle(skill.skillId)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/10 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm font-medium">{skill.skillName}</p>
                    <p className="text-xs text-muted-foreground">{skill.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{skill.industryDemand}%</p>
                    <p className="text-xs text-muted-foreground">demand</p>
                  </div>
                  <SkillBadge status="missing" />
                  {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </div>
              </button>
              {isExpanded && fullSkill && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-4"
                >
                  <div className="rounded-lg bg-muted/20 p-4 space-y-3">
                    <p className="text-sm text-muted-foreground">{fullSkill.description}</p>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Related Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {fullSkill.pairedSkills.map(s => (
                          <span key={s} className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[11px] font-medium">
                            {getSkillById(s)?.name || s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Relevant Roles</p>
                      <div className="flex flex-wrap gap-1.5">
                        {fullSkill.roles.map(r => (
                          <span key={r} className="rounded-full border border-border/50 bg-card/60 px-2 py-0.5 text-[11px]">{r}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
