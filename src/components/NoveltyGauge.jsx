// NoveltyGauge — SVG arc gauge showing novelty score 0–1
export function NoveltyGauge({ score }) {
  const pct = Math.min(1, Math.max(0, score));
  const radius = 54;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // Only draw 75% of the circle (270°), leaving a gap at bottom
  const arcLength = circumference * 0.75;
  const offset = circumference * (1 - 0.75 * pct);

  const color =
    pct >= 0.75 ? '#14b8a6' : pct >= 0.5 ? '#fbbf24' : '#f87171';

  const label =
    pct >= 0.75 ? 'NOVEL' : pct >= 0.5 ? 'UNCERTAIN' : 'KNOWN';

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
        {/* Background arc */}
        <circle
          cx={radius} cy={radius} r={normalizedRadius}
          fill="none"
          stroke="#1e293b"
          strokeWidth={stroke}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={-circumference * 0.125}
          strokeLinecap="round"
          transform={`rotate(135 ${radius} ${radius})`}
        />
        {/* Foreground arc */}
        <circle
          cx={radius} cy={radius} r={normalizedRadius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={offset + circumference * 0.125}
          strokeLinecap="round"
          transform={`rotate(135 ${radius} ${radius})`}
          style={{ transition: 'stroke-dashoffset 0.8s ease, stroke 0.4s' }}
          filter={`drop-shadow(0 0 6px ${color}80)`}
        />
        {/* Center text */}
        <text x={radius} y={radius - 4} textAnchor="middle" dominantBaseline="middle"
          fill={color} fontSize="18" fontWeight="700" fontFamily="JetBrains Mono, monospace">
          {Math.round(pct * 100)}
        </text>
        <text x={radius} y={radius + 14} textAnchor="middle"
          fill="#64748b" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif" letterSpacing="0.08em">
          / 100
        </text>
      </svg>
      <span
        className="text-xs font-bold tracking-widest px-3 py-1 rounded-full"
        style={{ background: `${color}22`, color }}
      >
        {label}
      </span>
    </div>
  );
}
