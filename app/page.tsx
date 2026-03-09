<Thinking>
The user wants me to create a single-page website of any kind. Let me create something visually impressive - a modern portfolio/landing page with a clean design. I'll make it a creative agency or personal portfolio landing page with:

1. A hero section with a bold headline
2. Services/features section
3. Work/portfolio grid
4. Testimonials
5. Contact section
6. Footer

I'll use a dark theme with some accent colors, smooth animations, and modern design. Let me keep everything in one TSX file with Tailwind CSS.

Let me design a creative agency landing page with:
- Dark background
- Gradient accents
- Smooth hover effects
- Responsive design
- All in one file
</Thinking>

```tsx file="app/page.tsx"
'use client'

import { useState, useEffect, useRef } from 'react'

const NAV_LINKS = ['Услуги', 'Работы', 'О нас', 'Контакты']

const SERVICES = [
  {
    icon: '✦',
    title: 'Веб-дизайн',
    desc: 'Создаём уникальные интерфейсы, которые захватывают внимание и конвертируют посетителей в клиентов.',
  },
  {
    icon: '⬡',
    title: 'Разработка',
    desc: 'Пишем чистый, масштабируемый код на современных технологиях — быстро и надёжно.',
  },
  {
    icon: '◈',
    title: 'Брендинг',
    desc: 'Формируем визуальную идентичность бренда, которая остаётся в памяти надолго.',
  },
  {
    icon: '⟡',
    title: 'Стратегия',
    desc: 'Разрабатываем цифровую стратегию роста, основанную на данных и реальных инсайтах.',
  },
]

const WORKS = [
  { title: 'Neon Studio', tag: 'Веб-сайт', color: 'from-violet-500 to-fuchsia-500' },
  { title: 'Orbit App', tag: 'Мобильное приложение', color: 'from-cyan-500 to-blue-500' },
  { title: 'Pulse Brand', tag: 'Брендинг', color: 'from-orange-400 to-rose-500' },
  { title: 'Flux Dashboard', tag: 'UI/UX', color: 'from-emerald-400 to-teal-500' },
  { title: 'Arc Commerce', tag: 'E-commerce', color: 'from-yellow-400 to-orange-500' },
  { title: 'Void Agency', tag: 'Веб-сайт', color: 'from-pink-500 to-violet-500' },
]

const TESTIMONIALS = [
  {
    name: 'Алексей Морозов',
    role: 'CEO, TechStart',
    text: 'Команда превзошла все ожидания. Сайт получился именно таким, каким я его представлял — и даже лучше.',
    avatar: 'АМ',
  },
  {
    name: 'Мария Соколова',
    role: 'Founder, Bloom',
    text: 'Профессионализм на высшем уровне. Сроки соблюдены, качество отличное, коммуникация — безупречная.',
    avatar: 'МС',
  },
  {
    name: 'Дмитрий Волков',
    role: 'CMO, Nexus',
    text: 'Наш бренд наконец-то выглядит так, как должен. Конверсия выросла на 40% после редизайна.',
    avatar: 'ДВ',
  },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeWork, setActiveWork] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const sectionIds = ['services', 'works', 'about', 'contact']

  return (
    <div className="bg-[#080808] text-white min-h-screen font-sans overflow-x-hidden">
      {/* ── NAV ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#080808]/90 backdrop-blur-md border-b border-white/5' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">
            void<span className="text-violet-400">.</span>studio
          </span>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <button
                key={link}
                onClick={() => scrollTo(sectionIds[i])}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="text-sm bg-white text-black px-5 py-2 rounded-full font-medium hover:bg-violet-400 hover:text-white transition-all duration-300"
            >
              Начать проект
            </button>
          </nav>

          {/* Mobile burger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ${
            menuOpen ? 'max-h-80 border-b border-white/10' : 'max-h-0'
          } bg-[#0d0d0d]`}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link, i) => (
              <button
                key={link}
                onClick={() => scrollTo(sectionIds[i])}
                className="text-left text-white/70 hover:text-white transition-colors py-1"
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="mt-2 bg-white text-black px-5 py-2.5 rounded-full font-medium text-sm w-fit"
            >
              Начать проект
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px]" />
          <div className="absolute top-2/3 left-1/4 w-[300px] h-[300px] bg-fuchsia-600/10 rounded-full blur-[80px]" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/60 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Принимаем новые проекты в 2025
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.95] tracking-tight mb-8">
            Создаём
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              цифровые
            </span>
            <br />
            продукты
          </h1>

          <p className="text-lg sm:text-xl text-white/50 max-w-xl mx-auto mb-12 leading-relaxed">
            Дизайн и разработка, которые помогают брендам расти. Мы превращаем идеи в продукты, которыми пользуются люди.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo('works')}
              className="group bg-white text-black px-8 py-4 rounded-full font-semibold text-sm hover:bg-violet-400 hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              Смотреть работы
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="border border-white/20 text-white/80 px-8 py-4 rounded-full font-semibold text-sm hover:border-white/50 hover:text-white transition-all duration-300"
            >
              Обсудить проект
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs">
          <span>скролл</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '120+', label: 'Проектов' },
            { num: '8 лет', label: 'Опыта' },
            { num: '40+', label: 'Клиентов' },
            { num: '99%', label: 'Довольных' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {s.num}
              </div>
              <div className="text-white/40 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Что мы делаем</p>
            <h2 className="text-4xl sm:text-5xl font-bold">Наши услуги</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="group bg-white/[0.03] border border-white/8 rounded-2xl p-7 hover:bg-white/[0.06] hover:border-violet-500/30 transition-all duration-300 cursor-default"
              >
                <div className="text-3xl mb-5 text-violet-400 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {s.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKS ── */}
      <section id="works" className="py-28 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Портфолио</p>
            <h2 className="text-4xl sm:text-5xl font-bold">Избранные работы</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg