import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FlaskConical,
  ArrowRight,
  Sun,
  Moon,
  Zap,
  Clock,
  Sparkles
} from 'lucide-react';
import { Timeline } from '@/components/ui/Timeline';
import { useDarkMode } from '@/hooks/useDarkMode';

function OrbitingElectron({ rx, ry, rotation: deg, duration, direction = 1, phaseOffset = 0, sphereGradient, r = 10 }: {
  rx: number; ry: number; rotation: number; duration: number;
  direction?: number; phaseOffset?: number; sphereGradient: string; r?: number;
}) {
  const angle = useMotionValue(phaseOffset);
  const startRef = useRef(performance.now());

  useEffect(() => {
    startRef.current = performance.now();
    let rafId: number;
    function tick() {
      const elapsed = (performance.now() - startRef.current) / 1000;
      const t = (elapsed % duration) / duration;
      angle.set(phaseOffset + t * 360 * direction);
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [angle, phaseOffset, duration, direction]);

  const rad = (deg * Math.PI) / 180;

  const cx = useTransform(angle, (v) => {
    const vr = (v * Math.PI) / 180;
    return 200 + rx * Math.cos(vr) * Math.cos(rad) - ry * Math.sin(vr) * Math.sin(rad);
  });

  const cy = useTransform(angle, (v) => {
    const vr = (v * Math.PI) / 180;
    return 200 + rx * Math.cos(vr) * Math.sin(rad) + ry * Math.sin(vr) * Math.cos(rad);
  });

  return <motion.circle r={r} fill={sphereGradient} cx={cx} cy={cy} />;
}

export default function LandingPage() {
  const { isDark, toggle } = useDarkMode();

  return (
    <div className="relative min-h-screen bg-pearl-50 dark:bg-zinc-950 transition-colors duration-500 overflow-x-hidden">
      
      {/* 1. HERO & NAVIGATION CONTAINER */}
      <div className="relative bg-pearl-50 dark:bg-[#06040d] text-zinc-900 dark:text-white overflow-hidden pb-24 pt-4 border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-500">
        
        {/* Ambient Glowing Background Lights */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/5 dark:bg-purple-600/10 blur-[150px] pointer-events-none" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.04] pointer-events-none" />

        {/* Top Header */}
        <header className="relative z-50 flex items-center justify-between px-6 py-4 md:px-12 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <motion.div 
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-md shadow-emerald-500/20"
              whileHover={{ rotate: 8, scale: 1.05 }}
            >
              <FlaskConical className="h-4.5 w-4.5" />
            </motion.div>
            <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-display">
              sanjeevani<span className="text-saffron-500">.</span>
            </span>
          </div>

          {/* Minimal Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <a href="#about" className="hover:text-zinc-900 dark:hover:text-white transition-colors">About Us</a>
            <a href="#idea" className="hover:text-zinc-900 dark:hover:text-white transition-colors">How it Works</a>
            <a href="#timeline" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Timeline</a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle Button */}
            <motion.button
              onClick={toggle}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-4.5 w-4.5 text-saffron-400" />
              ) : (
                <Moon className="h-4.5 w-4.5 text-zinc-650" />
              )}
            </motion.button>

            <Link
              to="/login"
              className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors px-3 py-2"
            >
              Log in
            </Link>
            
            <Link to="/register">
              <button className="text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-all shadow-sm cursor-pointer">
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
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              Section 31 Novelty Scanner
            </div>

            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-[54px] font-display text-zinc-900 dark:text-white">
              Transform research<br />
              into patent success<br />
              with us!
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Sanjeevani scans chemistry publications, extracts molecular formulas in real-time, and alerts Technology Transfer Offices before the 12-month Section 31 grace period expires.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/register">
                <button className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white px-5 py-3 rounded-lg transition-all shadow-md shadow-emerald-500/10 cursor-pointer">
                  Start scanning research
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </Link>
              <Link to="/login">
                <button className="text-xs font-semibold border border-saffron-500/30 dark:border-saffron-500/20 hover:border-saffron-500 text-saffron-655 dark:text-saffron-400 hover:bg-saffron-50/50 dark:hover:bg-saffron-950/20 px-5 py-3 rounded-lg transition-all bg-transparent cursor-pointer">
                  Access Dashboard
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Interactive orbiting SVG Atom (Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center relative select-none"
          >
            {/* Ambient glows behind the SVG */}
            <div className="absolute w-[280px] h-[280px] rounded-full bg-purple-600/5 dark:bg-purple-600/10 blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute w-[180px] h-[180px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/5 blur-[60px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-full max-w-[340px] md:max-w-[420px] aspect-square flex items-center justify-center pointer-events-none"
            >
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                  {isDark ? (
                    <radialGradient id="electronSphere" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="35%" stopColor="#e4e4e7" />
                      <stop offset="70%" stopColor="#a1a1aa" />
                      <stop offset="100%" stopColor="#3f3f46" />
                    </radialGradient>
                  ) : (
                    <radialGradient id="electronSphere" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#71717a" />
                      <stop offset="35%" stopColor="#3f3f46" />
                      <stop offset="70%" stopColor="#18181b" />
                      <stop offset="100%" stopColor="#020202" />
                    </radialGradient>
                  )}
                </defs>

                {/* Orbit 1 (Tilted 10°) */}
                <ellipse
                  cx="200" cy="200" rx="160" ry="55" fill="none"
                  stroke={isDark ? "#ffffff" : "#18181b"}
                  strokeWidth="1.5"
                  opacity={isDark ? "0.6" : "0.7"}
                  transform="rotate(10 200 200)"
                />
                <OrbitingElectron rx={160} ry={55} rotation={10} duration={5} sphereGradient="url(#electronSphere)" />

                {/* Orbit 2 (Tilted 70°) */}
                <ellipse
                  cx="200" cy="200" rx="160" ry="55" fill="none"
                  stroke={isDark ? "#ffffff" : "#18181b"}
                  strokeWidth="1.5"
                  opacity={isDark ? "0.6" : "0.7"}
                  transform="rotate(70 200 200)"
                />
                <OrbitingElectron rx={160} ry={55} rotation={70} duration={5} direction={-1} sphereGradient="url(#electronSphere)" />

                {/* Orbit 3 (Tilted -50°) */}
                <ellipse
                  cx="200" cy="200" rx="160" ry="55" fill="none"
                  stroke={isDark ? "#ffffff" : "#18181b"}
                  strokeWidth="1.5"
                  opacity={isDark ? "0.6" : "0.7"}
                  transform="rotate(-50 200 200)"
                />
                <OrbitingElectron rx={160} ry={55} rotation={-50} duration={5} sphereGradient="url(#electronSphere)" />

                {/* 7. Central Nucleus Sphere (Adapts to theme) */}
                {/* Outer Glow */}
                <circle
                  cx="200"
                  cy="200"
                  r="35"
                  fill="none"
                  stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)"}
                  strokeWidth="6"
                  className="animate-pulse"
                />
                {/* 3D Sphere */}
                <circle
                  cx="200"
                  cy="200"
                  r="30"
                  fill="url(#electronSphere)"
                />
              </svg>
            </motion.div>
          </motion.div>

        </section>
      </div>

      {/* 2. CORE IDEA SECTION ("What we are onto") */}
      <section id="idea" className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-pearl-50 dark:bg-zinc-950 transition-colors duration-500">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Header Description */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
              01 / The Mission
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white font-display">
              What we are onto.
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Every year, key academic disclosures in chemistry are lost because publication happens before patent filing. We are building the bridge that captures disclosures early, giving universities the legal time they need to protect their intellectual property.
            </p>
          </div>

          {/* Minimal 3-part layout details */}
          <div className="lg:col-span-8 grid gap-8 md:grid-cols-3">
            
            {/* Step 1 */}
            <div className="space-y-3 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600">01</span>
                <Sparkles className="h-4 w-4 text-emerald-500" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Automated Ingestion</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Sanjeevani continuously scans publication sites, preprint platforms, and university portals to ingest research papers.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600">02</span>
                <Zap className="h-4 w-4 text-saffron-500" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Chemical NLP Parsing</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Our NLP core extracts molecular representations from complex inline texts, tables, and images, converting them into digital SMILES codes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600">03</span>
                <Clock className="h-4 w-4 text-emerald-500" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Grace Window Alerts</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                We monitor the legal 12-month grace window under India&apos;s Section 31 and alert Tech Transfer Offices to file before expiration.
              </p>
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
