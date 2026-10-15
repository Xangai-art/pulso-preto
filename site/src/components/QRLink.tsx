import { QRCodeSVG } from 'qrcode.react';
import { APP_URL } from '../config';

interface QRLinkProps {
  size?: number;
  path?: string; // caminho dentro do App Sentinela, ex: '/', '/onboarding'
  label?: string;
  compact?: boolean; // true: só o QR Code (sem card/legenda/link) — para uso em
  // rodapés estreitos (Header/Footer Pulso Preto PP1/PP2), onde a legenda e o
  // link textual já são renderizados ao lado pelo componente-pai.
}

export default function QRLink({ size = 220, path = '/', label, compact = false }: QRLinkProps) {
  const url = `${APP_URL.replace(/\/$/, '')}${path}`;

  if (compact) {
    return (
      <div className="inline-flex rounded-lg bg-white p-2 border border-earth-100 shrink-0">
        <QRCodeSVG value={url} size={size} level="M" includeMargin />
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col items-center gap-3 rounded-2xl border border-earth-200 bg-white p-6 shadow-sm">
      <div className="rounded-xl bg-white p-3 border border-earth-100">
        <QRCodeSVG value={url} size={size} level="M" includeMargin />
      </div>
      <p className="text-xs text-earth-500 text-center max-w-[220px]">
        {label || 'Aponte a câmera do celular para acessar o App Sentinela direto no navegador — sem necessidade de instalação.'}
      </p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-600 font-medium hover:underline break-all">
        {url.replace(/^https?:\/\//, '')}
      </a>
    </div>
  );
}
