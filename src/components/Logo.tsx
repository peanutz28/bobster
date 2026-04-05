interface LogoProps {
  dark?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { img: 'w-7 h-7',   text: 'text-base', tag: 'text-[9px] px-1.5 py-0.5' },
  md: { img: 'w-9 h-9',   text: 'text-xl',   tag: 'text-[9px] px-1.5 py-0.5' },
  lg: { img: 'w-14 h-14', text: 'text-3xl',  tag: 'text-xs px-2 py-1' },
}

export default function Logo({ dark = false, size = 'md' }: LogoProps) {
  const s = sizes[size]
  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative shrink-0">
        <img src="/bob-happy.png" alt="Bob" className={`${s.img} object-contain`} />
        {/* sparkle accent */}
        <span className="absolute -top-0.5 -right-0.5 text-[10px] leading-none select-none">✦</span>
      </span>
      <span className={`font-black tracking-tight leading-none ${s.text} ${dark ? 'text-white' : 'text-ink-900'}`}>
        Bobster
        <span className={`ml-2 font-bold rounded-full align-middle
          ${dark ? 'bg-white/15 text-white/70' : 'bg-brand-100 text-brand-600'}
          ${s.tag}`}
        >
          free
        </span>
      </span>
    </span>
  )
}
