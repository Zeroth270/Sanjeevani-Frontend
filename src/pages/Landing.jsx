import { Link } from 'react-router-dom';

const steps = [
  { num: 1, title: 'Upload manuscript', sub: 'PDF or raw text, pre-publication' },
  { num: 2, title: 'Extract molecules', sub: 'SMILES canonicalization via AI engines' },
  { num: 3, title: 'Novelty & prior-art scan', sub: 'AI molecular scans vs. global patent databases' },
  { num: 4, title: 'Synthesis & safety copilot', sub: 'Route proposals + toxicity/cost hints' },
  { num: 5, title: 'Patent-ready dossier', sub: 'Exportable report for instant filing' },
];

const features = [
  { emoji: '🧬', title: 'Structural Novelty', desc: 'Molecule-level fingerprint search against ChEMBL, PubChem, and global patent compound databases via Tanimoto similarity.' },
  { emoji: '⚗️', title: 'Route Patents', desc: "Independent process-route novelty suggestions for known APIs — even if the molecule is known, your route may not be." },
  { emoji: '🧪', title: 'Synthesis Copilot', desc: 'AiZynthFinder-style retrosynthetic route proposals tuned for Indian reagent supply chains and local availability.' },
  { emoji: '⏱️', title: 'Grace Period Awareness', desc: 'Automatic Section 31 disclosure countdown with 30-day, 7-day, and critical alerts for Indian patent law compliance.' },
  { emoji: '📊', title: 'Bench-to-Scale Signal', desc: 'Toxicity pre-screening (SwissADME/ADMETlab) and cost-of-goods hints — bench viability vs. plant-scale feasibility.' },
  { emoji: '🏛️', title: 'Cross-Institution Scan', desc: 'Detects duplicate filings across institutions in the same network, preventing wasted IP budgets and legal conflicts.' },
];

const stats = [
  { value: '2,400+', label: 'Papers Scanned' },
  { value: '312', label: 'Novel Molecules' },
  { value: '89%', label: 'Extraction Accuracy' },
  { value: '₹4.2Cr', label: 'IP Value Saved' },
];

