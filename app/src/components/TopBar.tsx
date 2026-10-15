import { useNavigate } from 'react-router-dom';
import VariantSwitcher from '@shared/components/VariantSwitcher';
import { useAppearance } from '@shared/context/AppearanceContext';

interface TopBarProps {
  title: string;
  showBack?: boolean;
}

// Inclui o VariantSwitcher (GP0/PP1/PP2 × PT/ES) em toda a TopBar do App
// Sentinela — mesmo seletor usado no Header do site institucional (ver
// shared/components/VariantSwitcher.tsx), garantindo troca sincronizada de
// aparência entre site e app quando publicados no mesmo domínio.
//
// Tema Pulso Preto (PP1/PP2): propaga a identidade visual da marca (fundo
// verde-escuro, texto creme, tipografia oficial) também no chrome do App
// Sentinela — antes a TopBar permanecia sempre no estilo GP0 (branco/earth),
// independentemente da variante ativa.
export default function TopBar({ title, showBack }: TopBarProps) {
  const navigate = useNavigate();
  const { variantId } = useAppearance();
  const isPulso = variantId === 'pp1' || variantId === 'pp2';

  return (
    <div
      className={
        isPulso
          ? 'sticky top-0 z-30 bg-pulso-verde text-pulso-creme backdrop-blur border-b border-pulso-dourado/30 flex items-center gap-3 px-4 py-3 max-w-md mx-auto w-full font-pulso-body'
          : 'sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-earth-100 flex items-center gap-3 px-4 py-3 max-w-md mx-auto w-full'
      }
    >
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className={`text-lg leading-none ${isPulso ? 'text-pulso-dourado' : 'text-earth-600'}`}
        >
          ←
        </button>
      )}
      <h1 className={`font-bold text-base truncate flex-1 ${isPulso ? 'font-pulso-display text-pulso-creme' : 'text-earth-900'}`}>
        {title}
      </h1>
      <VariantSwitcher compact />
    </div>
  );
}
