import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Clock, BookOpen, ChevronDown, ChevronUp, ArrowRight, CheckCircle2 } from 'lucide-react'
import { sampleCurriculumAnalysis } from '@/data/seedData'
import { cn } from '@/lib/utils'

export default function RecommendationsPage() {
  const recommendations = sampleCurriculumAnalysis.recommendations
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0)

  const highPriority = recommendations.filter(r => r.priority === 'high')
  const mediumPriority = recommendations.filter(r => r.priority === 'medium')

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold tracking-tight">Recommendations</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Personalized learning paths to bridge the skill gaps identified in your curriculum
        </p>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="rounded-xl border border-border/50 bg-card/60 p-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xl font-bold">{recommendations.length}</p>
            <p className="text-xs text-muted-foreground">Learning Paths</p>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-xl border border-border/50 bg-card/60 p-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
            <Clock className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <p className="text-xl font-bold">{recommendations.reduce((a, r) => a + r.estimatedHours, 0)}h</p>
            <p className="text-xs text-muted-foreground">Total Est. Learning</p>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-xl border border-border/50 bg-card/60 p-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
            <BookOpen className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <p className="text-xl font-bold">{highPriority.length}</p>
            <p className="text-xs text-muted-foreground">High Priority</p>
          </div>
        </motion.div>
      </div>

      {/* High Priority */}
      <RecommendationSection
        title="High Priority — Bridge These Gaps First"
        recommendations={highPriority}
        expandedIdx={expandedIdx}
        onToggle={(idx) => setExpandedIdx(expandedIdx === idx ? null : idx)}
        indexOffset={0}
        accentColor="red"
      />

      {/* Medium Priority */}
      <RecommendationSection
        title="Medium Priority — Grow Your Competitive Edge"
        recommendations={mediumPriority}
        expandedIdx={expandedIdx}
        onToggle={(idx) => setExpandedIdx(expandedIdx === idx ? null : idx)}
        indexOffset={highPriority.length}
        accentColor="amber"
      />
    </div>
  )
}

interface RecommendationSectionProps {
  title: string
  recommendations: typeof sampleCurriculumAnalysis.recommendations
  expandedIdx: number | null
  onToggle: (idx: number) => void
  indexOffset: number
  accentColor: 'red' | 'amber'
}

function RecommendationSection({ title, recommendations, expandedIdx, onToggle, indexOffset, accentColor }: RecommendationSectionProps) {
  if (recommendations.length === 0) return null

  const borderColor = accentColor === 'red' ? 'border-red-500/20' : 'border-amber-500/20'

  return (
    <div>
      <h2 className="text-base font-semibold mb-4">{title}</h2>
      <div className="space-y-3">
        {recommendations.map((rec, i) => {
          const globalIdx = indexOffset + i
          const isExpanded = expandedIdx === globalIdx

          return (
            <motion.div
              key={rec.skillName}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn('rounded-xl border bg-card/60 overflow-hidden transition-all', borderColor)}
            >
              <button
                onClick={() => onToggle(globalIdx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold',
                    accentColor === 'red' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                  )}>
                    {globalIdx + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{rec.skillName}</p>
                    <p className="text-xs text-muted-foreground">{rec.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium">{rec.industryDemand}%</p>
                    <p className="text-xs text-muted-foreground">demand</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium">{rec.estimatedHours}h</p>
                    <p className="text-xs text-muted-foreground">est. time</p>
                  </div>
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </button>

              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="px-6 pb-5 border-t border-border/30"
                >
                  <div className="pt-4 space-y-5">
                    {/* Learning Path */}
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        Recommended Learning Path
                      </h4>
                      <div className="space-y-2">
                        {rec.learningPath.map((step, stepIdx) => (
                          <div key={stepIdx} className="flex items-start gap-3">
                            <div className="flex flex-col items-center">
                              <div className={cn(
                                'flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold',
                                'bg-primary/10 text-primary border border-primary/20'
                              )}>
                                {stepIdx + 1}
                              </div>
                              {stepIdx < rec.learningPath.length - 1 && (
                                <div className="w-px h-4 bg-border/50 mt-1" />
                              )}
                            </div>
                            <p className="text-sm pt-0.5">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Related Skills */}
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Related Skills You'll Build
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {rec.relatedSkills.map(s => (
                          <span key={s} className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">{s}</span>
                        ))}
                      </div>
                    </div>

                    {/* Estimated Time */}
                    <div className="flex items-center gap-2 rounded-lg bg-muted/20 p-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Estimated learning time: <span className="font-medium text-foreground">{rec.estimatedHours} hours</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
