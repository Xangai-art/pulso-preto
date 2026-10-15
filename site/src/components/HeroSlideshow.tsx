import { useCallback, useEffect, useRef, useState } from 'react';
import { heroSlides } from '../data/heroSlides';
import { LeafMark } from './Ornaments';
import { useAppearance } from '@shared/context/AppearanceContext';

// Apresentação de slides dinâmica para a hero da Home — substitui o vídeo
// por um carrossel autoral, focado no lado informativo do site/App e em seus
// benefícios concretos para a sociedade (não é depoimento, é vitrine viva de
// produto). Avança automaticamente, pausa no hover/foco, sem áudio/vídeo
// externo — 100% construído com a linguagem visual do design system.

const AUTO_ADVANCE_MS = 6000;

const toneBg: Record<string, string> = {
  folha: 'from-folha-700 via-folha-900 to-earth-900',
  ouro: 'from-ouro-700 via-folha-900 to-earth-900',
  barro: 'from-barro-700 via-folha-900 to-earth-900',
  brand: 'from-brand-700 via-folha-900 to-earth-900',
};

const toneAccent: Record<string, string> = {
  folha: 'text-folha-300',
  ouro: 'text-ouro-300',
  barro: 'text-barro-300',
  brand: 'text-brand-300',
};

const toneDot: Record<string, string> = {
  folha: 'bg-folha-300',
  ouro: 'bg-ouro-300',
  barro: 'bg-barro-300',
  brand: 'bg-brand-300',
};

export default function HeroSlideshow() {
  const { brand } = useAppearance();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex(((i % heroSlides.length) + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  const slide = heroSlides[index];

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-earth-200 shadow-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-label={`Apresentação: o que é o ${brand.name}`}
    >
      <div className={`relative bg-gradient-to-br ${toneBg[slide.tone]} text-white transition-colors duration-700`}>
        {/* Textura discreta, mesma linguagem "ornament-palha" do resto do site */}
        <div
          className="absolute inset-0 opacity-[0.10] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(115deg, rgba(244,240,230,0.5) 0px, rgba(244,240,230,0.5) 1.5px, transparent 1.5px, transparent 14px)',
          }}
        />
        <div className="relative px-6 sm:px-10 py-10 sm:py-12 min-h-[340px] sm:min-h-[380px] flex flex-col">
          <div
            key={slide.id}
            className="flex-1 flex flex-col hero-slide-enter"
          >
            <div className="flex items-center gap-2 mb-4">
              <LeafMark size={20} color="#f4f0e6" />
              <span className={`eyebrow ${toneAccent[slide.tone]}`}>{slide.eyebrow}</span>
            </div>
            <h2 className="font-editorial italic text-2xl sm:text-3xl leading-snug mb-4 max-w-xl">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-palha-100/90 max-w-lg mb-6">{slide.description}</p>
            <div className="mt-auto flex items-end gap-3">
              <span className={`text-4xl sm:text-5xl font-bold ${toneAccent[slide.tone]}`}>{slide.stat}</span>
              <span className="text-xs sm:text-sm text-palha-100/80 pb-1.5 max-w-[10rem]">{slide.statLabel}</span>
            </div>
          </div>

          {/* Navegação: dots + setas */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-1.5">
              {heroSlides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ver slide: ${s.title}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? `w-8 ${toneDot[slide.tone]}` : 'w-3 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Slide anterior"
                className="h-8 w-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M9 2 L4 7 L9 12" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Próximo slide"
                className="h-8 w-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M5 2 L10 7 L5 12" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
