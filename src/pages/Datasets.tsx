import { motion } from 'framer-motion'
import { Database, ExternalLink, RefreshCw, Plus, CheckCircle2, Clock, Archive } from 'lucide-react'
import { dataSources } from '@/data/seedData'
import { cn } from '@/lib/utils'

export default function DatasetsPage() {
  return (
    <div className="space-y-8 pb-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Datasets</h1>
            <p className="text-sm text-muted-foreground mt-1">Data sources powering the skill intelligence engine</p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" /> Add Source
          </button>
        </div>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="rounded-xl border border-border/50 bg-card/60 p-4">
          <p className="text-xs text-muted-foreground">Total Records</p>
          <p className="text-2xl font-bold mt-1">{dataSources.reduce((a, d) => a + d.records, 0).toLocaleString()}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-xl border border-border/50 bg-card/60 p-4">
          <p className="text-xs text-muted-foreground">Active Sources</p>
          <p className="text-2xl font-bold mt-1">{dataSources.filter(d => d.status === 'active').length}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-xl border border-border/50 bg-card/60 p-4">
          <p className="text-xs text-muted-foreground">Last Updated</p>
          <p className="text-2xl font-bold mt-1">Sep 2026</p>
        </motion.div>
      </div>

      {/* Dataset notice */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 flex items-start gap-3">
        <Clock className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-medium text-amber-400">Demo Data Notice</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            The data shown is simulated/synthetic for demonstration purposes. It represents realistic patterns
            but should not be treated as real industry data. Connect to live data sources for production use.
          </p>
        </div>
      </div>

      {/* Dataset Cards */}
      <div className="space-y-4">
        {dataSources.map((source, i) => (
          <motion.div
            key={source.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border/50 bg-card/60 p-6 hover:border-border transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{source.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{source.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <StatusBadge status={source.status} />
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors" aria-label="Refresh">
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border/30">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Type</p>
                <p className="text-xs font-medium mt-0.5">{source.type}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Records</p>
                <p className="text-xs font-medium mt-0.5">{source.records.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Period</p>
                <p className="text-xs font-medium mt-0.5">{source.collectionPeriod}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Last Updated</p>
                <p className="text-xs font-medium mt-0.5">{source.lastUpdated}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: 'active' | 'processing' | 'archived' }) {
  const config = {
    active: { icon: CheckCircle2, text: 'Active', className: 'text-green-400 bg-green-500/10 border-green-500/20' },
    processing: { icon: RefreshCw, text: 'Processing', className: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    archived: { icon: Archive, text: 'Archived', className: 'text-muted-foreground bg-muted/30 border-border/50' },
  }
  const c = config[status]
  const Icon = c.icon

  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium', c.className)}>
      <Icon className="h-3 w-3" />
      {c.text}
    </span>
  )
}
