import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, Filter } from 'lucide-react'
import DemandTrendChart from '@/components/charts/DemandTrendChart'
import SkillBarChart from '@/components/charts/SkillBarChart'
import { demandTrendData, getTopSkills, getFastestGrowingSkills, getDecliningSkills, getEmergingSkills } from '@/data/seedData'
import { cn } from '@/lib/utils'

const trendLines = [
  { key: 'Python', color: '#3b82f6', name: 'Python' },
  { key: 'JavaScript', color: '#f59e0b', name: 'JavaScript' },
  { key: 'AWS', color: '#f97316', name: 'AWS' },
  { key: 'Machine Learning', color: '#8b5cf6', name: 'Machine Learning' },
  { key: 'Docker', color: '#06b6d4', name: 'Docker' },
  { key: 'TypeScript', color: '#10b981', name: 'TypeScript' },
]

type Tab = 'overview' | 'emerging' | 'stable' | 'declining'

export default function IndustryTrends() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const emerging = getEmergingSkills(12)
  const declining = getDecliningSkills()
  const topSkills = getTopSkills(15)
  const stableSkills = topSkills.filter(s => Math.abs(s.growth) < 10)

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview', icon: <TrendingUp className="h-3.5 w-3.5" /> },
    { key: 'emerging', label: 'Emerging', icon: <TrendingUp className="h-3.5 w-3.5 text-green-400" /> },
    { key: 'stable', label: 'Stable', icon: <Minus className="h-3.5 w-3.5 text-blue-400" /> },
    { key: 'declining', label: 'Declining', icon: <TrendingDown className="h-3.5 w-3.5 text-red-400" /> },
  ]

  return (
    <div className="space-y-8 pb-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold tracking-tight">Industry Trends</h1>
        <p className="text-sm text-muted-foreground mt-1">Track how skill demand evolves across the industry</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border/50 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium transition-all',
              activeTab === tab.key
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <DemandTrendChart data={demandTrendData} lines={trendLines} title="Skill Demand Over Time" height={350} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SkillBarChart
              data={topSkills.slice(0, 10).map(s => ({ name: s.name, value: s.demand }))}
              title="Top 10 Most Demanded Skills"
              height={300}
              layout="vertical"
            />
            <SkillBarChart
              data={emerging.slice(0, 8).map(s => ({ name: s.name, value: s.growth }))}
              title="Fastest Growing Skills (% Growth)"
              height={300}
              layout="vertical"
            />
          </div>
        </div>
      )}

      {activeTab === 'emerging' && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Skills with growth rate above 30% — watch these closely.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {emerging.map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-xl border border-green-500/20 bg-card/60 p-4 hover:border-green-500/30 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-semibold">{skill.name}</h3>
                    <p className="text-xs text-muted-foreground">{skill.category}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-500/10 rounded-full px-2 py-0.5">
                    <TrendingUp className="h-3 w-3" />+{skill.growth.toFixed(0)}%
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Demand: {skill.demand}%</span>
                  <span>•</span>
                  <span>{skill.jobCount.toLocaleString()} jobs</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'stable' && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Foundational skills with steady demand — core competencies that remain essential.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {stableSkills.map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-xl border border-blue-500/20 bg-card/60 p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-semibold">{skill.name}</h3>
                    <p className="text-xs text-muted-foreground">{skill.category}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-blue-400 bg-blue-500/10 rounded-full px-2 py-0.5">
                    <Minus className="h-3 w-3" />{skill.growth > 0 ? '+' : ''}{skill.growth.toFixed(1)}%
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Demand: {skill.demand}% • {skill.jobCount.toLocaleString()} jobs
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'declining' && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Skills showing reduced demand — consider de-prioritizing or updating curriculum focus.</p>
          {declining.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm text-muted-foreground">No significantly declining skills detected in current data.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {declining.map((skill, i) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-xl border border-red-500/20 bg-card/60 p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-semibold">{skill.name}</h3>
                      <p className="text-xs text-muted-foreground">{skill.category}</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium text-red-400 bg-red-500/10 rounded-full px-2 py-0.5">
                      <TrendingDown className="h-3 w-3" />{skill.growth.toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Demand: {skill.demand}% • {skill.jobCount.toLocaleString()} jobs
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
