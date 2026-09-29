import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight, ChevronDown, Network, Search, Plus, Edit, Merge, Tag,
  CheckCircle2, X, Check
} from 'lucide-react'
import { taxonomyTree as initialTaxonomyTree } from '@/data/seedData'
import type { TaxonomyNode } from '@/types'
import { cn } from '@/lib/utils'
import Modal from '@/components/ui/Modal'

export default function TaxonomyPage() {
  const [treeData, setTreeData] = useState<TaxonomyNode[]>(initialTaxonomyTree)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showMergeModal, setShowMergeModal] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  // Add Skill Form state
  const [newSkillName, setNewSkillName] = useState('')
  const [newSkillParent, setNewSkillParent] = useState('')
  const [newSkillAliases, setNewSkillAliases] = useState('')
  const [newSkillCount, setNewSkillCount] = useState(1)

  // Merge Form state
  const [mergeSource, setMergeSource] = useState('')
  const [mergeTarget, setMergeTarget] = useState('')

  // Flatten all nodes for parent/merge dropdowns
  const flattenNodes = (nodes: TaxonomyNode[]): { id: string; name: string }[] => {
    let result: { id: string; name: string }[] = []
    for (const node of nodes) {
      result.push({ id: node.id, name: node.name })
      if (node.children?.length) {
        result = result.concat(flattenNodes(node.children))
      }
    }
    return result
  }
  const allNodesList = flattenNodes(treeData)

  const showToast = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 3500)
  }

  // Recursive add child node
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSkillName.trim()) return

    const newNode: TaxonomyNode = {
      id: newSkillName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: newSkillName.trim(),
      skillCount: newSkillCount || 1,
      aliases: newSkillAliases ? newSkillAliases.split(',').map(a => a.trim()).filter(Boolean) : [],
      children: [],
    }

    const insertNode = (nodes: TaxonomyNode[]): TaxonomyNode[] => {
      return nodes.map(n => {
        if (n.id === newSkillParent) {
          return {
            ...n,
            skillCount: n.skillCount + 1,
            children: [...n.children, newNode],
          }
        }
        if (n.children?.length) {
          return {
            ...n,
            children: insertNode(n.children),
          }
        }
        return n
      })
    }

    if (!newSkillParent) {
      setTreeData(prev => [...prev, newNode])
    } else {
      setTreeData(prev => insertNode(prev))
    }

    showToast(`Added new taxonomy skill node: "${newSkillName}"`)
    setShowAddModal(false)
    setNewSkillName('')
    setNewSkillAliases('')
    setNewSkillParent('')
  }

  // Handle merge duplicate
  const handleMergeSkills = (e: React.FormEvent) => {
    e.preventDefault()
    if (!mergeSource || !mergeTarget || mergeSource === mergeTarget) return

    const sourceObj = allNodesList.find(n => n.id === mergeSource)
    const targetObj = allNodesList.find(n => n.id === mergeTarget)

    const mergeInTree = (nodes: TaxonomyNode[]): TaxonomyNode[] => {
      return nodes
        .filter(n => n.id !== mergeSource)
        .map(n => {
          let updatedAliases = n.aliases || []
          if (n.id === mergeTarget && sourceObj) {
            updatedAliases = Array.from(new Set([...updatedAliases, sourceObj.name]))
          }
          return {
            ...n,
            aliases: updatedAliases,
            children: n.children?.length ? mergeInTree(n.children) : [],
          }
        })
    }

    setTreeData(prev => mergeInTree(prev))
    showToast(`Merged "${sourceObj?.name}" as canonical alias into "${targetObj?.name}"`)
    setShowMergeModal(false)
    setMergeSource('')
    setMergeTarget('')
  }

  // Quick add alias directly on a node
  const handleAddAliasToNode = (nodeId: string, alias: string) => {
    const addAliasInTree = (nodes: TaxonomyNode[]): TaxonomyNode[] => {
      return nodes.map(n => {
        if (n.id === nodeId) {
          return {
            ...n,
            aliases: Array.from(new Set([...(n.aliases || []), alias])),
          }
        }
        if (n.children?.length) {
          return {
            ...n,
            children: addAliasInTree(n.children),
          }
        }
        return n
      })
    }
    setTreeData(prev => addAliasInTree(prev))
    showToast(`Added alias "${alias}" to taxonomy`)
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold tracking-tight">Skill Taxonomy</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Hierarchical skill classification powering the NLP extraction & normalization intelligence engine
        </p>
      </motion.div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-xs font-medium text-green-400 backdrop-blur-xl shadow-lg"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search taxonomy nodes and aliases (e.g. AWS, Regression, SQL)..."
            className="h-10 w-full rounded-xl border border-border/50 bg-card/60 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" /> Add Skill Node
          </button>
          <button
            onClick={() => setShowMergeModal(true)}
            className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/60 px-4 py-2 text-xs font-semibold text-foreground hover:bg-accent transition-colors"
          >
            <Merge className="h-3.5 w-3.5" /> Merge Duplicates
          </button>
        </div>
      </div>

      {/* Taxonomy Tree */}
      <div className="rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-5 border-b border-border/40 pb-3">
          <div className="flex items-center gap-2">
            <Network className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Interactive Skill Hierarchy</h3>
          </div>
          <span className="text-xs text-muted-foreground">
            {allNodesList.length} classification nodes registered
          </span>
        </div>
        <div className="space-y-1">
          {treeData.map((node) => (
            <TaxonomyTreeNode
              key={node.id}
              node={node}
              level={0}
              searchQuery={searchQuery}
              onAddAlias={handleAddAliasToNode}
            />
          ))}
        </div>
      </div>

      {/* Legend & Admin Guidelines (Section 7 Requirement) */}
      <div className="rounded-2xl border border-border/50 bg-card/60 p-5 backdrop-blur-xl">
        <h3 className="text-xs font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
          Taxonomy Administration Rules
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground">
          <div className="flex items-start gap-2">
            <Plus className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">Add Skill Node</p>
              <p className="text-[11px] mt-0.5">Define new skills or nested sub-topics under their parent discipline</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Tag className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">Manage Aliases</p>
              <p className="text-[11px] mt-0.5">Map acronyms (e.g. "TF" → TensorFlow) for NLP normalizer</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Merge className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">Merge Duplicates</p>
              <p className="text-[11px] mt-0.5">Combine redundant skills into a canonical node</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Edit className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">Parent-Child Edits</p>
              <p className="text-[11px] mt-0.5">Maintain strict ontology hierarchies for accurate gap analysis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Skill Node Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Skill to Taxonomy"
      >
        <form onSubmit={handleAddSkill} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Skill Name *</label>
            <input
              type="text"
              required
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="e.g. LangChain, Rust, Apache Kafka"
              className="h-9 w-full rounded-lg border border-border/50 bg-background/60 px-3 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Parent Node / Category</label>
            <select
              value={newSkillParent}
              onChange={(e) => setNewSkillParent(e.target.value)}
              className="h-9 w-full rounded-lg border border-border/50 bg-background/60 px-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">(Top-level category)</option>
              {allNodesList.map(n => (
                <option key={n.id} value={n.id}>{n.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Aliases (comma-separated)</label>
            <input
              type="text"
              value={newSkillAliases}
              onChange={(e) => setNewSkillAliases(e.target.value)}
              placeholder="e.g. Kafka, Kafka Streaming, Apache Kafka Engine"
              className="h-9 w-full rounded-lg border border-border/50 bg-background/60 px-3 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Initial Sub-skill Count</label>
            <input
              type="number"
              min={1}
              value={newSkillCount}
              onChange={(e) => setNewSkillCount(Number(e.target.value))}
              className="h-9 w-full rounded-lg border border-border/50 bg-background/60 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-3 py-1.5 rounded-lg border border-border/50 text-xs font-medium text-muted-foreground hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Save Skill Node
            </button>
          </div>
        </form>
      </Modal>

      {/* Merge Duplicate Skills Modal */}
      <Modal
        open={showMergeModal}
        onClose={() => setShowMergeModal(false)}
        title="Merge Duplicate Taxonomy Skills"
      >
        <form onSubmit={handleMergeSkills} className="space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Merging removes the duplicate source skill and registers its name and aliases as an alias on the canonical target skill.
          </p>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Source Skill (Duplicate to Remove) *</label>
            <select
              required
              value={mergeSource}
              onChange={(e) => setMergeSource(e.target.value)}
              className="h-9 w-full rounded-lg border border-border/50 bg-background/60 px-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Select source skill...</option>
              {allNodesList.map(n => (
                <option key={n.id} value={n.id}>{n.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Target Canonical Skill (To Keep) *</label>
            <select
              required
              value={mergeTarget}
              onChange={(e) => setMergeTarget(e.target.value)}
              className="h-9 w-full rounded-lg border border-border/50 bg-background/60 px-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Select canonical target skill...</option>
              {allNodesList.filter(n => n.id !== mergeSource).map(n => (
                <option key={n.id} value={n.id}>{n.name}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
            <button
              type="button"
              onClick={() => setShowMergeModal(false)}
              className="px-3 py-1.5 rounded-lg border border-border/50 text-xs font-medium text-muted-foreground hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!mergeSource || !mergeTarget}
              className="px-4 py-1.5 rounded-lg bg-amber-600 text-xs font-semibold text-white hover:bg-amber-700 disabled:opacity-50"
            >
              Confirm Merge
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

function TaxonomyTreeNode({
  node,
  level,
  searchQuery,
  onAddAlias
}: {
  node: TaxonomyNode
  level: number
  searchQuery: string
  onAddAlias: (nodeId: string, alias: string) => void
}) {
  const [expanded, setExpanded] = useState(level < 2)
  const [isAddingAlias, setIsAddingAlias] = useState(false)
  const [aliasInput, setAliasInput] = useState('')

  const hasChildren = node.children && node.children.length > 0
  const matchesSearch = searchQuery && (
    node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.aliases?.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleSaveAlias = (e: React.FormEvent) => {
    e.preventDefault()
    if (aliasInput.trim()) {
      onAddAlias(node.id, aliasInput.trim())
      setAliasInput('')
      setIsAddingAlias(false)
    }
  }

  return (
    <div>
      <div
        className={cn(
          'group flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-muted/40 transition-colors',
          matchesSearch && 'bg-primary/10 border border-primary/20'
        )}
        style={{ paddingLeft: `${level * 20 + 12}px` }}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 flex-1 text-left"
        >
          {hasChildren ? (
            expanded ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          ) : (
            <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            </div>
          )}
          <span className={cn('font-medium', hasChildren ? 'text-foreground' : 'text-muted-foreground text-xs')}>
            {node.name}
          </span>
          {node.aliases && node.aliases.length > 0 && (
            <span className="text-[10px] text-muted-foreground/70 ml-1">
              ({node.aliases.join(', ')})
            </span>
          )}
        </button>

        <div className="flex items-center gap-2">
          {/* Quick alias button visible on hover */}
          {!isAddingAlias ? (
            <button
              onClick={() => setIsAddingAlias(true)}
              className="opacity-0 group-hover:opacity-100 text-[10px] text-muted-foreground hover:text-primary transition-opacity flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border/40 hover:border-primary/40 bg-card/40"
              title="Add alias to this node"
            >
              <Tag className="h-2.5 w-2.5" /> +Alias
            </button>
          ) : (
            <form onSubmit={handleSaveAlias} className="flex items-center gap-1">
              <input
                type="text"
                value={aliasInput}
                onChange={(e) => setAliasInput(e.target.value)}
                placeholder="Alias..."
                className="h-6 w-24 rounded border border-primary/50 bg-background px-1.5 text-[11px] focus:outline-none"
                autoFocus
              />
              <button type="submit" className="text-green-400 p-0.5 hover:bg-green-500/10 rounded">
                <Check className="h-3 w-3" />
              </button>
              <button type="button" onClick={() => setIsAddingAlias(false)} className="text-muted-foreground p-0.5 hover:bg-muted rounded">
                <X className="h-3 w-3" />
              </button>
            </form>
          )}

          <span className="text-[10px] font-semibold text-muted-foreground bg-muted/30 px-1.5 py-0.5 rounded">
            {node.skillCount}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {expanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            {node.children.map((child) => (
              <TaxonomyTreeNode
                key={child.id}
                node={child}
                level={level + 1}
                searchQuery={searchQuery}
                onAddAlias={onAddAlias}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
