import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';
import { useAppearance } from '@shared/context/AppearanceContext';
import { getPulsoContent } from '@shared/data/pulsoContent';
import LocaleSwitcher from '@shared/components/LocaleSwitcher';
import { HeartbeatLine } from './PulsoIcons';

// Header "Pulso Preto" — identidade ÚNICA de produção (PP3).
//
// HISTÓRICO: durante o teste da arquitetura CEOS o header ramificava por
// variante (GP0 → header "Gente Preta" com grupos de dropdown; PP1/PP2 →
// header "Pulso Preto" plano). Esse teste foi encerrado. Em PP3 existe apenas
// este header, fiel à identidade oficial: logo + subtítulo em maiúsculas, nav
// plana, ícone de busca, seletor de idioma e CTA sólido.
export default function Header() {
  const { brand, localeId } = useAppearance();
  const content = getPulsoContent(localeId);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useAppearance();

  return (
    <header className="sticky top-0 z-50 bg-pulso-creme/95 backdrop-blur border-b border-pulso-dourado/30 font-pulso-body">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <Logo size={38} />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-bold text-pulso-verde text-base tracking-tight flex items-center gap-1.5">
              {brand.name}
              <HeartbeatLine width={28} height={10} color="#D4A84B" />
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-pulso-marrom/70">
              {content.header.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm">
          {content.header.navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-medium transition-colors ${
                  isActive ? 'text-pulso-verde font-bold' : 'text-pulso-marrom hover:text-pulso-verde'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            aria-label={content.header.searchLabel}
            className="ml-1 rounded-md p-2 text-pulso-marrom hover:text-pulso-verde hover:bg-pulso-dourado/10 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M12.2 12.2 L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </nav>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <LocaleSwitcher />
          <NavLink
            to="/baixar"
            className="rounded-md border border-pulso-verde text-pulso-verde px-3 py-2 text-xs font-bold uppercase tracking-wide hover:bg-pulso-verde hover:text-pulso-creme transition-colors"
          >
            📱 {t('app.download.cta')}
          </NavLink>
          <NavLink
            to={content.header.ctaTo}
            className="rounded-md bg-pulso-verde text-pulso-creme px-4 py-2 text-sm font-bold uppercase tracking-wide hover:bg-pulso-marrom transition-colors"
          >
            {content.header.ctaLabel}
          </NavLink>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <LocaleSwitcher compact />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Abrir menu de navegação"
            className="rounded-md border border-pulso-dourado/40 p-2.5 text-pulso-verde flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <rect x="2" y="4" width="16" height="1.8" rx="0.9" fill="currentColor" />
              <rect x="2" y="9.1" width="16" height="1.8" rx="0.9" fill="currentColor" />
              <rect x="2" y="14.2" width="16" height="1.8" rx="0.9" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-pulso-dourado/30 bg-pulso-creme px-4 sm:px-6 py-3 flex flex-col gap-1">
          {content.header.navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium text-pulso-marrom hover:bg-pulso-dourado/10"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/baixar"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 rounded-md text-sm font-bold uppercase text-center text-pulso-verde border border-pulso-verde"
          >
            📱 {t('app.download.cta')}
          </Link>
          <Link
            to={content.header.ctaTo}
            onClick={() => setMobileOpen(false)}
            className="mt-1 px-3 py-2 rounded-md text-sm font-bold uppercase text-center text-pulso-creme bg-pulso-verde hover:bg-pulso-marrom"
          >
            {content.header.ctaLabel}
          </Link>
        </div>
      )}
    </header>
  );
}
