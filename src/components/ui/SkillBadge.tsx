import { cn } from '@/lib/utils'

interface SkillBadgeProps {
  status: 'covered' | 'partial' | 'missing'
  label?: string
  className?: string
}

export default function SkillBadge({ status, label, className }: SkillBadgeProps) {
  const config = {
    covered: { text: label || 'Covered', icon: '✓', bg: 'bg-green-500/10 border-green-500/20 text-green-400' },
    partial: { text: label || 'Partial', icon: '⚠', bg: 'bg-amber-500/10 border-amber-500/20 text-amber-400' },
    missing: { text: label || 'Missing', icon: '✕', bg: 'bg-red-500/10 border-red-500/20 text-red-400' },
  }
  const c = config[status]

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
      c.bg,
      className
    )}>
      <span>{c.icon}</span>
      {c.text}
    </span>
  )
}
