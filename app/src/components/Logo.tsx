// LOGO — identidade ÚNICA de produção "Pulso Preto" (PP3) — versão App Sentinela
// (ver comentário completo em site/src/components/Logo.tsx). Usa o ativo oficial
// do pacote de identidade de marca; sem ramificação por variante.
import { useAppearance } from '@shared/context/AppearanceContext';

interface LogoProps {
  size?: number;
  className?: string;
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
