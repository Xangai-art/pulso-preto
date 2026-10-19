import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useAppearance } from '@shared/context/AppearanceContext';
import { getPulsoContent } from '@shared/data/pulsoContent';
import { HeartbeatLine } from './PulsoIcons';
import QRLink from './QRLink';

// Footer "Pulso Preto" — identidade ÚNICA de produção (PP3).
//
// HISTÓRICO: durante o teste da arquitetura CEOS o rodapé ramificava por
// variante (GP0/PP1/PP2). Esse teste foi encerrado. Em PP3 há apenas este
// rodapé, fiel à identidade oficial: fundo verde-escuro, marca +
// slogan + tagline, Links, Redes Sociais + newsletter, e QR do App.
export default function Footer() {
  const { brand, localeId } = useAppearance();
  const content = getPulsoContent(localeId);
  const f = content.footer;
  const { t } = useAppearance();

  return (
    <footer id="fale-conosco" className="bg-pulso-verde text-pulso-creme mt-24 scroll-mt-24 font-pulso-body">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <div>
          <div className="flex items-center gap-2 font-bold text-base mb-2 text-pulso-creme">
            <Logo size={34} monochrome />
            <span className="flex items-center gap-1.5">
              {brand.name}
              <HeartbeatLine width={26} height={10} color="#D4A84B" />
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-wider text-pulso-dourado/90 mb-3">{content.header.tagline}</p>
          <p className="text-pulso-creme/80">{f.slogan}</p>
        </div>

        {/* Menu inferior — institucional mínimo em 3 colunas (Parte 5.5-C):
            Quem somos · Transparência · Comunicação. */}
        <nav aria-label="Institucional" className="sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {f.columns.map((col) => (
            <div key={col.heading}>
              <h4 className="font-semibold mb-3 text-pulso-dourado uppercase text-xs tracking-wide">{col.heading}</h4>
              <ul className="space-y-2 text-pulso-creme/85">
                {col.items.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="hover:text-pulso-dourado transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div>
          <h4 className="font-semibold mb-3 text-pulso-dourado uppercase text-xs tracking-wide">{f.socialHeading}</h4>
          <div className="flex gap-3 mb-6">
            <SocialIcon kind="instagram" />
            <SocialIcon kind="facebook" />
            <SocialIcon kind="youtube" />
            <SocialIcon kind="linkedin" />
          </div>
          <h4 className="font-semibold mb-2 text-pulso-dourado uppercase text-xs tracking-wide">{f.newsletterHeading}</h4>
          <form className="flex gap-1.5" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={f.newsletterPlaceholder}
              aria-label={f.newsletterPlaceholder}
              className="flex-1 min-w-0 rounded-md bg-pulso-creme/10 border border-pulso-creme/25 px-3 py-2 text-xs text-pulso-creme placeholder:text-pulso-creme/50 focus:outline-none focus:ring-2 focus:ring-pulso-dourado"
            />
            <button
              type="submit"
              aria-label="Enviar"
              className="rounded-md bg-pulso-dourado text-pulso-verde font-bold px-3 py-2 text-sm hover:bg-pulso-creme transition-colors"
            >
              →
            </button>
          </form>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-pulso-dourado uppercase text-xs tracking-wide">{t('app.download.cta')}</h4>
          <p className="text-pulso-creme/75 text-xs mb-3">{t('app.download.caption')}</p>
          <QRLink size={88} compact />
        </div>
      </div>
      <div className="border-t border-pulso-creme/15 py-4 text-center text-xs text-pulso-creme/60">
        {f.bottomText}
      </div>
    </footer>
  );
}

function SocialIcon({ kind }: { kind: 'instagram' | 'facebook' | 'youtube' | 'linkedin' }) {
  const color = '#D4A84B';
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', 'aria-hidden': true as const, fill: 'none', stroke: color, strokeWidth: 1.8 };
  const wrapClass = 'rounded-full border border-pulso-creme/25 p-2 hover:bg-pulso-creme/10 transition-colors';
  return (
    <a href="#" aria-label={kind} className={wrapClass}>
      {kind === 'instagram' && (
        <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="0.6" fill={color} /></svg>
      )}
      {kind === 'facebook' && (
        <svg {...common}><path d="M15 8h-2a2 2 0 0 0-2 2v2H9v3h2v6h3v-6h2.2l.8-3H14v-1.5c0-.5.3-1 1-1h1z" /></svg>
      )}
      {kind === 'youtube' && (
        <svg {...common}><rect x="3" y="6" width="18" height="12" rx="3" /><path d="M11 10l4 2-4 2z" fill={color} stroke="none" /></svg>
      )}
      {kind === 'linkedin' && (
        <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8" cy="8" r="0.6" fill={color} /><path d="M8 11v6M13 17v-3.5c0-1.4 1-2.2 2.2-2.2 1.2 0 1.8.8 1.8 2.2V17" /></svg>
      )}
    </a>
  );
}
