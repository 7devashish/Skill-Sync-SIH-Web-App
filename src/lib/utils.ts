import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

export function formatPercentage(num: number): string {
  return (num >= 0 ? '+' : '') + num.toFixed(1) + '%'
}

export function getGrowthColor(growth: number): string {
  if (growth >= 20) return 'text-green-400'
  if (growth >= 5) return 'text-green-300'
  if (growth >= 0) return 'text-emerald-200'
  if (growth >= -10) return 'text-amber-400'
  return 'text-red-400'
}

export function getDemandLevel(demand: number): 'critical' | 'high' | 'medium' | 'low' {
  if (demand >= 70) return 'critical'
  if (demand >= 50) return 'high'
  if (demand >= 30) return 'medium'
  return 'low'
}

export function getCoverageColor(status: 'covered' | 'partial' | 'missing'): string {
  switch (status) {
    case 'covered': return 'text-green-400'
    case 'partial': return 'text-amber-400'
    case 'missing': return 'text-red-400'
  }
}

export function getCoverageBg(status: 'covered' | 'partial' | 'missing'): string {
  switch (status) {
    case 'covered': return 'bg-green-500/10 border-green-500/20'
    case 'partial': return 'bg-amber-500/10 border-amber-500/20'
    case 'missing': return 'bg-red-500/10 border-red-500/20'
  }
}
