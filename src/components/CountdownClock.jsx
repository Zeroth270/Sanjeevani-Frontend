import { useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';

function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

export function CountdownClock({ deadlineDate, compact = false }) {
  const [secs, setSecs] = useState(() =>
    Math.max(0, differenceInSeconds(new Date(deadlineDate), new Date()))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setSecs(Math.max(0, differenceInSeconds(new Date(deadlineDate), new Date())));
    }, 1000);
    return () => clearInterval(id);
  }, [deadlineDate]);

  const days = Math.floor(secs / 86400);
  const hrs  = Math.floor((secs % 86400) / 3600);
  const mins = Math.floor((secs % 3600) / 60);
  const sc   = secs % 60;

  const isUrgent  = days <= 7;
  const isWarning = days <= 21 && !isUrgent;
  const color = isUrgent ? '#f87171' : isWarning ? '#fbbf24' : '#4ade80';

  /* ── compact inline variant (used in table rows) ── */
  if (compact) {
    return (
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.82rem',
        fontWeight: 700,
        color,
        letterSpacing: '-0.01em',
      }}>
        {days}d {pad(hrs)}h {pad(mins)}m
      </span>
    );
  }

  /* ── full countdown block ── */
  const segments = [
    { val: days, unit: 'days' },
    { val: hrs,  unit: 'hrs'  },
    { val: mins, unit: 'min'  },
    { val: sc,   unit: 'sec'  },
  ];

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: '4px',
      padding: '20px 24px',
      borderRadius: '16px',
      border: `1px solid ${color}44`,
      background: `${color}0e`,
      animation: isUrgent ? '_urgencyPulse 2.2s ease-in-out infinite' : undefined,
    }}>
      {segments.map(({ val, unit }, i) => (
        <div key={unit} style={{ display: 'flex', alignItems: 'flex-start', gap: '0' }}>
          {/* separator */}
          {i > 0 && (
            <span className="countdown-sep" style={{ color }}>:</span>
          )}
          {/* digit block */}
          <div className="countdown-digit-block">
            <span className="countdown-digit" style={{ color }}>{pad(val)}</span>
            <span className="countdown-unit">{unit}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
