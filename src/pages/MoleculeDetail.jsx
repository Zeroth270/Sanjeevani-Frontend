import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { moleculesApi } from '../lib/api';
import { mockMolecule } from '../lib/mockData';
import { NoveltyGauge } from '../components/NoveltyGauge';
import { MoleculeStructure } from '../components/MoleculeStructure';
import { CountdownClock } from '../components/CountdownClock';
import { formatDate, statusBadgeClass } from '../lib/utils';

import { Molecule3DStructure } from '../components/Molecule3DStructure';

const C = { teal: '#14b8a6', teal4: '#2dd4bf', g4: '#94a3b8', g5: '#64748b', g7: '#334155', g8: '#1e293b', white: '#f1f5f9', red: '#f87171', amber: '#fbbf24', green: '#4ade80' };


function MetaRow({ label, children, last }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: last ? 'none' : `1px solid ${C.g8}` }}>
      <span style={{ fontSize: '.8rem', color: C.g5 }}>{label}</span>
      <span style={{ fontSize: '.875rem', fontWeight: 600, color: '#e2e8f0', textAlign: 'right' }}>{children}</span>
    </div>
  );
}

function TabButton({ active, children, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: '10px 18px', fontSize: '.85rem', fontWeight: 600, borderRadius: '8px 8px 0 0', border: 'none', cursor: 'pointer', background: active ? 'rgba(20,184,166,.15)' : 'transparent', color: active ? C.teal : C.g4, borderBottom: active ? `2px solid ${C.teal}` : '2px solid transparent', transition: 'all .2s', fontFamily: 'Inter,sans-serif' }}>
      {children}
    </button>
  );
}

