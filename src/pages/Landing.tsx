import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Shield, Bell, ArrowRight, Check, X, Lock, Search, MousePointer, RefreshCw } from 'lucide-react'
import Logo from '../components/Logo'
import { brokers } from '../data/brokers'

const HIGH  = brokers.filter(b => b.dangerLevel === 'high').length
const TOTAL = brokers.length

/* ─── Helpers ──────────────────────────────────────── */
function FadeIn({ children, delay = 0, y = 24, className = '' }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  )
}

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ rotateY: 4, rotateX: -2, scale: 1.015, y: -4 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={className}
    >{children}</motion.div>
  )
}

function Sparkle({ size = 16, color = '#F2D16B', style = {} }: {
  size?: number; color?: string; style?: React.CSSProperties
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={style}>
      <path d="M8 0C8 0 8 7 8 8C8 8 1 8 0 8C0 8 8 8 8 8C8 8 8 9 8 16C8 16 8 9 8 8C8 8 15 8 16 8C16 8 8 8 8 8C8 8 8 7 8 0Z" fill={color} />
    </svg>
  )
}

const MARQUEE_BROKERS = [
  'Spokeo', 'Whitepages', 'BeenVerified', 'Intelius', 'TruthFinder', 'MyLife',
  'Radaris', 'PeopleFinders', 'TruePeopleSearch', 'PeekYou', 'Nuwber', 'VoterRecords',
  'Mugshots.com', 'FastPeopleSearch', 'ClustrMaps',
]

