import { useParams, useNavigate, Link } from 'react-router-dom'
import { brokers } from '../data/brokers'
import { useApp } from '../context'
import type { BrokerStatus } from '../types'

const DANGER_LABEL: Record<string, string> = {
  high: '🔴 High Risk',
  medium: '🟡 Medium Risk',
  low: '🟢 Low Risk',
}

const METHOD_LABEL: Record<string, string> = {
  online: '🖥️ Online form',
  email: '📧 Email request',
  phone: '📞 Phone call',
  mail: '📬 Physical mail',
}

export default function BrokerDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getBrokerStatus, updateBrokerStatus, state } = useApp()

  const broker = brokers.find(b => b.id === id)
  if (!broker) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🦞</div>
          <p className="text-gray-600">Broker not found.</p>
          <Link to="/dashboard" className="btn-primary mt-4">Back to dashboard</Link>
        </div>
      </div>
    )
  }

  const status = getBrokerStatus(broker.id)
  const progress = state.brokerProgress[broker.id]

  function setStatus(s: BrokerStatus) {
    updateBrokerStatus(broker!.id, s)
    if (s === 'done') {
      // Small delay so user sees the status change before navigating back
      setTimeout(() => navigate('/dashboard'), 600)
    }
  }

  // Find adjacent brokers for next/prev
  const idx = brokers.findIndex(b => b.id === id)
  const nextBroker = brokers[idx + 1]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-400 hover:text-gray-600 text-sm flex items-center gap-1"
          >
            ← Dashboard
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-xl font-black text-lobster-600 tracking-tight">Bobster 🦞</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Broker header */}
        <div className="card p-6 mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900">{broker.name}</h1>
              <a
                href={`https://${broker.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ocean-600 hover:underline"
              >
                {broker.url} ↗
              </a>
            </div>
            <div className="shrink-0">
              <span className="text-sm font-medium">{DANGER_LABEL[broker.dangerLevel]}</span>
            </div>
          </div>

          <p className="text-gray-600 mb-5 leading-relaxed">{broker.description}</p>

          {/* Meta grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">Method</div>
              <div className="text-sm font-medium text-gray-700">{METHOD_LABEL[broker.optOutMethod]}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">Processing</div>
              <div className="text-sm font-medium text-gray-700">{broker.processingTime}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">Re-opt-out</div>
              <div className="text-sm font-medium text-gray-700">Every {broker.reOptOutFrequency}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">Email confirm</div>
              <div className="text-sm font-medium text-gray-700">{broker.requiresEmailConfirmation ? 'Required' : 'No'}</div>
            </div>
          </div>
        </div>

        {/* Data categories */}
        <div className="card p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-3">What data they have on you</h2>
          <div className="flex flex-wrap gap-2">
            {broker.dataCategories.map(cat => (
              <span key={cat} className="px-3 py-1.5 bg-red-50 text-red-700 text-sm rounded-full border border-red-100">
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Opt-out steps */}
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900">Step-by-step opt-out</h2>
            <a
              href={broker.optOutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ocean-600 hover:underline font-medium"
            >
              Open opt-out page ↗
            </a>
          </div>

          <div className="space-y-4">
            {broker.steps.map((step) => (
              <div key={step.step} className="flex gap-4">
                <div className="shrink-0 w-7 h-7 rounded-full bg-lobster-100 text-lobster-700 font-bold text-sm flex items-center justify-center mt-0.5">
                  {step.step}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm leading-relaxed">{step.instruction}</p>
                  {step.note && (
                    <p className="mt-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                      💡 {step.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status actions */}
        <div className="card p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-4">Track your progress</h2>

          {status === 'done' && progress?.completedAt && (
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-4">
              <p className="text-green-800 text-sm font-medium">
                ✓ Opted out on {new Date(progress.completedAt).toLocaleDateString()}
              </p>
              {progress.dueAt && (
                <p className="text-green-600 text-xs mt-1">
                  Next renewal due: {new Date(progress.dueAt).toLocaleDateString()}
                </p>
              )}
            </div>
          )}

          {status === 'due' && (
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-4">
              <p className="text-orange-800 text-sm font-medium">
                ⏰ Your opt-out has expired — time to redo it!
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {status !== 'in_progress' && status !== 'done' && (
              <button
                onClick={() => setStatus('in_progress')}
                className="btn-secondary text-sm py-2.5 px-5"
              >
                Mark In Progress
              </button>
            )}
            {status !== 'done' && (
              <button
                onClick={() => setStatus('done')}
                className="btn-primary text-sm py-2.5 px-5"
              >
                Mark as Done ✓
              </button>
            )}
            {status === 'done' && (
              <button
                onClick={() => setStatus('done')}
                className="btn-primary text-sm py-2.5 px-5"
              >
                Re-do Opt-Out ↺
              </button>
            )}
          </div>
        </div>

        {/* Next broker */}
        {nextBroker && (
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-3">Ready for the next one?</p>
            <Link
              to={`/broker/${nextBroker.id}`}
              className="btn-secondary text-sm"
            >
              Next: {nextBroker.name} →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
