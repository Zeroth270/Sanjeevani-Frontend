export function ResearchPaperSVG() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full select-none"
    >
      {/* Paper Sheet Outline */}
      <rect x="5" y="5" width="90" height="120" rx="6" stroke="#8B5CF6" strokeWidth="2.5" fill="#FFFFFF" className="dark:fill-zinc-950" />
      
      {/* Dog-ear Corner line */}
      <path d="M 80 5 L 80 20 L 95 20" stroke="#8B5CF6" strokeWidth="2" strokeLinejoin="round" fill="none" />

      {/* Written Lined Details */}
      {/* Title block */}
      <line x1="18" y1="22" x2="55" y2="22" stroke="#8B5CF6" strokeWidth="3.5" strokeLinecap="round" />
      
      {/* Horizontal text lines */}
      <line x1="18" y1="38" x2="82" y2="38" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="48" x2="82" y2="48" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="58" x2="82" y2="58" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="68" x2="50" y2="68" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />

      {/* Chemical Benzene Ring line art */}
      <g stroke="#8B5CF6" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="50,85 62,92 62,106 50,113 38,106 38,92" />
        <line x1="48" y1="88" x2="59" y2="94" strokeWidth="1" />
        <line x1="60" y1="102" x2="60" y2="104" strokeWidth="1" />
        <line x1="40" y1="102" x2="40" y2="95" strokeWidth="1" />
      </g>
    </svg>
  );
}
