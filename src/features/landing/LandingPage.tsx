import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  FlaskConical,
  ArrowRight,
  Sun,
  Moon,
  FileSearch,
  BrainCircuit,
  Bell
} from 'lucide-react';
import { Timeline } from '@/components/ui/Timeline';
import { useDarkMode } from '@/hooks/useDarkMode';
import { AtomVector, ResearchPaperVector, PatentPaperVector } from './components/HeroVectors';

export default function LandingPage() {
  const { isDark, toggle } = useDarkMode();
  const { pathname, hash } = useLocation();
  const [activeVector, setActiveVector] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveVector((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-pearl-50 dark:bg-zinc-950 transition-colors duration-500 overflow-x-hidden">
      
      {/* 1. HERO & NAVIGATION CONTAINER */}
      <div className="relative bg-pearl-50 dark:bg-[#06040d] text-zinc-900 dark:text-white overflow-hidden pb-24 pt-4 border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-500">
        
        {/* Ambient Glowing Background Lights */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/5 dark:bg-purple-600/10 blur-[150px] pointer-events-none" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.04] pointer-events-none" />

        {/* Top Header — glassmorphism */}
        <header className="relative z-50 flex items-center justify-between px-6 py-3 md:px-8 max-w-7xl mx-auto rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 glass">
          <div className="flex items-center gap-2">
            <motion.div 
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-500 to-purple-400 text-white shadow-md shadow-purple-500/20"
              whileHover={{ rotate: 8, scale: 1.05 }}
            >
              <FlaskConical className="h-4.5 w-4.5" />
            </motion.div>
            <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-display">
              sanjeevani<span className="text-purple-400">.</span>
            </span>
          </div>

          {/* Nav Links — active glows purple */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'About', href: '#about', section: true },
              { label: 'How it Works', href: '#idea', section: true },
              { label: 'Timeline', href: '#timeline', section: true },
              { label: 'Dashboard', href: '/dashboard', section: false },
              { label: 'Papers', href: '/papers', section: false },
              { label: 'Alerts', href: '/alerts', section: false },
              { label: 'Settings', href: '/settings', section: false },
            ].map((link) => {
              const isActive = link.section
                ? hash === link.href
                : pathname === link.href;
              const cls = `relative px-3 py-1.5 text-xs font-medium rounded-full border border-transparent transition-all duration-200 ${
                isActive
                  ? 'border-purple-500/50 text-zinc-500 dark:text-zinc-400'
                  : 'text-zinc-500 dark:text-zinc-400 hover:border-purple-500/30'
              }`;

              return link.section ? (
                <a key={link.href} href={link.href} className={cls} onClick={(e) => { e.preventDefault(); document.getElementById(link.href.slice(1))?.scrollIntoView({ behavior: 'smooth' }); }}>{link.label}</a>
              ) : (
                <Link key={link.href} to={link.href} className={cls}>{link.label}</Link>
              );
            })}
            <span className="mx-2 h-4 w-px bg-zinc-300/50 dark:bg-zinc-700/50" />
          </nav>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={toggle}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white/60 dark:bg-white/5 backdrop-blur-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-saffron-400" />
              ) : (
                <Moon className="h-4 w-4 text-zinc-650" />
              )}
            </motion.button>

            <Link
              to="/login"
              className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors px-3 py-1.5 rounded-full hover:bg-white/60 dark:hover:bg-white/5"
            >
              Log in
            </Link>
            
            <Link to="/register">
              <button className="text-xs font-semibold bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-full transition-all shadow-sm cursor-pointer">
                Get Started
              </button>
            </Link>
          </div>
        </header>

        {/* Hero Section Content */}
        <section className="relative z-10 mx-auto max-w-7xl px-6 pt-16 md:px-12 grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Hero Content (Left) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-1 text-[9px] font-mono text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              Section 31 Novelty Scanner
            </div>

            <h1 className="text-4xl font-bold leading-[1.1] tracking-tighter sm:text-5xl md:text-[54px] font-display text-zinc-900 dark:text-white">
              Transform research<br />
              into patent success<br />
              with us!
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Sanjeevani scans chemistry publications, extracts molecular formulas in real-time, and alerts Technology Transfer Offices before the 12-month Section 31 grace period expires.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/register">
                <button className="flex items-center gap-1.5 text-xs font-semibold font-display bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white px-5 py-3 rounded-lg transition-all shadow-md shadow-emerald-500/10 cursor-pointer">
                  Start scanning research
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </Link>
              <Link to="/login">
                <button className="text-xs font-semibold font-display border border-saffron-500/30 dark:border-saffron-500/20 hover:border-saffron-500 text-saffron-655 dark:text-saffron-400 hover:bg-saffron-50/50 dark:hover:bg-saffron-950/20 px-5 py-3 rounded-lg transition-all bg-transparent cursor-pointer">
                  Access Dashboard
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Cycling Animated Vectors (Right) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative select-none">

            <div className="w-full max-w-[340px] md:max-w-[420px] aspect-square flex items-center justify-center relative overflow-visible">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeVector}
                  initial={{ opacity: 0, x: 40, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -40, scale: 0.95 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {activeVector === 0 && <AtomVector isDark={isDark} />}
                  {activeVector === 1 && <ResearchPaperVector isDark={isDark} />}
                  {activeVector === 2 && <PatentPaperVector isDark={isDark} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Navigation Indicator Dots */}
            <div className="flex gap-2.5 mt-4 z-20">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveVector(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeVector === idx
                      ? 'w-6 bg-purple-500 dark:bg-purple-400'
                      : 'w-2 bg-zinc-300 dark:bg-zinc-800 hover:bg-zinc-400 dark:hover:bg-zinc-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </section>
      </div>

      {/* 2. CORE IDEA SECTION ("What we are onto") — Stair Graphic + Video */}
      <section id="idea" className="py-20 px-6 md:px-12 max-w-7xl mx-auto bg-pearl-50 dark:bg-zinc-950 transition-colors duration-500">
        
        <div className="grid lg:grid-cols-2 gap-10 items-center relative">

          {/* Vertical divider */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/5 via-purple-500/40 to-purple-500/5" />

          {/* Left: Header + Stairs */}
          <div className="space-y-12">
            {/* Header */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-purple-600 dark:text-purple-400 uppercase">
                01 / The Mission
              </span>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white font-display">
                What we are onto.
              </h2>
              <p className="max-w-xl text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Every year, key academic disclosures in chemistry are lost because publication happens before patent filing. We are building the bridge that captures disclosures early, giving universities the legal time they need to protect their intellectual property.
              </p>
            </div>

            {/* Purple divider */}
            <div className="w-32 h-px bg-gradient-to-r from-purple-500/80 via-purple-500/40 to-transparent" />

            {/* Stairs — step widths relative to this column */}
            <div className="space-y-2.5">
              {[
                {
                  num: '01', icon: FileSearch, title: 'Automated Ingestion',
                  desc: 'Sanjeevani continuously scans publication sites, preprint platforms, and university portals to ingest research papers.',
                  width: 'w-[85%]',
                },
                {
                  num: '02', icon: BrainCircuit, title: 'Chemical NLP Parsing',
                  desc: 'Our NLP core extracts molecular representations from complex inline texts, tables, and images, converting them into digital SMILES codes.',
                  width: 'w-[93%]',
                },
                {
                  num: '03', icon: Bell, title: 'Grace Window Alerts',
                  desc: 'We monitor the legal 12-month grace window under India\'s Section 31 and alert Tech Transfer Offices to file before expiration.',
                  width: 'w-full',
                },
              ].map((step, i) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={step.width}
                  >
                    <div className="relative group">
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-purple-500/60 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="pl-6 md:pl-8 p-4 md:p-5 rounded-r-xl border border-l-0 border-purple-500/10 bg-white dark:bg-zinc-900/50 hover:border-purple-500/25 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-purple-500/5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-sm shrink-0">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono tracking-wider text-purple-500 dark:text-purple-400 font-semibold">{step.num}</span>
                            <h3 className="text-sm md:text-base font-semibold text-zinc-900 dark:text-white">{step.title}</h3>
                          </div>
                        </div>
                        <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{step.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Video — window frame */}
          <div>
            <div className="rounded-xl overflow-hidden border border-purple-500/20 bg-white shadow-lg shadow-purple-500/5">
              {/* Window title bar */}
              <div className="px-3 py-2.5 bg-zinc-100 dark:bg-zinc-800 border-b border-purple-500/10" />
              <video
                src="/hero-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto block"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. TIMELINE SECTION */}
      <section id="timeline" className="py-20 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <span className="text-[10px] font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
              02 / The Process
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white font-display">
              The Section 31 Countdown.
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
              Tracking disclosures step-by-step to secure university intellectual property before the legal grace period terminates.
            </p>
          </div>

          <Timeline />
        </div>
      </section>

      {/* 4. MINIMAL CTA */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-10 md:p-16 space-y-6 relative overflow-hidden bg-white dark:bg-zinc-900/30 transition-all duration-300">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-emerald-500/5 dark:bg-emerald-400/3 blur-[80px] pointer-events-none" />

          <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-white font-display">
            The Section 31 clock is ticking.
          </h2>
          
          <p className="mx-auto max-w-md text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Protect your newly published molecules. Secure your laboratory disclosures and university IP starting today.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-3">
            <Link to="/register">
              <button className="w-full sm:w-auto text-xs font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 px-5 py-3 rounded-lg transition-all shadow-sm cursor-pointer">
                Protect your research today
              </button>
            </Link>
            <Link to="/login">
              <button className="w-full sm:w-auto text-xs font-semibold border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 px-5 py-3 rounded-lg transition-all bg-transparent cursor-pointer">
                Access Dashboard
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 px-6 py-8 text-center text-[10px] text-zinc-400 dark:text-zinc-600 max-w-7xl mx-auto">
        &copy; {new Date().getFullYear()} Sanjeevani. Built for Indian Technology Transfer Offices. All rights reserved.
      </footer>
    </div>
  );
}
