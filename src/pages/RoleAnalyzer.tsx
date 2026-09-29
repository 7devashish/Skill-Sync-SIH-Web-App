import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, TrendingUp, Users, DollarSign } from 'lucide-react'
import { jobRoles } from '@/data/seedData'
import { cn } from '@/lib/utils'
import SkillBarChart from '@/components/charts/SkillBarChart'

export default function RoleAnalyzer() {
  const [selectedRole, setSelectedRole] = useState(jobRoles[0])

  return (
    <div className="space-y-8 pb-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold tracking-tight">Role Analyzer</h1>
        <p className="text-sm text-muted-foreground mt-1">Explore skill requirements for specific job roles</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Role List */}
        <div className="lg:col-span-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Select a Role</p>
          {jobRoles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role)}
              className={cn(
                'w-full text-left rounded-xl border p-4 transition-all',
                selectedRole.id === role.id
                  ? 'border-primary/30 bg-primary/5'
                  : 'border-border/50 bg-card/60 hover:border-border hover:bg-card/80'
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">{role.name}</h3>
                  <p className="text-xs text-muted-foreground">{role.category}</p>
                </div>
                <span className={cn(
                  'text-xs font-medium',
                  role.growth > 0 ? 'text-green-400' : 'text-red-400'
                )}>
                  {role.growth > 0 ? '+' : ''}{role.growth}%
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Role Detail */}
        <div className="lg:col-span-8 space-y-6">
          <motion.div
            key={selectedRole.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Role Header */}
            <div className="rounded-xl border border-border/50 bg-card/60 p-6 mb-6">
              <h2 className="text-xl font-bold mb-1">{selectedRole.name}</h2>
              <p className="text-sm text-muted-foreground">{selectedRole.category}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
                <div className="rounded-lg bg-muted/20 p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Postings</p>
                  </div>
                  <p className="text-lg font-bold">{selectedRole.totalPostings.toLocaleString()}</p>
                </div>
                <div className="rounded-lg bg-muted/20 p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Growth</p>
                  </div>
                  <p className={cn('text-lg font-bold', selectedRole.growth > 0 ? 'text-green-400' : 'text-red-400')}>
                    {selectedRole.growth > 0 ? '+' : ''}{selectedRole.growth}%
                  </p>
                </div>
                <div className="rounded-lg bg-muted/20 p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Avg Salary</p>
                  </div>
                  <p className="text-lg font-bold">{selectedRole.avgSalary}</p>
                </div>
                <div className="rounded-lg bg-muted/20 p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Skills Required</p>
                  </div>
                  <p className="text-lg font-bold">{selectedRole.topSkills.length}</p>
                </div>
              </div>
            </div>

            {/* Skill Requirements */}
            <div className="rounded-xl border border-border/50 bg-card/60 p-6">
              <h3 className="text-sm font-semibold mb-4">Required Skills</h3>
              <div className="space-y-3">
                {selectedRole.topSkills.map((skill, i) => (
                  <div key={skill.skillId} className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground w-5">{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{skill.skillName}</span>
                        <span className="text-xs font-medium">{skill.demand}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.demand}%` }}
                          transition={{ duration: 0.6, delay: i * 0.08 }}
                          className="h-full rounded-full bg-primary"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Chart */}
            <div className="mt-6">
              <SkillBarChart
                data={selectedRole.topSkills.map(s => ({ name: s.skillName, value: s.demand }))}
                title={`${selectedRole.name} — Skill Demand Distribution`}
                height={250}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
