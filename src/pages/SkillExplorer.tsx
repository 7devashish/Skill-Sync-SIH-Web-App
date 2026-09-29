import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, SortAsc, SortDesc, Grid3X3, List, TrendingUp, TrendingDown } from 'lucide-react'
import SkillCard from '@/components/ui/SkillCard'
import Modal from '@/components/ui/Modal'
import { skills, allCategories, getSkillById } from '@/data/seedData'
import type { Skill } from '@/types'
import { cn } from '@/lib/utils'

type SortKey = 'demand' | 'growth' | 'name' | 'jobCount'
type ViewMode = 'grid' | 'list'

export default function SkillExplorer() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [sortKey, setSortKey] = useState<SortKey>('demand')
  const [sortAsc, setSortAsc] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

  const filtered = useMemo(() => {
    let result = [...skills]

    if (query) {
      const q = query.toLowerCase()
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.aliases.some(a => a.toLowerCase().includes(q)) ||
        s.category.toLowerCase().includes(q) ||
        s.roles.some(r => r.toLowerCase().includes(q))
      )
    }

    if (activeCategory !== 'All') {
      result = result.filter(s => s.category === activeCategory)
    }

    result.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'demand': cmp = a.demand - b.demand; break
        case 'growth': cmp = a.growth - b.growth; break
        case 'name': cmp = a.name.localeCompare(b.name); break
        case 'jobCount': cmp = a.jobCount - b.jobCount; break
      }
      return sortAsc ? cmp : -cmp
    })

    return result
  }, [query, activeCategory, sortKey, sortAsc])

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold tracking-tight">Skill Explorer</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Search, filter, and explore {skills.length}+ skills tracked across the industry
        </p>
      </motion.div>

      {/* Search + Filters Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills, categories, roles..."
            className="h-10 w-full rounded-lg border border-border/50 bg-card/60 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        <div className="flex gap-2">
          {/* Sort */}
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="h-10 rounded-lg border border-border/50 bg-card/60 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="demand">Sort by Demand</option>
            <option value="growth">Sort by Growth</option>
            <option value="name">Sort by Name</option>
            <option value="jobCount">Sort by Jobs</option>
          </select>

          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-card/60 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle sort order"
          >
            {sortAsc ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-card/60 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle view mode"
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </button>
        </div>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['All', ...allCategories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium border transition-all',
              activeCategory === cat
                ? 'bg-primary/10 text-primary border-primary/20'
                : 'border-border/50 text-muted-foreground hover:text-foreground hover:border-border'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} skill{filtered.length !== 1 ? 's' : ''}
        {activeCategory !== 'All' && ` in ${activeCategory}`}
      </p>

      {/* Skills Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((skill, i) => (
            <SkillCard
              key={skill.id}
              name={skill.name}
              demand={skill.demand}
              growth={skill.growth}
              category={skill.category}
              jobCount={skill.jobCount}
              delay={Math.min(i * 0.03, 0.3)}
              onClick={() => setSelectedSkill(skill)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.2) }}
              onClick={() => setSelectedSkill(skill)}
              className="flex items-center justify-between rounded-lg border border-border/50 bg-card/60 p-4 hover:border-primary/30 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="text-sm font-semibold">{skill.name}</h3>
                  <p className="text-xs text-muted-foreground">{skill.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-medium">{skill.demand}%</p>
                  <p className="text-xs text-muted-foreground">demand</p>
                </div>
                <div className={cn(
                  'flex items-center gap-1 text-xs font-medium',
                  skill.growth > 0 ? 'text-green-400' : 'text-red-400'
                )}>
                  {skill.growth > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {skill.growth > 0 ? '+' : ''}{skill.growth.toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground w-20 text-right">{skill.jobCount.toLocaleString()} jobs</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Filter className="h-10 w-10 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold">No skills found</h3>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Skill Detail Modal */}
      <Modal open={!!selectedSkill} onClose={() => setSelectedSkill(null)} title={selectedSkill?.name} size="lg">
        {selectedSkill && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-lg bg-muted/30 p-3 text-center">
                <p className="text-xs text-muted-foreground">Demand</p>
                <p className="text-xl font-bold text-primary">{selectedSkill.demand}%</p>
              </div>
              <div className="rounded-lg bg-muted/30 p-3 text-center">
                <p className="text-xs text-muted-foreground">Jobs</p>
                <p className="text-xl font-bold">{selectedSkill.jobCount.toLocaleString()}</p>
              </div>
              <div className="rounded-lg bg-muted/30 p-3 text-center">
                <p className="text-xs text-muted-foreground">Growth</p>
                <p className={`text-xl font-bold ${selectedSkill.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedSkill.growth > 0 ? '+' : ''}{selectedSkill.growth}%
                </p>
              </div>
              <div className="rounded-lg bg-muted/30 p-3 text-center">
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="text-sm font-medium mt-1">{selectedSkill.category}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{selectedSkill.description}</p>
            <div>
              <h4 className="text-sm font-semibold mb-2">Commonly Paired With</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSkill.pairedSkills.map(id => (
                  <span key={id} className="rounded-full border border-border/50 bg-muted/30 px-3 py-1 text-xs">{getSkillById(id)?.name || id}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2">Roles</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSkill.roles.map(r => (
                  <span key={r} className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary">{r}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
