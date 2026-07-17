import { useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const timelineSteps = [
  {
    phase: '01',
    time: 'Month 0',
    title: 'Research Disclosure',
    description: 'A chemistry research paper is published online or presented. This starts the 12-month grace period under India\'s Section 31.',
  },
  {
    phase: '02',
    time: 'Real-time',
    title: 'AI Ingest & NLP Parsing',
    description: 'Sanjeevani scans the publication, parsing PDFs, DOCX, or LaTeX to identify compound mentions in text and tables.',
  },
  {
    phase: '03',
    time: 'Real-time',
    title: 'SMILES Extraction',
    description: 'Extracted structures are rendered as chemical SMILES notations with confidence metrics, ready for verification.',
  },
  {
    phase: '04',
    time: 'Real-time',
    title: 'Novelty Assessment',
    description: 'Molecules are cross-referenced against global patent databases and registries to evaluate structural uniqueness.',
  },
  {
    phase: '05',
    time: 'T-Minus',
    title: 'Section 31 Alert Trigger',
    description: 'The countdown is active. Alerts notify TTO officers of closing filing windows, ensuring no novel compound is lost.',
  },
  {
    phase: '06',
    time: 'Month 12',
    title: 'Successful Patent Filing',
    description: 'TTO files the patent application inside the legal Section 31 grace period, securing the university\'s IP rights.',
  }
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Track scroll position of the timeline container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth out scroll line value with a spring
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative mx-auto max-w-5xl px-4 py-12 overflow-visible">
      {/* Central Timeline axis line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1.5px] bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2 rounded-full" />
      <motion.div
        style={{ scaleY }}
        className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1.5px] bg-purple-500 dark:bg-purple-400 -translate-x-1/2 origin-top rounded-full shadow-[0_0_8px_rgba(139,92,246,0.3)]"
      />

      <div className="space-y-12 md:space-y-16">
        {timelineSteps.map((step, index) => {
          const isEven = index % 2 === 0;
          const isHovered = hoveredIndex === index;
          const isAnyHovered = hoveredIndex !== null;

          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative flex flex-col md:flex-row items-start md:items-center ${
                isEven ? 'md:flex-row-reverse' : ''
              } transition-all duration-300 ${
                isAnyHovered && !isHovered ? 'opacity-35 blur-[0.5px]' : 'opacity-100'
              }`}
            >
              {/* Timeline Dot Indicator */}
              <div className="absolute left-6 md:left-1/2 top-8 md:top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: isHovered ? 1.3 : 1,
                    borderColor: isHovered ? '#8B5CF6' : 'rgb(228,228,231)',
                    backgroundColor: isHovered ? '#8B5CF6' : 'rgb(255,255,255)'
                  }}
                  className={`h-4.5 w-4.5 rounded-full border-2 flex items-center justify-center transition-all bg-white dark:bg-zinc-950 dark:border-zinc-800 shadow-sm ${
                    isHovered ? 'ring-4 ring-purple-500/20 dark:ring-purple-500/10' : ''
                  }`}
                >
                  <div className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${isHovered ? 'bg-white' : 'bg-zinc-400 dark:bg-zinc-650'}`} />
                </motion.div>
              </div>

              {/* Content Panel */}
              <div className="w-full md:w-[calc(50%-2.5rem)] pl-12 md:pl-0">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="relative border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/30 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md hover:border-purple-500/30 dark:hover:border-purple-500/30 transition-all duration-300 overflow-visible"
                >
                  {/* Speech bubble pointer arrow */}
                  {isEven ? (
                    <div className="absolute right-[-5px] top-8 md:top-1/2 md:-translate-y-1/2 w-2.5 h-2.5 bg-white dark:bg-zinc-900 border-t border-r border-zinc-200/60 dark:border-zinc-800/80 rotate-45 z-10 hidden md:block" />
                  ) : (
                    <div className="absolute left-[-5px] top-8 md:top-1/2 md:-translate-y-1/2 w-2.5 h-2.5 bg-white dark:bg-zinc-900 border-b border-l border-zinc-200/60 dark:border-zinc-800/80 rotate-45 z-10 hidden md:block" />
                  )}
                  
                  {/* Mobile pointer (always on left) */}
                  <div className="absolute left-[-5px] top-8 -translate-y-1/2 w-2.5 h-2.5 bg-white dark:bg-zinc-900 border-b border-l border-zinc-200/60 dark:border-zinc-800/80 rotate-45 z-10 md:hidden" />

                  <div className="flex w-full items-stretch min-h-[110px]">
                    {/* Main content (left side of card) */}
                    <div className="flex-grow p-5 md:p-6 flex flex-col justify-center">
                      <h3 className="text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight font-display mb-1 transition-colors duration-200">
                        {step.title}
                      </h3>
                      <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed font-sans">
                        {step.description}
                      </p>
                    </div>

                    {/* Divider line */}
                    <div className="w-px bg-zinc-200/60 dark:bg-zinc-800/80 self-stretch" />

                    {/* Date Box (right side of card) */}
                    <div className="w-[95px] md:w-[105px] flex-shrink-0 flex flex-col items-center justify-center p-3 text-center bg-zinc-50/50 dark:bg-zinc-950/20 rounded-r-2xl">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                        Phase
                      </span>
                      <span className="text-xl font-bold text-purple-600 dark:text-purple-400 my-0.5 leading-none">
                        {step.phase}
                      </span>
                      <span className="text-[9px] font-mono font-medium text-zinc-500 dark:text-zinc-450 uppercase tracking-tight">
                        {step.time}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Empty Spacing Panel for desktop layout */}
              <div className="w-full md:w-[calc(50%-2.5rem)] hidden md:block" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
