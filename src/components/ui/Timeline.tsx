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
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30'
  },
  {
    icon: Cpu,
    title: 'AI Ingest & NLP Parsing',
    subtitle: 'Real-time',
    description: 'Sanjeevani scans the publication, parsing PDFs, DOCX, or LaTeX to identify compound mentions in text and tables.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30'
  },
  {
    icon: FlaskConical,
    title: 'SMILES Extraction',
    subtitle: 'Real-time',
    description: 'Extracted structures are rendered as chemical SMILES notations with confidence metrics, ready for verification.',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30'
  },
  {
    icon: Search,
    title: 'Novelty Assessment',
    subtitle: 'Real-time',
    description: 'Molecules are cross-referenced against global patent databases and registries to evaluate structural uniqueness.',
    color: 'text-teal-500',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/30'
  },
  {
    icon: Bell,
    title: 'Section 31 Alert Trigger',
    subtitle: 'T-Minus Window',
    description: 'The countdown is active. Alerts notify TTO officers of closing filing windows, ensuring no novel compound is lost.',
    color: 'text-saffron-500',
    bgColor: 'bg-saffron-500/10',
    borderColor: 'border-saffron-500/30'
  },
  {
    icon: Award,
    title: 'Successful Patent Filing',
    subtitle: 'Before Month 12',
    description: 'TTO files the patent application inside the legal Section 31 grace period, securing the university\'s IP rights.',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30'
  }
];

export function Timeline() {
  return (
    <div className="relative mx-auto max-w-5xl px-4 py-16">
      {/* Central line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-emerald-500/20 via-saffron-500/20 to-indigo-500/20 hidden md:block" />

      <div className="space-y-12 md:space-y-20">
        {timelineSteps.map((step, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 top-6 -translate-x-1/2 z-20 hidden md:flex items-center justify-center">
                <motion.div 
                  className={`h-10 w-10 rounded-full border-2 ${step.borderColor} ${step.bgColor} flex items-center justify-center text-navy-800 dark:text-white shadow-lg backdrop-blur-md`}
                  whileHover={{ scale: 1.15 }}
                >
                  <step.icon className={`h-5 w-5 ${step.color}`} />
                </motion.div>
              </div>

              {/* Content Panel */}
              <div className="w-full md:w-1/2 px-0 md:px-8">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="glass relative rounded-2xl p-6 md:p-8 border border-white/10 dark:border-zinc-800 shadow-xl"
                >
                  {/* Step Icon for Mobile */}
                  <div className="flex md:hidden items-center justify-between mb-4">
                    <div className={`h-10 w-10 rounded-full ${step.bgColor} flex items-center justify-center`}>
                      <step.icon className={`h-5 w-5 ${step.color}`} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-navy-400">
                      {step.subtitle}
                    </span>
                  </div>

                  <span className="hidden md:inline-block mb-2 text-xs font-bold uppercase tracking-wider text-navy-400">
                    {step.subtitle}
                  </span>
                  
                  <h3 className="text-lg md:text-xl font-bold text-navy-900 dark:text-white mb-2 font-display">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed text-navy-500 dark:text-navy-400">
                    {step.description}
                  </p>

                  {/* Decorative side accent */}
                  <div className={`absolute top-0 bottom-0 left-0 w-1.5 rounded-l-2xl ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-purple-500' :
                    index === 2 ? 'bg-emerald-500' :
                    index === 3 ? 'bg-teal-500' :
                    index === 4 ? 'bg-saffron-500' : 'bg-indigo-500'
                  }`} />
                </motion.div>
              </div>

              {/* Empty spacing panel for alignment */}
              <div className="w-full md:w-1/2 hidden md:block" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
