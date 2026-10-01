import { useEffect, useRef } from 'react';
import { useTheme } from '../../../lib/theme';
import { XylophoneEngine } from './XylophoneEngine';

interface XylophoneCanvasProps {
  className?: string;
}

export function XylophoneCanvas({ className = '' }: XylophoneCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<XylophoneEngine | null>(null);
  const theme = useTheme();
  const initialDark = useRef(theme === 'dark');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let engine: XylophoneEngine | null = null;
    try {
      engine = new XylophoneEngine(canvas, initialDark.current);
      engineRef.current = engine;
    } catch (err) {
      console.warn('WebGL / XylophoneEngine initialization failed:', err);
    }

    return () => {
      if (engine) {
        engine.destroy();
        if (engineRef.current === engine) {
          engineRef.current = null;
        }
      }
    };
  }, []);

  useEffect(() => {
    engineRef.current?.setTheme(theme === 'dark');
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 block h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
