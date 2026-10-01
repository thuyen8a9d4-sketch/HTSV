import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from '../../../components/Icons';
import { DepthGalleryEngine } from './DepthGalleryEngine';
import { galleryPlaneData, type GalleryPlaneItem } from './data/galleryData';

export function DepthGallery() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<DepthGalleryEngine | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState<GalleryPlaneItem>(galleryPlaneData[0]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let engine: DepthGalleryEngine | null = null;
    try {
      engine = new DepthGalleryEngine(canvas, (index, item) => {
        setActiveIndex(index);
        setCurrentSlide(item);
      });
      engineRef.current = engine;

      void engine.init().then(() => {
        setIsLoaded(true);
      });
    } catch (err) {
      console.warn('DepthGalleryEngine failed to initialize:', err);
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

  return (
    <section
      aria-label="Phòng trưng bày chiều sâu 3D HTSV"
      className="relative h-screen min-h-[100dvh] w-full overflow-hidden z-0 bg-slate-950"
    >
      {/* 3D WebGL Canvas filling 100% of viewport */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full touch-none"
        aria-hidden="true"
      />

      {/* Subtle Initial Loading Indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        </div>
      )}

      {/* Subtle Ambient Vignette for Readability */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-[background] duration-700"
        style={{
          background: currentSlide.layout.alignment === 'right'
            ? 'radial-gradient(ellipse at 70% 50%, rgba(0,0,0,0.35) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at 30% 50%, rgba(0,0,0,0.35) 0%, transparent 70%)',
        }}
      />

      {/* Editorial Typographic Block with Slide-Specific Dynamic Coordinates & Mobile Optimization */}
      <div
        className="pointer-events-none absolute z-20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] max-md:!top-auto max-md:!bottom-[calc(88px+env(safe-area-inset-bottom,0px))] max-md:!left-4 max-md:!right-4 max-md:!transform-none"
        style={{
          top: currentSlide.layout.top,
          left: currentSlide.layout.left ?? 'auto',
          right: currentSlide.layout.right ?? 'auto',
          transform: currentSlide.layout.transform,
        }}
      >
        <div
          key={currentSlide.id}
          className={`gallery-headline-animate flex flex-col max-md:!items-start max-md:!text-left ${
            currentSlide.layout.alignment === 'right'
              ? 'items-end text-right'
              : 'items-start text-left'
          }`}
        >
          {/* Index & Theme Indicator */}
          <div
            className={`flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3 max-md:!flex-row ${
              currentSlide.layout.alignment === 'right' ? 'flex-row-reverse' : ''
            }`}
          >
            <span
              className="h-2 sm:h-2.5 w-6 sm:w-8 rounded-full shadow-lg transition-all duration-300"
              style={{
                backgroundColor: '#1d4ed8',
                boxShadow: '0 0 16px rgba(29, 78, 216, 0.6)',
              }}
            />
            <span className="font-mono text-xs font-bold tracking-widest text-slate-200/90 uppercase">
              0{activeIndex + 1} / 0{galleryPlaneData.length}
            </span>
          </div>

          {/* Big Bold Headline: Strictly Non-Wrapping Single Line */}
          <h1 
            className="whitespace-nowrap text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white uppercase leading-[1.08] select-none"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 4px 24px rgba(0,0,0,0.4), 0 8px 48px rgba(0,0,0,0.25)' }}
          >
            {currentSlide.label.word}
          </h1>

          {/* Elegant Subtitle with Clear Spacing: Zero Overlap */}
          <p className="mt-2.5 sm:mt-4 font-mono text-[11px] sm:text-xs md:text-sm lg:text-base font-semibold tracking-wider text-sky-100 drop-shadow-md whitespace-nowrap">
            {currentSlide.label.subword}
          </p>

          {/* Direct Action Link with Thick Frosted Liquid Glass */}
          <div className="pointer-events-auto mt-4 sm:mt-7">
            <Link
              to={currentSlide.action.path}
              className="liquid-glass-btn group transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>Khám phá {currentSlide.label.word}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Down Hint to Announcements & News (Desktop only to prevent clutter above mobile bottom nav) */}
      <div className="pointer-events-auto absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center">
        <button
          type="button"
          onClick={() => {
            document.getElementById('home-content-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/70 px-4 py-2 text-xs font-semibold text-slate-200 backdrop-blur-md transition-all hover:bg-white hover:text-blue-900 hover:border-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          title="Cuộn xuống xem thông báo, tin tức và dịch vụ"
        >
          <span>Xem thông báo & tin tức mới</span>
          <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
        </button>
      </div>
    </section>
  );
}
