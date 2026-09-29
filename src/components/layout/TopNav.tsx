import { useState, useRef, useEffect } from 'react'
import { Search, Bell, Sun, Moon, User, CheckCircle2, TrendingUp, AlertTriangle, ArrowRight, X } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { motion, AnimatePresence } from 'framer-motion'
import { searchSkills, jobRoles } from '@/data/seedData'
import { useNavigate } from 'react-router-dom'

interface NotificationItem {
  id: string
  title: string
  desc: string
  time: string
  unread: boolean
  type: 'alert' | 'trend' | 'info'
}

export default function TopNav() {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Curriculum Gap Alert',
      desc: 'B.Tech CSE curriculum missing 3 High-Priority industry skills (AWS, Docker, Spark)',
      time: '10m ago',
      unread: true,
      type: 'alert',
    },
    {
      id: '2',
      title: 'Market Trend Surge',
      desc: 'LLMs & Generative AI demand jumped +142% this quarter across tech postings',
      time: '2h ago',
      unread: true,
      type: 'trend',
    },
    {
      id: '3',
      title: 'Dataset Updated',
      desc: 'Q4 2026 National Job Market Dataset synchronized with 12,450 records',
      time: '1d ago',
      unread: false,
      type: 'info',
    },
  ])

  const searchResults = searchQuery.trim() ? searchSkills(searchQuery).slice(0, 5) : []
  const matchingRoles = searchQuery.trim()
    ? jobRoles.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 2)
    : []

  const unreadCount = notifications.filter(n => n.unread).length

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border/50 bg-background/80 backdrop-blur-xl px-6">
      {/* Search Input with Live Dropdown */}
      <div className="flex-1 max-w-md relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search skills, roles, technologies (e.g. Python, AWS)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setSearchOpen(true)
            }}
            onFocus={() => setSearchOpen(true)}
            className="h-9 w-full rounded-xl border border-border/50 bg-muted/40 pl-9 pr-8 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('')
                setSearchOpen(false)
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Live Search Suggestions Dropdown */}
        <AnimatePresence>
          {searchOpen && searchQuery.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-border/60 bg-card/95 backdrop-blur-2xl p-3 shadow-2xl z-50 space-y-3"
            >
              {searchResults.length > 0 || matchingRoles.length > 0 ? (
                <>
                  {/* Skills Section */}
                  {searchResults.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-2 mb-1.5">
                        Matched Skills
                      </p>
                      <div className="space-y-1">
                        {searchResults.map((skill) => (
                          <div
                            key={skill.id}
                            onClick={() => {
                              setSearchOpen(false)
                              navigate('/skills')
                            }}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer group text-xs"
                          >
                            <div>
                              <span className="font-semibold text-foreground group-hover:text-primary">{skill.name}</span>
                              <span className="text-[10px] text-muted-foreground ml-2">({skill.category})</span>
                            </div>
                            <span className="text-[11px] font-medium text-muted-foreground">
                              {skill.demand}% Demand
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Roles Section */}
                  {matchingRoles.length > 0 && (
                    <div className="border-t border-border/40 pt-2">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-2 mb-1.5">
                        Matched Job Roles
                      </p>
                      <div className="space-y-1">
                        {matchingRoles.map((role) => (
                          <div
                            key={role.id}
                            onClick={() => {
                              setSearchOpen(false)
                              navigate('/roles')
                            }}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer text-xs"
                          >
                            <span className="font-semibold text-foreground">{role.name}</span>
                            <span className="text-[10px] text-muted-foreground">{role.totalPostings.toLocaleString()} jobs</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4 text-center text-xs text-muted-foreground">
                  No matching skills or roles found for "{searchQuery}"
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions (Notifications, Theme Toggle, Profile) */}
      <div className="flex items-center gap-2 relative">
        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications)
              setShowProfile(false)
            }}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Popover */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-border/60 bg-card/95 backdrop-blur-2xl p-4 shadow-2xl z-50 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-border/40 pb-2">
                  <span className="text-xs font-bold text-foreground">Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[10px] text-primary hover:underline font-medium"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        'p-2.5 rounded-xl border text-xs transition-colors flex items-start gap-2.5',
                        item.unread
                          ? 'border-primary/30 bg-primary/5'
                          : 'border-border/30 bg-muted/20 opacity-70'
                      )}
                    >
                      {item.type === 'alert' ? (
                        <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                      ) : item.type === 'trend' ? (
                        <TrendingUp className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-foreground text-[11px]">{item.title}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{item.desc}</p>
                        <span className="text-[9px] text-muted-foreground/60 mt-1 block">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* User Profile Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile)
              setShowNotifications(false)
            }}
            className="flex h-9 items-center gap-2 rounded-xl border border-border/50 bg-muted/30 px-3 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-[10px]">
              A
            </div>
            <span className="hidden sm:inline font-semibold text-foreground">Academic Admin</span>
          </button>

          {/* Profile Popover */}
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-border/60 bg-card/95 backdrop-blur-2xl p-4 shadow-2xl z-50 space-y-3"
              >
                <div className="border-b border-border/40 pb-2.5">
                  <p className="text-xs font-bold text-foreground">Prof. A. Devadiga</p>
                  <p className="text-[10px] text-muted-foreground">Dean of Academic Affairs & Curriculum</p>
                  <p className="text-[10px] text-primary mt-0.5">National Technical Institute</p>
                </div>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => {
                      setShowProfile(false)
                      navigate('/curriculum')
                    }}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Curriculum Analyzer
                  </button>
                  <button
                    onClick={() => {
                      setShowProfile(false)
                      navigate('/settings')
                    }}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    System Settings
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
