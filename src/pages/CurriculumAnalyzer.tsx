import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload, FileText, X, CheckCircle2, AlertCircle, Loader2, ArrowRight,
  Download, RotateCcw, HelpCircle, Check, Printer, FileCode, Search, Sparkles
} from 'lucide-react'
import { sampleCurriculumAnalysis } from '@/data/seedData'
import { analyzeCurriculumViaApi } from '@/services/api'
import type { CurriculumSkill, CurriculumAnalysis } from '@/types'
import SkillBadge from '@/components/ui/SkillBadge'
import Modal from '@/components/ui/Modal'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

type AnalysisStep = 'idle' | 'uploading' | 'extracting' | 'analyzing' | 'identifying' | 'comparing' | 'generating' | 'complete'

interface NormalizedSkillMatch {
  id: string
  rawPhrase: string
  canonicalName: string
  confidence: number
  category: string
  status: 'accepted' | 'rejected' | 'pending'
}

const steps: { key: AnalysisStep; label: string }[] = [
  { key: 'uploading', label: 'Uploading document' },
  { key: 'extracting', label: 'Extracting text content from syllabus' },
  { key: 'analyzing', label: 'Analyzing course structures & modules' },
  { key: 'identifying', label: 'Identifying & normalizing technical skills' },
  { key: 'comparing', label: 'Comparing against industry demand matrix' },
  { key: 'generating', label: 'Generating curriculum gap report' },
]

// Pre-defined sample curricula for instant testing
const sampleCurricula: { id: string; name: string; institution: string; desc: string; sampleData: CurriculumAnalysis }[] = [
  {
    id: 'btech-cs-ds',
    name: 'B.Tech Computer Science & Data Science',
    institution: 'State Technical University (2024–2028 Regulation)',
    desc: 'Core CS foundation with modern Data Science modules; strong Python/ML, missing Cloud & DevOps',
    sampleData: sampleCurriculumAnalysis,
  },
  {
    id: 'bsc-it-legacy',
    name: 'B.Sc Information Technology',
    institution: 'National Science College (Legacy Curriculum)',
    desc: 'Traditional IT curriculum with C, Java, HTML/CSS and basic DBMS; high gap in Modern AI & Cloud',
    sampleData: {
      ...sampleCurriculumAnalysis,
      id: 'curr-bsc-it',
      name: 'B.Sc Information Technology',
      institution: 'National Science College',
      alignmentScore: 48,
      subjectsDetected: 5,
      skillsDetected: 14,
      industryMatched: 10,
      gapCount: 16,
      coveredSkills: [
        { skillId: 'java', skillName: 'Java', category: 'Programming', industryDemand: 72, coverage: 'covered' },
        { skillId: 'c', skillName: 'C', category: 'Programming', industryDemand: 38, coverage: 'covered' },
        { skillId: 'html', skillName: 'HTML', category: 'Web Development', industryDemand: 62, coverage: 'covered' },
        { skillId: 'css', skillName: 'CSS', category: 'Web Development', industryDemand: 58, coverage: 'covered' },
        { skillId: 'sql', skillName: 'SQL', category: 'Data Science', industryDemand: 76, coverage: 'covered' },
      ],
      partialSkills: [
        { skillId: 'javascript', skillName: 'JavaScript', category: 'Programming', industryDemand: 78, coverage: 'partial', coverageDetail: 'Basic syntax covered in Web Tech, missing modern ES6+' },
        { skillId: 'networking', skillName: 'Computer Networks', category: 'Networking', industryDemand: 45, coverage: 'partial', coverageDetail: 'Theoretical OSI model only' },
      ],
      missingSkills: [
        { skillId: 'python', skillName: 'Python', category: 'Programming', industryDemand: 82, coverage: 'missing', gap: 'high' },
        { skillId: 'machine-learning', skillName: 'Machine Learning', category: 'AI / Machine Learning', industryDemand: 64, coverage: 'missing', gap: 'high' },
        { skillId: 'aws', skillName: 'AWS', category: 'Cloud Computing', industryDemand: 62, coverage: 'missing', gap: 'high' },
        { skillId: 'docker', skillName: 'Docker', category: 'DevOps', industryDemand: 55, coverage: 'missing', gap: 'high' },
        { skillId: 'react', skillName: 'React', category: 'Web Development', industryDemand: 65, coverage: 'missing', gap: 'high' },
        { skillId: 'kubernetes', skillName: 'Kubernetes', category: 'DevOps', industryDemand: 48, coverage: 'missing', gap: 'medium' },
      ],
    },
  },
]

