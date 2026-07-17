import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileSpreadsheet, 
  Cpu, 
  FlaskConical, 
  Search, 
  Bell, 
  Award 
} from 'lucide-react';

const timelineSteps = [
  {
    icon: FileSpreadsheet,
    title: 'Research Disclosure',
    subtitle: 'Month 0',
    description: 'A chemistry research paper is published online or presented. This starts the 12-month grace period under India\'s Section 31.',
    color: 'text-emerald-500 dark:text-emerald-400',
    glowColor: 'shadow-emerald-500/20 dark:shadow-emerald-400/10',
    lineColor: 'from-emerald-500',
  },
  {
    icon: Cpu,
    title: 'AI Ingest & NLP Parsing',
    subtitle: 'Real-time',
    description: 'Sanjeevani scans the publication, parsing PDFs, DOCX, or LaTeX to identify compound mentions in text and tables.',
    color: 'text-saffron-500 dark:text-saffron-400',
    glowColor: 'shadow-saffron-500/20 dark:shadow-saffron-400/10',
    lineColor: 'from-saffron-500',
  },
  {
    icon: FlaskConical,
    title: 'SMILES Extraction',
    subtitle: 'Real-time',
    description: 'Extracted structures are rendered as chemical SMILES notations with confidence metrics, ready for verification.',
    color: 'text-emerald-500 dark:text-emerald-400',
    glowColor: 'shadow-emerald-500/20 dark:shadow-emerald-400/10',
    lineColor: 'from-emerald-500',
  },
  {
    icon: Search,
    title: 'Novelty Assessment',
    subtitle: 'Real-time',
    description: 'Molecules are cross-referenced against global patent databases and registries to evaluate structural uniqueness.',
    color: 'text-saffron-500 dark:text-saffron-400',
    glowColor: 'shadow-saffron-500/20 dark:shadow-saffron-400/10',
    lineColor: 'from-saffron-500',
  },
  {
    icon: Bell,
    title: 'Section 31 Alert Trigger',
    subtitle: 'T-Minus Window',
    description: 'The countdown is active. Alerts notify TTO officers of closing filing windows, ensuring no novel compound is lost.',
    color: 'text-emerald-500 dark:text-emerald-400',
    glowColor: 'shadow-emerald-500/20 dark:shadow-emerald-400/10',
    lineColor: 'from-emerald-500',
  },
  {
    icon: Award,
    title: 'Successful Patent Filing',
    subtitle: 'Before Month 12',
    description: 'TTO files the patent application inside the legal Section 31 grace period, securing the university\'s IP rights.',
    color: 'text-saffron-500 dark:text-saffron-400',
    glowColor: 'shadow-saffron-500/20 dark:shadow-saffron-400/10',
    lineColor: 'from-saffron-500',
  }
];

export function Timeline() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative mx-auto max-w-4xl px-4 py-8">
      {/* Central Thin Timeline line */}
      <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2" />

      <div className="space-y-12">
        {timelineSteps.map((step, index) => {
          const Icon = step.icon;
          const isEven = index % 2 === 0;
          const isHovered = hoveredIndex === index;
          const isAnyHovered = hoveredIndex !== null;

          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative flex flex-col md:flex-row items-start md:items-center ${
                isEven ? 'md:flex-row-reverse' : ''
              } transition-opacity duration-300 ${
                isAnyHovered && !isHovered ? 'opacity-40' : 'opacity-100'
              }`}
            >
              {/* Timeline Dot Indicator */}
              <div className="absolute left-4 md:left-1/2 top-2 md:top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: isHovered ? 1.4 : 1,
                    backgroundColor: isHovered ? 'var(--pearl-50)' : 'transparent'
                  }}
                  className={`h-4.5 w-4.5 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center bg-pearl-50 dark:bg-zinc-950 transition-all shadow-sm ${
                    isHovered ? `ring-4 ring-emerald-500/20 dark:ring-emerald-400/10 border-emerald-500` : ''
                  }`}
                >
                  <div className={`h-1.5 w-1.5 rounded-full ${isHovered ? 'bg-emerald-500' : 'bg-zinc-400 dark:bg-zinc-600'}`} />
                </motion.div>
              </div>

              {/* Content Panel */}
              <div className="w-full md:w-1/2 pl-10 md:pl-0 md:px-10">
                <div
                  className={`relative transition-all duration-300 p-2 md:p-4 rounded-xl ${
                    isHovered ? 'translate-y-[-2px]' : ''
                  }`}
                >
                  {/* Step Metadata */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-saffron-600 dark:text-saffron-400">
                      {step.subtitle}
                    </span>
                    <span className="text-zinc-300 dark:text-zinc-800">•</span>
                    <Icon className={`h-3.5 w-3.5 ${step.color}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight font-display mb-1 transition-colors duration-200">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans max-w-md">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Empty Spacing Panel for desktop layout */}
              <div className="w-full md:w-1/2 hidden md:block" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

