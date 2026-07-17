import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

// Orbiting Electron helper for AtomVector
function OrbitingElectron({
  rx,
  ry,
  rotation: deg,
  duration,
  direction = 1,
  phaseOffset = 0,
  sphereGradient,
  r = 8
}: {
  rx: number;
  ry: number;
  rotation: number;
  duration: number;
  direction?: number;
  phaseOffset?: number;
  sphereGradient: string;
  r?: number;
}) {
  const angle = useMotionValue(phaseOffset);
  const startRef = useRef(performance.now());

  useEffect(() => {
    startRef.current = performance.now();
    let rafId: number;
    function tick() {
      const elapsed = (performance.now() - startRef.current) / 1000;
      const t = (elapsed % duration) / duration;
      angle.set(phaseOffset + t * 360 * direction);
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [angle, phaseOffset, duration, direction]);

  const rad = (deg * Math.PI) / 180;

  const cx = useTransform(angle, (v) => {
    const vr = (v * Math.PI) / 180;
    return 200 + rx * Math.cos(vr) * Math.cos(rad) - ry * Math.sin(vr) * Math.sin(rad);
  });

  const cy = useTransform(angle, (v) => {
    const vr = (v * Math.PI) / 180;
    return 200 + rx * Math.cos(vr) * Math.sin(rad) + ry * Math.sin(vr) * Math.cos(rad);
  });

  return <motion.circle r={r} fill={sphereGradient} cx={cx} cy={cy} />;
}

// 1. ATOM VECTOR (Original orbiting atom design)
export function AtomVector({ isDark }: { isDark: boolean }) {
  return (
    <div className="w-full max-w-[340px] md:max-w-[420px] aspect-square flex items-center justify-center">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          {isDark ? (
            <radialGradient id="electronSphere" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#e4e4e7" />
              <stop offset="70%" stopColor="#a1a1aa" />
              <stop offset="100%" stopColor="#3f3f46" />
            </radialGradient>
          ) : (
            <radialGradient id="electronSphere" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#71717a" />
              <stop offset="35%" stopColor="#3f3f46" />
              <stop offset="70%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#020202" />
            </radialGradient>
          )}
        </defs>

        {/* Orbit 1 (Tilted 10°) */}
        <ellipse
          cx="200" cy="200" rx="160" ry="55" fill="none"
          stroke={isDark ? "#ffffff" : "#18181b"}
          strokeWidth="1.5"
          opacity={isDark ? "0.6" : "0.7"}
          transform="rotate(10 200 200)"
        />
        <OrbitingElectron rx={160} ry={55} rotation={10} duration={5} sphereGradient="url(#electronSphere)" r={10} />

        {/* Orbit 2 (Tilted 70°) */}
        <ellipse
          cx="200" cy="200" rx="160" ry="55" fill="none"
          stroke={isDark ? "#ffffff" : "#18181b"}
          strokeWidth="1.5"
          opacity={isDark ? "0.6" : "0.7"}
          transform="rotate(70 200 200)"
        />
        <OrbitingElectron rx={160} ry={55} rotation={70} duration={5} direction={-1} sphereGradient="url(#electronSphere)" r={10} />

        {/* Orbit 3 (Tilted -50°) */}
        <ellipse
          cx="200" cy="200" rx="160" ry="55" fill="none"
          stroke={isDark ? "#ffffff" : "#18181b"}
          strokeWidth="1.5"
          opacity={isDark ? "0.6" : "0.7"}
          transform="rotate(-50 200 200)"
        />
        <OrbitingElectron rx={160} ry={55} rotation={-50} duration={5} sphereGradient="url(#electronSphere)" r={10} />

        {/* 7. Central Nucleus Sphere (Adapts to theme) */}
        {/* Outer Glow */}
        <circle
          cx="200"
          cy="200"
          r="35"
          fill="none"
          stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)"}
          strokeWidth="6"
          className="animate-pulse"
        />
        {/* 3D Sphere */}
        <circle
          cx="200"
          cy="200"
          r="30"
          fill="url(#electronSphere)"
        />
      </svg>
    </div>
  );
}

// 2. RESEARCH PAPER VECTOR (Ultra-Minimalist: bare outlines, no pen icon, clean geometric accents)
export function ResearchPaperVector({ isDark }: { isDark: boolean }) {
  const purpleAccent = isDark ? "#c4b5fd" : "#8b5cf6"; // purple-300 : purple-500
  const primaryStroke = isDark ? "#ffffff" : "#18181b"; // White in dark, Dark Zinc in light
  const secondaryStroke = isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(24, 24, 27, 0.5)";
  const tertiaryStroke = isDark ? "rgba(255, 255, 255, 0.25)" : "rgba(24, 24, 27, 0.25)";

  return (
    <div className="w-full max-w-[340px] md:max-w-[420px] aspect-square flex items-center justify-center relative">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Transparent Document Boundary Outline */}
        <rect
          x="75"
          y="45"
          width="250"
          height="310"
          rx="10"
          fill="none"
          stroke={primaryStroke}
          strokeWidth="1.2"
        />

        {/* Minimalist Margin Guide Line */}
        <line
          x1="105"
          y1="45"
          x2="105"
          y2="355"
          stroke={tertiaryStroke}
          strokeWidth="0.8"
          strokeDasharray="2 3"
        />

        {/* Title line - drawn out of thin air */}
        <motion.line
          x1="120"
          y1="80"
          x2="280"
          y2="80"
          stroke={primaryStroke}
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeInOut" }}
        />

        {/* Subtitle / Author line */}
        <motion.line
          x1="120"
          y1="105"
          x2="210"
          y2="105"
          stroke={secondaryStroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.6, duration: 0.4, ease: "easeInOut" }}
        />

        {/* Abstract text line */}
        <motion.line
          x1="120"
          y1="135"
          x2="295"
          y2="135"
          stroke={tertiaryStroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.0, duration: 0.5, ease: "easeInOut" }}
        />
        <motion.line
          x1="120"
          y1="155"
          x2="260"
          y2="155"
          stroke={tertiaryStroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.4, duration: 0.5, ease: "easeInOut" }}
        />

        {/* Chemical Structure - Skeletal Benzene Ring (pure geometry, no text) */}
        <motion.path
          d="M 200 215 L 235 235 L 235 275 L 200 295 L 165 275 L 165 235 Z"
          fill="none"
          stroke={primaryStroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.9, duration: 1.0, ease: "easeInOut" }}
        />

        {/* Inner double bonds */}
        <motion.path
          d="M 203 224 L 229 239"
          stroke={primaryStroke}
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2.9, duration: 0.3 }}
        />
        <motion.path
          d="M 229 271 L 203 286"
          stroke={primaryStroke}
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 3.2, duration: 0.3 }}
        />
        <motion.path
          d="M 171 271 L 171 239"
          stroke={primaryStroke}
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 3.5, duration: 0.3 }}
        />

        {/* Substituent link leading to a clean purple accent dot (no text labels) */}
        <motion.path
          d="M 235 235 L 255 223"
          fill="none"
          stroke={purpleAccent}
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 3.8, duration: 0.3 }}
        />
        <motion.circle
          cx="255"
          cy="223"
          r="3"
          fill={purpleAccent}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 4.1, duration: 0.2 }}
        />

        <motion.path
          d="M 165 235 L 145 223"
          fill="none"
          stroke={purpleAccent}
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 3.8, duration: 0.3 }}
        />
        <motion.circle
          cx="145"
          cy="223"
          r="3"
          fill={purpleAccent}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 4.1, duration: 0.2 }}
        />
      </svg>
    </div>
  );
}

