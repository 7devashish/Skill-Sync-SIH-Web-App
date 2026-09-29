import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
  description?: string
  delay?: number
  onClick?: () => void
}

export default function KPICard({
  title, value, change, changeType = 'neutral', icon, description, delay = 0, onClick
}: KPICardProps) {
  const TrendIcon = changeType === 'positive' ? TrendingUp : changeType === 'negative' ? TrendingDown : Minus

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm p-5 transition-all duration-300',
        'hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5',
        onClick && 'cursor-pointer'
      )}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {change && (
            <div className="flex items-center gap-1.5">
              <TrendIcon className={cn(
                'h-3.5 w-3.5',
                changeType === 'positive' && 'text-green-400',
                changeType === 'negative' && 'text-red-400',
                changeType === 'neutral' && 'text-muted-foreground'
              )} />
              <span className={cn(
                'text-xs font-medium',
                changeType === 'positive' && 'text-green-400',
                changeType === 'negative' && 'text-red-400',
                changeType === 'neutral' && 'text-muted-foreground'
              )}>
                {change}
              </span>
            </div>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
      </div>
    </motion.div>
  )
}
