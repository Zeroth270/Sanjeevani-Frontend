import { useEffect, useRef, useState } from 'react';

// Color map for atomic symbols
const ATOM_COLORS = {
  C: { color: '#475569', label: '#cbd5e1', name: 'Carbon' },
  O: { color: '#ef4444', label: '#fee2e2', name: 'Oxygen' },
  N: { color: '#3b82f6', label: '#dbeafe', name: 'Nitrogen' },
  F: { color: '#10b981', label: '#d1fae5', name: 'Fluorine' },
  H: { color: '#f8fafc', label: '#0f172a', name: 'Hydrogen' },
  S: { color: '#eab308', label: '#fef9c3', name: 'Sulfur' },
  Cl: { color: '#22c55e', label: '#dcfce7', name: 'Chlorine' },
  Br: { color: '#f97316', label: '#ffedd5', name: 'Bromine' },
};

// Generates simulated 3D coordinates based on a chemical formula or SMILES
function generate3DCoordinates(smiles = '', formula = '') {
  const atoms = [];
  const bonds = [];

  // Parse approximate composition from formula (e.g. C21H20O6)
  let cCount = 6;
  let oCount = 2;
  let nCount = 0;
  let fCount = 0;

  if (formula) {
    const cMatch = formula.match(/C(\d+)/);
    const oMatch = formula.match(/O(\d+)/);
    const nMatch = formula.match(/N(\d+)/);
    const fMatch = formula.match(/F(\d+)/);

    if (cMatch) cCount = parseInt(cMatch[1], 10);
    if (oMatch) oCount = parseInt(oMatch[1], 10);
    if (nMatch) nCount = parseInt(nMatch[1], 10);
    if (fMatch) fCount = parseInt(fMatch[1], 10);
  } else if (smiles) {
    // Basic heuristics from SMILES characters
    cCount = (smiles.match(/c/gi) || []).length || 6;
    oCount = (smiles.match(/o/gi) || []).length || 2;
    nCount = (smiles.match(/n/gi) || []).length || 0;
    fCount = (smiles.match(/f/gi) || []).length || 0;
  }

  // Create a structured ring-like or chain skeleton
  const totalAtomsCount = cCount + oCount + nCount + fCount;
  
  // Create Carbon backbone (helical chain / rings)
  for (let i = 0; i < cCount; i++) {
    const angle = (i / cCount) * Math.PI * 2 * (cCount > 10 ? 2 : 1);
    const radius = 50 + Math.sin(i * 1.5) * 15;
    atoms.push({
      id: i,
      element: 'C',
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius + (i - cCount / 2) * 8,
      z: Math.sin(angle * 2.5) * 35,
    });
  }

  // Add Nitrogens
  for (let i = 0; i < nCount; i++) {
    const parentIdx = Math.floor((i / nCount) * cCount);
    atoms.push({
      id: atoms.length,
      element: 'N',
      x: atoms[parentIdx].x + 35 * Math.sin(i),
      y: atoms[parentIdx].y + 35 * Math.cos(i),
      z: atoms[parentIdx].z + 20,
    });
    bonds.push({ u: parentIdx, v: atoms.length - 1 });
  }

  // Add Oxygens
  for (let i = 0; i < oCount; i++) {
    const parentIdx = Math.floor((i / oCount) * cCount);
    atoms.push({
      id: atoms.length,
      element: 'O',
      x: atoms[parentIdx].x + 38 * Math.cos(i * 2),
      y: atoms[parentIdx].y + 38 * Math.sin(i * 2),
      z: atoms[parentIdx].z - 25,
    });
    bonds.push({ u: parentIdx, v: atoms.length - 1 });
  }

  // Add Fluorine / Halogens
  for (let i = 0; i < fCount; i++) {
    const parentIdx = Math.floor((i / fCount) * cCount);
    atoms.push({
      id: atoms.length,
      element: 'F',
      x: atoms[parentIdx].x + 40 * Math.sin(i * 3),
      y: atoms[parentIdx].y - 40 * Math.cos(i * 3),
      z: atoms[parentIdx].z + 15,
    });
    bonds.push({ u: parentIdx, v: atoms.length - 1 });
  }

  // Connect Carbon chain backbone
  for (let i = 0; i < cCount - 1; i++) {
    bonds.push({ u: i, v: i + 1 });
  }
  // Connect loop if medium sized
  if (cCount >= 5 && cCount <= 8) {
    bonds.push({ u: cCount - 1, v: 0 });
  }

  // Add hydrogens to satisfy valency visually
  const carbonCount = atoms.filter(a => a.element === 'C').length;
  for (let i = 0; i < carbonCount; i += 2) {
    atoms.push({
      id: atoms.length,
      element: 'H',
      x: atoms[i].x + 24 * Math.sin(i),
      y: atoms[i].y + 24 * Math.cos(i),
      z: atoms[i].z - 20,
    });
    bonds.push({ u: i, v: atoms.length - 1 });
  }

  return { atoms, bonds };
}

