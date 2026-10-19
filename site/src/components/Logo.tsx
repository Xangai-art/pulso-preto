// LOGO — identidade ÚNICA de produção "Pulso Preto" (PP3)
//
// HISTÓRICO: durante o teste da arquitetura CEOS este componente ramificava por
// variante (GP0 → SVG autoral Ossaim+Obaluaê; PP1/PP2 → ícone Pulso Preto).
// Esse teste foi encerrado. Em PP3 existe UMA única identidade de produção e
// GP0/PP1/PP2 somem da UI.
//
// ATIVO OFICIAL: usa o ícone do pacote de identidade de marca (00_Identidade.zip
// → LOGO/). O ícone (perfil de mulher negra + arco dourado + linha de pulso) é
// recortado do logo oficial completo; o wordmark "Pulso Preto" é renderizado
// como texto tipografado (Hurme Geometric Sans 3) ao lado, nos Headers/Footers.
// Ver site/public/static/brand/pulso-preto-logo-crop.png (peça recortada, usada
// aqui) e pulso-preto-logo-oficial.png (peça completa, para marca standalone).
import { useAppearance } from '@shared/context/AppearanceContext';

interface LogoProps {
  size?: number;
  className?: string;
  /** Mantido por compatibilidade de assinatura — a identidade oficial tem cores
   *  próprias e não é recolocada em monocromático. */
  monochrome?: boolean;
}

export default function Logo({ size = 36, className = '', monochrome = false }: LogoProps) {
  void monochrome;
  const { brand } = useAppearance();
  return (
    <img
      src="/static/brand/pulso-preto-logo-crop.png"
      alt={brand.name}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
