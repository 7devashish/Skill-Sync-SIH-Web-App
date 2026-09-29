import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Network, Search, ZoomIn, ZoomOut, RotateCcw, Sparkles, X, ChevronRight, Info, ExternalLink } from 'lucide-react'
import { skills, allCategories } from '@/data/seedData'
import type { Skill } from '@/types'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

// Category color mapping
const categoryColors: Record<string, { bg: string; border: string; text: string; hex: string }> = {
  'Programming': { bg: 'bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-400', hex: '#3b82f6' },
  'Data Science': { bg: 'bg-emerald-500/20', border: 'border-emerald-500', text: 'text-emerald-400', hex: '#10b981' },
  'AI / Machine Learning': { bg: 'bg-purple-500/20', border: 'border-purple-500', text: 'text-purple-400', hex: '#a855f7' },
  'Cloud Computing': { bg: 'bg-sky-500/20', border: 'border-sky-500', text: 'text-sky-400', hex: '#0ea5e9' },
  'DevOps': { bg: 'bg-amber-500/20', border: 'border-amber-500', text: 'text-amber-400', hex: '#f59e0b' },
  'Databases': { bg: 'bg-rose-500/20', border: 'border-rose-500', text: 'text-rose-400', hex: '#f43f5e' },
  'Web Development': { bg: 'bg-teal-500/20', border: 'border-teal-500', text: 'text-teal-400', hex: '#14b8a6' },
  'Cybersecurity': { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400', hex: '#ef4444' },
  'Data Engineering': { bg: 'bg-indigo-500/20', border: 'border-indigo-500', text: 'text-indigo-400', hex: '#6366f1' },
  'Software Engineering': { bg: 'bg-cyan-500/20', border: 'border-cyan-500', text: 'text-cyan-400', hex: '#06b6d4' },
  'Tools & Platforms': { bg: 'bg-orange-500/20', border: 'border-orange-500', text: 'text-orange-400', hex: '#f97316' },
}

interface GraphNode {
  id: string
  name: string
  category: string
  demand: number
  growth: number
  x: number
  y: number
  radius: number
  skill: Skill
}

interface GraphLink {
  source: string
  target: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  strength: number
}

export default function SkillGraphPage() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNode, setSelectedNode] = useState<Skill | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Filter skills
  const filteredSkills = useMemo(() => {
    return skills.filter(s => {
      const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory
      const matchesSearch = !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Compute graph layout
  const { nodes, links } = useMemo(() => {
    const graphWidth = 900
    const graphHeight = 620
    const centerX = graphWidth / 2
    const centerY = graphHeight / 2

    // Category cluster centers
    const categories = Array.from(new Set(skills.map(s => s.category)))
    const clusterCenters: Record<string, { x: number; y: number }> = {}
    categories.forEach((cat, idx) => {
      const angle = (idx / categories.length) * 2 * Math.PI
      const radius = 220
      clusterCenters[cat] = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      }
    })

    // Create positioned nodes
    const positionedNodes: GraphNode[] = filteredSkills.map((s, idx) => {
      const cluster = clusterCenters[s.category] || { x: centerX, y: centerY }
      const offsetAngle = (idx * 137.5 * Math.PI) / 180
      const spread = 75 + (idx % 4) * 22
      const x = cluster.x + Math.cos(offsetAngle) * spread
      const y = cluster.y + Math.sin(offsetAngle) * spread
      const radius = Math.max(14, Math.min(32, (s.demand / 100) * 26 + 10))

      return {
        id: s.id,
        name: s.name,
        category: s.category,
        demand: s.demand,
        growth: s.growth,
        x,
        y,
        radius,
        skill: s,
      }
    })

    const nodeMap = new Map<string, GraphNode>(positionedNodes.map(n => [n.id, n]))
    const generatedLinks: GraphLink[] = []
    const seenLinks = new Set<string>()

    positionedNodes.forEach(node => {
      const paired = node.skill.pairedSkills || []
      const related = node.skill.relatedSkills || []
      const targets = Array.from(new Set([...paired, ...related]))

      targets.forEach(targetId => {
        const targetNode = nodeMap.get(targetId)
        if (targetNode && targetNode.id !== node.id) {
          const key = [node.id, targetNode.id].sort().join('--')
          if (!seenLinks.has(key)) {
            seenLinks.add(key)
            generatedLinks.push({
              source: node.id,
              target: targetNode.id,
              sourceX: node.x,
              sourceY: node.y,
              targetX: targetNode.x,
              targetY: targetNode.y,
              strength: paired.includes(targetId) ? 2 : 1,
            })
          }
        }
      })
    })

    return { nodes: positionedNodes, links: generatedLinks }
  }, [filteredSkills])

  // Mouse pan handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'circle' || (e.target as HTMLElement).tagName === 'text') return
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => setIsDragging(false)

  const handleResetZoom = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const connectedNodeIds = useMemo(() => {
    if (!selectedNode) return new Set<string>()
    const set = new Set<string>([selectedNode.id])
    ;(selectedNode.pairedSkills || []).forEach(id => set.add(id))
    ;(selectedNode.relatedSkills || []).forEach(id => set.add(id))
    return set
  }, [selectedNode])

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Skill Relationship Graph</h1>
            <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
              Co-occurrence Network
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Explore how industry skills connect, complement each other, and cluster into modern tech stacks
          </p>
        </motion.div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(z => Math.min(z + 0.15, 2.2))}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-card/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={() => setZoom(z => Math.max(z - 0.15, 0.5))}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-card/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-border/50 bg-card/60 hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset View
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search skill to focus on node (e.g. Python, Docker, PyTorch)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-lg border border-border/50 bg-card/60 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {['All', ...allCategories].slice(0, 7).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition-all',
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                  : 'bg-card/60 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Graph Visualizer Canvas & Detail Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={cn(
            'lg:col-span-8 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl relative overflow-hidden select-none min-h-[560px] h-[640px]',
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          )}
        >
          {/* Subtle Grid Backdrop */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Quick Info Overlay */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-lg border border-border/40 bg-background/80 backdrop-blur-md px-3 py-1.5 text-xs text-muted-foreground pointer-events-none">
            <Info className="h-3.5 w-3.5 text-primary" />
            <span>Click any node to reveal its skill pairings and co-occurrence frequency</span>
          </div>

          {/* SVG Canvas */}
          <svg
            className="w-full h-full"
            viewBox="0 0 900 620"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            }}
          >
            {/* Links */}
            <g className="links">
              {links.map((link) => {
                const isHighlighted = selectedNode && (
                  link.source === selectedNode.id || link.target === selectedNode.id
                )
                const isDimmed = selectedNode && !isHighlighted

                return (
                  <line
                    key={`${link.source}--${link.target}`}
                    x1={link.sourceX}
                    y1={link.sourceY}
                    x2={link.targetX}
                    y2={link.targetY}
                    stroke={isHighlighted ? '#60a5fa' : 'currentColor'}
                    strokeWidth={isHighlighted ? 2.5 : link.strength === 2 ? 1.5 : 0.8}
                    strokeOpacity={isHighlighted ? 0.9 : isDimmed ? 0.08 : 0.22}
                    className="text-border transition-all duration-300"
                    strokeDasharray={link.strength === 1 ? '4 3' : undefined}
                  />
                )
              })}
            </g>

            {/* Nodes */}
            <g className="nodes">
              {nodes.map((node) => {
                const colorInfo = categoryColors[node.category] || { hex: '#3b82f6' }
                const isSelected = selectedNode?.id === node.id
                const isConnected = connectedNodeIds.has(node.id)
                const isDimmed = selectedNode && !isConnected

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedNode(node.skill)
                    }}
                    className="cursor-pointer group"
                    style={{
                      opacity: isDimmed ? 0.25 : 1,
                      transition: 'opacity 0.25s ease, transform 0.25s ease',
                    }}
                  >
                    {/* Pulsing ring on selected node */}
                    {isSelected && (
                      <circle
                        r={node.radius + 8}
                        fill="none"
                        stroke={colorInfo.hex}
                        strokeWidth="2"
                        strokeOpacity="0.6"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer Glow */}
                    <circle
                      r={node.radius + (isSelected ? 4 : 2)}
                      fill={colorInfo.hex}
                      fillOpacity={isSelected ? 0.25 : 0.1}
                      stroke={colorInfo.hex}
                      strokeWidth={isSelected ? 2 : 1}
                      strokeOpacity={isSelected ? 1 : 0.4}
                      className="group-hover:stroke-opacity-100 transition-all"
                    />

                    {/* Core Circle */}
                    <circle
                      r={node.radius}
                      fill="#18181b"
                      stroke={colorInfo.hex}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      className="group-hover:scale-105 transition-transform"
                    />

                    {/* Node Text Label */}
                    <text
                      textAnchor="middle"
                      dy="0.35em"
                      fill="#ffffff"
                      fontSize={node.radius > 20 ? 11 : 9.5}
                      fontWeight={isSelected ? 700 : 500}
                      className="pointer-events-none select-none tracking-tight"
                    >
                      {node.name.length > 12 ? `${node.name.slice(0, 10)}…` : node.name}
                    </text>

                    {/* Demand badge below node */}
                    {(isSelected || node.radius > 22) && (
                      <text
                        textAnchor="middle"
                        dy={node.radius + 12}
                        fill="#94a3b8"
                        fontSize={8.5}
                        fontWeight={500}
                        className="pointer-events-none select-none"
                      >
                        {node.demand}%
                      </text>
                    )}
                  </g>
                )
              })}
            </g>
          </svg>

          {/* Category Legend Bar */}
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-center gap-3 rounded-xl border border-border/40 bg-background/85 backdrop-blur-md p-2.5 text-[11px] text-muted-foreground">
            {Object.entries(categoryColors).slice(0, 6).map(([cat, info]) => (
              <div key={cat} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: info.hex }} />
                <span>{cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Skill Detail Panel */}
        <div className="lg:col-span-4 space-y-4">
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl p-5 space-y-5"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {selectedNode.category}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight mt-2 text-foreground">
                      {selectedNode.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {selectedNode.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border/40 bg-background/40 p-3">
                    <p className="text-[11px] text-muted-foreground">Industry Demand</p>
                    <p className="text-lg font-bold text-foreground mt-0.5">{selectedNode.demand}%</p>
                    <div className="h-1.5 w-full rounded-full bg-muted mt-2 overflow-hidden">
                      <div
                        className="h-full rounded-full gradient-primary"
                        style={{ width: `${selectedNode.demand}%` }}
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/40 bg-background/40 p-3">
                    <p className="text-[11px] text-muted-foreground">Market Growth</p>
                    <p className={cn(
                      'text-lg font-bold mt-0.5',
                      selectedNode.growth > 0 ? 'text-green-400' : 'text-red-400'
                    )}>
                      {selectedNode.growth > 0 ? `+${selectedNode.growth}%` : `${selectedNode.growth}%`}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1.5">
                      {selectedNode.jobCount?.toLocaleString()} active jobs
                    </p>
                  </div>
                </div>

                {/* Frequently Paired With (Section 13 Core Requirement) */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Frequently Paired Together
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {selectedNode.pairedSkills?.map((skillId) => {
                      const paired = skills.find(s => s.id === skillId)
                      if (!paired) return null
                      return (
                        <div
                          key={skillId}
                          onClick={() => setSelectedNode(paired)}
                          className="group flex items-center justify-between p-2 rounded-lg border border-border/40 bg-background/30 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-primary/70" />
                            <div>
                              <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                                {paired.name}
                              </p>
                              <p className="text-[10px] text-muted-foreground">{paired.category}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-muted-foreground">
                              {paired.demand}%
                            </span>
                            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Associated Roles */}
                <div>
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                    Demanded By Roles
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.roles?.map(role => (
                      <span
                        key={role}
                        className="rounded-md border border-border/50 bg-muted/40 px-2 py-1 text-[11px] text-muted-foreground"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => navigate('/skills')}
                  className="w-full flex items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/10 hover:bg-primary/20 py-2.5 text-xs font-medium text-primary transition-colors"
                >
                  View in Skill Explorer
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl border border-dashed border-border/60 bg-card/20 p-8 text-center flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <Network className="h-7 w-7" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Select a Skill Node</h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                  Click on any node in the relationship network to inspect its co-occurrence links, frequent pairings, and role demands.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {skills.slice(0, 4).map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedNode(s)}
                      className="text-xs rounded-lg border border-border/50 bg-card/60 px-2.5 py-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
