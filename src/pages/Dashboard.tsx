import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { sortedBrokers } from '../data/brokers'
import { useApp } from '../context'
import BrokerCard from '../components/BrokerCard'
import type { BrokerStatus } from '../types'
import { requestNotificationPermission } from '../lib/notifications'

type Filter = 'all' | BrokerStatus

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-black text-lobster-600 tracking-tight">Bobster 🦞</span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {state.user?.firstName} · {state.user?.state}
            </span>
            <button
              onClick={() => navigate('/')}
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              Home
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Progress section */}
        <div className="card p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-xl font-black text-gray-900">
                {allDone ? 'Bob is proud of you 🦞' : `Hi ${state.user?.firstName}! Let's get to work.`}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {completedCount} of {totalCount} brokers opted out
                {dueCount > 0 && ` · ${dueCount} due for renewal`}
              </p>
            </div>
            {allDone && (
              <Link to="/done" className="btn-primary text-sm py-2 px-4">
                See completion card 🎉
              </Link>
            )}
          </div>

          <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
            <div
              className="bg-lobster-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>0%</span>
            <span className="font-medium text-lobster-600">{progress}% complete</span>
            <span>100%</span>
          </div>
        </div>

        {/* Risk summary */}
        {state.riskSummary && (
          <div className="bg-lobster-50 border border-lobster-100 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🦞</span>
              <span className="text-sm font-semibold text-lobster-700">Your risk summary</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{state.riskSummary}</p>
          </div>
        )}

        {/* Notification prompt */}
        {!notifAsked && (
          <div className="bg-ocean-50 border border-ocean-100 rounded-2xl p-4 mb-6 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-ocean-800">Enable renewal reminders</div>
              <div className="text-xs text-ocean-600 mt-0.5">
                Bob will remind you when opt-outs expire (every 3–6 months).
              </div>
            </div>
            <button onClick={handleEnableNotifications} className="btn-primary text-xs py-2 px-3 shrink-0">
              Enable 🔔
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {(['all', 'not_started', 'in_progress', 'done', 'due'] as Filter[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-sm px-4 py-1.5 rounded-full font-medium transition-colors ${
                filter === f
                  ? 'bg-lobster-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-lobster-300'
              }`}
            >
              {f === 'all' ? 'All' :
               f === 'not_started' ? 'Not started' :
               f === 'in_progress' ? 'In progress' :
               f === 'done' ? 'Done' : 'Due for renewal'}
              {f === 'all' && ` (${totalCount})`}
              {f === 'done' && ` (${completedCount})`}
              {f === 'due' && dueCount > 0 && ` (${dueCount})`}
            </button>
          ))}
        </div>

        {/* Broker list */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="card p-8 text-center text-gray-500">
              No brokers in this category yet.
            </div>
          ) : (
            filtered.map(broker => (
              <BrokerCard
                key={broker.id}
                broker={broker}
                status={getBrokerStatus(broker.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
