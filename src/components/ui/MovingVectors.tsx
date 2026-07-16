import { motion } from 'framer-motion';

export function MovingVectors() {
  // Benzene ring nodes
  const b0 = { x: 100, y: 50 };
  const b1 = { x: 150, y: 80 };
  const b2 = { x: 150, y: 140 };
  const b3 = { x: 100, y: 170 };
  const b4 = { x: 50, y: 140 };
  const b5 = { x: 50, y: 80 };
  const benzeneNodes = [b0, b1, b2, b3, b4, b5];

  // Branched cluster nodes
  const c0 = { x: 50, y: 50 };
  const c1 = { x: 110, y: 70 };
  const c2 = { x: 170, y: 50 };
  const c3 = { x: 110, y: 130 };
  const chainNodes = [c0, c1, c2, c3];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-40 dark:opacity-30">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-saffron-500/5 blur-[150px] animate-pulse-slow" style={{ animationDelay: '-2s' }} />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.25] dark:opacity-[0.15]" />

      {/* Floating Molecule Cluster 1: Benzene Ring */}
      <motion.div
        className="absolute w-[200px] h-[220px]"
        style={{ left: '15%', top: '25%' }}
        animate={{
          x: [0, 20, -10, 0],
          y: [0, -30, 15, 0],
          rotate: [0, 45, 90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 200 220" className="text-emerald-500/30 dark:text-emerald-400/20">
          {/* Bonds */}
          <line x1={b0.x} y1={b0.y} x2={b1.x} y2={b1.y} stroke="currentColor" strokeWidth="1.5" />
          <line x1={b1.x} y1={b1.y} x2={b2.x} y2={b2.y} stroke="currentColor" strokeWidth="1.5" />
          <line x1={b2.x} y1={b2.y} x2={b3.x} y2={b3.y} stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1={b3.x} y1={b3.y} x2={b4.x} y2={b4.y} stroke="currentColor" strokeWidth="1.5" />
          <line x1={b4.x} y1={b4.y} x2={b5.x} y2={b5.y} stroke="currentColor" strokeWidth="1.5" />
          <line x1={b5.x} y1={b5.y} x2={b0.x} y2={b0.y} stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          
          {/* Double bonds indicators */}
          <line x1={b0.x + 4} y1={b0.y + 8} x2={b1.x - 4} y2={b1.y + 6} stroke="currentColor" strokeWidth="1" />
          <line x1={b2.x - 6} y1={b2.y - 4} x2={b3.x - 4} y2={b3.y - 8} stroke="currentColor" strokeWidth="1" />
          <line x1={b4.x + 6} y1={b4.y - 4} x2={b5.x + 4} y2={b5.y - 8} stroke="currentColor" strokeWidth="1" />

          {/* Atoms */}
          {benzeneNodes.map((node, i) => (
            <circle
              key={i}
              cx={node.x}
              cy={node.y}
              r={i % 2 === 0 ? '6' : '4'}
              className="fill-pearl-50 stroke-emerald-500/50 dark:stroke-emerald-400/40"
              strokeWidth="2"
            />
          ))}
        </svg>
      </motion.div>

      {/* Floating Molecule Cluster 2: Chain */}
      <motion.div
        className="absolute w-[220px] h-[180px]"
        style={{ right: '12%', top: '15%' }}
        animate={{
          x: [0, -30, 15, 0],
          y: [0, 20, -10, 0],
          rotate: [0, -30, 20, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 220 180" className="text-saffron-500/20 dark:text-saffron-400/15">
          {/* Bonds */}
          <line x1={c0.x} y1={c0.y} x2={c1.x} y2={c1.y} stroke="currentColor" strokeWidth="1.5" />
          <line x1={c1.x} y1={c1.y} x2={c2.x} y2={c2.y} stroke="currentColor" strokeWidth="1.5" />
          <line x1={c1.x} y1={c1.y} x2={c3.x} y2={c3.y} stroke="currentColor" strokeWidth="1.5" />

          {/* Atoms */}
          {chainNodes.map((node, i) => (
            <circle
              key={i}
              cx={node.x}
              cy={node.y}
              r={i === 1 ? '7' : '5'}
              className="fill-pearl-50 stroke-saffron-500/50 dark:stroke-saffron-400/40"
              strokeWidth="2"
            />
          ))}
        </svg>
      </motion.div>

      {/* Floating Molecule Cluster 3: Simple atoms in lower sections */}
      <motion.div
        className="absolute w-[180px] h-[180px]"
        style={{ left: '10%', bottom: '15%' }}
        animate={{
          x: [0, 15, -20, 0],
          y: [0, 25, -15, 0],
          rotate: [0, 60, -45, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 180 180" className="text-emerald-500/20 dark:text-emerald-400/15">
          <line x1="40" y1="40" x2="90" y2="90" stroke="currentColor" strokeWidth="1.5" />
          <line x1="90" y1="90" x2="140" y2="70" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
          
          <circle cx="40" cy="40" r="5" className="fill-pearl-50 stroke-emerald-500/40 dark:stroke-emerald-400/30" strokeWidth="2" />
          <circle cx="90" cy="90" r="8" className="fill-pearl-50 stroke-emerald-500/50 dark:stroke-emerald-400/40" strokeWidth="2" />
          <circle cx="140" cy="70" r="6" className="fill-pearl-50 stroke-emerald-500/40 dark:stroke-emerald-400/30" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* Floating Molecule Cluster 4: Simple atoms in lower right */}
      <motion.div
        className="absolute w-[150px] h-[150px]"
        style={{ right: '15%', bottom: '20%' }}
        animate={{
          x: [0, -15, 20, 0],
          y: [0, -20, 15, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 150 150" className="text-navy-300/30 dark:text-navy-600/20">
          <line x1="30" y1="100" x2="80" y2="50" stroke="currentColor" strokeWidth="1.2" />
          <line x1="80" y1="50" x2="120" y2="80" stroke="currentColor" strokeWidth="1.2" />
          
          <circle cx="30" cy="100" r="4" className="fill-pearl-50 stroke-navy-400/40" strokeWidth="1.5" />
          <circle cx="80" cy="50" r="6" className="fill-pearl-50 stroke-navy-400/50" strokeWidth="1.5" />
          <circle cx="120" cy="80" r="4" className="fill-pearl-50 stroke-navy-400/40" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}
