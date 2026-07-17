import { useEffect, useRef } from 'react';
import SmilesDrawer from 'smiles-drawer';

interface MoleculeRendererProps {
  smiles: string;
  width?: number;
  height?: number;
  theme?: 'light' | 'dark';
}

export function MoleculeRenderer({
  smiles,
  width = 280,
  height = 280,
  theme = 'light',
}: MoleculeRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const drawer = new SmilesDrawer.Drawer({
      width,
      height,
      bondLength: 0.45,
      fontSize: 14,
      theme,
    });

    SmilesDrawer.parse(smiles, (tree) => {
      drawer.draw(tree, canvasRef.current!, 'light', false);
    });

    return () => {
      const ctx = canvasRef.current?.getContext('2d');
      ctx?.clearRect(0, 0, width, height);
    };
  }, [smiles, width, height, theme]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center"
      style={{ width, height }}
      role="img"
      aria-label={`Molecular structure: ${smiles}`}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="drop-shadow-sm"
      />
    </div>
  );
}
