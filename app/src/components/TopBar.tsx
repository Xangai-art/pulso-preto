import { useNavigate } from 'react-router-dom';
import LocaleSwitcher from '@shared/components/LocaleSwitcher';

interface TopBarProps {
  title: string;
  showBack?: boolean;
}

// TopBar do App Sentinela — identidade ÚNICA de produção (PP3).
// Fundo verde-escuro, texto creme, tipografia oficial, seletor de idioma.
// HISTÓRICO: durante o teste da arquitetura CEOS esta barra ramificava por
// variante (GP0 → branco/earth; PP1/PP2 → verde/creme). Teste encerrado.
export default function TopBar({ title, showBack }: TopBarProps) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-30 bg-pulso-verde text-pulso-creme backdrop-blur border-b border-pulso-dourado/30 flex items-center gap-3 px-4 py-3 max-w-md mx-auto w-full font-pulso-body">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="text-lg leading-none text-pulso-dourado"
        >
          ←
        </button>
      )}
      <h1 className="font-bold text-base truncate flex-1 font-pulso-display text-pulso-creme">
        {title}
      </h1>
      <LocaleSwitcher compact />
    </div>
  );
}
