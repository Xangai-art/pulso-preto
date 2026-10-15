import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { priorityThemes } from '../data/diseases';
import TopBar from '../components/TopBar';
import { useAppearance } from '@shared/context/AppearanceContext';
import { getVariantContent } from '@shared/data/variantContent';

// Tema Pulso Preto (PP1/PP2): propaga a identidade visual (card de check-in
// verde-escuro/dourado em vez do gradiente brand-* padrão GP0) e injeta o
// banner do Seminário Latino-Americano (18-19/11/2026), reaproveitando o
// mesmo campo `seminar` de shared/data/variantContent.ts usado no site —
// mantém as duas superfícies (site institucional + App Sentinela) com a
// mesma informação de evento, sem duplicar conteúdo.
export default function Home() {
  const checkIns = useAppStore((s) => s.checkIns);
  const baseline = useAppStore((s) => s.baseline);
  const { variantId, localeId } = useAppearance();
  const isPulso = variantId === 'pp1' || variantId === 'pp2';
  const content = isPulso ? getVariantContent(variantId, localeId) : undefined;

  const lastCheckIn = checkIns[0];
  const daysSinceLastCheckIn = lastCheckIn
    ? Math.floor((Date.now() - new Date(lastCheckIn.date).getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const myConditions = priorityThemes.filter((t) => baseline?.conditions.includes(t.id));

  return (
    <div>
      <TopBar title="Sentinela" />
      <div className="px-5 pt-4 pb-8 space-y-6">
        <div
          className={
            isPulso
              ? 'rounded-2xl bg-gradient-to-br from-pulso-verde to-pulso-verde-medio text-pulso-creme p-5 font-pulso-body'
              : 'rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 text-white p-5'
          }
        >
          <p className={`text-xs uppercase tracking-wide font-semibold mb-1 ${isPulso ? 'text-pulso-dourado' : 'text-brand-100'}`}>
            Seu check-in
          </p>
          <h2 className={`text-lg font-bold mb-2 ${isPulso ? 'font-pulso-display' : ''}`}>
            {daysSinceLastCheckIn === null
              ? 'Faça seu primeiro check-in'
              : daysSinceLastCheckIn === 0
              ? 'Check-in feito hoje ✅'
              : `Último check-in há ${daysSinceLastCheckIn} dia(s)`}
          </h2>
          <p className={`text-xs mb-4 ${isPulso ? 'text-pulso-creme/80' : 'text-brand-100'}`}>
            Leva menos de 1 minuto e ajuda toda a comunidade.
          </p>
          <Link
            to="/checkin"
            className={
              isPulso
                ? 'inline-block bg-pulso-dourado text-pulso-verde font-bold text-sm rounded-lg px-4 py-2'
                : 'inline-block bg-white text-brand-700 font-semibold text-sm rounded-lg px-4 py-2'
            }
          >
            Fazer check-in
          </Link>
        </div>

        {isPulso && content?.seminar && (
          <Link
            to="/comunidade"
            className="block rounded-2xl bg-pulso-marrom/10 border border-pulso-dourado/30 p-4 hover:bg-pulso-marrom/15 transition-colors"
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-pulso-terracota mb-1">{content.seminar.eyebrow}</p>
            <h3 className="font-pulso-display font-bold text-pulso-verde text-sm leading-snug mb-1">{content.seminar.name}</h3>
            <p className="text-xs text-pulso-marrom/75">{content.seminar.dates} · {content.seminar.location}</p>
          </Link>
        )}

        <div>
          <h3 className={`font-bold mb-3 text-sm ${isPulso ? 'text-pulso-verde font-pulso-display' : 'text-earth-900'}`}>
            Acesso rápido
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <QuickLink
              to="/mapa"
              icon="📍"
              pulsoIcon="/static/brand/elementos/icone-hospital-comunidade.png"
              label="Encontrar UBS"
              pulso={isPulso}
            />
            <QuickLink
              to="/radar"
              icon="📡"
              pulsoIcon="/static/brand/elementos/icone-coracao-pulsa.png"
              label="Radar comunitário"
              pulso={isPulso}
            />
            <QuickLink
              to="/saude"
              icon="📚"
              pulsoIcon="/static/brand/elementos/icone-livro-ideias.png"
              label="Biblioteca de saúde"
              pulso={isPulso}
            />
            <QuickLink
              to="/denunciar"
              icon="⚖️"
              pulsoIcon="/static/brand/elementos/icone-mao-balanca.png"
              label="Direito à saúde"
              pulso={isPulso}
            />
          </div>
        </div>

        {myConditions.length > 0 && (
          <div>
            <h3 className={`font-bold mb-3 text-sm ${isPulso ? 'text-pulso-verde font-pulso-display' : 'text-earth-900'}`}>
              Suas condições acompanhadas
            </h3>
            <div className="space-y-2">
              {myConditions.map((c) => (
                <Link
                  key={c.id}
                  to={`/saude/${c.category.toLowerCase()}/${c.id}`}
                  className={
                    isPulso
                      ? 'flex items-center gap-3 rounded-xl border border-pulso-dourado/25 bg-white p-3'
                      : 'flex items-center gap-3 rounded-xl border border-earth-200 bg-white p-3'
                  }
                >
                  <span className="text-xl">{c.icon}</span>
                  <span className={`text-sm font-medium ${isPulso ? 'text-pulso-verde' : 'text-earth-800'}`}>{c.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className={isPulso ? 'rounded-xl border border-pulso-dourado/25 bg-white p-4' : 'rounded-xl border border-earth-200 bg-white p-4'}>
          <p className={`text-xs ${isPulso ? 'text-pulso-marrom/70' : 'text-earth-500'}`}>
            Você já fez{' '}
            <strong className={isPulso ? 'text-pulso-verde' : 'text-earth-900'}>{checkIns.length}</strong> check-in(s) desde
            que se juntou ao Sentinela. Obrigado por fazer parte da vigilância comunitária.
          </p>
        </div>
      </div>
    </div>
  );
}

function QuickLink({
  to,
  icon,
  pulsoIcon,
  label,
  pulso,
}: {
  to: string;
  icon: string;
  pulsoIcon?: string;
  label: string;
  pulso: boolean;
}) {
  return (
    <Link
      to={to}
      className={
        pulso
          ? 'rounded-xl border border-pulso-dourado/25 bg-white p-4 flex flex-col gap-2 items-start'
          : 'rounded-xl border border-earth-200 bg-white p-4 flex flex-col gap-2 items-start'
      }
    >
      {pulso && pulsoIcon ? (
        <img src={pulsoIcon} alt="" className="w-7 h-7 object-contain" />
      ) : (
        <span className="text-2xl">{icon}</span>
      )}
      <span className={`text-xs font-semibold ${pulso ? 'text-pulso-verde' : 'text-earth-800'}`}>{label}</span>
    </Link>
  );
}
