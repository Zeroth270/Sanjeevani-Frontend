import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NoveltyGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

function getScoreColor(score: number): string {
  if (score >= 0.8) return '#10B981';
  if (score >= 0.5) return '#F97316';
  return '#EF4444';
}

function getScoreLabel(score: number): string {
  if (score >= 0.8) return 'Novel';
  if (score >= 0.5) return 'Uncertain';
  return 'Known';
}

const sizeMap = {
  sm: { width: 80, stroke: 6, fontSize: 14 },
  md: { width: 120, stroke: 8, fontSize: 18 },
  lg: { width: 160, stroke: 10, fontSize: 24 },
};

export function NoveltyGauge({ score, size = 'md' }: NoveltyGaugeProps) {
  const cfg = sizeMap[size];
  const radius = (cfg.width - cfg.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(score, 1));
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      role="meter"
      aria-valuenow={Math.round(score * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Novelty score: ${Math.round(score * 100)}%`}
    >
      <svg width={cfg.width} height={cfg.width} className="-rotate-90">
        <circle
          cx={cfg.width / 2}
          cy={cfg.width / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={cfg.stroke}
          className="text-navy-100"
        />
        <motion.circle
          cx={cfg.width / 2}
          cy={cfg.width / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={cfg.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={cn(
            'font-bold leading-none',
            size === 'sm' && 'text-lg',
            size === 'md' && 'text-2xl',
            size === 'lg' && 'text-3xl'
          )}
          style={{ color }}
        >
          {Math.round(score * 100)}%
        </span>
        <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-navy-500">
          {label}
        </span>
      </div>
    </div>
  );
}