export function Molecule3DStructure({ smiles = '', formula = '', width = 300, height = 240 }) {
  const canvasRef = useRef(null);
  const [model, setModel] = useState({ atoms: [], bonds: [] });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0.5, y: 0.5 });
  const requestRef = useRef(null);

  // Initialize structure
  useEffect(() => {
    const m = generate3DCoordinates(smiles, formula);
    setModel(m);
  }, [smiles, formula]);

  // Handle auto rotation & mouse interaction
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !model.atoms.length) return;

    const ctx = canvas.getContext('2d');
    let rotX = rotation.x;
    let rotY = rotation.y;

    const draw = () => {
      // Auto-spin slightly if not dragging
      if (!isDragging) {
        rotY += 0.006;
        rotX += 0.003;
      }

      ctx.clearRect(0, 0, width, height);

      // Setup perspective matrices
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const focalLength = 300;
      const centerX = width / 2;
      const centerY = height / 2;

      // Project atoms
      const projected = model.atoms.map(atom => {
        // Rotate around Y axis
        let x1 = atom.x * cosY - atom.z * sinY;
        let z1 = atom.x * sinY + atom.z * cosY;

        // Rotate around X axis
        let y2 = atom.y * cosX - z1 * sinX;
        let z2 = atom.y * sinX + z1 * cosX;

        // Perspective projection
        const scale = focalLength / (focalLength + z2 + 100);
        return {
          id: atom.id,
          element: atom.element,
          px: centerX + x1 * scale * 1.5,
          py: centerY + y2 * scale * 1.5,
          pz: z2,
          radius: (atom.element === 'H' ? 6 : atom.element === 'C' ? 12 : 14) * scale,
        };
      });

      // Draw bonds
      ctx.lineWidth = 4;
      model.bonds.forEach(bond => {
        const u = projected.find(p => p.id === bond.u);
        const v = projected.find(p => p.id === bond.v);
        if (!u || !v) return;

        // Gradient color between elements
        const colorU = ATOM_COLORS[u.element]?.color || '#ffffff';
        const colorV = ATOM_COLORS[v.element]?.color || '#ffffff';

        const grad = ctx.createLinearGradient(u.px, u.py, v.px, v.py);
        grad.addColorStop(0, colorU);
        grad.addColorStop(0.5, colorU);
        grad.addColorStop(0.5, colorV);
        grad.addColorStop(1, colorV);

        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(u.px, u.py);
        ctx.lineTo(v.px, v.py);
        ctx.stroke();
      });

      // Draw atoms (sorted by Z depth)
      projected.sort((a, b) => b.pz - a.pz);

      projected.forEach(atom => {
        const info = ATOM_COLORS[atom.element] || { color: '#ffffff', label: '#000000' };

        // Shaded sphere look using radial gradient
        const grad = ctx.createRadialGradient(
          atom.px - atom.radius * 0.3,
          atom.py - atom.radius * 0.3,
          atom.radius * 0.1,
          atom.px,
          atom.py,
          atom.radius
        );
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.2, info.color);
        grad.addColorStop(1, '#020617');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(atom.px, atom.py, atom.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw symbol
        if (atom.radius > 7 && atom.element !== 'H') {
          ctx.fillStyle = info.label;
          ctx.font = `bold ${Math.round(atom.radius * 0.9)}px Inter, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(atom.element, atom.px, atom.py);
        }
      });

      requestRef.current = requestAnimationFrame(draw);
    };

    requestRef.current = requestAnimationFrame(draw);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [model, isDragging, rotation, width, height]);

  // Drag interaction handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setRotation(prev => ({
      x: prev.x + dy * 0.01,
      y: prev.y + dx * 0.01,
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        background: 'radial-gradient(circle at center, rgba(15,23,42,0.4) 0%, rgba(2,6,23,0.9) 100%)',
        borderRadius: 14,
        overflow: 'hidden',
        border: '1px solid rgba(51,65,85,0.4)',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <canvas ref={canvasRef} width={width} height={height} />
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          right: 12,
          fontSize: '.68rem',
          color: '#64748b',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        ❖ Click & Drag to Rotate
      </div>
    </div>
  );
}
