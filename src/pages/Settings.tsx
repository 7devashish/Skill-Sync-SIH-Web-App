import { motion } from 'framer-motion'
import { Settings as SettingsIcon, User, Bell, Palette, Shield, Database, Key } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="space-y-8 pb-10 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure your SkillSync experience</p>
      </motion.div>

      {/* Appearance */}
      <SettingsSection icon={<Palette className="h-4 w-4" />} title="Appearance">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Theme</p>
            <p className="text-xs text-muted-foreground">Select your preferred color theme</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => theme !== 'dark' && toggleTheme()}
              className={cn(
                'rounded-lg px-4 py-2 text-xs font-medium border transition-all',
                theme === 'dark' ? 'bg-primary/10 text-primary border-primary/20' : 'border-border/50 text-muted-foreground hover:text-foreground'
              )}
            >
              Dark
            </button>
            <button
              onClick={() => theme !== 'light' && toggleTheme()}
              className={cn(
                'rounded-lg px-4 py-2 text-xs font-medium border transition-all',
                theme === 'light' ? 'bg-primary/10 text-primary border-primary/20' : 'border-border/50 text-muted-foreground hover:text-foreground'
              )}
            >
              Light
            </button>
          </div>
        </div>
      </SettingsSection>

      {/* Profile */}
      <SettingsSection icon={<User className="h-4 w-4" />} title="Profile">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Display Name</label>
            <input
              type="text"
              defaultValue="User"
              className="mt-1 h-9 w-full rounded-lg border border-border/50 bg-muted/30 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Institution</label>
            <input
              type="text"
              placeholder="e.g., National Institute of Technology"
              className="mt-1 h-9 w-full rounded-lg border border-border/50 bg-muted/30 px-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Role</label>
            <select className="mt-1 h-9 w-full rounded-lg border border-border/50 bg-muted/30 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option>Student</option>
              <option>Faculty / Instructor</option>
              <option>Administrator</option>
              <option>Researcher</option>
            </select>
          </div>
        </div>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection icon={<Bell className="h-4 w-4" />} title="Notifications">
        <div className="space-y-3">
          {[
            { label: 'Skill trend alerts', desc: 'Get notified when tracked skills show significant demand changes' },
            { label: 'New gap analysis reports', desc: 'Notifications when curriculum analysis completes' },
            { label: 'Taxonomy updates', desc: 'When new skills are added to the taxonomy' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-1">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <button className="relative h-5 w-9 rounded-full bg-primary/20 transition-colors">
                <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-primary transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </SettingsSection>

      {/* API */}
      <SettingsSection icon={<Key className="h-4 w-4" />} title="API & Integrations">
        <div className="rounded-lg bg-muted/20 p-4">
          <p className="text-sm text-muted-foreground">
            API keys and external integrations will be available in future updates.
            Connect NLP models, job data APIs, and LMS platforms.
          </p>
        </div>
      </SettingsSection>
    </div>
  )
}

function SettingsSection({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border/50 bg-card/60 overflow-hidden"
    >
      <div className="flex items-center gap-2 px-6 py-4 border-b border-border/50">
        <span className="text-muted-foreground">{icon}</span>
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  )
}
