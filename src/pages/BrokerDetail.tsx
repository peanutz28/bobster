import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Clock, RefreshCw, Mail, Globe, Phone, ChevronRight } from 'lucide-react'
import { brokers } from '../data/brokers'
import { useApp } from '../context'
import Logo from '../components/Logo'
import type { BrokerStatus } from '../types'

const DANGER_LABEL: Record<string, { label: string; classes: string }> = {
  high:   { label: 'High risk',   classes: 'bg-red-50 text-red-600 border-red-100' },
  medium: { label: 'Medium risk', classes: 'bg-amber-50 text-amber-600 border-amber-100' },
  low:    { label: 'Low risk',    classes: 'bg-green-50 text-green-600 border-green-100' },
}

const METHOD_ICON: Record<string, React.ReactNode> = {
  online: <Globe className="w-4 h-4" />,
  email:  <Mail className="w-4 h-4" />,
  phone:  <Phone className="w-4 h-4" />,
  mail:   <Mail className="w-4 h-4" />,
}

const METHOD_LABEL: Record<string, string> = {
  online: 'Online form',
  email:  'Email request',
  phone:  'Phone call',
  mail:   'Physical mail',
}

export default function BrokerDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getBrokerStatus, updateBrokerStatus, state } = useApp()

  const broker = brokers.find(b => b.id === id)
  if (!broker) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-ink-400 mb-4">Broker not found.</p>
          <Link to="/dashboard" className="btn-primary">Back to dashboard</Link>
        </div>
      </div>
    )
  }

  const status = getBrokerStatus(broker.id)
  const progress = state.brokerProgress[broker.id]
  const danger = DANGER_LABEL[broker.dangerLevel]

  // Find next broker
  const idx = brokers.findIndex(b => b.id === id)
  const nextBroker = brokers[idx + 1]

  function setStatus(s: BrokerStatus) {
    updateBrokerStatus(broker!.id, s)
    if (s === 'done') {
      setTimeout(() => navigate('/dashboard'), 500)
    }
  }

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <div className="bg-cream-100/90 backdrop-blur-xl border-b border-ink-900/5 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-8 h-8 rounded-xl bg-cream-200 hover:bg-cream-300 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-ink-600" />
          </button>
          <Logo />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Header card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-7 mb-5"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`label-chip border ${danger.classes}`}>{danger.label}</span>
                {status === 'done' && (
                  <span className="label-chip bg-green-50 text-green-700 border border-green-100">Opted out</span>
                )}
                {status === 'due' && (
                  <span className="label-chip bg-orange-50 text-orange-600 border border-orange-100">Renewal due</span>
                )}
              </div>
              <h1 className="text-3xl font-black text-ink-900 mb-1">{broker.name}</h1>
              <a
                href={`https://${broker.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink-400 hover:text-brand-600 transition-colors flex items-center gap-1"
              >
                {broker.url}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <p className="text-sm text-ink-500 leading-relaxed mb-6">{broker.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Method', value: METHOD_LABEL[broker.optOutMethod], icon: METHOD_ICON[broker.optOutMethod] },
              { label: 'Processing', value: broker.processingTime, icon: <Clock className="w-4 h-4" /> },
              { label: 'Re-opt-out', value: `Every ${broker.reOptOutFrequency}`, icon: <RefreshCw className="w-4 h-4" /> },
              { label: 'Email confirm', value: broker.requiresEmailConfirmation ? 'Required' : 'Not needed', icon: <Mail className="w-4 h-4" /> },
            ].map(({ label, value, icon }) => (
              <div key={label} className="bg-cream-100 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-ink-400 mb-1.5">
                  {icon}
                  <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
                </div>
                <div className="text-sm font-semibold text-ink-800">{value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Data exposed */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="card p-6 mb-5"
        >
          <p className="section-label mb-4">What they have on you</p>
          <div className="flex flex-wrap gap-2">
            {broker.dataCategories.map(cat => (
              <span key={cat} className="text-xs px-3 py-1.5 bg-red-50 text-red-700 rounded-full border border-red-100 font-medium">
                {cat}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Opt-out steps */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="card p-6 mb-5"
        >
          <div className="flex items-center justify-between mb-6">
            <p className="section-label">Step-by-step opt-out</p>
            <a
              href={broker.optOutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
            >
              Open opt-out page
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-5">
            {broker.steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.07 }}
                className="flex gap-4"
              >
                <div className="shrink-0 w-7 h-7 rounded-full bg-ink-900 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {step.step}
                </div>
                <div className="flex-1 pt-0.5">
                  <p className="text-sm text-ink-700 leading-relaxed">{step.instruction}</p>
                  {step.note && (
                    <div className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3.5 py-2.5 leading-relaxed">
                      {step.note}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Progress tracker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="card p-6 mb-8"
        >
          <p className="section-label mb-5">Track your status</p>

          {status === 'done' && progress?.completedAt && (
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-5">
              <p className="text-sm font-semibold text-green-800">
                Opted out on {new Date(progress.completedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              {progress.dueAt && (
                <p className="text-xs text-green-600 mt-1">
                  Renewal needed by {new Date(progress.dueAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              )}
            </div>
          )}

          {status === 'due' && (
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-5">
              <p className="text-sm font-semibold text-orange-800">
                Your opt-out has expired — time to redo it.
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {status !== 'in_progress' && status !== 'done' && (
              <button
                onClick={() => setStatus('in_progress')}
                className="btn-outline text-sm"
              >
                Mark in progress
              </button>
            )}
            <button
              onClick={() => setStatus('done')}
              className="btn-primary text-sm"
            >
              {status === 'done' ? 'Re-do opt-out' : 'Mark as done'}
            </button>
          </div>
        </motion.div>

        {/* Next broker */}
        {nextBroker && (
          <div className="text-center">
            <p className="text-xs text-ink-400 font-medium mb-3 uppercase tracking-wide">Next up</p>
            <Link
              to={`/broker/${nextBroker.id}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-700 hover:text-brand-600 transition-colors"
            >
              {nextBroker.name}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