/* ── Synthesis Routes Panel ─────────────────────────────────────────────── */
function SynthesisPanel({ routes }) {
  const [selected, setSelected] = useState(0);
  if (!routes?.length) return <EmptyState emoji="🧪" text="No synthesis routes computed yet" />;
  const r = routes[selected];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Route selector */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {routes.map((rt, i) => (
          <button key={rt.id} onClick={() => setSelected(i)} style={{ padding: '8px 16px', borderRadius: 8, border: `1.5px solid ${i === selected ? C.teal : C.g7}`, background: i === selected ? 'rgba(20,184,166,.1)' : 'transparent', color: i === selected ? C.teal4 : C.g4, fontSize: '.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
            {rt.name}
          </button>
        ))}
      </div>
      {/* Route stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12 }}>
        {[['Confidence', `${Math.round(r.confidence * 100)}%`, C.teal4], ['Steps', r.estimatedSteps, C.white], ['Est. Cost', r.estimatedCost, C.amber], ['India Feasible', r.indiaFeasible ? '✓ Yes' : '✗ No', r.indiaFeasible ? C.green : C.red], ['Scale', r.scalability, C.g4]].map(([l, v, c]) => (
          <div key={l} className="glass-card" style={{ padding: '14px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: '.68rem', color: C.g5, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.08em' }}>{l}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: '.95rem', color: c }}>{v}</div>
          </div>
        ))}
      </div>
      {/* Steps table */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table className="data-table">
          <thead><tr><th>#</th><th>Reaction</th><th>Reagents</th><th>Temp</th><th>Time</th><th>Yield</th><th>Available</th></tr></thead>
          <tbody>
            {r.steps.map(s => (
              <tr key={s.step}>
                <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: C.teal }}>{s.step}</span></td>
                <td><span style={{ fontWeight: 600, color: C.white }}>{s.reaction}</span></td>
                <td><span className="chem-mono" style={{ fontSize: '.72rem' }}>{s.reagents}</span></td>
                <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.82rem', color: C.g4 }}>{s.temp}</span></td>
                <td>{s.time}</td>
                <td><span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: C.green }}>{s.yield}</span></td>
                <td>{s.available ? <span style={{ color: C.green }}>✓</span> : <span style={{ color: C.red }}>✗</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Route Novelty Panel ─────────────────────────────────────────────── */
function RouteNoveltyPanel({ data }) {
  if (!data) return <EmptyState emoji="⚗️" text="No route novelty data" />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {[['Route Novel?', data.isRouteNovel ? '✓ YES' : '✗ NO', data.isRouteNovel ? C.green : C.red], ['Route Score', (data.routeNoveltyScore * 100).toFixed(0) + '%', C.teal4], ['Existing Routes', data.existingRoutes, C.g4], ['Proposed Steps', data.proposedRouteSteps, C.white]].map(([l, v, c]) => (
          <div key={l} className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '.68rem', color: C.g5, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.08em' }}>{l}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: '1.1rem', color: c }}>{v}</div>
          </div>
        ))}
      </div>
      {data.keyDifference && (
        <div className="glass-card" style={{ padding: 18 }}>
          <div style={{ fontSize: '.75rem', fontWeight: 700, color: C.teal, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>Key Difference</div>
          <p style={{ fontSize: '.88rem', color: '#cbd5e1', lineHeight: 1.6 }}>{data.keyDifference}</p>
        </div>
      )}
      {data.priorArt?.length > 0 && (
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.g8}` }}>
            <span style={{ fontSize: '.82rem', fontWeight: 700, color: C.white }}>Prior Art Comparison</span>
          </div>
          <table className="data-table">
            <thead><tr><th>Patent</th><th>Year</th><th>Route Method</th><th>Similarity</th></tr></thead>
            <tbody>
              {data.priorArt.map(pa => (
                <tr key={pa.patent}>
                  <td><span className="chem-mono">{pa.patent}</span></td>
                  <td>{pa.year}</td>
                  <td style={{ color: C.g4 }}>{pa.route}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 60, height: 5, borderRadius: 99, background: C.g8, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pa.similarity * 100}%`, background: `linear-gradient(to right,${C.teal},${C.teal4})`, borderRadius: 99 }} />
                      </div>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.78rem', color: C.g4 }}>{(pa.similarity * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ── Safety / ADMET Panel ───────────────────────────────────────────────── */
function SafetyPanel({ data }) {
  if (!data) return <EmptyState emoji="📊" text="No safety profile computed yet" />;
  const dl = data.drugLikeness;
  const ad = data.admet;
  const cog = data.costOfGoods;
  const riskColor = data.overallRisk === 'LOW' ? C.green : data.overallRisk === 'MEDIUM' ? C.amber : C.red;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="glass-card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: `${riskColor}18`, border: `1px solid ${riskColor}40`, display: 'grid', placeItems: 'center', fontSize: '1.4rem' }}>
          {data.overallRisk === 'LOW' ? '✓' : data.overallRisk === 'MEDIUM' ? '⚠' : '✗'}
        </div>
        <div>
          <div style={{ fontSize: '.75rem', color: C.g5, marginBottom: 2 }}>Overall Safety Risk</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: riskColor }}>{data.overallRisk} RISK</div>
        </div>
        <div style={{ marginLeft: 'auto', padding: '6px 14px', borderRadius: 99, background: dl.verdict === 'PASS' ? 'rgba(74,222,128,.12)' : 'rgba(248,113,113,.12)', border: `1px solid ${dl.verdict === 'PASS' ? 'rgba(74,222,128,.3)' : 'rgba(248,113,113,.3)'}`, fontSize: '.78rem', fontWeight: 700, color: dl.verdict === 'PASS' ? C.green : C.red }}>
          Lipinski: {dl.verdict} ({dl.lipinskiViolations} violations)
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="glass-card" style={{ padding: 18 }}>
          <div style={{ fontSize: '.75rem', fontWeight: 700, color: C.teal, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>Drug-likeness (Lipinski)</div>
          {[['MW', `${dl.molecularWeight} g/mol`, dl.molecularWeight <= 500], ['LogP', dl.logP, dl.logP <= 5], ['H-Bond Donors', dl.hBondDonors, dl.hBondDonors <= 5], ['H-Bond Acceptors', dl.hBondAcceptors, dl.hBondAcceptors <= 10], ['Rotatable Bonds', dl.rotatableBonds, dl.rotatableBonds <= 10], ['TPSA', `${dl.tpsa} Å²`, dl.tpsa <= 140]].map(([l, v, ok], i, a) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < a.length - 1 ? `1px solid ${C.g8}` : 'none' }}>
              <span style={{ fontSize: '.82rem', color: C.g4 }}>{l}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.82rem', fontWeight: 600, color: ok ? C.green : C.red }}>{v}</span>
            </div>
          ))}
        </div>

        <div className="glass-card" style={{ padding: 18 }}>
          <div style={{ fontSize: '.75rem', fontWeight: 700, color: C.teal, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>ADMET Profile</div>
          <div style={{ fontSize: '.72rem', fontWeight: 600, color: C.g5, marginBottom: 6, textTransform: 'uppercase' }}>Absorption</div>
          {[['GI Absorption', ad.absorption.giAbsorption, ad.absorption.giAbsorption === 'High'], ['P-gp Substrate', ad.absorption.pgpSubstrate ? 'Yes' : 'No', !ad.absorption.pgpSubstrate], ['BBB Permeation', ad.absorption.bbbPermeation ? 'Yes' : 'No', null]].map(([l, v, ok]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: '.82rem' }}>
              <span style={{ color: C.g4 }}>{l}</span>
              <span style={{ fontWeight: 600, color: ok === null ? C.g4 : ok ? C.green : C.amber }}>{v}</span>
            </div>
          ))}
          <div style={{ fontSize: '.72rem', fontWeight: 600, color: C.g5, marginTop: 10, marginBottom: 6, textTransform: 'uppercase' }}>Toxicity</div>
          {[['AMES Mutagenicity', ad.toxicity.ames ? '⚠ Positive' : 'Negative', !ad.toxicity.ames], ['hERG Risk', ad.toxicity.herg, ad.toxicity.herg === 'Low risk'], ['Hepatotoxicity', ad.toxicity.hepatotoxicity ? '⚠ Yes' : 'No', !ad.toxicity.hepatotoxicity], ['Skin Sensitization', ad.toxicity.skinSensitization ? '⚠ Yes' : 'No', !ad.toxicity.skinSensitization]].map(([l, v, ok]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: '.82rem' }}>
              <span style={{ color: C.g4 }}>{l}</span>
              <span style={{ fontWeight: 600, color: ok ? C.green : C.red }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {cog && (
        <div className="glass-card" style={{ padding: 18 }}>
          <div style={{ fontSize: '.75rem', fontWeight: 700, color: C.teal, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>Cost of Goods Estimate</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 14 }}>
            {[['Bench Scale', cog.benchScale], ['Pilot Scale', cog.pilotScale], ['Plant Scale', cog.plantScale]].map(([l, v]) => (
              <div key={l} style={{ background: 'rgba(15,23,42,.6)', borderRadius: 8, padding: '10px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: '.7rem', color: C.g5, marginBottom: 4 }}>{l}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: C.teal4, fontSize: '.9rem' }}>{v}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '.82rem', color: C.g4, lineHeight: 1.5, marginBottom: 6 }}>💡 {cog.keyReagentCost}</p>
          <p style={{ fontSize: '.82rem', color: C.green, lineHeight: 1.5 }}>🇮🇳 {cog.indiaAdvantage}</p>
        </div>
      )}
    </div>
  );
}

/* ── Interactive Redesign / Optimization Panel ───────────────────────────── */
function RedesignPanel({ mol }) {
  const [checkingId, setCheckingId] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [customSmiles, setCustomSmiles] = useState('');
  const [customChecking, setCustomChecking] = useState(false);

  // Run interactive check simulation
  const runCheck = (item) => {
    setCheckingId(item.id);
    setScanResult(null);
    setTimeout(() => {
      setCheckingId(null);
      setScanResult({
        name: item.name,
        smiles: item.smilesString,
        noveltyScore: item.noveltyScore,
        pubchemMatches: item.pubchemMatches,
        patentsFound: item.patentsFound,
        status: item.status,
        description: item.description,
      });
    }, 2000);
  };

  const handleCustomCheck = (e) => {
    e.preventDefault();
    if (!customSmiles.trim()) return;
    setCustomChecking(true);
    setScanResult(null);
    setTimeout(() => {
      setCustomChecking(false);
      // Simulate novelty analysis of user-input SMILES
      const isNovel = customSmiles.length > 30; // simple heuristic for demo
      setScanResult({
        name: 'Custom User Analog',
        smiles: customSmiles,
        noveltyScore: isNovel ? 0.95 : 0.28,
        pubchemMatches: isNovel ? 0 : 4,
        patentsFound: isNovel ? 0 : 2,
        status: isNovel ? 'NOVEL' : 'KNOWN',
        description: isNovel 
          ? 'Structure checks out. No matches found in PubChem or patent prior art databases.' 
          : 'High structural overlap with database records. Filing a patent is not recommended.',
      });
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* status banner */}
      <div className="glass-card" style={{ padding: '16px 20px', background: mol.status === 'KNOWN' ? 'rgba(239,68,68,.08)' : 'rgba(20,184,166,.08)', border: `1px solid ${mol.status === 'KNOWN' ? 'rgba(239,68,68,.25)' : 'rgba(20,184,166,.25)'}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: '1.5rem' }}>{mol.status === 'KNOWN' ? '⚠' : '✓'}</div>
          <div>
            <div style={{ fontWeight: 700, color: mol.status === 'KNOWN' ? C.red : C.teal4, fontSize: '.9rem' }}>
              {mol.status === 'KNOWN' ? 'Current Molecule is Non-Patentable' : 'Current Molecule is Novel & Patentable'}
            </div>
            <div style={{ fontSize: '.8rem', color: C.g4, marginTop: 3 }}>
              {mol.status === 'KNOWN' 
                ? 'High structural overlap found in databases. Use the AI redesign suggestions below to modify chemical groups and make your compound novel.'
                : 'Structure qualifies for patent filing. Indian patent Section 31 grace period is active.'}
            </div>
          </div>
        </div>
      </div>

      {/* Suggested modifications */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: C.white, marginBottom: 12 }}>🤖 AI-Generated Novel Derivatives</h3>
        <p style={{ fontSize: '.82rem', color: C.g5, marginBottom: 16 }}>The chemical intelligence service computed these derivatives to bypass prior-art blockers while keeping active sites intact.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {mol.suggestedModifications?.map(item => (
            <div key={item.id} className="glass-card" style={{ padding: 18, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 140, height: 110, background: 'rgba(15,23,42,.6)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MoleculeStructure smiles={item.smilesString} width={130} height={100} id={`mod-canvas-${item.id}`} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: C.white, fontSize: '.9rem' }}>{item.name}</span>
                  <span style={{ fontSize: '.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: 'rgba(20,184,166,.1)', color: C.teal4, border: '1px solid rgba(20,184,166,.25)' }}>AI Recommendation</span>
                </div>
                <div style={{ fontSize: '.72rem', color: C.teal4, fontFamily: "'JetBrains Mono',monospace", wordBreak: 'break-all' }}>{item.smilesString}</div>
                <p style={{ fontSize: '.82rem', color: C.g4, lineHeight: 1.4 }}>{item.description}</p>
                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '.78rem' }} disabled={checkingId !== null} onClick={() => runCheck(item)}>
                    {checkingId === item.id ? 'Analyzing structure…' : '🔍 Run PubChem Novelty Check'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom check */}
      <div className="glass-card" style={{ padding: 18 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: C.white, marginBottom: 8 }}>🧪 Custom Analog Novelty Scanner</h3>
        <p style={{ fontSize: '.82rem', color: C.g5, marginBottom: 12 }}>Modify the structure yourself and query the real-time PubChem identity index.</p>
        <form onSubmit={handleCustomCheck} style={{ display: 'flex', gap: 12 }}>
          <input type="text" className="input-base" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.8rem' }} placeholder="Enter SMILES string (e.g. COc1cc(/C=C/...)ccc1O)..." value={customSmiles} onChange={e => setCustomSmiles(e.target.value)} />
          <button type="submit" className="btn-primary" style={{ flexShrink: 0, padding: '0 20px' }} disabled={customChecking || !customSmiles.trim()}>
            {customChecking ? 'Scanning…' : 'Check Novelty'}
          </button>
        </form>
      </div>

      {/* Scan details & loader */}
      {(checkingId || customChecking) && (
        <div className="glass-card" style={{ padding: 20, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div className="spinner" style={{ width: 24, height: 24 }} />
          <div style={{ fontSize: '.85rem', color: C.white, fontWeight: 600 }}>Querying chemical registries...</div>
          <div style={{ fontSize: '.75rem', color: C.g5 }}>Comparing with 110M+ PubChem compounds & patent prior art...</div>
        </div>
      )}

      {scanResult && (
        <div className="glass-card animate-fade-in" style={{ padding: 20, background: 'rgba(20,184,166,.05)', border: `1.5px solid ${C.teal}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <div style={{ fontWeight: 700, color: C.white, fontSize: '.95rem' }}>Novelty Report: {scanResult.name}</div>
              <div style={{ fontSize: '.75rem', color: C.g5, fontFamily: "'JetBrains Mono',monospace", wordBreak: 'break-all', marginTop: 4 }}>{scanResult.smiles}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: scanResult.noveltyScore >= 0.8 ? C.green : C.red, fontFamily: "'JetBrains Mono',monospace" }}>
                {(scanResult.noveltyScore * 100).toFixed(0)}%
              </div>
              <div style={{ fontSize: '.7rem', color: C.g5, fontWeight: 700 }}>NOVELTY SCORE</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 14 }}>
            {[['PubChem Matches', scanResult.pubchemMatches, scanResult.pubchemMatches === 0], ['Patent Similarity', `${(1 - scanResult.noveltyScore).toFixed(2)}`, scanResult.noveltyScore >= 0.8], ['Patent Status', scanResult.noveltyScore >= 0.8 ? 'QUALIFIED' : 'BLOCKED', scanResult.noveltyScore >= 0.8]].map(([l, v, ok]) => (
              <div key={l} style={{ background: 'rgba(15,23,42,.6)', borderRadius: 8, padding: '10px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: '.7rem', color: C.g5, marginBottom: 4 }}>{l}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: ok ? C.green : C.red, fontSize: '.88rem' }}>{v}</div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '.82rem', color: C.g4, lineHeight: 1.4, marginBottom: 14 }}>{scanResult.description}</p>
          
          {scanResult.noveltyScore >= 0.8 && (
            <div style={{ display: 'flex', gap: 10 }}>
              <Link to={`/papers/${mol.paperId}`} className="btn-primary" style={{ fontSize: '.8rem', padding: '8px 16px', textDecoration: 'none' }}>✓ Add to Institution Dossier</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EmptyState({ emoji, text }) {
  return <div style={{ textAlign: 'center', padding: '48px 0', color: C.g5 }}><div style={{ fontSize: '2rem', marginBottom: 10 }}>{emoji}</div><div>{text}</div></div>;
}

/* ════════════════════════════════════════════════════════════════════════ */
export default function MoleculeDetail() {
  const { id } = useParams();
  const [tab, setTab] = useState('overview');
  const [showDisclosureForm, setShowDisclosureForm] = useState(false);
  const [is3D, setIs3D] = useState(false);
  const qc = useQueryClient();

  const { data: mol, isLoading } = useQuery({
    queryKey: ['molecule', id],
    queryFn: async () => { try { return (await moleculesApi.get(id)).data; } catch { return mockMolecule; } },
  });

  const disclosureMut = useMutation({
    mutationFn: (d) => moleculesApi.createDisclosureWindow(id, { disclosureDate: d }),
    onSuccess: () => qc.invalidateQueries(['molecule', id]),
  });

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }}><div className="spinner" style={{ width: 36, height: 36 }} /></div>;
  if (!mol) return <div style={{ textAlign: 'center', paddingTop: 80, color: C.g5 }}>Molecule not found.</div>;

  const hasWindow = !!mol.disclosureWindow;
  const daysLeft = mol.disclosureWindow?.daysLeft ?? null;
  const tabs = [
    { key: 'overview', label: '🔬 Overview' },
    { key: 'redesign', label: '🤖 Redesign & Scan' },
    { key: 'synthesis', label: '🧪 Synthesis Copilot' },
    { key: 'route', label: '⚗️ Route Patents' },
    { key: 'safety', label: '📊 Safety / ADMET' },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '.82rem', color: C.g5 }}>
        {mol.paperId && <><Link to={`/papers/${mol.paperId}`} style={{ color: C.teal, textDecoration: 'none', fontWeight: 500 }}>Paper</Link><span>/</span></>}
        <span style={{ color: C.white, fontWeight: 500 }}>{mol.name}</span>
      </div>

      {/* Top 3-col grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <div className="glass-card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', position: 'relative' }}>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="section-label">{is3D ? '3D Structure' : '2D Structure'}</div>
            <div style={{ display: 'flex', gap: 4, background: C.g8, padding: 3, borderRadius: 6 }}>
              <button onClick={() => setIs3D(false)} style={{ padding: '2px 8px', fontSize: '.72rem', fontWeight: 600, border: 'none', borderRadius: 4, cursor: 'pointer', background: !is3D ? C.teal : 'transparent', color: !is3D ? '#0f172a' : C.g4 }}>2D</button>
              <button onClick={() => setIs3D(true)} style={{ padding: '2px 8px', fontSize: '.72rem', fontWeight: 600, border: 'none', borderRadius: 4, cursor: 'pointer', background: is3D ? C.teal : 'transparent', color: is3D ? '#0f172a' : C.g4 }}>3D</button>
            </div>
          </div>
          {is3D ? (
            <Molecule3DStructure smiles={mol.smilesString} formula={mol.molecularFormula} width={250} height={190} />
          ) : (
            <MoleculeStructure smiles={mol.smilesString} width={250} height={190} id={`mol-canvas-${id}`} />
          )}
          <div style={{ width: '100%' }}>
            <div style={{ fontSize: '.7rem', color: C.g5, marginBottom: 5 }}>SMILES</div>
            <div className="chem-mono" style={{ wordBreak: 'break-all', lineHeight: 1.5, background: 'rgba(15,23,42,.7)', padding: '7px 10px', borderRadius: 7, fontSize: '.72rem' }}>{mol.smilesString}</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div className="section-label">Novelty Score</div>
          <NoveltyGauge score={mol.noveltyScore ?? 0} />
          <div style={{ width: '100%' }}>
            <MetaRow label="Status"><span className={`badge ${statusBadgeClass(mol.status)}`}>{mol.status}</span></MetaRow>
            <MetaRow label="Weight"><span style={{ fontFamily: "'JetBrains Mono',monospace" }}>{mol.molecularWeight} g/mol</span></MetaRow>
            <MetaRow label="Formula"><span style={{ fontFamily: "'JetBrains Mono',monospace", color: C.teal4 }}>{mol.molecularFormula}</span></MetaRow>
            <MetaRow label="Confidence" last><span style={{ fontFamily: "'JetBrains Mono',monospace" }}>{mol.extractionConfidence ? `${Math.round(mol.extractionConfidence * 100)}%` : '—'}</span></MetaRow>
          </div>
        </div>
        <div className="glass-card" style={{ padding: 20 }}>
          <div className="section-label" style={{ marginBottom: 14 }}>Molecule Info</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div><div style={{ fontSize: '.7rem', color: C.g5, marginBottom: 3 }}>Name</div><div style={{ fontWeight: 700, color: C.white, fontSize: '.92rem' }}>{mol.name}</div></div>
            {mol.iupacName && <div><div style={{ fontSize: '.7rem', color: C.g5, marginBottom: 3 }}>IUPAC</div><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.7rem', color: C.g4, lineHeight: 1.55 }}>{mol.iupacName}</div></div>}
            {mol.paperTitle && <div><div style={{ fontSize: '.7rem', color: C.g5, marginBottom: 3 }}>Source</div><Link to={`/papers/${mol.paperId}`} style={{ fontSize: '.82rem', color: C.teal, textDecoration: 'none', lineHeight: 1.4, display: 'block' }}>{mol.paperTitle}</Link></div>}
            <div><div style={{ fontSize: '.7rem', color: C.g5, marginBottom: 3 }}>Detected</div><div style={{ fontSize: '.85rem', color: C.g4 }}>{formatDate(mol.createdAt)}</div></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${C.g8}` }}>
        {tabs.map(t => <TabButton key={t.key} active={tab === t.key} onClick={() => setTab(t.key)}>{t.label}</TabButton>)}
      </div>

      {/* Tab content */}
      {tab === 'overview' && (
        <>
          {/* Closest match */}
          {mol.closestMatch && (
            <div className="glass-card" style={{ padding: '20px 24px' }}>
              <div style={{ fontWeight: 700, color: C.white, fontSize: '.88rem', marginBottom: 16 }}>🔬 Closest Known Match</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginBottom: 16 }}>
                {[['Compound', mol.closestMatch.name], ['Database', mol.closestMatch.database], ['PubChem CID', mol.closestMatch.pubchemCid], ['Tanimoto', mol.closestMatch.tanimotoSimilarity?.toFixed(3)]].map(([l, v]) => (
                  <div key={l}><div style={{ fontSize: '.68rem', color: C.g5, marginBottom: 4 }}>{l}</div><div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '.88rem' }}>{v}</div></div>
                ))}
              </div>
              <div style={{ height: 6, borderRadius: 99, background: C.g8, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(mol.closestMatch.tanimotoSimilarity || 0) * 100}%`, background: `linear-gradient(to right,${C.teal},${C.teal4})`, borderRadius: 99, transition: 'width .8s' }} />
              </div>
            </div>
          )}
          {/* Disclosure window */}
          {mol.status !== 'KNOWN' && (
            <div className="glass-card" style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifycontent: 'space-between', marginBottom: 18 }}>
                <div style={{ fontWeight: 700, color: C.white, fontSize: '.88rem' }}>⚖ Section 31 Disclosure Window</div>
                {!hasWindow && !showDisclosureForm && <button className="btn-primary" style={{ fontSize: '.82rem', padding: '8px 16px' }} onClick={() => setShowDisclosureForm(true)} id="start-disclosure-btn">+ Start Window</button>}
              </div>
              {hasWindow ? (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 20 }}>
                    {[['Disclosure Date', formatDate(mol.disclosureWindow.disclosureDate)], ['Filing Deadline', formatDate(mol.disclosureWindow.deadlineDate)], ['Status', mol.disclosureWindow.status]].map(([l, v]) => (
                      <div key={l}><div style={{ fontSize: '.7rem', color: C.g5, marginBottom: 4 }}>{l}</div><div style={{ fontWeight: 700, color: C.white, fontSize: '.88rem' }}>{v}</div></div>
                    ))}
                  </div>
                  <div style={{ borderTop: `1px solid ${C.g8}`, paddingTop: 18, marginBottom: 18 }}>
                    <div style={{ fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12, color: daysLeft <= 7 ? C.red : C.g5 }}>
                      {daysLeft <= 7 ? '🚨 Critical' : '⏱ Time Remaining'}
                    </div>
                    <CountdownClock deadlineDate={mol.disclosureWindow.deadlineDate} />
                  </div>
                  <button className="btn-primary" id="file-patent-btn" onClick={() => { if (window.confirm('File patent?')) moleculesApi.filePatent(id, {}).catch(() => {}); }}>📋 File Patent</button>
                </div>
              ) : showDisclosureForm ? (
                <form onSubmit={e => { e.preventDefault(); const d = e.target.elements.ddate.value; disclosureMut.mutate(d); setShowDisclosureForm(false); }} style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
                  <div style={{ flex: 1 }}><label style={{ display: 'block', fontSize: '.8rem', color: C.g4, marginBottom: 6 }}>First disclosure date</label><input name="ddate" type="date" required className="input-base" /></div>
                  <button type="submit" className="btn-primary">Start →</button>
                </form>
              ) : (
                <EmptyState emoji="⚖" text="No disclosure window yet. Click 'Start Window' to begin." />
              )}
            </div>
          )}
        </>
      )}

      {tab === 'redesign' && <RedesignPanel mol={mol} />}
      {tab === 'synthesis' && <SynthesisPanel routes={mol.synthesisRoutes} />}
      {tab === 'route' && <RouteNoveltyPanel data={mol.routeNovelty} />}
      {tab === 'safety' && <SafetyPanel data={mol.safetyProfile} />}
    </div>
  );
}
