import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FlaskConical,
  ArrowRight,
  GraduationCap,
  Sun,
  Moon,
  Zap,
  ShieldCheck,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { MovingVectors } from '@/components/ui/MovingVectors';
import { Timeline } from '@/components/ui/Timeline';
import { useDarkMode } from '@/hooks/useDarkMode';

// Mock scan steps for the Hero interactive demo
const scanStates = [
  { step: 0, text: 'Reading manuscript.pdf...', duration: 2000 },
  { step: 1, text: 'Extracting chemical entities...', duration: 2500 },
  { step: 2, text: 'Generating SMILES notation...', duration: 2000 },
  { step: 3, text: 'Analyzing Section 31 grace period...', duration: 1800 },
  { step: 4, text: 'Querying global patent registries...', duration: 2200 },
  { step: 5, text: 'Novelty Scan Complete', duration: 4000 }
];

export default function LandingPage() {
  const { isDark, toggle } = useDarkMode();
  const [scanStep, setScanStep] = useState(0);

  // Cycle through scanning states for the interactive hero widget
  useEffect(() => {
    const runScanCycle = () => {
      const current = scanStates[scanStep]! || scanStates[0]!;
      const timer = setTimeout(() => {
        setScanStep((prev) => (prev + 1) % scanStates.length);
      }, current.duration);
      return () => clearTimeout(timer);
    };
    runScanCycle();
  }, [scanStep]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-pearl-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Dynamic Animated Vector Background */}
      <MovingVectors />

      {/* Navigation Header */}
      <header className="relative z-50 flex items-center justify-between px-6 py-5 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <motion.div 
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-md shadow-emerald-500/20"
            whileHover={{ rotate: 10, scale: 1.05 }}
          >
            <FlaskConical className="h-5 w-5" />
          </motion.div>
          <span className="text-xl font-bold tracking-tight text-navy-900 dark:text-white font-display">
            Sanjeevani
          </span>
        </div>

        <nav className="flex items-center gap-4">
          {/* Dark Mode Toggle Button */}
          <motion.button
            onClick={toggle}
            className="flex h-10 w-10 items-center justify-center rounded-xl glass border border-white/10 dark:border-zinc-800 text-navy-600 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white transition-all cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-saffron-400" />
            ) : (
              <Moon className="h-5 w-5 text-navy-700" />
            )}
          </motion.button>

          <Link
            to="/login"
            className="text-sm font-semibold text-navy-600 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white transition-colors px-3 py-2"
          >
            Log in
          </Link>
          
          <Link to="/register">
            <Button variant="primary" size="sm" className="shadow-lg shadow-emerald-500/20 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white">
              Get Started
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-8 md:px-12">
        <section className="grid gap-12 lg:grid-cols-12 lg:items-center lg:pt-12">
          {/* Hero Content (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full glass border border-white/10 dark:border-zinc-800 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <GraduationCap className="h-4 w-4" />
              Built for CSIR Labs & Indian Technology Transfer Offices
            </div>

            <h1 className="text-4xl font-extrabold leading-none tracking-tight sm:text-5xl md:text-6xl font-display text-navy-900 dark:text-white">
              The molecule <span className="text-gradient-emerald">novelty</span> scanner for India&apos;s{' '}
              <span className="text-gradient-saffron font-extrabold">Section 31</span>
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-navy-500 dark:text-navy-400 md:text-lg">
              Most Indian academic chemistry research never reaches the patent office because disclosures are found too late. Sanjeevani scans research publications, parses complex formulas, and alerts TTOs before the 12-month grace window closes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register">
                <Button variant="primary" size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20">
                  Start scanning research
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto dark:border-zinc-800 dark:hover:bg-zinc-900 text-navy-800 dark:text-white">
                  Access Dashboard
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-6 border-t border-navy-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span className="text-xs font-medium text-navy-600 dark:text-navy-400">SMILES Extraction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span className="text-xs font-medium text-navy-600 dark:text-navy-400">Patent Cross-checking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span className="text-xs font-medium text-navy-600 dark:text-navy-400">Section 31 Reminders</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Molecule Scanner Widget (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <GlassCard variant="strong" className="w-full max-w-sm border border-white/20 dark:border-zinc-800 shadow-2xl relative overflow-hidden group">
              {/* Glowing scanning laser line */}
              {scanStep < 5 && (
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent blur-[1px] z-20"
                  animate={{ top: ['5%', '95%', '5%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}

              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-navy-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-navy-500 dark:text-navy-400">
                    Live Extractor Feed
                  </span>
                </div>
                <div className="text-[10px] font-mono bg-navy-100 dark:bg-zinc-800 text-navy-600 dark:text-navy-300 px-2 py-0.5 rounded">
                  v1.2.0-core
                </div>
              </div>

              {/* Scanning visual area */}
              <div className="py-8 flex flex-col items-center justify-center relative min-h-[220px]">
                {/* SVG Chemical Molecule Structure */}
                <div className="relative text-navy-700 dark:text-zinc-200">
                  <svg width="180" height="150" viewBox="0 0 180 150" className="opacity-90">
                    {/* Ring Structure */}
                    <polygon
                      points="90,15 130,38 130,85 90,108 50,85 50,38"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className={`${scanStep >= 2 ? 'stroke-emerald-500 transition-colors duration-500' : ''}`}
                    />
                    {/* Inner aromatic ring */}
                    <circle
                      cx="90"
                      cy="61"
                      r="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      className={`opacity-70 ${scanStep >= 2 ? 'stroke-emerald-400/70 transition-colors duration-500' : ''}`}
                    />
                    {/* Substituent bonds */}
                    <line x1="90" y1="15" x2="90" y2="2" stroke="currentColor" strokeWidth="2.5" />
                    <line x1="130" y1="38" x2="155" y2="25" stroke="currentColor" strokeWidth="2.5" />
                    <line x1="50" y1="85" x2="25" y2="100" stroke="currentColor" strokeWidth="2.5" />
                    
                    {/* Text groups */}
                    <text x="82" y="1" className="text-[11px] font-bold font-mono fill-red-500">OH</text>
                    <text x="156" y="24" className="text-[11px] font-bold font-mono fill-blue-500">NH₂</text>
                    <text x="2" y="106" className="text-[11px] font-bold font-mono fill-zinc-500">COOH</text>
                  </svg>
                  
                  {/* Glowing Molecule Overlay on Success */}
                  <AnimatePresence>
                    {scanStep === 5 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-full filter blur-xl animate-pulse"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Simulated Floating Confidence Badge */}
                <AnimatePresence>
                  {scanStep >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-2 right-4 bg-emerald-500 text-white font-mono text-[10px] font-bold px-2 py-1 rounded shadow-lg"
                    >
                      98.4% Confidence
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Live status feed footer */}
              <div className="bg-navy-50/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-navy-100/50 dark:border-zinc-800/50 min-h-[96px] flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                    <Zap className="h-3 w-3" />
                  </div>
                  <span className="text-xs font-semibold text-navy-800 dark:text-zinc-200">
                    Status Indicator
                  </span>
                </div>

                <div className="mt-2 text-xs font-mono text-navy-600 dark:text-zinc-400 min-h-[16px]">
                  {(scanStates[scanStep] || scanStates[0])!.text}
                </div>

                {/* Progress bar */}
                <div className="mt-2 w-full h-1 bg-navy-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((scanStep + 1) / scanStates.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Bottom Result Overview */}
              <AnimatePresence>
                {scanStep === 5 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 bg-zinc-900/95 dark:bg-zinc-950/98 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white"
                  >
                    <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                      <ShieldCheck className="h-6 w-6 text-emerald-400" />
                    </div>
                    
                    <h4 className="font-bold text-lg font-display text-white">Compound Extracted</h4>
                    
                    <div className="my-3 py-1.5 px-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-mono tracking-wider font-semibold">
                      SMILES: Nc1ccc(C(=O)O)cc1O
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1">
                      <Search className="h-3.5 w-3.5" />
                      <span>Registry status: <b>Highly Novel</b></span>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button 
                        onClick={() => setScanStep(0)} 
                        className="text-xs font-semibold px-4 py-2 border border-zinc-700 hover:border-zinc-500 rounded-lg transition-colors cursor-pointer"
                      >
                        Reset Demo
                      </button>
                      <Link to="/register">
                        <button className="text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer">
                          Create Scanner Account
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        </section>

        {/* Section 31 Timeline workflow */}
        <section className="mt-36">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              The Section 31 Timeline
            </h2>
            <p className="text-3xl font-extrabold text-navy-900 dark:text-white font-display">
              Protecting intellectual property step-by-step
            </p>
            <p className="text-sm text-navy-500 dark:text-zinc-400">
              India&apos;s Section 31 allows a grace period of 12 months for patenting after public disclosure. Missing this window blocks patenting permanently. Sanjeevani automates the tracking so you file in time.
            </p>
          </div>

          <Timeline />
        </section>

        {/* Action Center / CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32 rounded-3xl glass-emerald p-10 text-center md:p-16 border border-emerald-500/10 dark:border-emerald-500/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 -z-10" />
          
          <h2 className="text-3xl font-extrabold text-navy-900 dark:text-white font-display">
            The Section 31 clock is ticking.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-navy-500 dark:text-zinc-400">
            For every newly published molecule, the 12-month grace window shrinks. Take charge of your university or laboratory disclosures starting today.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/register">
              <Button variant="primary" size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20">
                Protect your research today
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto dark:border-zinc-800 dark:hover:bg-zinc-900 text-navy-800 dark:text-white">
                Partner with us
              </Button>
            </Link>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-navy-100 dark:border-zinc-900 px-6 py-8 text-center text-xs text-navy-400 dark:text-zinc-500 max-w-7xl mx-auto">
        &copy; {new Date().getFullYear()} Sanjeevani. Built for Indian technology transfer offices and laboratory patenting.
      </footer>
    </div>
  );
}
