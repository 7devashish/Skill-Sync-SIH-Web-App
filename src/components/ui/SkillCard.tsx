import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface SkillCardProps {
  name: string
  demand: number
  growth: number
  category: string
  jobCount?: number
  onClick?: () => void
  delay?: number
  compact?: boolean
}

export default function SkillCard({
  name, demand, growth, category, jobCount, onClick, delay = 0, compact = false
}: SkillCardProps) {
  const isGrowing = growth > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300',
        'hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 cursor-pointer',
        compact ? 'p-3' : 'p-4'
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className={cn('font-semibold tracking-tight', compact ? 'text-sm' : 'text-base')}>{name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{category}</p>
          </div>
          <div className={cn(
            'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
            isGrowing ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
          )}>
            {isGrowing ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {isGrowing ? '+' : ''}{growth.toFixed(1)}%
          </div>
        </div>

        {/* Demand bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Industry Demand</span>
            <span className="font-medium">{demand}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${demand}%` }}
              transition={{ duration: 0.8, delay: delay + 0.2, ease: [0.4, 0, 0.2, 1] }}
              className={cn(
                'h-full rounded-full',
                demand >= 70 ? 'bg-primary' : demand >= 50 ? 'bg-blue-400' : demand >= 30 ? 'bg-blue-300' : 'bg-blue-200'
              )}
            />
          </div>
        </div>

        {!compact && jobCount && (
          <p className="text-xs text-muted-foreground">
            {jobCount.toLocaleString()} job postings
          </p>
        )}
      </div>
    </motion.div>
  )
}
