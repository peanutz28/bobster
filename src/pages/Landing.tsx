import { Link } from 'react-router-dom'
import { brokers } from '../data/brokers'

const HIGH_RISK = brokers.filter(b => b.dangerLevel === 'high').length

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <span className="text-xl font-black text-lobster-600 tracking-tight">Bobster 🦞</span>
        <Link
          to="/onboarding"
          className="btn-primary text-sm py-2 px-4"
        >
          Get Started Free
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lobster-50 text-lobster-700 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-lobster-500 animate-pulse" />
          Your data is on {brokers.length} sites right now
        </div>

        <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight mb-6">
          Your personal data is{' '}
          <span className="text-lobster-600">#NotForSale.</span>
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Data brokers publish your home address, phone number, relatives, and more — for anyone to find.
          Bobster walks you through opting out of every major site, <strong>step by step, for free</strong>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/onboarding" className="btn-primary text-lg px-8 py-4">
            Get Started with Bob 🦞
          </Link>
          <a href="#how-it-works" className="btn-secondary text-lg px-8 py-4">
            How It Works
          </a>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          No account required · No credit card · Takes ~2 hours total
        </p>
      </section>

      {/* Stats bar */}
      <section className="bg-gray-50 border-y border-gray-100 py-10">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-4xl font-black text-lobster-600">{brokers.length}+</div>
            <div className="text-sm text-gray-600 mt-1">Data brokers covered</div>
          </div>
          <div>
            <div className="text-4xl font-black text-lobster-600">{HIGH_RISK}</div>
            <div className="text-sm text-gray-600 mt-1">High-risk sites</div>
          </div>
          <div>
            <div className="text-4xl font-black text-lobster-600">$0</div>
            <div className="text-sm text-gray-600 mt-1">Forever free</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-black text-center text-gray-900 mb-4">
          Bob's got your back 🦞
        </h2>
        <p className="text-gray-600 text-center mb-14 max-w-xl mx-auto">
          Three simple steps to take back your privacy.
        </p>

        <div className="grid sm:grid-cols-3 gap-8">
          {[
            {
              num: '1',
              title: 'Tell Bob who you are',
              desc: 'Enter your name and state. Bob instantly generates a personal risk summary showing which brokers have your data and why it matters.',
              emoji: '📋',
            },
            {
              num: '2',
              title: 'Work through your list',
              desc: 'Bob gives you exact, step-by-step instructions for each site. No guessing, no digging — just follow along and click "Done".',
              emoji: '✅',
            },
            {
              num: '3',
              title: 'Bob reminds you to renew',
              desc: 'Data brokers re-add your info every 3–6 months. Bob tracks your opt-outs and pings you when it\'s time to redo each one.',
              emoji: '🔔',
            },
          ].map(({ num, title, desc, emoji }) => (
            <div key={num} className="card p-6">
              <div className="w-10 h-10 rounded-xl bg-lobster-100 text-lobster-700 font-black text-lg flex items-center justify-center mb-4">
                {num}
              </div>
              <div className="text-2xl mb-3">{emoji}</div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-ocean-950 text-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-black text-center mb-4">Who this is for</h2>
          <p className="text-ocean-200 text-center mb-12 max-w-xl mx-auto">
            You don't need to be a privacy expert. You just need to care.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { emoji: '😨', text: 'You just found your home address on Spokeo' },
              { emoji: '👨‍👩‍👧', text: "You're a parent protecting your family's information" },
              { emoji: '🧓', text: 'Elderly users targeted by scammers using data broker info' },
              { emoji: '💔', text: 'Leaving a bad relationship and need to scrub your footprint' },
              { emoji: '🔒', text: 'Privacy-conscious people who can\'t afford $129/year for DeleteMe' },
              { emoji: '💼', text: 'Job changers who want to control what employers find about them' },
            ].map(({ emoji, text }) => (
              <div key={text} className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                <span className="text-2xl">{emoji}</span>
                <span className="text-ocean-100 text-sm leading-relaxed">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* vs DeleteMe */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-black text-center text-gray-900 mb-12">
          Why not just use DeleteMe?
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="card p-6 border-2 border-gray-200">
            <h3 className="font-bold text-gray-500 mb-4 text-sm uppercase tracking-wide">DeleteMe</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✗</span> $129/year</li>
              <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✗</span> Black box — you don't know what they do</li>
              <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✗</span> Requires trusting a third party with your data</li>
              <li className="flex items-start gap-2"><span className="text-yellow-500 mt-0.5">~</span> Automated (fewer user errors)</li>
            </ul>
          </div>
          <div className="card p-6 border-2 border-lobster-200 bg-lobster-50">
            <h3 className="font-bold text-lobster-700 mb-4 text-sm uppercase tracking-wide">Bobster 🦞</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> <strong>Free forever</strong></li>
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Full transparency — see every step</li>
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> No third party holds your personal info</li>
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Reminders when opt-outs expire</li>
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Claude-powered personalized guidance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-lobster-600 py-16 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-5xl mb-6">🦞</div>
          <h2 className="text-3xl font-black mb-4">Ready to disappear?</h2>
          <p className="text-lobster-100 mb-8 text-lg">
            Takes about 2 hours spread across a few weeks. Bob will guide every step.
          </p>
          <Link to="/onboarding" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-lobster-700 font-bold rounded-xl hover:bg-lobster-50 transition-colors text-lg shadow-lg">
            Start for free — no account needed
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <p>Bobster 🦞 · Your data is <strong className="text-gray-600">#NotForSale</strong></p>
        <p className="mt-1">Free forever · No account required · Open source</p>
      </footer>
    </div>
  )
}
