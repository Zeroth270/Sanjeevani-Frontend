export function CompoundSVG() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full select-none"
    >
      {/* Connecting Bonds (Purple Lines) */}
      <g stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round">
        <line x1="100" y1="100" x2="100" y2="40" />
        <line x1="100" y1="100" x2="45" y2="125" />
        <line x1="100" y1="100" x2="155" y2="130" />
        <line x1="100" y1="100" x2="120" y2="155" />
      </g>

      {/* Atom Nodes (Purple Outlined Circles, No Fill) */}
      <g stroke="#8B5CF6" strokeWidth="2.5" fill="none">
        <circle cx="100" cy="100" r="18" fill="#FFFFFF" className="dark:fill-zinc-950" />
        <circle cx="100" cy="40" r="12" fill="#FFFFFF" className="dark:fill-zinc-950" />
        <circle cx="45" cy="125" r="12" fill="#FFFFFF" className="dark:fill-zinc-950" />
        <circle cx="155" cy="130" r="12" fill="#FFFFFF" className="dark:fill-zinc-950" />
        <circle cx="120" cy="155" r="12" fill="#FFFFFF" className="dark:fill-zinc-950" />
      </g>
    </svg>
  );
}
