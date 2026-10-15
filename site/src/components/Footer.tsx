import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useAppearance } from '@shared/context/AppearanceContext';
import { getVariantContent } from '@shared/data/variantContent';
import { HeartbeatLine } from './PulsoIcons';
import QRLink from './QRLink';
import type { PulsoVariantContent } from '../../../shared/data/variantContent';

// Estrutura do rodapé depende da variante ativa (ver shared/data/variants.ts
// → footerTheme + shared/data/variantContent.ts → footer):
// - GP0: rodapé original "Gente Preta" (4 colunas fixas), intacto.
// - PP1: 3 colunas (marca+slogan / Links / Redes Sociais) + newsletter,
//   fundo verde-escuro — fiel ao mockup de referência nº1.
// - PP2: topo (marca+slogan+social) + barra inferior com links separados
//   por "|" e citação em itálico, fundo creme claro — fiel ao mockup nº2.
export default function Footer() {
  const { brand, variantId, localeId } = useAppearance();

  if (variantId === 'pp1' || variantId === 'pp2') {
    const content = getVariantContent(variantId, localeId);
    if (content) {
      return variantId === 'pp1' ? (
        <Pp1Footer content={content} brandName={brand.name} />
      ) : (
        <Pp2Footer content={content} brandName={brand.name} />
      );
    }
  }

  return <GenteFooter brandName={brand.name} />;
}

// ---------------------------------------------------------------------------
// GP0 — Footer original "Gente Preta" (intacto)
// ---------------------------------------------------------------------------
function GenteFooter({ brandName }: { brandName: string }) {
  return (
    <footer className="bg-earth-900 text-earth-100 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <div>
          <div className="flex items-center gap-2 font-bold text-base mb-3 text-white">
            <Logo size={32} monochrome />
            <span className="font-editorial italic">{brandName}</span>
          </div>
          <p className="text-earth-300">
            Plataforma de inteligência comunitária para equidade em saúde da população negra.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Navegue</h4>
          <ul className="space-y-2 text-earth-300">
            <li><Link to="/saude" className="hover:text-white">Biblioteca de Saúde</Link></li>
            <li><Link to="/ensaios-clinicos" className="hover:text-white">Ensaios Clínicos</Link></li>
            <li><Link to="/memoria" className="hover:text-white">Memória e Herança</Link></li>
            <li><Link to="/comunidade" className="hover:text-white">Comunidade</Link></li>
            <li><Link to="/rede-sus" className="hover:text-white">Rede SUS</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Instituição</h4>
          <ul className="space-y-2 text-earth-300">
            <li><Link to="/sobre" className="hover:text-white">Sobre o Projeto</Link></li>
            <li><Link to="/noticias" className="hover:text-white">Notícias</Link></li>
            <li><Link to="/transparencia" className="hover:text-white">Transparência e Governança</Link></li>
            <li><Link to="/arquitetura" className="hover:text-white">Relatório de Arquitetura</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">App Sentinela</h4>
          <p className="text-earth-300 mb-3">Escaneie o QR Code ou acesse pelo navegador do celular.</p>
          <div className="flex items-center gap-3 mb-3">
            <QRLink size={72} compact />
            <Link to="/baixar" className="inline-block rounded-md bg-brand-600 text-white px-4 py-2 font-medium hover:bg-brand-700 text-sm">
              Baixar / Acessar App
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-earth-800 py-4 text-center text-xs text-earth-400">
        © {new Date().getFullYear()} {brandName} — AECID · SEJUS/DF · APRECIA · FEPECS · CUFA/DF · ABRADFAL · CASIO V2 Studio
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// PP1 — fundo verde-escuro, 3 colunas (marca / Links / Redes Sociais) +
// bloco de newsletter "Receba novidades" com input de e-mail.
// ---------------------------------------------------------------------------
function Pp1Footer({ content, brandName }: { content: PulsoVariantContent; brandName: string }) {
  const f = content.footer;
  const { t } = useAppearance();
  return (
    <footer id="fale-conosco" className="bg-pulso-verde text-pulso-creme mt-24 scroll-mt-24 font-pulso-body">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <div>
          <div className="flex items-center gap-2 font-bold text-base mb-2 text-pulso-creme">
            <Logo size={34} monochrome />
            <span className="flex items-center gap-1.5">
              {brandName}
              <HeartbeatLine width={26} height={10} color="#D4A84B" />
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-wider text-pulso-dourado/90 mb-3">{content.header.tagline}</p>
          <p className="text-pulso-creme/80">{f.slogan}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-pulso-dourado uppercase text-xs tracking-wide">{f.linksHeading}</h4>
          <ul className="space-y-2 text-pulso-creme/85">
            {f.linksItems?.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-pulso-dourado transition-colors">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

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

// ---------------------------------------------------------------------------
// PP2 — fundo creme claro, topo (marca+slogan+social) + barra inferior com
// links separados por "|" e citação em itálico, fiel ao mockup nº2.
// ---------------------------------------------------------------------------
function Pp2Footer({ content, brandName }: { content: PulsoVariantContent; brandName: string }) {
  const f = content.footer;
  const { t } = useAppearance();
  return (
    <footer id="fale-conosco" className="bg-pulso-creme text-pulso-marrom mt-24 border-t border-pulso-dourado/30 scroll-mt-24 font-pulso-body">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 font-bold text-base mb-1 text-pulso-verde">
            <Logo size={34} />
            <span className="flex items-center gap-1.5">
              {brandName}
              <HeartbeatLine width={26} height={10} color="#8F4B21" />
            </span>
          </div>
          <p className="text-sm text-pulso-marrom/70">{f.slogan}</p>
        </div>
        <div className="flex gap-3">
          <SocialIcon kind="instagram" tone="terracota" />
          <SocialIcon kind="facebook" tone="terracota" />
          <SocialIcon kind="youtube" tone="terracota" />
          <SocialIcon kind="linkedin" tone="terracota" />
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-pulso-dourado/30 bg-white px-4 py-3">
          <QRLink size={64} compact />
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-pulso-verde">{t('app.download.cta')}</p>
            <p className="text-[11px] text-pulso-marrom/60 max-w-[160px]">{t('app.download.caption')}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-pulso-dourado/30 max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <p className="text-pulso-marrom/70">
          {f.bottomLinks?.map((item, i) => (
            <span key={item.to}>
              {i > 0 && <span className="mx-2 text-pulso-dourado">|</span>}
              <Link to={item.to} className="hover:text-pulso-terracota transition-colors">{item.label}</Link>
            </span>
          ))}
        </p>
        <p className="italic text-pulso-marrom/60">&ldquo;{f.bottomQuote}&rdquo;</p>
      </div>
    </footer>
  );
}

function SocialIcon({ kind, tone = 'dourado' }: { kind: 'instagram' | 'facebook' | 'youtube' | 'linkedin'; tone?: 'dourado' | 'terracota' }) {
  const color = tone === 'terracota' ? '#8F4B21' : '#D4A84B';
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', 'aria-hidden': true as const, fill: 'none', stroke: color, strokeWidth: 1.8 };
  const wrapClass =
    tone === 'terracota'
      ? 'rounded-full border border-pulso-marrom/20 p-2 hover:bg-pulso-terracota/10 transition-colors'
      : 'rounded-full border border-pulso-creme/25 p-2 hover:bg-pulso-creme/10 transition-colors';
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
