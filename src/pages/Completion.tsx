import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context'
import { brokers } from '../data/brokers'

export default function Completion() {
  const { state, completedCount, totalCount } = useApp()
  const cardRef = useRef<HTMLDivElement>(null)
  const allDone = completedCount === totalCount
  const progress = Math.round((completedCount / totalCount) * 100)

  const shareText = `I just opted out of ${completedCount} data broker sites with Bobster 🦞 — completely free. Your data is #NotForSale. Try it at bobster.app`

  function copyShareText() {
    navigator.clipboard.writeText(shareText).catch(() => {})
  }

  function shareToTwitter() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const doneIds = Object.entries(state.brokerProgress)
    .filter(([, p]) => p.status === 'done')
    .map(([id]) => id)

  const doneBrokers = brokers.filter(b => doneIds.includes(b.id))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-black text-lobster-600 tracking-tight">Bobster 🦞</span>
          <Link to="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Celebration */}
        <div className="text-center mb-10">
          <div className="text-7xl mb-4 animate-bounce inline-block">🦞</div>
          <h1 className="text-3xl font-black text-gray-900 mb-3">
            {allDone ? 'Bob is SO proud of you!' : `You've made Bob proud!`}
          </h1>
          <p className="text-gray-600 text-lg">
            {allDone
              ? `You've opted out of all ${totalCount} data brokers. Your data is #NotForSale.`
              : `You've opted out of ${completedCount} out of ${totalCount} brokers — that's huge!`
            }
          </p>
        </div>

        {/* Shareable card */}
        <div
          ref={cardRef}
          className="bg-gradient-to-br from-lobster-600 to-lobster-800 rounded-3xl p-8 text-white text-center mb-8 shadow-xl"
        >
          <div className="text-5xl mb-4">🦞</div>
          <div className="text-2xl font-black mb-2">
            I took back my data.
          </div>
          <div className="text-lobster-200 text-lg mb-4 font-medium">
            Opted out of {completedCount} data broker{completedCount !== 1 ? 's' : ''}
          </div>
          <div className="bg-white/10 rounded-2xl px-6 py-3 mb-4">
            <div className="text-3xl font-black">{progress}%</div>
            <div className="text-lobster-200 text-sm">privacy reclaimed</div>
          </div>
          <div className="text-lobster-200 text-sm font-medium tracking-wide">
            #NotForSale · Bobster 🦞
          </div>
        </div>

        {/* Share actions */}
        <div className="card p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-2">Share your win</h2>
          <p className="text-gray-500 text-sm mb-4">
            Help others find out their data is out there — and that there's a free way to fix it.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={shareToTwitter} className="btn-primary text-sm py-2.5 px-5">
              Share on X / Twitter
            </button>
            <button onClick={copyShareText} className="btn-secondary text-sm py-2.5 px-5">
              Copy text
            </button>
          </div>
        </div>

        {/* Reminder setup */}
        <div className="card p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-2">Set your renewal reminders 🔔</h2>
          <p className="text-gray-500 text-sm mb-4">
            Data brokers re-add your info every 3–6 months. Bob will remind you — but only if you let him.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
            <p>Coming back to Bobster periodically is the best way to stay opted out. Bob tracks your due dates and shows them on your dashboard.</p>
          </div>
          <Link to="/dashboard" className="btn-primary mt-4 text-sm inline-flex">
            Go to dashboard →
          </Link>
        </div>

        {/* Done brokers summary */}
        {doneBrokers.length > 0 && (
          <div className="card p-6">
            <h2 className="font-bold text-gray-900 mb-4">
              Sites you've opted out of ({doneBrokers.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {doneBrokers.map(b => (
                <Link
                  key={b.id}
                  to={`/broker/${b.id}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-lobster-600 transition-colors"
                >
                  <span className="text-green-500">✓</span>
                  {b.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
