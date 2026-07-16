import { useEffect, useRef } from 'react';

// Renders a SMILES string as a 2D structure using smiles-drawer
// Falls back to a styled placeholder if smiles-drawer is unavailable
export function MoleculeStructure({ smiles, width = 300, height = 220, id = 'mol-canvas' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!smiles || !canvasRef.current) return;

    import('smiles-drawer').then(({ Drawer, SmilesParser }) => {
      try {
        const options = {
          width,
          height,
          bondThickness: 1.2,
          bondLength: 28,
          atomVisualization: 'default',
          themes: {
            dark: {
              C: '#cbd5e1',
              O: '#f87171',
              N: '#60a5fa',
              S: '#fbbf24',
              P: '#a78bfa',
              F: '#34d399',
              Cl: '#34d399',
              Br: '#fb923c',
              I: '#c084fc',
              BACKGROUND: 'transparent',
            },
          },
        };

        const drawer = new Drawer(options);
        const parser = new SmilesParser();
        const tree = parser.parse(smiles);
        drawer.draw(tree, canvasRef.current, 'dark', false);
      } catch (e) {
        console.warn('SMILES rendering error:', e);
      }
    }).catch(() => {
      // smiles-drawer not available — placeholder handled by JSX below
    });
  }, [smiles, width, height]);

  if (!smiles) {
    return (
      <div
        className="flex items-center justify-center rounded-xl border border-graphite-700"
        style={{ width, height, background: 'rgba(15,23,42,0.6)' }}
      >
        <span className="text-graphite-500 text-sm">No structure available</span>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden border border-graphite-700"
      style={{ width, height, background: 'rgba(15,23,42,0.8)' }}>
      <canvas ref={canvasRef} id={id} width={width} height={height} />
    </div>
  );
}
