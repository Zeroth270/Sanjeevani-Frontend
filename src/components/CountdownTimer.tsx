import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  deadline: string;
  daysRemaining: number;
  label?: string;
  onExpire?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(deadline: string): TimeLeft {
  if (!deadline) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const parsed = new Date(deadline).getTime();
  if (isNaN(parsed)) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const diff = parsed - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function getUrgency(days: number): {
  level: 'critical' | 'warning' | 'normal';
  className: string;
} {
  if (days <= 7) return { level: 'critical', className: 'text-danger animate-countdown-pulse' };
  if (days <= 15) return { level: 'warning', className: 'text-saffron-500' };
  return { level: 'normal', className: 'text-navy-700' };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold tabular-nums leading-none md:text-3xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 text-xs font-medium uppercase tracking-wider opacity-70">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer({
  deadline,
  daysRemaining,
  label,
  onExpire,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calcTimeLeft(deadline)
  );
  const urgency = getUrgency(daysRemaining);

  const tick = useCallback(() => {
    const next = calcTimeLeft(deadline);
    setTimeLeft(next);
    if (next.days === 0 && next.hours === 0 && next.minutes === 0 && next.seconds === 0) {
      onExpire?.();
    }
  }, [deadline, onExpire]);

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'glass-strong rounded-xl p-4 text-center md:p-6',
        urgency.className
      )}
      role="timer"
      aria-label={`${daysRemaining} days remaining until deadline`}
    >
      {label && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest">
          {label}
        </p>
      )}

      <div className="flex items-center justify-center gap-3 md:gap-5">
        <TimeUnit value={timeLeft.days} label="Days" />
        <span className="text-2xl font-light opacity-40 md:text-3xl">:</span>
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <span className="text-2xl font-light opacity-40 md:text-3xl">:</span>
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <span className="text-2xl font-light opacity-40 md:text-3xl">:</span>
        <TimeUnit value={timeLeft.seconds} label="Sec" />
      </div>

      {urgency.level === 'critical' && (
        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-danger">
          Section 31 deadline closing
        </p>
      )}
    </motion.div>
  );
}
