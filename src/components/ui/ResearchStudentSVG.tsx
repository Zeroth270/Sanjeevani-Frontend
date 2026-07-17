import { motion } from 'framer-motion';

export function ResearchStudentSVG() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 360 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="max-w-sm xl:max-w-md w-full h-auto select-none"
    >
      <defs>
        {/* Soft purple radial backdrop glow */}
        <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Backdrop glow circle */}
      <circle cx="180" cy="180" r="140" fill="url(#bg-glow)" />

      {/* Floating Scientific Molecular Elements (Above the workspace) */}
      <g opacity="0.85">
        <motion.g
          animate={{
            y: [0, -6, 0],
            rotate: [0, 4, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Molecule 1 */}
          <line x1="145" y1="90" x2="170" y2="75" stroke="#09090B" strokeWidth="1.5" />
          <line x1="170" y1="75" x2="195" y2="85" stroke="#09090B" strokeWidth="1.5" />
          <line x1="170" y1="75" x2="170" y2="50" stroke="#09090B" strokeWidth="1.5" strokeDasharray="3 3" />
          
          <circle cx="145" cy="90" r="6" fill="#8B5CF6" stroke="#09090B" strokeWidth="1.5" />
          <circle cx="170" cy="75" r="5" fill="#09090B" />
          <circle cx="195" cy="85" r="6" fill="#FFFFFF" stroke="#09090B" strokeWidth="1.5" />
          <circle cx="170" cy="50" r="4" fill="#8B5CF6" stroke="#09090B" strokeWidth="1.2" />
        </motion.g>

        {/* Small floating sparkles/stars */}
        <motion.path
          d="M 65 135 L 71 135 M 68 132 L 68 138"
          stroke="#8B5CF6"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 285 95 L 291 95 M 288 92 L 288 98"
          stroke="#C4B5FD"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{ scale: [1.2, 0.8, 1.2], opacity: [1, 0.5, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </g>

      {/* Organic Plants/Leaves (Behind the researcher on the right) */}
      <g>
        {/* Plant Stem 1 */}
        <path d="M 280 270 Q 305 200 315 130" stroke="#EDE9FE" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Big Leaf 1 */}
        <path d="M 315 130 C 300 100, 270 125, 280 160 C 290 175, 310 160, 315 130 Z" fill="#DDD6FE" />
        {/* Leaf 1 Veins */}
        <path d="M 283 158 Q 295 145 311 133 M 290 152 Q 297 143 303 140 M 296 157 Q 302 150 307 147" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.6" />
        
        {/* Plant Stem 2 */}
        <path d="M 290 270 Q 270 190 245 150" stroke="#EDE9FE" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
        {/* Leaf 2 */}
        <path d="M 245 150 C 225 130, 215 160, 220 180 C 230 190, 240 175, 245 150 Z" fill="#C4B5FD" />
        
        {/* Plant Stem 3 */}
        <path d="M 300 270 Q 330 220 335 190" stroke="#EDE9FE" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Leaf 3 */}
        <path d="M 335 190 C 345 170, 320 170, 315 195 C 310 210, 325 210, 335 190 Z" fill="#8B5CF6" />
        {/* Leaf 3 Veins */}
        <path d="M 318 194 Q 324 199 332 191" stroke="#EDE9FE" strokeWidth="0.8" fill="none" opacity="0.5" />
      </g>

      {/* Ergonomic Office Chair */}
      {/* Chair Legs */}
      <path d="M 245 276 L 235 334" stroke="#09090B" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M 265 276 L 275 334" stroke="#09090B" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M 255 276 L 255 334" stroke="#7C3AED" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
      {/* Wheels */}
      <circle cx="235" cy="334" r="3" fill="#09090B" />
      <circle cx="275" cy="334" r="3" fill="#09090B" />
      <rect x="230" y="331" width="10" height="2" fill="#09090B" />
      <rect x="270" y="331" width="10" height="2" fill="#09090B" />
      {/* Seat Cushion */}
      <rect x="226" y="268" width="52" height="8" rx="4" fill="#7C3AED" stroke="#09090B" strokeWidth="2" />
      {/* Chair Back Support */}
      <path d="M 268 268 L 268 195" stroke="#09090B" strokeWidth="4" strokeLinecap="round" />
      {/* Backrest Cushion */}
      <rect x="261" y="172" width="14" height="42" rx="7" fill="#8B5CF6" stroke="#09090B" strokeWidth="2" />

      {/* Ground shadow blob */}
      <path d="M 40 336 C 130 345, 250 345, 320 336" stroke="#E4E4E7" strokeWidth="2.5" strokeLinecap="round" />

      {/* Desk/Table Legs */}
      <rect x="70" y="254" width="4" height="80" fill="#09090B" rx="2" />
      <rect x="306" y="254" width="4" height="80" fill="#09090B" rx="2" />
      {/* Table Top */}
      <rect x="50" y="248" width="265" height="6" rx="3" fill="#09090B" />

      {/* Precise Table Object Shadows */}
      <ellipse cx="108" cy="249" rx="28" ry="1.2" fill="#E4E4E7" />
      <ellipse cx="178" cy="249" rx="22" ry="1.2" fill="#E4E4E7" />

      {/* Stack of Chemical/Pharmacy Research Books */}
      <g>
        {/* Book 1: Thick Bottom Book (Black/Charcoal) */}
        <rect x="80" y="232" width="55" height="16" rx="2" fill="#09090B" />
        <rect x="83" y="234" width="6" height="12" fill="#8B5CF6" rx="1" />
        <rect x="131" y="234" width="4" height="12" fill="#FFFFFF" /> {/* Page edges texture */}
        <line x1="131" y1="237" x2="135" y2="237" stroke="#E4E4E7" strokeWidth="1" />
        <line x1="131" y1="243" x2="135" y2="243" stroke="#E4E4E7" strokeWidth="1" />
        
        {/* Book 2: Middle Book (Purple) */}
        <rect x="85" y="220" width="48" height="12" rx="2" fill="#8B5CF6" />
        <rect x="88" y="222" width="5" height="8" fill="#FFFFFF" rx="0.5" />
        <rect x="129" y="222" width="4" height="8" fill="#FFFFFF" /> {/* Page edges texture */}
        
        {/* Bookmark Ribbon Hanging Out of Book 2 */}
        <path d="M 124 228 L 124 238 L 121 235 L 118 238 L 118 228 Z" fill="#7C3AED" />

        {/* Book 3: Top Book (White/Lavender, Lying Slightly Askew) */}
        <rect x="82" y="210" width="50" height="10" rx="2" fill="#E4E4E7" transform="rotate(-4, 82, 210)" />
        <rect x="84" y="211" width="5" height="8" fill="#7C3AED" rx="0.5" transform="rotate(-4, 84, 211)" />

        {/* Flask Chemistry Logo Floating Above Books */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Beaker Outline */}
          <path
            d="M 108 178 L 108 183 L 103 190 C 101.5 192.5, 105 197, 110 197 C 115 197, 118.5 192.5, 117 190 L 112 183 L 112 178 Z"
            stroke="#09090B"
            strokeWidth="1.5"
            fill="#FFFFFF"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Beaker Fluid level (translucent purple) */}
          <path
            d="M 104.5 189 C 104.5 189, 107.5 187.5, 110.5 189 C 113.5 190.5, 115.5 189, 115.5 189 L 115 194.5 C 114 196, 107 196, 105 194.5 Z"
            fill="#8B5CF6"
            fillOpacity="0.85"
          />
          {/* Rising Bubbles */}
          <circle cx="106" cy="172" r="1.5" fill="#8B5CF6" />
          <circle cx="112" cy="166" r="2" fill="#C4B5FD" />
          <circle cx="115" cy="174" r="1" fill="#7C3AED" />
        </motion.g>
      </g>

      {/* Steaming Coffee Mug next to books */}
      <g>
        <rect x="142" y="238" width="10" height="10" rx="2" fill="#8B5CF6" />
        <path d="M 152 240 Q 155 243 152 246" stroke="#8B5CF6" strokeWidth="1.5" fill="none" />
        <path d="M 144 233 Q 146 230 144 227 M 147 234 Q 149 231 147 228" stroke="#C4B5FD" strokeWidth="1" strokeLinecap="round" />
      </g>

      {/* Laptop (Center of table) */}
      {/* Base */}
      <rect x="156" y="242" width="44" height="6" rx="2" fill="#E4E4E7" />
      {/* Subtle Keyboard keys texture */}
      <line x1="162" y1="243" x2="194" y2="243" stroke="#09090B" strokeWidth="0.8" strokeDasharray="2 1" />
      {/* Open Screen */}
      <rect x="190" y="208" width="4" height="36" rx="1.5" fill="#C4B5FD" transform="rotate(15, 190, 208)" />
      {/* Screen Coding Lines representation (precise detailing) */}
      <rect x="183.5" y="213" width="2" height="16" fill="#FFFFFF" opacity="0.8" transform="rotate(15, 183.5, 213)" />
      <rect x="180.5" y="221" width="2" height="10" fill="#8B5CF6" opacity="0.8" transform="rotate(15, 180.5, 221)" />

      {/* Researcher sitting at the table (Facing Left) */}
      {/* Background leg (shadow purple) */}
      <path d="M 240 274 L 222 274 L 222 330" fill="none" stroke="#7C3AED" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <path d="M 222 330 L 236 330" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.6" />

      {/* Front Leg (Black pants, sitting bent knee) */}
      <path d="M 246 270 L 216 270 L 216 334" fill="none" stroke="#09090B" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      {/* Front Shoe (White) */}
      <path d="M 216 334 L 232 334" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />

      {/* Torso / Purple Sweater */}
      <path d="M 206 195 C 201 230, 218 268, 244 268 C 254 253, 248 215, 232 195 Z" fill="#8B5CF6" />
      
      {/* Neck */}
      <rect x="217" y="180" width="8" height="12" fill="#FFFFFF" />
      {/* Turtleneck collar */}
      <rect x="213" y="188" width="16" height="5" rx="1.5" fill="#7C3AED" />

      {/* Head (White skin, minimalist, no face features) */}
      <circle cx="221" cy="170" r="14" fill="#FFFFFF" />

      {/* Hair (Black bun at the back of head) */}
      <path d="M 210 168 C 210 150, 234 150, 234 170 C 234 180, 222 180, 210 168 Z" fill="#09090B" />
      <circle cx="232" cy="162" r="5" fill="#09090B" />

      {/* Back Arm (shadow purple) */}
      <path d="M 212 210 Q 192 230 180 240" fill="none" stroke="#7C3AED" strokeWidth="7.5" strokeLinecap="round" opacity="0.6" />
      <circle cx="178" cy="240" r="3.5" fill="#FFFFFF" opacity="0.6" />

      {/* Front Arm (typing on laptop) */}
      <path d="M 218 204 Q 188 224 174 238" fill="none" stroke="#FFFFFF" strokeWidth="7.5" strokeLinecap="round" />
      {/* Wristband/Smartwatch detail */}
      <rect x="178.5" y="231" width="5.5" height="2.5" rx="0.5" fill="#09090B" transform="rotate(35, 178.5, 231)" />
      {/* Hand */}
      <circle cx="172" cy="238" r="3.5" fill="#FFFFFF" stroke="#09090B" strokeWidth="1" />
      {/* Sweater Sleeve */}
      <path d="M 218 204 Q 198 214 182 220" fill="none" stroke="#8B5CF6" strokeWidth="8.5" strokeLinecap="round" />
    </svg>
  );
}
