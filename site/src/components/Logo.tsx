// Marca "Gente Preta" (GP0) — inspirada, de forma abstrata e não-figurativa, em
// Ossaim (folha/cura) e Obaluaê (contas/proteção comunitária), seguindo a regra
// do handoff Ìlera de nunca representar orixás de forma figurativa e de
// combinar no máximo 2 grafismos por bloco visual. Aqui: folha central (Ossaim)
// + anel de contas (Obaluaê/comunidade). Nenhum texto, símbolo ou cor fora da
// paleta do projeto faz referência religiosa explícita — ver nota de cautela em
// DesignSystem.tsx / arquitetura.md.
//
// Marca "Pulso Preto" (PP1/PP2) — usa o ícone OFICIAL do pacote de identidade
// de marca (00_Identidade.zip, pasta LOGO/, out/2026): ilustração de perfil de
// mulher negra com arco dourado + linha de pulso/ECG dourado→verde, recortada
// do logo oficial completo (sem o wordmark "Pulso Preto", que já é renderizado
// como texto tipografado ao lado, nos Headers/Footers). Arquivo rasterizado
// (PNG) a partir do .pdf oficial via pdftocairo -transp -r 300 — os arquivos
// fonte são .ai/.eps/.pdf (Illustrator), sem exportação .svg nativa no pacote.
// Ver site/public/static/brand/pulso-preto-icon.png (ícone recortado, usado
// aqui) e pulso-preto-logo-full.png (peça completa com wordmark, para uso em
// contextos de marca standalone, ex. redes sociais/compartilhamento).
import { useAppearance } from '@shared/context/AppearanceContext';

interface LogoProps {
  size?: number;
  className?: string;
  monochrome?: boolean; // versão para fundos escuros (rodapé) — só afeta GP0
}

export default function Logo({ size = 36, className = '', monochrome = false }: LogoProps) {
  const { brand, variantId } = useAppearance();

  if (variantId === 'pp1' || variantId === 'pp2') {
    return <PulsoLogo size={size} className={className} brandName={brand.name} />;
  }

  return <GenteLogo size={size} className={className} monochrome={monochrome} brandName={brand.name} />;
}

// ---------------------------------------------------------------------------
// GP0 — Ossaim+Obaluaê (SVG autoral, intacto)
// ---------------------------------------------------------------------------
function GenteLogo({
  size,
  className,
  monochrome,
  brandName,
}: {
  size: number;
  className: string;
  monochrome: boolean;
  brandName: string;
}) {
  const bg = monochrome ? '#f4f0e6' : '#213d34'; // palha (sobre fundo escuro) ou folha-deep
  const ring = monochrome ? '#213d34' : '#c9a04b'; // folha-deep ou ouro
  const leaf = monochrome ? '#213d34' : '#f4f0e6'; // folha-deep ou palha

  const dots = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    const r = 15.5;
    return { x: 18 + Math.cos(a) * r, y: 18 + Math.sin(a) * r, i };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      className={className}
      role="img"
      aria-label={brandName}
    >
      <circle cx="18" cy="18" r="17.5" fill={bg} />
      {dots.map((d) => (
        <circle key={d.i} cx={d.x} cy={d.y} r="1.15" fill={ring} opacity={d.i % 2 ? 0.55 : 0.95} />
      ))}
      <path
        d="M18 9 C 13.5 11.5, 11.5 15.5, 11.5 20.5 C 15.5 20.5, 19.5 18, 23 12.5 C 20.5 12.5, 19.2 11, 18 9 Z"
        fill={leaf}
      />
      <path d="M18 10 L 15 19.5" stroke={bg} strokeWidth="0.7" fill="none" opacity="0.45" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// PP1 / PP2 — ícone oficial "Pulso Preto" (raster PNG, transparente, recortado
// do logo oficial). O ícone já tem cores próprias (arco dourado, pulso
// verde→dourado, pele/cabelo) que não mudam com `monochrome` — são a
// identidade oficial fixada no pacote de marca, por isso `monochrome` é
// ignorado aqui de propósito.
// ---------------------------------------------------------------------------
function PulsoLogo({ size, className, brandName }: { size: number; className: string; brandName: string }) {
  return (
    <img
      src="/static/brand/pulso-preto-icon.png"
      alt={brandName}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
