import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useApp } from '../context'
import { generateRiskSummary } from '../lib/claude'
import { US_STATES } from '../data/states'
import Logo from '../components/Logo'

type Step = 1 | 2

export default function Onboarding() {
  const navigate = useNavigate()
  const { setUser, setRiskSummary, completeOnboarding, state } = useApp()

  const [step, setStep] = useState<Step>(1)
  const [firstName, setFirstName] = useState(state.user?.firstName ?? '')
  const [lastName, setLastName] = useState(state.user?.lastName ?? '')
  const [userState, setUserState] = useState(state.user?.state ?? '')
  const [email, setEmail] = useState(state.user?.email ?? '')
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState(state.riskSummary ?? '')
  const [error, setError] = useState('')

  async function handleStep1(e: FormEvent) {
    e.preventDefault()
    if (!firstName.trim() || !lastName.trim() || !userState) {
      setError('Please fill in all required fields.')
      return
    }
    setError('')
    setUser({ firstName: firstName.trim(), lastName: lastName.trim(), state: userState, email: email.trim() || undefined })
    setStep(2)
    setLoading(true)

    try {
      const s = await generateRiskSummary(firstName.trim(), lastName.trim(), userState)
      setSummary(s)
      setRiskSummary(s)
    } catch {
      const fallback = `${firstName}, your personal information is likely exposed on multiple data broker sites right now. Given that you're in ${userState}, sites like Spokeo, Whitepages, BeenVerified, and TruthFinder almost certainly have your home address, phone number, and possibly your relatives listed publicly. High-risk brokers like MyLife also generate a "reputation score" that appears directly in Google results. The good news: every one of these sites has an opt-out process, and Bobster will walk you through each one. Start with the high-risk sites — they're prioritized at the top of your dashboard.`
      setSummary(fallback)
      setRiskSummary(fallback)
    } finally {
      setLoading(false)
    }
  }

  function handleFinish() {
    completeOnboarding()
    navigate('/dashboard')
  }

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  }

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      {/* Header */}
      <div className="px-8 py-5 flex items-center justify-between border-b border-ink-900/5 bg-cream-100">
        <Logo />
        <div className="flex items-center gap-3">
          <div className={`h-1.5 rounded-full w-12 transition-colors ${step >= 1 ? 'bg-brand-600' : 'bg-ink-100'}`} />
          <div className={`h-1.5 rounded-full w-12 transition-colors ${step >= 2 ? 'bg-brand-600' : 'bg-ink-100'}`} />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-8">
                  <p className="section-label mb-3">Step 1 of 2</p>
                  <h1 className="text-3xl font-black text-ink-900 mb-2">Your information</h1>
                  <p className="text-ink-500 text-sm leading-relaxed">
                    Bobster uses this to find your records and build your personal opt-out list.
                    Nothing is stored outside your browser.
                  </p>
                </div>

                <form onSubmit={handleStep1} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-ink-600 mb-2 uppercase tracking-wide">
                        First name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        placeholder="Jane"
                        className="input"
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink-600 mb-2 uppercase tracking-wide">
                        Last name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        placeholder="Smith"
                        className="input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-600 mb-2 uppercase tracking-wide">
                      State
                    </label>
                    <select
                      value={userState}
                      onChange={e => setUserState(e.target.value)}
                      className="input"
                    >
                      <option value="">Select your state</option>
                      {US_STATES.map(s => (
                        <option key={s.code} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-600 mb-2 uppercase tracking-wide">
                      Email{' '}
                      <span className="text-ink-300 font-normal normal-case tracking-normal">
                        (optional — renewal reminders)
                      </span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="input"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-brand-700 bg-brand-50 border border-brand-100 rounded-xl px-4 py-3">
                      {error}
                    </p>
                  )}

                  <button type="submit" className="btn-primary w-full py-4 text-base mt-2">
                    Build my opt-out list
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-8">
                  <p className="section-label mb-3">Step 2 of 2</p>
                  <h1 className="text-3xl font-black text-ink-900 mb-2">Your privacy report</h1>
                  <p className="text-ink-500 text-sm">
                    Personalized for {firstName} {lastName} in {userState}
                  </p>
                </div>

                <div className="card p-6 mb-5 min-h-[160px] flex items-start">
                  {loading ? (
                    <div className="w-full flex flex-col items-center justify-center py-8 gap-3">
                      <Loader2 className="w-6 h-6 text-brand-500 animate-spin" />
                      <p className="text-sm text-ink-400 font-medium">Analyzing your exposure...</p>
                    </div>
                  ) : (
                    <p className="text-sm text-ink-700 leading-relaxed">{summary}</p>
                  )}
                </div>

                <div className="bg-ink-900 rounded-2xl p-5 mb-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-ink-500 mb-4">What happens next</p>
                  <ul className="space-y-2.5">
                    {[
                      'Your dashboard shows all brokers ranked by risk',
                      'Bobster gives you exact steps for each opt-out',
                      'Progress saves automatically — no account needed',
                    ].map(text => (
                      <li key={text} className="flex items-start gap-3 text-sm text-ink-300">
                        <span className="w-5 h-5 rounded-full bg-brand-600/20 border border-brand-500/30 flex items-center justify-center shrink-0 mt-0.5">
                          <ArrowRight className="w-3 h-3 text-brand-400" />
                        </span>
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={handleFinish}
                  disabled={loading}
                  className="btn-primary w-full py-4 text-base disabled:opacity-50"
                >
                  Go to my dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