export default function Landing() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bobY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  return (
    <div className="bg-sand-100 overflow-x-hidden">

      {/* ── Nav ── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-4
                   bg-sand-100/85 backdrop-blur-xl border-b border-ink-200/50"
      >
        <Logo />
        <div className="hidden sm:flex items-center gap-1 text-sm font-semibold text-ink-400">
          <a href="#how"     className="px-3 py-2 rounded-lg hover:text-ink-900 hover:bg-ink-100/60 transition-all">How it works</a>
          <a href="#compare" className="px-3 py-2 rounded-lg hover:text-ink-900 hover:bg-ink-100/60 transition-all">Why Bobster</a>
        </div>
        <Link to="/onboarding" className="btn-primary py-2.5 px-5 text-sm">
          Get started free
        </Link>
      </motion.nav>

      {/* ══════════════════════════
          HERO — split, Bob visible
      ══════════════════════════ */}
      <section ref={heroRef} className="min-h-screen flex flex-col lg:flex-row items-stretch pt-[72px] overflow-hidden">

        {/* Left — text */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-16 z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="inline-flex items-center gap-2 self-start mb-8 px-4 py-2 rounded-full
                       bg-brand-100 border border-brand-200 text-brand-700 text-xs font-black uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            Free · No account needed
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl xl:text-7xl font-black text-ink-900 leading-[0.92] mb-6"
          >
            Your data is on<br />
            <span className="text-brand-600">{TOTAL} websites.</span><br />
            Let's fix that.
          </motion.h1>

          {/* What it actually does — crystal clear */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg text-ink-500 max-w-md mb-4 leading-relaxed"
          >
            Sites like Spokeo, Whitepages, and BeenVerified publish your{' '}
            <strong className="text-ink-800">home address, phone number, relatives, and income</strong>{' '}
            — free for anyone to search.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg text-ink-500 max-w-md mb-10 leading-relaxed"
          >
            Bobster gives you{' '}
            <strong className="text-ink-800">exact, step-by-step instructions</strong>{' '}
            to remove yourself from every major site. One by one. Free.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 mb-6"
          >
            <Link to="/onboarding" className="group btn-primary py-4 px-8 text-base gap-3">
              Check my exposure
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#how" className="btn-outline py-4 px-8 text-base">See how it works</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-ink-400 font-medium"
          >
            {['No credit card', '~2 hours total', 'Data stays in your browser'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-brand-400" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right — Bob stage (self-contained, no overflow) */}
        <div className="relative lg:w-[46%] flex items-center justify-center py-12 lg:py-0 overflow-hidden"
          style={{ background: 'radial-gradient(ellipse 90% 80% at 55% 50%, #fde4d0 0%, #f9d0bb 45%, #f5c0a4 100%)' }}
        >
          {/* Rings */}
          {[320, 240].map((size, i) => (
            <motion.div key={i}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute rounded-full border border-brand-300/40 pointer-events-none"
              style={{ width: size, height: size }}
            />
          ))}

          {/* Bob */}
          <motion.div style={{ y: bobY }} className="relative z-10">
            <motion.img
              src="/bob-wink.png"
              alt="Bob the privacy lobster"
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, -14, 0] }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1],
                y: { repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 1.3 } }}
              style={{ filter: 'drop-shadow(0 24px 48px rgba(180,100,80,0.28))' }}
              className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 object-contain"
            />
          </motion.div>

          {/* Sparkles — inside panel bounds */}
          {[
            { delay: 0.8,  x: '76%', y: '14%', size: 22 },
            { delay: 1.0,  x: '83%', y: '32%', size: 13 },
            { delay: 0.9,  x: '14%', y: '20%', size: 18 },
            { delay: 1.05, x: '10%', y: '70%', size: 11 },
            { delay: 1.1,  x: '80%', y: '76%', size: 10 },
          ].map(({ delay, x, y, size }, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay, duration: 0.5, ease: 'backOut' }}
              style={{ position: 'absolute', left: x, top: y }}
            >
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8 + i * 2, ease: 'linear' }}>
                <Sparkle size={size} />
              </motion.div>
            </motion.div>
          ))}

          {/* Bubble circles */}
          {[
            { delay: 0.85, x: '22%', y: '74%', size: 18 },
            { delay: 0.95, x: '16%', y: '63%', size: 11 },
            { delay: 1.0,  x: '85%', y: '58%', size: 13 },
          ].map(({ delay, x, y, size }, i) => (
            <motion.div key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay }}
              style={{ position: 'absolute', left: x, top: y }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2.5 + i * 0.4, ease: 'easeInOut' }}
                style={{
                  width: size, height: size, borderRadius: '50%',
                  border: '2px solid #b8ddf0', background: 'rgba(184,221,240,0.35)',
                }}
              />
            </motion.div>
          ))}

          {/* Callout chips — anchored inside, no overflow */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-8 right-8 card px-4 py-3 text-center shadow-card-lg"
          >
            <div className="text-2xl font-black text-ink-900">{TOTAL}</div>
            <div className="text-[11px] text-ink-400 font-semibold leading-tight">sites with<br />your data</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-8 left-8 card px-4 py-3 shadow-card-lg"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-brand-600" strokeWidth={3} />
              </span>
              <div>
                <div className="text-sm font-black text-ink-900 leading-none">Free forever</div>
                <div className="text-[11px] text-ink-400 mt-0.5">vs $129/yr DeleteMe</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="bg-ink-900 py-4 overflow-hidden">
        <div className="flex gap-14 animate-marquee whitespace-nowrap w-max">
          {[...MARQUEE_BROKERS, ...MARQUEE_BROKERS].map((name, i) => (
            <span key={i} className="text-ink-500 text-sm font-semibold shrink-0 line-through decoration-brand-500/70 decoration-2">
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats ── */}
      <section className="py-20 px-6 bg-white border-b border-ink-100">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { value: `${TOTAL}+`, label: 'Data brokers covered' },
            { value: `${HIGH}`,   label: 'High-risk sites' },
            { value: '$0',        label: 'Cost, forever' },
          ].map(({ value, label }, i) => (
            <FadeIn key={label} delay={i * 0.1}>
              <div className="text-4xl sm:text-5xl font-black text-ink-900 mb-1.5">{value}</div>
              <div className="text-xs text-ink-400 font-bold uppercase tracking-widest">{label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          HOW IT WORKS — numbered steps
          with mini flow diagram
      ══════════════════════════════ */}
      <section id="how" className="py-28 px-6 bg-sand-100">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-6">
            <p className="section-label mb-4">How it works</p>
            <h2 className="text-4xl sm:text-5xl font-black text-ink-900 mb-4">Bob walks every step.</h2>
            <p className="text-ink-400 max-w-xl mx-auto text-base leading-relaxed">
              Enter your name. Bobster finds which brokers have your data, then gives you the
              exact clicks to remove yourself — one broker at a time.
            </p>
          </FadeIn>

          {/* Mini flow */}
          <FadeIn delay={0.1} className="flex items-center justify-center gap-2 sm:gap-4 my-12 flex-wrap">
            {[
              { icon: <Search className="w-4 h-4" />, label: 'Find your records' },
              { icon: <MousePointer className="w-4 h-4" />, label: 'Follow exact steps' },
              { icon: <Check className="w-4 h-4" />, label: 'Mark as done' },
              { icon: <RefreshCw className="w-4 h-4" />, label: 'Reminded to renew' },
            ].map(({ icon, label }, i) => (
              <div key={label} className="flex items-center gap-2 sm:gap-4">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-2xl bg-brand-100 border border-brand-200 flex items-center justify-center text-brand-600">
                    {icon}
                  </div>
                  <span className="text-xs font-semibold text-ink-500 whitespace-nowrap">{label}</span>
                </div>
                {i < 3 && <ArrowRight className="w-4 h-4 text-ink-200 shrink-0 mb-4" />}
              </div>
            ))}
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { num: '01', icon: <Shield className="w-5 h-5 text-brand-600" />,  title: 'Tell Bob who you are',   body: 'Enter your name and state. Bob finds which of the 53 brokers likely have your data and ranks them by risk level.' },
              { num: '02', icon: <Lock className="w-5 h-5 text-brand-600" />,    title: 'Follow the exact steps', body: 'Each broker has a different opt-out process. Bob gives you the precise URL, exact clicks, and what to expect.' },
              { num: '03', icon: <Bell className="w-5 h-5 text-brand-600" />,    title: 'Get reminded to renew',  body: 'Brokers quietly re-add your data every 3–6 months. Bob tracks every expiration and tells you exactly when to redo it.' },
            ].map(({ num, icon, title, body }, i) => (
              <FadeIn key={num} delay={i * 0.12}>
                <TiltCard className="h-full">
                  <div className="card p-7 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-4xl font-black text-ink-100">{num}</span>
                      <span className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center">{icon}</span>
                    </div>
                    <h3 className="text-lg font-bold text-ink-900 mb-3">{title}</h3>
                    <p className="text-sm text-ink-400 leading-relaxed flex-1">{body}</p>
                  </div>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          WHAT THEY HAVE — bold, alarming
          Dark bg + high-contrast cards
      ══════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: '#1a1714' }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#4a4540' }}>
                  What they already know about you
                </p>
                <h2 className="text-4xl sm:text-5xl font-black" style={{ color: '#ffffff' }}>
                  This is for sale.<br />Right now.
                </h2>
                <p className="mt-4 text-base font-medium max-w-sm leading-relaxed" style={{ color: '#7a7470' }}>
                  Anyone can search these sites — your ex, a stalker, a scammer — for free.
                </p>
              </div>
              <motion.img
                src="/bob-happy.png"
                alt="Bob looking concerned"
                animate={{ rotate: [0, 6, -6, 0], y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="w-24 h-24 object-contain shrink-0 opacity-90"
              />
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {([
              ['Home address',       'Current and all past'],
              ['Phone number',       'Cell and landline'],
              ['Email address',      'Work and personal'],
              ['Relatives',          'Full family tree'],
              ['Income estimate',    'Within $10K'],
              ['Criminal records',   'Even dismissed charges'],
              ['Voter registration', 'Party affiliation'],
              ['Social profiles',    'Linked to your identity'],
            ] as [string, string][]).map(([label, sub], i) => (
              <FadeIn key={label} delay={i * 0.06}>
                <motion.div
                  whileHover={{ scale: 1.03, borderColor: '#c8705a' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{
                    background: '#262320',
                    border: '1.5px solid #35312d',
                    borderRadius: '1rem',
                    padding: '1.25rem',
                  }}
                >
                  <div className="text-sm font-bold mb-1" style={{ color: '#f9f6ef' }}>{label}</div>
                  <div className="text-xs" style={{ color: '#7a7470' }}>{sub}</div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who it's for ── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-20">
            <p className="section-label mb-4">Who Bobster is for</p>
            <h2 className="text-4xl sm:text-5xl font-black text-ink-900">
              You don't need to be
              <br />a privacy expert.
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'You found your address on Spokeo',             sub: 'Your home is listed publicly right now. Bobster shows you exactly how to remove it.' },
              { title: 'Parents protecting their family',               sub: 'Your kids\'s school, your address, your daily schedule — all indexed.' },
              { title: 'Getting out of a dangerous situation',          sub: 'Stalking, abusive ex, bad breakup. Your address shouldn\'t be searchable.' },
              { title: "Privacy-conscious but can't afford DeleteMe",   sub: 'Same result. Zero dollars. Bobster is the free alternative.' },
              { title: 'Elderly users targeted by scammers',           sub: 'Data brokers fuel phone scams. Removing your info cuts the risk directly.' },
              { title: 'New mover, job change, fresh start',           sub: 'Your old address and employer are still listed on dozens of sites.' },
            ].map(({ title, sub }, i) => (
              <FadeIn key={title} delay={i * 0.08}>
                <TiltCard>
                  <div className="card card-hover p-6 flex items-start gap-4 transition-shadow">
                    <span className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Shield className="w-4 h-4 text-brand-600" />
                    </span>
                    <div>
                      <div className="font-bold text-ink-900 text-sm mb-1">{title}</div>
                      <div className="text-xs text-ink-400 leading-relaxed">{sub}</div>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section id="compare" className="py-28 px-6 bg-sand-100">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-20">
            <p className="section-label mb-4">Why Bobster</p>
            <h2 className="text-4xl sm:text-5xl font-black text-ink-900">
              DeleteMe charges $129/year.<br />
              <span className="text-brand-600">Bobster is free.</span>
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-4">
            <FadeIn delay={0.1}>
              <div className="card p-7 h-full">
                <div className="section-label text-ink-300 mb-6">DeleteMe</div>
                <ul className="space-y-4">
                  {['$129 per year', "You can't see what they do", 'Third party holds your data', 'No visibility into the process', 'Auto-renewal billing'].map(text => (
                    <li key={text} className="flex items-center gap-3 text-sm">
                      <span className="w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                        <X className="w-3 h-3 text-red-400" />
                      </span>
                      <span className="text-ink-500">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div className="card p-7 h-full border-2 border-brand-200"
                   style={{ background: 'linear-gradient(135deg, #fef6f3 0%, #fde9e3 100%)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="section-label text-brand-500">Bobster</span>
                  <img src="/bob-wink.png" alt="Bob" className="w-8 h-8 object-contain" />
                </div>
                <ul className="space-y-4">
                  {['Free forever', 'You see every single step', 'Stays in your browser — no third party', 'Full transparency and control', 'Renewal reminders built in'].map(text => (
                    <li key={text} className="flex items-center gap-3 text-sm">
                      <span className="w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </span>
                      <span className="font-semibold text-ink-800">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Final CTA — terracotta ── */}
      <section className="relative py-32 px-6 overflow-hidden"
               style={{ background: 'linear-gradient(160deg, #c8705a 0%, #a85a47 60%, #8b3a2f 100%)' }}>
        {/* Decorative */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-white/5" />
          <motion.img src="/bob-happy.png" alt="" aria-hidden
            animate={{ rotate: [0, 6, -6, 0], y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            className="absolute right-16 bottom-0 w-48 opacity-20 hidden lg:block"
          />
          {([[10,20,24],[85,15,16],[5,75,12],[92,80,20]] as [number,number,number][]).map(([x,y,s],i) => (
            <motion.div key={i} style={{ position:'absolute', left:`${x}%`, top:`${y}%` }}
              animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10+i*3, ease:'linear' }}>
              <Sparkle size={s} color="rgba(255,255,255,0.25)" />
            </motion.div>
          ))}
        </div>

        <FadeIn className="max-w-2xl mx-auto text-center relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Ready?
          </p>
          <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
            Take back your<br />privacy today.
          </h2>
          <p className="text-lg mb-12 max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Enter your name. Bob finds your records on {TOTAL} sites and walks you
            through removing each one — for free.
          </p>
          <Link to="/onboarding"
            className="group inline-flex items-center gap-3 py-5 px-10 text-lg font-bold
                       bg-white text-brand-700 rounded-2xl hover:bg-brand-50 transition-colors shadow-2xl">
            Check my exposure
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="mt-5 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Free alternative to DeleteMe · No account required
          </p>
        </FadeIn>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: '#1a1714', borderTop: '1px solid #262320' }} className="py-8 px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo dark size="sm" />
          <p className="text-xs font-medium" style={{ color: '#4a4540' }}>
            Your data is <strong style={{ color: '#7a7470' }}>#NotForSale</strong> · Free forever · Open source
          </p>
        </div>
      </footer>
    </div>
  )
}