// 3. PATENT PAPER VECTOR (Ultra-Minimalist: transparent card, simple outlines, single line laser, outline stamp)
export function PatentPaperVector({ isDark }: { isDark: boolean }) {
  const purpleAccent = isDark ? "#c4b5fd" : "#8b5cf6"; // purple-300 : purple-500
  const primaryStroke = isDark ? "#ffffff" : "#18181b"; // White in dark, Dark Zinc in light
  const secondaryStroke = isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(24, 24, 27, 0.5)";
  const tertiaryStroke = isDark ? "rgba(255, 255, 255, 0.25)" : "rgba(24, 24, 27, 0.25)";

  return (
    <div className="w-full max-w-[340px] md:max-w-[420px] aspect-square flex items-center justify-center relative">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Transparent Document Outline Base */}
        <rect
          x="75"
          y="45"
          width="250"
          height="310"
          rx="10"
          fill="none"
          stroke={primaryStroke}
          strokeWidth="1.2"
        />

        {/* Minimal Header Text */}
        <text
          x="200"
          y="74"
          textAnchor="middle"
          fontSize="9"
          fontWeight="bold"
          fill={primaryStroke}
          fontFamily="monospace"
          letterSpacing="2.2"
        >
          PATENT SPEC
        </text>

        <line x1="120" y1="84" x2="280" y2="84" stroke={tertiaryStroke} strokeWidth="0.8" />

        {/* Technical Drawing - Minimalist Molecular Backbone Outline (no text labels, clean purple accent dot) */}
        <g opacity="0.8">
          <path
            d="M 130 155 L 165 135 L 200 155 L 235 135 L 270 155"
            fill="none"
            stroke={secondaryStroke}
            strokeWidth="1.8"
          />
          <path
            d="M 200 155 L 200 120"
            fill="none"
            stroke={purpleAccent}
            strokeWidth="1.2"
          />
          <motion.circle
            cx="200"
            cy="120"
            r="3"
            fill={purpleAccent}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 }}
          />
          
          <path
            d="M 165 135 L 165 110"
            fill="none"
            stroke={secondaryStroke}
            strokeWidth="1.2"
          />
          <circle cx="165" cy="110" r="2" fill="none" stroke={secondaryStroke} strokeWidth="1" />
        </g>

        {/* Bottom Claim Lines */}
        <line x1="110" y1="240" x2="290" y2="240" stroke={tertiaryStroke} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="110" y1="255" x2="250" y2="255" stroke={tertiaryStroke} strokeWidth="1.5" strokeLinecap="round" />

        {/* Ultra-Minimalist Seal (Outline circle + center dot) */}
        <g transform="translate(265, 290)">
          <circle cx="0" cy="0" r="10" fill="none" stroke={purpleAccent} strokeWidth="1.2" />
          <circle cx="0" cy="0" r="2.5" fill={purpleAccent} />
        </g>

        {/* Vertical Scanning Laser Overlay (Single White Laser Line with Purple shadow glow) */}
        <motion.g
          initial={{ y: 0 }}
          animate={{ y: [0, 260, 0, 260] }}
          transition={{ duration: 3.0, ease: "easeInOut" }}
        >
          <line
            x1="80"
            y1="57"
            x2="320"
            y2="57"
            stroke={primaryStroke}
            strokeWidth="1.2"
            opacity="0.9"
            style={{ filter: `drop-shadow(0px 0px 2px ${purpleAccent})` }}
          />
        </motion.g>

        {/* Done Shockwave Ring (Expanding wireframe) */}
        <motion.circle
          cx="200"
          cy="200"
          r={60}
          fill="none"
          stroke={purpleAccent}
          strokeWidth="1.2"
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{
            scale: [0.2, 0.2, 1.2],
            opacity: [0, 0, 0.6, 0]
          }}
          transition={{
            times: [0, 0.75, 1],
            duration: 4.0,
            ease: "easeOut"
          }}
        />

        {/* Done Checkmark Animation (replacing GRANTED stamp) */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 0, 1.2, 1],
            opacity: [0, 0, 1, 1],
          }}
          transition={{
            times: [0, 0.75, 0.85, 1],
            duration: 4.0,
            ease: "easeOut"
          }}
          style={{ originX: '200px', originY: '198px' }}
        >
          {/* Minimalist circle outline */}
          <circle
            cx="200"
            cy="198"
            r="20"
            fill="none"
            stroke={purpleAccent}
            strokeWidth="1.8"
          />
          {/* Animated checkmark path */}
          <motion.path
            d="M 190 198 L 197 205 L 210 188"
            fill="none"
            stroke={purpleAccent}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 0, 1] }}
            transition={{
              times: [0, 0.8, 1],
              duration: 4.0,
              ease: "easeOut"
            }}
          />
        </motion.g>
      </svg>
    </div>
  );
}
