import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ThemeProvider } from '@/hooks/useTheme'
import Sidebar from '@/components/layout/Sidebar'
import TopNav from '@/components/layout/TopNav'
import Dashboard from '@/pages/Dashboard'
import SkillExplorer from '@/pages/SkillExplorer'
import SkillGraph from '@/pages/SkillGraph'
import IndustryTrends from '@/pages/IndustryTrends'
import RoleAnalyzer from '@/pages/RoleAnalyzer'
import CurriculumAnalyzer from '@/pages/CurriculumAnalyzer'
import SkillGap from '@/pages/SkillGap'
import Recommendations from '@/pages/Recommendations'
import Taxonomy from '@/pages/Taxonomy'
import Datasets from '@/pages/Datasets'
import Settings from '@/pages/Settings'

function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <motion.div
        className="flex-1 flex flex-col min-h-screen"
        animate={{
          marginLeft: sidebarCollapsed ? 72 : 260,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <TopNav />

        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/skills" element={<SkillExplorer />} />
            <Route path="/graph" element={<SkillGraph />} />
            <Route path="/trends" element={<IndustryTrends />} />
            <Route path="/roles" element={<RoleAnalyzer />} />
            <Route path="/curriculum" element={<CurriculumAnalyzer />} />
            <Route path="/gap" element={<SkillGap />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/taxonomy" element={<Taxonomy />} />
            <Route path="/datasets" element={<Datasets />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </motion.div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
