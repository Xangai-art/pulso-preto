import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

// Welcome — identidade ÚNICA de produção (PP3): fundo verde-escuro→verde-médio,
// tipografia oficial, CTA dourado. HISTÓRICO: ramificava por variante durante o
// teste da arquitetura CEOS (encerrado).
export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col justify-between px-6 py-10 text-center bg-gradient-to-b from-pulso-verde to-pulso-verde-medio font-pulso-body">
      <div />
      <div>
        <div className="mx-auto mb-6">
          <Logo size={64} />
        </div>
        <h1 className="text-2xl font-bold mb-3 text-pulso-creme font-pulso-display">
          App Sentinela
        </h1>
        <p className="text-sm max-w-xs mx-auto mb-1 text-pulso-creme/90">
          Já foi mal atendido no SUS? Sentiu que seu problema não foi levado a sério?
        </p>
        <p className="text-xs max-w-xs mx-auto text-pulso-creme/70">
          Entenda sua saúde, encontre a UBS mais próxima e ajude sua comunidade — em check-ins de 1 minuto.
        </p>
      </div>
      <div className="space-y-3">
        <Link
          to="/consentimento"
          className="block w-full rounded-xl bg-pulso-dourado text-pulso-verde font-bold py-3.5 shadow-sm"
        >
          Começar
        </Link>
        <p className="text-[11px] px-4 text-pulso-creme/60">
          Ao continuar, você poderá revisar e escolher seus níveis de consentimento LGPD na próxima tela.
        </p>
      </div>
    </div>
  );
}
