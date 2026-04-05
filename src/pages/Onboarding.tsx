import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context'
import { generateRiskSummary } from '../lib/claude'
import { US_STATES } from '../data/states'

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
      const fallback = `Hi ${firstName}! Based on your name and location in ${userState}, your personal information is likely exposed on multiple data broker sites. High-priority sites like Spokeo, Whitepages, BeenVerified, and TruthFinder often have detailed records including your home address, phone number, and relatives. Let's get you opted out — starting with the highest-risk sites first.`
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <span className="text-xl font-black text-lobster-600 tracking-tight">Bobster 🦞</span>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div className={`flex items-center gap-2 text-sm font-medium ${step >= 1 ? 'text-lobster-600' : 'text-gray-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-lobster-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</span>
            Your info
          </div>
          <div className={`h-px flex-1 ${step >= 2 ? 'bg-lobster-300' : 'bg-gray-200'}`} />
          <div className={`flex items-center gap-2 text-sm font-medium ${step >= 2 ? 'text-lobster-600' : 'text-gray-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-lobster-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</span>
            Your risk summary
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          {step === 1 && (
            <form onSubmit={handleStep1} className="card p-8">
              <div className="text-4xl mb-4">🦞</div>
              <h1 className="text-2xl font-black text-gray-900 mb-2">Let's get started</h1>
              <p className="text-gray-600 mb-8">
                Bob needs a little info to find your records and build your personal opt-out list.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      First name <span className="text-lobster-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      placeholder="Jane"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lobster-400 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Last name <span className="text-lobster-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      placeholder="Smith"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lobster-400 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    State <span className="text-lobster-500">*</span>
                  </label>
                  <select
                    value={userState}
                    onChange={e => setUserState(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lobster-400 focus:border-transparent text-gray-900 bg-white"
                  >
                    <option value="">Select your state</option>
                    {US_STATES.map(s => (
                      <option key={s.code} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email <span className="text-gray-400 text-xs font-normal">(optional — for renewal reminders)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lobster-400 focus:border-transparent text-gray-900"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
                )}

                <button type="submit" className="btn-primary w-full justify-center py-3 text-base mt-2">
                  Build My Opt-Out List →
                </button>
              </div>

              <p className="mt-4 text-xs text-gray-400 text-center">
                Your data stays in your browser. We never store or sell your information.
              </p>
            </form>
          )}

          {step === 2 && (
            <div className="card p-8">
              <div className="text-4xl mb-4">🦞</div>
              <h1 className="text-2xl font-black text-gray-900 mb-2">
                Your privacy report
              </h1>
              <p className="text-gray-500 text-sm mb-6">
                Personalized for {firstName} {lastName} in {userState}
              </p>

              {loading ? (
                <div className="py-8 text-center">
                  <div className="inline-block w-8 h-8 border-4 border-lobster-200 border-t-lobster-600 rounded-full animate-spin mb-4" />
                  <p className="text-gray-600 text-sm">Bob is analyzing your exposure...</p>
                </div>
              ) : (
                <div className="bg-lobster-50 border border-lobster-100 rounded-xl p-5 mb-6 text-gray-800 leading-relaxed text-sm whitespace-pre-wrap">
                  {summary}
                </div>
              )}

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="text-sm font-semibold text-gray-700 mb-2">What happens next:</div>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-lobster-500 mt-0.5">→</span>
                    You'll see a dashboard with all {'{N}'} data brokers ranked by risk
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lobster-500 mt-0.5">→</span>
                    Bob gives you exact steps for each opt-out
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lobster-500 mt-0.5">→</span>
                    Your progress is saved automatically in your browser
                  </li>
                </ul>
              </div>

              <button
                onClick={handleFinish}
                disabled={loading}
                className="btn-primary w-full justify-center py-3 text-base disabled:opacity-60"
              >
                Go to My Dashboard →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
