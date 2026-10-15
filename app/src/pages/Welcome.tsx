import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { useAppearance } from '@shared/context/AppearanceContext';

// Tema Pulso Preto (PP1/PP2): mesma lógica de propagação de marca usada em
// TopBar/BottomNav/Home (app/) — fundo verde-escuro→verde-médio em vez do
// gradiente brand-50→earth-50 padrão GP0, tipografia oficial, CTA dourado.
export default function Welcome() {
  const { variantId } = useAppearance();
  const isPulso = variantId === 'pp1' || variantId === 'pp2';

  return (
    <div
      className={
        isPulso
          ? 'min-h-screen flex flex-col justify-between px-6 py-10 text-center bg-gradient-to-b from-pulso-verde to-pulso-verde-medio font-pulso-body'
          : 'min-h-screen flex flex-col justify-between px-6 py-10 text-center bg-gradient-to-b from-brand-50 to-earth-50'
      }
    >
      <div />
      <div>
        <div className="mx-auto mb-6">
          <Logo size={64} />
        </div>
        <h1 className={`text-2xl font-bold mb-3 ${isPulso ? 'text-pulso-creme font-pulso-display' : 'text-earth-900'}`}>
          App Sentinela
        </h1>
        <p className={`text-sm max-w-xs mx-auto mb-1 ${isPulso ? 'text-pulso-creme/90' : 'text-earth-600'}`}>
          Já foi mal atendido no SUS? Sentiu que seu problema não foi levado a sério?
        </p>
        <p className={`text-xs max-w-xs mx-auto ${isPulso ? 'text-pulso-creme/70' : 'text-earth-500'}`}>
          Entenda sua saúde, encontre a UBS mais próxima e ajude sua comunidade — em check-ins de 1 minuto.
        </p>
      </div>
      <div className="space-y-3">
        <Link
          to="/consentimento"
          className={
            isPulso
              ? 'block w-full rounded-xl bg-pulso-dourado text-pulso-verde font-bold py-3.5 shadow-sm'
              : 'block w-full rounded-xl bg-brand-600 text-white font-semibold py-3.5 shadow-sm'
          }
        >
          Começar
        </Link>
        <p className={`text-[11px] px-4 ${isPulso ? 'text-pulso-creme/60' : 'text-earth-400'}`}>
          Ao continuar, você poderá revisar e escolher seus níveis de consentimento LGPD na próxima tela.
        </p>
      </div>
    </div>
  );
}