/* ━━ VIBRANT, HIGH-CONTRAST NEON THEME ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const C = {
  bgDark: '#030712',        // Ultra dark midnight space background
  tealNeon: '#06b6d4',      // Vibrant Electric Teal
  tealBright: '#22d3ee',    // Super bright neon cyan
  greenNeon: '#10b981',     // Neon emerald green (qualified/novel success)
  greenBright: '#34d399',
  orangeNeon: '#f97316',     // Electric reaction orange (warning/countdown)
  orangeBright: '#fb923c',
  violetNeon: '#8b5cf6',     // Neon violet highlight
  violetBright: '#a78bfa',
  pinkNeon: '#ec4899',       // Vibrant magenta highlight
  white: '#f9fafb',          // Brilliant clean white text
  platinum: '#e2e8f0',       // Platinum grey text
  slateGray: '#94a3b8',      // Muted slate
  glassBg: 'rgba(15,23,42,0.65)',
};

const glassCard = {
  background: C.glassBg,
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(6,182,212,0.25)',
  borderRadius: 20,
  boxShadow: '0 8px 32px rgba(6,182,212,0.15)'
};
const sectionPad = { padding: '100px 0' };
const container = { maxWidth: 1140, margin: '0 auto', padding: '0 24px' };

export default function Landing() {
  return (
    <div style={{ background: C.bgDark, color: C.platinum, fontFamily: "'Inter',system-ui,sans-serif", minHeight: '100vh' }}>
      {/* Dynamic scanning keyframe animations */}
      <style>{`
        @keyframes scanline {
          0%, 100% { transform: translateY(18px); opacity: 0.8; }
          50% { transform: translateY(70px); opacity: 0.8; }
        }
        @keyframes hover-float {
          0%, 100% { transform: translateY(0px) scale(0.65); }
          50% { transform: translateY(-8px) scale(0.65); }
        }
        @keyframes simple-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes radar-ping {
          0% { transform: scale(0.1); opacity: 0.9; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        @keyframes laser-glow {
          0%, 100% { filter: drop-shadow(0 0 2px #06b6d4); }
          50% { filter: drop-shadow(0 0 8px #06b6d4) drop-shadow(0 0 15px #ec4899); }
        }
        .scanning-molecule {
          animation: hover-float 4s ease-in-out infinite, laser-glow 3s ease-in-out infinite;
          transform-origin: center;
        }
        .radar-wave {
          animation: radar-ping 2.5s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
          transform-origin: 44px 44px;
        }
        .scan-laser {
          animation: scanline 2.2s linear infinite;
        }
        .floating-compound-slow {
          animation: simple-float 5s ease-in-out infinite alternate;
        }
        .custom-divider {
          margin: 60px auto; 
          border: none; 
          height: 1px; 
          background: linear-gradient(90deg, transparent, rgba(6,182,212,0.2), transparent); 
          width: 80%;
        }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, height: 64, background: 'rgba(3,7,18,0.92)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(6,182,212,0.2)' }}>
        <div style={{ ...container, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${C.tealNeon},${C.violetNeon})`, display: 'grid', placeItems: 'center', fontSize: 16, fontWeight: 800, color: C.bgDark }}>S</div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: C.white, lineHeight: 1.2, letterSpacing: '.01em' }}>Sanjeevani</div>
              <div style={{ fontSize: '.65rem', color: C.tealBright, letterSpacing: '.04em', fontWeight: 600 }}>Chemistry Copilot</div>
            </div>
          </a>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {['features', 'workflow'].map(s => (
              <a key={s} href={`#${s}`} style={{ fontSize: '.85rem', fontWeight: 600, color: C.platinum, textDecoration: 'none', transition: 'color .2s' }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            ))}
            <Link to="/register" className="btn-primary" style={{ padding: '8px 18px', fontSize: '.85rem', background: `linear-gradient(135deg,${C.tealNeon},${C.violetNeon})`, border: 'none', color: C.bgDark, fontWeight: 700 }}>Request Early Access</Link>
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ padding: '100px 0 80px', background: 'radial-gradient(circle at 15% 45%,rgba(6,182,212,0.18),transparent 65%),radial-gradient(circle at 85% 20%,rgba(139,92,246,0.15),transparent 60%)' }}>
        <div style={container}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, marginBottom: 28, background: 'rgba(249,115,22,0.12)', border: `1px solid ${C.orangeNeon}`, fontSize: '.72rem', fontWeight: 700, color: C.orangeBright, letterSpacing: '.02em' }}>
                🚨 India's Section 31 grace period: <strong style={{ marginLeft: 4, fontFamily: "'JetBrains Mono',monospace" }}>12 months</strong>
              </div>
              <h1 style={{ fontSize: 'clamp(2.4rem,5vw,3.2rem)', fontWeight: 850, color: C.white, lineHeight: 1.15, marginBottom: 28, letterSpacing: '-0.02em' }}>
                Turn India's chemistry papers into <em style={{ fontStyle: 'normal', backgroundImage: `linear-gradient(135deg,${C.tealBright},${C.violetBright})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>patents</em> before they disappear.
              </h1>
              <p style={{ fontSize: '1.05rem', color: C.platinum, lineHeight: 1.75, maxWidth: 520, marginBottom: 40 }}>
                Sanjeevani sits at the pre-publication checkpoint, extracts every molecule, checks structural &amp; process-route novelty against global databases, and surfaces patent candidates for your IP cell.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Link to="/register" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem', background: `linear-gradient(135deg,${C.tealNeon},${C.violetNeon})`, border: 'none', color: C.bgDark, fontWeight: 700 }}>Book a demo</Link>
                <a href="#workflow" className="btn-secondary" style={{ padding: '14px 32px', fontSize: '1rem', border: `1px solid ${C.tealNeon}`, color: C.tealBright, background: 'rgba(6,182,212,0.05)', textDecoration: 'none', borderRadius: 8, fontWeight: 600 }}>View workflow ↓</a>
              </div>
            </div>

            {/* Custom Interactive Science / Tablet / Magnifier Visual Block */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', minHeight: 360 }}>
              {/* Tablet Frame with Vibrant Glow border */}
              <div style={{
                width: 330,
                height: 230,
                background: '#02040a',
                border: `8px solid ${C.tealNeon}`,
                borderRadius: 20,
                position: 'relative',
                boxShadow: `0 0 35px rgba(6,182,212,0.25)`,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Tablet Screen contents (Simulated Scanner) */}
                <div style={{ padding: 12, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(6,182,212,0.2)' }}>
                  <span style={{ fontSize: '.6rem', color: C.tealBright, fontFamily: 'monospace', fontWeight: 700 }}>SCANNING MANUSCRIPT...</span>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.greenNeon, animation: 'pulse 1.5s infinite', boxShadow: `0 0 8px ${C.greenBright}` }} />
                </div>
                <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ height: 6, width: '70%', background: 'rgba(6,182,212,0.15)', borderRadius: 3 }} />
                  <div style={{ height: 6, width: '90%', background: 'rgba(6,182,212,0.15)', borderRadius: 3 }} />
                  <div style={{ height: 6, width: '40%', background: 'rgba(6,182,212,0.15)', borderRadius: 3 }} />
                  {/* Molecule grid on tablet */}
                  <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'center' }}>
                    <div style={{ width: 45, height: 45, borderRadius: 6, background: '#09101f', border: '1px solid rgba(6,182,212,0.3)' }} />
                    <div style={{ width: 45, height: 45, borderRadius: 6, background: '#09101f', border: '1px solid rgba(6,182,212,0.3)' }} />
                    <div style={{ width: 45, height: 45, borderRadius: 6, background: '#09101f', border: '1px solid rgba(6,182,212,0.3)' }} />
                  </div>
                </div>
                {/* Home button on tablet */}
                <div style={{ height: 18, borderTop: '1px solid rgba(6,182,212,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 30, height: 4, borderRadius: 2, background: C.tealNeon }} />
                </div>
              </div>

              {/* Magnifying Glass overlying/pointing towards tablet */}
              <div style={{
                position: 'absolute',
                top: 40,
                left: 100,
                width: 140,
                height: 140,
                pointerEvents: 'none',
                zIndex: 10
              }}>
                <svg width="180" height="180" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
                  {/* Handle with Purple highlight */}
                  <line x1="68" y1="68" x2="92" y2="92" stroke={C.violetNeon} strokeWidth="9" strokeLinecap="round" />
                  <line x1="72" y1="72" x2="88" y2="88" stroke={C.pinkNeon} strokeWidth="5" strokeLinecap="round" />
                  
                  {/* Outer Lens Rim */}
                  <circle cx="44" cy="44" r="28" fill="rgba(6,182,212,0.2)" stroke={C.tealNeon} strokeWidth="5.5" />
                  
                  {/* Radar/Scan wave pings */}
                  <circle cx="44" cy="44" r="20" fill="none" stroke={C.tealBright} className="radar-wave" />
                  <circle cx="44" cy="44" r="20" fill="none" stroke={C.pinkNeon} className="radar-wave" style={{ animationDelay: '1.25s' }} />

                  {/* Inner Lens Reflection */}
                  <circle cx="44" cy="44" r="25.5" fill="rgba(139,92,246,0.18)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  
                  {/* Technical Pointer Line pointing to the compound */}
                  <path d="M 44,44 L 20,20 L -25,20" stroke={C.tealBright} strokeWidth="1.5" strokeDasharray="3 2" fill="none" style={{ filter: 'drop-shadow(0 0 3px #06b6d4)' }} />
                  <circle cx="44" cy="44" r="3.5" fill={C.pinkNeon} style={{ filter: 'drop-shadow(0 0 4px #ec4899)' }} />
                  
                  {/* Scanning Laser Line (Sweep) */}
                  <line x1="18.5" y1="0" x2="69.5" y2="0" stroke={C.greenBright} strokeWidth="2.5" className="scan-laser" style={{ filter: 'drop-shadow(0 0 4px #34d399)' }} />

                  {/* Glass glare */}
                  <path d="M 28 32 A 20 20 0 0 1 54 20" fill="none" stroke={C.white} strokeWidth="2.5" strokeLinecap="round" />

                  {/* Benzene chemical compound structure hovering inside magnifying glass */}
                  <g transform="translate(44, 44)">
                    <g stroke={C.tealBright} strokeWidth="3" fill="none" className="scanning-molecule">
                      <polygon points="0,-18 15.6,-9 15.6,9 0,18 -15.6,9 -15.6,-9" />
                      <polygon points="0,-14 12.1,-7 12.1,7 0,14 -12.1,7 -12.1,-7" strokeWidth="1.2" opacity="0.75" />
                      <circle cx="0" cy="0" r="2.5" fill={C.pinkNeon} />
                      <line x1="15.6" y1="9" x2="25" y2="15" stroke={C.pinkNeon} />
                      <circle cx="25" cy="15" r="2.5" fill={C.pinkNeon} />
                      <line x1="-15.6" y1="-9" x2="-25" y2="-15" stroke={C.greenNeon} />
                      <circle cx="-25" cy="-15" r="2.5" fill={C.greenNeon} />
                    </g>
                  </g>
                </svg>

                {/* Compound Name Callout Label placed at the end of the pointer */}
                <div style={{
                  position: 'absolute',
                  top: 2,
                  left: -136,
                  background: 'rgba(3,7,18,0.9)',
                  border: `1px solid ${C.tealNeon}`,
                  borderRadius: 6,
                  padding: '4px 8px',
                  fontSize: '.65rem',
                  fontWeight: 800,
                  color: C.white,
                  whiteSpace: 'nowrap',
                  boxShadow: `0 0 10px rgba(6,182,212,0.3)`,
                }}>
                  🔬 Curcumin-Analog-7β
                </div>
              </div>

              {/* Floating Chemical compounds hovering around outside the magnifying glass */}
              <div className="floating-compound-slow" style={{ position: 'absolute', top: 15, left: 20, zIndex: 12 }}>
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <g stroke={C.greenBright} strokeWidth="2" fill="none">
                    <polygon points="20,5 33,12.5 33,27.5 20,35 7,27.5 7,12.5" />
                    <circle cx="20" cy="20" r="4" fill={C.greenBright} />
                  </g>
                </svg>
              </div>
              <div className="floating-compound-slow" style={{ position: 'absolute', bottom: 25, right: 5, zIndex: 12, animationDelay: '-1.5s' }}>
                <svg width="45" height="45" viewBox="0 0 40 40">
                  <g stroke={C.pinkNeon} strokeWidth="2" fill="none">
                    <polygon points="20,8 30,14 30,26 20,32 10,26 10,14" />
                    <line x1="20" y1="8" x2="20" y2="2" />
                    <circle cx="20" cy="2" r="3.5" fill={C.pinkNeon} />
                  </g>
                </svg>
              </div>

              {/* Callout comments pointing to magnifying glass */}
              <div className="comment-bubble" style={{
                position: 'absolute',
                top: 0,
                right: -25,
                background: 'rgba(16,185,129,0.95)',
                border: `2px solid ${C.greenBright}`,
                borderRadius: '8px 8px 8px 0',
                padding: '6px 12px',
                fontSize: '.72rem',
                fontWeight: 800,
                color: C.white,
                boxShadow: `0 0 15px rgba(16,185,129,0.4)`,
                zIndex: 15
              }}>
                🧪 Novelty Verified: 94%
              </div>

              <div className="comment-bubble" style={{
                position: 'absolute',
                bottom: 85,
                left: -35,
                background: 'rgba(15,23,42,0.95)',
                border: `2px solid ${C.tealNeon}`,
                borderRadius: '8px 8px 0 8px',
                padding: '6px 12px',
                fontSize: '.7rem',
                fontWeight: 700,
                color: C.tealBright,
                boxShadow: `0 0 15px rgba(6,182,212,0.3)`,
                zIndex: 15
              }}>
                ⬡ CF₃ Analog block checked
              </div>

              <div className="comment-bubble" style={{
                position: 'absolute',
                bottom: 8,
                left: 110,
                background: 'rgba(249,115,22,0.95)',
                border: `2px solid ${C.orangeBright}`,
                borderRadius: '8px 0 8px 8px',
                padding: '6px 12px',
                fontSize: '.7rem',
                fontWeight: 800,
                color: C.white,
                boxShadow: `0 0 15px rgba(249,115,22,0.4)`,
                zIndex: 15
              }}>
                PubChem Match: None ✓
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ borderTop: `1px solid rgba(6,182,212,0.25)`, borderBottom: `1px solid rgba(6,182,212,0.25)`, background: 'rgba(6,182,212,0.06)', padding: '48px 0', backdropFilter: 'blur(8px)' }}>
        <div style={{ ...container, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32, textAlign: 'center' }}>
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div style={{ fontSize: '2.2rem', fontWeight: 850, color: C.white, textShadow: `0 0 10px rgba(6,182,212,0.4)` }}>{value}</div>
              <div style={{ fontSize: '.85rem', color: C.tealBright, marginTop: 6, fontWeight: 700 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="custom-divider" />

      {/* ── FEATURES ── */}
      <section id="features" style={sectionPad}>
        <div style={container}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label" style={{ marginBottom: 12, color: C.tealBright, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', fontSize: '.8rem' }}>Capabilities</div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: C.white }}>Everything between discovery and disclosure</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
            {features.map(({ emoji, title, desc }) => (
              <div key={title} className="glass-card" style={{ ...glassCard, padding: '32px 24px', transition: 'transform .2s, border-color .2s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = C.pinkNeon; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = ''; }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, marginBottom: 20, background: 'rgba(139,92,246,0.18)', border: `1px solid ${C.violetNeon}`, display: 'grid', placeItems: 'center', fontSize: '1.25rem' }}>{emoji}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: C.white, marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: '.85rem', color: C.platinum, lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="custom-divider" />

      {/* ── WORKFLOW ── */}
      <section id="workflow" style={{ ...sectionPad, background: 'rgba(139,92,246,0.03)', borderTop: '1px solid rgba(6,182,212,0.15)', borderBottom: '1px solid rgba(6,182,212,0.15)' }}>
        <div style={container}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label" style={{ marginBottom: 12, color: C.tealBright, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', fontSize: '.8rem' }}>Process</div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: C.white }}>From paper to patent in one loop</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
            {steps.map(({ num, title, sub }, i) => (
              <div key={num} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', padding: '0 16px' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: `linear-gradient(135deg,${C.tealNeon},${C.violetNeon})`, display: 'grid', placeItems: 'center', fontFamily: "'JetBrains Mono',monospace", fontSize: '.9rem', fontWeight: 800, color: C.bgDark, position: 'relative', zIndex: 2, marginBottom: 20, flexShrink: 0, boxShadow: `0 0 15px rgba(6,182,212,0.4)` }}>{num}</div>
                {i < steps.length - 1 && <div style={{ position: 'absolute', top: 24, left: 'calc(50% + 24px)', width: 'calc(100% - 48px)', height: 2, background: `linear-gradient(to right,${C.tealNeon},${C.violetNeon})`, zIndex: 1 }} />}
                <h4 style={{ fontSize: '.9rem', fontWeight: 700, color: C.white, marginBottom: 6 }}>{title}</h4>
                <p style={{ fontSize: '.78rem', color: C.slateGray, lineHeight: 1.55 }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="custom-divider" />

      {/* ── CTA ── */}
      <section style={{ ...sectionPad, textAlign: 'center' }}>
        <div style={container}>
          <div style={{ ...glassCard, padding: '56px 48px', maxWidth: 680, margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: C.white, marginBottom: 16 }}>Pilot Sanjeevani in your institute</h2>
            <p style={{ fontSize: '.9rem', color: C.platinum, marginBottom: 32, lineHeight: 1.7 }}>
              We're inviting Indian universities, CSIR labs, NIPERs, and pharma R&amp;D units to run a 60-day pilot. No cost — just better patent capture.
            </p>
            <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: 16, maxWidth: 460, margin: '0 auto' }}>
              <input type="email" placeholder="you@institution.ac.in" className="input-base" style={{ flex: 1, border: `1px solid ${C.tealNeon}`, background: 'rgba(3,7,18,0.6)', padding: '12px 18px', borderRadius: 8, color: C.white }} />
              <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap', background: `linear-gradient(135deg,${C.tealNeon},${C.violetNeon})`, border: 'none', color: C.bgDark, fontWeight: 700, padding: '12px 24px', borderRadius: 8, cursor: 'pointer' }}>Request early access</button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid rgba(6,182,212,0.2)', padding: '36px 0', textAlign: 'center', background: 'rgba(2,4,10,0.4)' }}>
        <div style={container}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 12 }}>
            {['Privacy', 'Terms', 'Docs', 'GitHub'].map(l => (
              <a key={l} href="#" style={{ fontSize: '.85rem', color: C.slateGray, textDecoration: 'none', transition: 'color .2s' }}
                 onMouseEnter={e => e.currentTarget.style.color = C.tealBright}
                 onMouseLeave={e => e.currentTarget.style.color = C.slateGray}>{l}</a>
            ))}
          </div>
          <div style={{ fontSize: '.75rem', color: C.slateGray }}>© 2026 Sanjeevani Labs · Built for India's chemistry researchers</div>
        </div>
      </footer>
    </div>
  );
}
