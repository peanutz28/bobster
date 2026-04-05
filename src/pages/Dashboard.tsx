import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bell, SlidersHorizontal } from 'lucide-react'
import { sortedBrokers } from '../data/brokers'
import { useApp } from '../context'
import BrokerCard from '../components/BrokerCard'
import Logo from '../components/Logo'
import type { BrokerStatus } from '../types'
import { requestNotificationPermission } from '../lib/notifications'

type Filter = 'all' | BrokerStatus

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all',         label: 'All' },
  { key: 'not_started', label: 'Not started' },
  { key: 'in_progress', label: 'In progress' },
  { key: 'done',        label: 'Opted out' },
  { key: 'due',         label: 'Renewal due' },
]

export default function Dashboard() {
  const { state, getBrokerStatus, completedCount, dueCount, totalCount, enableNotifications } = useApp()
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Filter>('all')
  const [notifAsked, setNotifAsked] = useState(state.notificationsEnabled)

  const filtered = sortedBrokers.filter(b => {
    const s = getBrokerStatus(b.id)
    return filter === 'all' || s === filter
  })

  const progress = Math.round((completedCount / totalCount) * 100)
  const allDone = completedCount === totalCount

  async function handleEnableNotifications() {
    const granted = await requestNotificationPermission()
    if (granted) {
      enableNotifications()
      setNotifAsked(true)
    }
  }

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="bg-cream-100/90 backdrop-blur-xl border-b border-ink-900/5 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <span className="text-sm text-ink-400 font-medium hidden sm:block">
              {state.user?.firstName} · {state.user?.state}
            </span>
            <button
              onClick={() => navigate('/')}
              className="text-xs text-ink-400 hover:text-ink-600 font-medium transition-colors"
            >
              Home
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Progress card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-7 mb-6"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-black text-ink-900 mb-1">
                {allDone ? 'You did it.' : `Hi ${state.user?.firstName}.`}
              </h1>
              <p className="text-sm text-ink-400 font-medium">
                {completedCount} of {totalCount} brokers opted out
                {dueCount > 0 && <span className="text-orange-500 ml-2">· {dueCount} due for renewal</span>}
              </p>
            </div>
            {allDone && (
              <Link to="/done" className="btn-primary text-xs py-2 px-4">
                View completion card
              </Link>
            )}
          </div>

          <div className="space-y-2">
            <div className="w-full bg-cream-200 rounded-full h-2.5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-brand-600 h-full rounded-full"
              />
            </div>
            <div className="flex justify-between text-xs text-ink-400 font-medium">
              <span>0 brokers</span>
              <span className="text-brand-600 font-bold">{progress}% complete</span>
              <span>{totalCount} brokers</span>
            </div>
          </div>
        </motion.div>

        {/* Risk summary */}
        {state.riskSummary && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-ink-900 rounded-2xl p-6 mb-6"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-ink-500 mb-3">Your risk summary</p>
            <p className="text-sm text-ink-300 leading-relaxed">{state.riskSummary}</p>
          </motion.div>
        )}

        {/* Notification prompt */}
        {!notifAsked && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="card p-5 mb-6 flex items-center justify-between gap-4 border-ink-100"
          >
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-cream-200 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-ink-600" />
              </span>
              <div>
                <div className="text-sm font-semibold text-ink-900">Enable renewal reminders</div>
                <div className="text-xs text-ink-400 mt-0.5">
                  Bobster will tell you when opt-outs expire.
                </div>
              </div>
            </div>
            <button onClick={handleEnableNotifications} className="btn-primary text-xs py-2 px-4 shrink-0">
              Enable
            </button>
          </motion.div>
        )}

        {/* Filters */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
          <SlidersHorizontal className="w-4 h-4 text-ink-400 shrink-0" />
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`text-xs px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-150 ${
                filter === key
                  ? 'bg-ink-900 text-white'
                  : 'bg-white border border-ink-100 text-ink-500 hover:border-ink-300'
              }`}
            >
              {label}
              {key === 'due' && dueCount > 0 && ` (${dueCount})`}
              {key === 'done' && completedCount > 0 && ` (${completedCount})`}
            </button>
          ))}
        </div>

        {/* Broker list */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="card p-10 text-center">
              <p className="text-sm text-ink-400 font-medium">No brokers in this category.</p>
            </div>
          ) : (
            filtered.map((broker, i) => (
              <motion.div
                key={broker.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
              >
                <BrokerCard broker={broker} status={getBrokerStatus(broker.id)} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