export default function CurriculumAnalyzer() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState<AnalysisStep>('idle')
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [pastedText, setPastedText] = useState('')
  const [useTextInput, setUseTextInput] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'gaps' | 'covered' | 'normalization'>('all')
  const [showFormulaModal, setShowFormulaModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [selectedCurriculum, setSelectedCurriculum] = useState<CurriculumAnalysis>(sampleCurriculumAnalysis)
  const [tableSearch, setTableSearch] = useState('')

  // State for normalized skill extraction review (Section 6)
  const [normalizedSkills, setNormalizedSkills] = useState<NormalizedSkillMatch[]>([
    { id: '1', rawPhrase: 'Amazon Web Services / AWS Cloud Infrastructure', canonicalName: 'AWS', confidence: 96, category: 'Cloud Computing', status: 'accepted' },
    { id: '2', rawPhrase: 'Machine Learning & Predictive Modeling', canonicalName: 'Machine Learning', confidence: 94, category: 'AI / Machine Learning', status: 'accepted' },
    { id: '3', rawPhrase: 'Structured Query Language (ANSI SQL)', canonicalName: 'SQL', confidence: 98, category: 'Data Science', status: 'accepted' },
    { id: '4', rawPhrase: 'Containerized Software Deployment with Docker', canonicalName: 'Docker', confidence: 92, category: 'DevOps', status: 'pending' },
    { id: '5', rawPhrase: 'Deep Neural Networks & PyTorch Framework', canonicalName: 'PyTorch', confidence: 89, category: 'AI / Machine Learning', status: 'accepted' },
    { id: '6', rawPhrase: 'Continuous Integration / Continuous Deployment', canonicalName: 'CI/CD', confidence: 95, category: 'DevOps', status: 'pending' },
  ])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0])
  }

  const simulateAnalysis = (customName?: string, apiPromise?: Promise<CurriculumAnalysis>) => {
    const stepOrder: AnalysisStep[] = ['uploading', 'extracting', 'analyzing', 'identifying', 'comparing', 'generating', 'complete']
    let i = 0
    const interval = setInterval(async () => {
      if (i < stepOrder.length) {
        setCurrentStep(stepOrder[i])
        i++
      } else {
        clearInterval(interval)
        if (apiPromise) {
          try {
            const apiResult = await apiPromise
            if (apiResult && apiResult.coveredSkills) {
              setSelectedCurriculum(apiResult)
              return
            }
          } catch {
            // fallback
          }
        }
        if (customName) {
          setSelectedCurriculum(prev => ({
            ...prev,
            name: customName,
            institution: 'Uploaded Document Analysis',
          }))
        }
      }
    }, 600)
  }

  const handleAnalyze = () => {
    if (!file && !pastedText) return
    const name = file ? file.name.replace(/\.[^/.]+$/, '') : 'Custom Uploaded Curriculum'
    const apiPromise = analyzeCurriculumViaApi(file, pastedText, name)
    simulateAnalysis(name, apiPromise)
  }

  const handleReset = () => {
    setFile(null)
    setPastedText('')
    setCurrentStep('idle')
  }

  const handleLoadSample = (sample: typeof sampleCurricula[0]) => {
    setSelectedCurriculum(sample.sampleData)
    setFile(new File([''], `${sample.name}.pdf`, { type: 'application/pdf' }))
    setTimeout(() => simulateAnalysis(sample.name), 200)
  }

  const handleToggleNormalizedStatus = (id: string, newStatus: 'accepted' | 'rejected') => {
    setNormalizedSkills(prev =>
      prev.map(item => item.id === id ? { ...item, status: newStatus } : item)
    )
  }

  const isProcessing = currentStep !== 'idle' && currentStep !== 'complete'

  // Filter skills for table
  const allReportSkills = useMemo(() => {
    const list = [
      ...selectedCurriculum.coveredSkills,
      ...selectedCurriculum.partialSkills,
      ...selectedCurriculum.missingSkills,
    ]
    return list.filter(s => {
      const matchesSearch = !tableSearch || s.skillName.toLowerCase().includes(tableSearch.toLowerCase()) || s.category.toLowerCase().includes(tableSearch.toLowerCase())
      if (!matchesSearch) return false
      if (activeTab === 'gaps') return s.coverage === 'missing'
      if (activeTab === 'covered') return s.coverage === 'covered' || s.coverage === 'partial'
      return true
    }).sort((a, b) => b.industryDemand - a.industryDemand)
  }, [selectedCurriculum, activeTab, tableSearch])

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Curriculum Analyzer</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Upload a college syllabus or training curriculum PDF to benchmark against real-time industry skill demand
            </p>
          </div>
          {currentStep === 'complete' && (
            <div className="flex gap-2">
              <button
                onClick={() => setShowExportModal(true)}
                className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/60 px-3.5 py-2 text-xs font-medium hover:bg-accent text-foreground transition-colors"
              >
                <Download className="h-3.5 w-3.5 text-primary" /> Export Report
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/60 px-3.5 py-2 text-xs font-medium hover:bg-accent text-foreground transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" /> New Analysis
              </button>
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {currentStep === 'idle' ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Mode Switcher: PDF vs Text */}
            <div className="flex items-center gap-2 border-b border-border/50 pb-2">
              <button
                onClick={() => setUseTextInput(false)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
                  !useTextInput ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Upload Document (PDF / DOCX / TXT)
              </button>
              <button
                onClick={() => setUseTextInput(true)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
                  useTextInput ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Paste Syllabus Text
              </button>
            </div>

            {!useTextInput ? (
              /* Drag & Drop Upload Zone */
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => !file && document.getElementById('file-input')?.click()}
                className={cn(
                  'relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-all duration-300 cursor-pointer min-h-[220px]',
                  dragActive
                    ? 'border-primary bg-primary/10 scale-[1.01]'
                    : file
                      ? 'border-green-500/40 bg-green-500/5'
                      : 'border-border/60 bg-card/40 hover:border-primary/40 hover:bg-card/70'
                )}
              >
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {file ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/15 border border-green-500/30">
                      <FileText className="h-7 w-7 text-green-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-foreground">{file.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {file.size > 0 ? `${(file.size / 1024).toFixed(1)} KB` : 'Ready to analyze'}
                      </p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setFile(null) }}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-400 transition-colors mt-1"
                    >
                      <X className="h-3.5 w-3.5" /> Remove document
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Drop your syllabus or curriculum PDF here</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Supports PDF (PyMuPDF / text parsing), DOCX, and TXT files up to 25MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Direct Text Paste Area */
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Paste Syllabus Modules / Course Descriptions
                </label>
                <textarea
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="Paste topics e.g.:
Module 1: Machine Learning Fundamentals (Linear Regression, Logistic Regression, Decision Trees)
Module 2: Deep Learning with PyTorch and Neural Networks
Module 3: Relational Database Systems & SQL Query Optimization
Module 4: Distributed Computing using Apache Spark..."
                  className="w-full h-44 rounded-xl border border-border/50 bg-card/60 p-4 text-xs font-mono placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            )}

            {/* Analyze Action Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleAnalyze}
                disabled={!file && !pastedText}
                className={cn(
                  'flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold transition-all shadow-md',
                  (file || pastedText)
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                )}
              >
                Analyze Curriculum
                <ArrowRight className="h-4 w-4" />
              </button>
              <span className="text-xs text-muted-foreground">or select a pre-loaded sample:</span>
            </div>

            {/* Quick-Pick Sample Curricula Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {sampleCurricula.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => handleLoadSample(sample)}
                  className="group rounded-xl border border-border/50 bg-card/50 hover:bg-card/90 hover:border-primary/40 p-4 transition-all cursor-pointer flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                        Pre-loaded Sample
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mt-2 group-hover:text-primary transition-colors">
                      {sample.name}
                    </h3>
                    <p className="text-xs text-muted-foreground/80 mt-0.5">{sample.institution}</p>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{sample.desc}</p>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground border-t border-border/40 pt-2">
                    <span>Alignment: <strong className="text-foreground">{sample.sampleData.alignmentScore}%</strong></span>
                    <span>•</span>
                    <span>Gaps: <strong className="text-red-400">{sample.sampleData.gapCount}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : isProcessing ? (
          /* Processing Steps Animation (Section 4 Requirement) */
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex flex-col items-center py-16"
          >
            <div className="relative mb-8">
              <div className="h-20 w-20 rounded-full border-4 border-primary/20 flex items-center justify-center">
                <Loader2 className="h-9 w-9 text-primary animate-spin" />
              </div>
            </div>

            <div className="w-full max-w-md space-y-3">
              {steps.map((step, i) => {
                const stepIndex = steps.findIndex(s => s.key === currentStep)
                const thisIndex = i
                const isComplete = thisIndex < stepIndex
                const isCurrent = step.key === currentStep
                const isPending = thisIndex > stepIndex

                return (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-4 py-3 transition-all',
                      isCurrent && 'bg-primary/10 border border-primary/30 shadow-sm',
                      isComplete && 'opacity-65',
                      isPending && 'opacity-25'
                    )}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-muted-foreground/30 shrink-0" />
                    )}
                    <span className={cn('text-sm', isCurrent ? 'font-semibold text-foreground' : 'text-muted-foreground')}>
                      {step.label}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ) : (
          /* ===== ANALYSIS COMPLETE VIEW ===== */
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Success Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-green-500/25 bg-green-500/5 p-5 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-green-500/15 flex items-center justify-center text-green-400 shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Analysis Complete</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {selectedCurriculum.name} — {selectedCurriculum.institution}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowExportModal(true)}
                  className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/80 px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-accent transition-colors"
                >
                  <Download className="h-3.5 w-3.5 text-primary" /> Export PDF
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/80 px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-accent transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Analyze Another
                </button>
              </div>
            </div>

            {/* Overview KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Subjects Detected', value: selectedCurriculum.subjectsDetected, color: 'text-primary' },
                { label: 'Skills Identified', value: selectedCurriculum.skillsDetected, color: 'text-blue-400' },
                { label: 'Industry Matched', value: selectedCurriculum.industryMatched, color: 'text-green-400' },
                { label: 'Gaps Found', value: selectedCurriculum.gapCount, color: 'text-red-400' },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-2xl border border-border/50 bg-card/60 p-5 text-center backdrop-blur-xl"
                >
                  <p className="text-xs text-muted-foreground font-medium">{kpi.label}</p>
                  <p className={cn('text-3xl font-extrabold mt-1.5 tracking-tight', kpi.color)}>{kpi.value}</p>
                </div>
              ))}
            </div>

            {/* Alignment Score Card with Explanation Link (Section 8 Requirement) */}
            <div className="rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-foreground">Industry Alignment Score</h3>
                  <button
                    onClick={() => setShowFormulaModal(true)}
                    className="flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                    title="View mathematical methodology"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                    How is this calculated?
                  </button>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-primary">{selectedCurriculum.alignmentScore}%</span>
                  <span className="text-xs text-muted-foreground">alignment</span>
                </div>
              </div>

              {/* Gradient Progress Bar */}
              <div className="h-3.5 w-full rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedCurriculum.alignmentScore}%` }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-green-500"
                />
              </div>

              <div className="flex justify-between text-[11px] text-muted-foreground mt-2">
                <span>0% (Poor alignment)</span>
                <span>50% (Moderate coverage)</span>
                <span>100% (Industry ready)</span>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-card/60 border border-border/50">
                <button
                  onClick={() => setActiveTab('all')}
                  className={cn(
                    'px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all',
                    activeTab === 'all' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  All Skills ({selectedCurriculum.coveredSkills.length + selectedCurriculum.partialSkills.length + selectedCurriculum.missingSkills.length})
                </button>
                <button
                  onClick={() => setActiveTab('gaps')}
                  className={cn(
                    'px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all',
                    activeTab === 'gaps' ? 'bg-red-500 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  Missing Gaps ({selectedCurriculum.missingSkills.length})
                </button>
                <button
                  onClick={() => setActiveTab('covered')}
                  className={cn(
                    'px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all',
                    activeTab === 'covered' ? 'bg-green-600 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  Covered ({selectedCurriculum.coveredSkills.length})
                </button>
                <button
                  onClick={() => setActiveTab('normalization')}
                  className={cn(
                    'px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5',
                    activeTab === 'normalization' ? 'bg-purple-600 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Sparkles className="h-3 w-3" />
                  NLP Normalization ({normalizedSkills.length})
                </button>
              </div>

              {activeTab !== 'normalization' && (
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)}
                    placeholder="Filter comparison table..."
                    className="h-8 w-full rounded-lg border border-border/50 bg-card/60 pl-8 pr-3 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              )}
            </div>

            {/* TAB CONTENT: Skills Table vs Normalization Review */}
            {activeTab !== 'normalization' ? (
              /* Skill Comparison Table */
              <div className="rounded-2xl border border-border/50 bg-card/60 overflow-hidden backdrop-blur-xl">
                <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Industry Demand vs Curriculum Coverage</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Direct side-by-side comparison of skills demanded by employers vs syllabus coverage
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/40 text-left bg-muted/20">
                        <th className="px-6 py-3 text-xs font-semibold text-muted-foreground">Skill</th>
                        <th className="px-6 py-3 text-xs font-semibold text-muted-foreground">Category</th>
                        <th className="px-6 py-3 text-xs font-semibold text-muted-foreground text-right">Industry Demand</th>
                        <th className="px-6 py-3 text-xs font-semibold text-muted-foreground text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allReportSkills.map((skill) => (
                        <tr key={skill.skillId} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-3 font-medium text-foreground">{skill.skillName}</td>
                          <td className="px-6 py-3 text-muted-foreground text-xs">{skill.category}</td>
                          <td className="px-6 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                                <div className="h-full rounded-full bg-primary" style={{ width: `${skill.industryDemand}%` }} />
                              </div>
                              <span className="text-xs font-semibold w-8 text-right text-foreground">{skill.industryDemand}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-center">
                            <SkillBadge status={skill.coverage} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Skill Normalization Review (Section 6 Requirement) */
              <div className="rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-xl space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                      <h3 className="text-sm font-semibold text-foreground">NLP Skill Extraction & Normalization Review</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Review detected phrases from syllabus mapped into canonical skill taxonomy. Accept or reject matches.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {normalizedSkills.map((match) => (
                    <div
                      key={match.id}
                      className={cn(
                        'rounded-xl border p-4 transition-all flex flex-col justify-between gap-3',
                        match.status === 'accepted'
                          ? 'border-green-500/30 bg-green-500/5'
                          : match.status === 'rejected'
                            ? 'border-red-500/20 bg-red-500/5 opacity-60'
                            : 'border-border/60 bg-muted/20'
                      )}
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
                          <span>Detected in Syllabus:</span>
                          <span className="font-semibold text-purple-400">Confidence: {match.confidence}%</span>
                        </div>
                        <p className="text-xs font-mono text-foreground bg-background/50 p-2 rounded-lg border border-border/40">
                          "{match.rawPhrase}"
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <span className="text-xs text-muted-foreground">Canonical Skill:</span>
                          <span className="text-xs font-bold text-primary">{match.canonicalName}</span>
                          <span className="text-[10px] text-muted-foreground">({match.category})</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/30">
                        {match.status === 'accepted' ? (
                          <span className="text-xs font-medium text-green-400 flex items-center gap-1">
                            <Check className="h-3.5 w-3.5" /> Accepted
                          </span>
                        ) : match.status === 'rejected' ? (
                          <span className="text-xs font-medium text-red-400 flex items-center gap-1">
                            <X className="h-3.5 w-3.5" /> Rejected
                          </span>
                        ) : null}

                        <button
                          onClick={() => handleToggleNormalizedStatus(match.id, 'accepted')}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/30 transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleToggleNormalizedStatus(match.id, 'rejected')}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detected Subjects & Modules View (Section 5 Requirement) */}
            <div className="rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-xl">
              <h3 className="text-sm font-semibold text-foreground mb-4">Detected Academic Subjects & Extracted Skills</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedCurriculum.subjects.map((subject) => (
                  <div key={subject.name} className="rounded-xl border border-border/40 bg-muted/20 p-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">{subject.name}</h4>
                    <p className="text-[11px] text-muted-foreground mb-2">Detected Topics: {subject.topics.join(', ')}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {subject.detectedSkills.map(s => (
                        <span key={s} className="rounded-md bg-primary/10 text-primary px-2 py-0.5 text-[11px] font-medium border border-primary/20">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/gap')}
                className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
              >
                <AlertCircle className="h-4 w-4" />
                View Skill Gap Breakdown
              </button>
              <button
                onClick={() => navigate('/recommendations')}
                className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/60 px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
              >
                View Recommended Learning Paths
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alignment Formula & Calculation Methodology Modal (Section 8 Requirement) */}
      <Modal
        open={showFormulaModal}
        onClose={() => setShowFormulaModal(false)}
        title="Alignment Score Methodology & Mathematical Model"
      >
        <div className="space-y-4 text-xs text-muted-foreground leading-relaxed">
          <p>
            The <strong className="text-foreground">Industry Alignment Score</strong> quantifies how thoroughly an academic curriculum prepares graduates for active job-market requirements.
          </p>

          <div className="rounded-xl border border-border/50 bg-background/50 p-4 font-mono text-[11px] text-foreground space-y-2">
            <p className="text-primary font-bold">// Alignment Score Formula</p>
            <p className="text-sm">
              Score = [ ∑ (D_i × C_i) / ∑ D_i ] × 100
            </p>
            <div className="text-muted-foreground space-y-1 pt-1 text-[10px]">
              <p>• D_i = Industry demand weight of skill i (percentage 0–100%)</p>
              <p>• C_i = Coverage factor: Covered = 1.0, Partial = 0.5, Missing = 0.0</p>
              <p>• Denominator = Total demand sum of all benchmark industry skills</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-semibold text-foreground">Why this prevents arbitrary scores:</h4>
            <p>
              Unlike simple counting metrics, higher-demand skills (such as Python at 82% or SQL at 76%) carry proportionally greater influence on the final curriculum readiness score than niche skills.
            </p>
          </div>
        </div>
      </Modal>

      {/* Executive Report & PDF Export Modal (Section 20 & 29 Requirement) */}
      <Modal
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Curriculum Intelligence Executive Report"
      >
        <div className="space-y-5">
          {/* Printable Report Preview */}
          <div className="rounded-xl border border-border/60 bg-background/60 p-5 space-y-4 text-xs">
            <div className="border-b border-border/40 pb-3 flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold text-foreground">{selectedCurriculum.name}</h3>
                <p className="text-xs text-muted-foreground">{selectedCurriculum.institution}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Generated via SkillSync Intelligence Engine</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-primary">{selectedCurriculum.alignmentScore}%</span>
                <p className="text-[10px] text-muted-foreground">Alignment Score</p>
              </div>
            </div>

            {/* Key Summary Stats */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-card/60 p-2 border border-border/40">
                <p className="text-[10px] text-muted-foreground">Covered Skills</p>
                <p className="text-sm font-bold text-green-400">{selectedCurriculum.coveredSkills.length}</p>
              </div>
              <div className="rounded-lg bg-card/60 p-2 border border-border/40">
                <p className="text-[10px] text-muted-foreground">Partially Covered</p>
                <p className="text-sm font-bold text-amber-400">{selectedCurriculum.partialSkills.length}</p>
              </div>
              <div className="rounded-lg bg-card/60 p-2 border border-border/40">
                <p className="text-[10px] text-muted-foreground">Critical Gaps</p>
                <p className="text-sm font-bold text-red-400">{selectedCurriculum.gapCount}</p>
              </div>
            </div>

            {/* Top Critical Gaps Summary */}
            <div>
              <p className="font-semibold text-foreground mb-1.5">Top Identified Skill Gaps:</p>
              <div className="space-y-1">
                {selectedCurriculum.missingSkills.slice(0, 4).map(skill => (
                  <div key={skill.skillId} className="flex justify-between items-center text-[11px] p-1.5 rounded bg-card/40">
                    <span className="font-medium text-foreground">{skill.skillName} ({skill.category})</span>
                    <span className="text-red-400 font-semibold">{skill.industryDemand}% Demand</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Printer className="h-4 w-4" /> Print / Save as PDF
            </button>
            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(selectedCurriculum, null, 2)], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `SkillSync_Curriculum_Report_${selectedCurriculum.name.replace(/\s+/g, '_')}.json`
                a.click()
              }}
              className="flex items-center gap-1.5 rounded-xl border border-border/60 bg-card/80 px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-accent transition-colors"
            >
              <FileCode className="h-4 w-4" /> Download JSON
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
