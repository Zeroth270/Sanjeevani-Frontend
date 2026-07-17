import { useEffect, useRef } from 'react';
import SmilesDrawer from 'smiles-drawer';
import { useDarkMode } from '@/hooks/useDarkMode';

interface MoleculeRendererProps {
  smiles: string;
  width?: number;
  height?: number;
}

export function MoleculeRenderer({
  smiles,
  width = 280,
  height = 280,
}: MoleculeRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useDarkMode();

  useEffect(() => {
    if (!canvasRef.current) return;

    const activeTheme = isDark ? 'dark' : 'light';

    const drawer = new SmilesDrawer.Drawer({
      width,
      height,
      bondLength: 0.45,
      fontSize: 14,
      theme: activeTheme,
    });

    SmilesDrawer.parse(smiles, (tree) => {
      drawer.draw(tree, canvasRef.current!, activeTheme, false);
    });

    return () => {
      const ctx = canvasRef.current?.getContext('2d');
      ctx?.clearRect(0, 0, width, height);
    };
  }, [smiles, width, height, isDark]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center animate-fade-in"
      style={{ width, height }}
      role="img"
      aria-label={`Molecular structure: ${smiles}`}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="drop-shadow-md transition-all duration-300"
      />
    </div>
  );
}
