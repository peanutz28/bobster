import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Share2, Copy } from 'lucide-react'
import { useApp } from '../context'
import { brokers } from '../data/brokers'
import Logo from '../components/Logo'

export default function Completion() {
  const { state, completedCount, totalCount } = useApp()
  const allDone = completedCount === totalCount
  const progress = Math.round((completedCount / totalCount) * 100)

  const shareText = `I just opted out of ${completedCount} data broker sites with Bobster — completely free. Your data is #NotForSale. bobster.app`

  function copyShareText() { navigator.clipboard.writeText(shareText).catch(() => {}) }
  function shareToX() {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer')
  }

  const doneBrokers = brokers.filter(b => state.brokerProgress[b.id]?.status === 'done')

  return (
    <div className="min-h-screen bg-sand-100">
      <div className="bg-white/80 backdrop-blur-xl border-b border-ink-100">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <Link to="/dashboard" className="text-xs text-ink-400 hover:text-ink-700 font-semibold transition-colors">
            Back to dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Celebration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.img
            src="/bob-wink.png"
            alt="Bob celebrating"
            animate={{ rotate: [0, -10, 10, -6, 6, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="w-32 h-32 object-contain mx-auto mb-6 drop-shadow-xl"
          />
          <p className="section-label mb-4">{allDone ? 'Bob is so proud of you.' : 'Great progress.'}</p>
          <h1 className="text-5xl font-black text-ink-900 leading-tight mb-4">
            {allDone ? 'Your data is off\nthe market.' : `${completedCount} brokers\ndown.`}
          </h1>
          <p className="text-ink-400 text-lg font-medium">
            {allDone
              ? 'Every broker in our database — opted out. Set your reminders, they\'ll try to add you back.'
              : `${completedCount} of ${totalCount} brokers removed. Keep going.`}
          </p>
        </motion.div>

        {/* Shareable card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-ink-900 rounded-3xl p-8 text-center mb-5 shadow-card-lg"
        >
          <Logo dark size="md" />
          <div className="mt-8 text-5xl font-black text-white mb-1">{progress}%</div>
          <div className="text-ink-400 text-sm font-medium mb-8">of data broker exposure removed</div>

          <div className="inline-flex items-center gap-4 bg-ink-800 rounded-2xl px-6 py-4 border border-ink-700">
            <div className="text-left">
              <div className="text-xs text-ink-500 font-bold uppercase tracking-widest mb-0.5">Opted out of</div>
              <div className="text-2xl font-black text-white">{completedCount} brokers</div>
            </div>
            <div className="w-px h-10 bg-ink-700" />
            <div className="text-left">
              <div className="text-xs text-ink-500 font-bold uppercase tracking-widest mb-0.5">My data is</div>
              <div className="text-xl font-black text-brand-400">#NotForSale</div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6 mb-4"
        >
          <p className="section-label mb-2">Share your win</p>
          <p className="text-sm text-ink-400 mb-5 leading-relaxed">
            Help others find out their data is out there — and that there's a free way to fix it.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={shareToX} className="btn-primary text-sm py-2.5 px-5">
              <Share2 className="w-4 h-4" /> Share on X
            </button>
            <button onClick={copyShareText} className="btn-outline text-sm py-2.5 px-5">
              <Copy className="w-4 h-4" /> Copy text
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          className="card p-6 mb-4"
        >
          <p className="section-label mb-2">Stay protected</p>
          <p className="text-sm text-ink-400 mb-5 leading-relaxed">
            Brokers re-add your info every 3–6 months. Bob tracks due dates on your dashboard.
          </p>
          <Link to="/dashboard" className="btn-primary text-sm inline-flex py-2.5 px-5">
            Go to dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {doneBrokers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44 }}
            className="card p-6"
          >
            <p className="section-label mb-5">Opted out of ({doneBrokers.length})</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5">
              {doneBrokers.map(b => (
                <Link
                  key={b.id}
                  to={`/broker/${b.id}`}
                  className="flex items-center gap-2 text-xs font-semibold text-ink-400 hover:text-brand-600 transition-colors"
                >
                  <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                  {b.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
