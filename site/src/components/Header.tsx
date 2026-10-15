import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';
import { useAppearance } from '@shared/context/AppearanceContext';
import { getVariantContent } from '@shared/data/variantContent';
import VariantSwitcher from '@shared/components/VariantSwitcher';
import { HeartbeatLine } from './PulsoIcons';

// Menu reorganizado (pacote v4.3, 17/08/2026): 3 links primários + 2 grupos em
// dropdown (Saberes / Instituição) — usado SOMENTE pela variante GP0 (Gente
// Preta original). PP1/PP2 usam nav totalmente diferente, fiel aos mockups de
// referência da marca "Pulso Preto" (ver Header dedicado mais abaixo).
const primaryNavItems = [
  { to: '/', label: 'Início' },
  { to: '/saude', label: 'Biblioteca de Saúde' },
  { to: '/rede-sus', label: 'Rede SUS' },
];

const saberesGroup = {
  label: 'Saberes',
  items: [
    { to: '/medicina-tradicional-brasileira', label: 'Medicina Tradicional Brasileira' },
    { to: '/ensaios-clinicos', label: 'Ensaios Clínicos' },
    { to: '/memoria', label: 'Memória e Herança' },
    { to: '/comunidade', label: 'Comunidade' },
  ],
};

const instituicaoGroup = {
  label: 'Instituição',
  items: [
    { to: '/sobre', label: 'Sobre' },
    { to: '/noticias', label: 'Notícias' },
    { to: '/transparencia', label: 'Transparência' },
    { to: '/arquitetura', label: 'Relatório de Arquitetura' },
  ],
};

const allMobileItems = [...primaryNavItems, ...saberesGroup.items, ...instituicaoGroup.items];

export default function Header() {
  const { brand, variantId, localeId } = useAppearance();

  if (variantId === 'pp1' || variantId === 'pp2') {
    const content = getVariantContent(variantId, localeId);
    if (content) return <PulsoHeader content={content} brandName={brand.name} />;
  }

  return <GenteHeader brandName={brand.name} />;
}

// ---------------------------------------------------------------------------
// GP0 — Header original "Gente Preta" (intacto, preservado pelo Brand Canon)
// ---------------------------------------------------------------------------
function GenteHeader({ brandName }: { brandName: string }) {
  return (
    <header className="sticky top-0 z-50 bg-palha-100/95 backdrop-blur border-b border-earth-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-earth-900 text-lg shrink-0">
          <Logo size={36} />
          <span className="hidden sm:inline font-editorial italic">{brandName}</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-1 text-sm">
          {primaryNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-medium transition-colors border-b-2 ${
                  isActive
                    ? 'border-brasa-500 text-earth-900'
                    : 'border-transparent text-earth-700 hover:border-brasa-300 hover:bg-earth-50'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavDropdown label={saberesGroup.label} items={saberesGroup.items} />
          <NavDropdown label={instituicaoGroup.label} items={instituicaoGroup.items} />
        </nav>
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <VariantSwitcher />
          <NavLink
            to="/baixar"
            className="rounded-md bg-brand-600 text-white px-4 py-2 text-sm font-semibold hover:bg-brand-700 transition-colors"
          >
            Baixe o App
          </NavLink>
        </div>
        <div className="lg:hidden flex items-center gap-2">
          <VariantSwitcher compact />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function NavDropdown({ label, items }: { label: string; items: { to: string; label: string }[] }) {
  return (
    <div className="relative group">
      <button
        type="button"
        className="px-3 py-2 rounded-md font-medium text-sm text-earth-700 hover:bg-earth-50 transition-colors flex items-center gap-1"
        aria-haspopup="true"
      >
        {label}
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className="mt-0.5">
          <path d="M1 3 L5 7 L9 3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>
      <div
        className="invisible group-hover:visible group-focus-within:visible opacity-0 group-hover:opacity-100
                   group-focus-within:opacity-100 transition-opacity absolute left-0 top-full pt-1 w-60"
      >
        <div className="rounded-lg border border-earth-100 bg-white shadow-lg p-2 flex flex-col gap-1">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'bg-brand-50 text-brand-700' : 'text-earth-700 hover:bg-earth-50'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Abrir menu de navegação"
        className="rounded-md border border-earth-200 p-2.5 text-earth-700 hover:bg-earth-50 flex items-center justify-center"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          <rect x="2" y="4" width="16" height="1.8" rx="0.9" fill="currentColor" />
          <rect x="2" y="9.1" width="16" height="1.8" rx="0.9" fill="currentColor" />
          <rect x="2" y="14.2" width="16" height="1.8" rx="0.9" fill="currentColor" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 rounded-lg border border-earth-100 bg-white shadow-lg p-2 flex flex-col gap-1 max-h-[75vh] overflow-y-auto">
          {allMobileItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium text-earth-700 hover:bg-earth-50"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/baixar"
            onClick={() => setOpen(false)}
            className="mt-1 px-3 py-2 rounded-md text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 text-center"
          >
            Baixe o App
          </Link>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PP1 / PP2 — Header "Pulso Preto", fiel aos mockups de referência: logo +
// subtítulo em maiúsculas, nav plana de 6 itens, ícone de busca, CTA sólido.
// Cor do CTA e fundo variam por variante via classes utilitárias Tailwind
// (pulso.verde para PP1/PP2 ambos usam o mesmo header claro com CTA colorido).
// ---------------------------------------------------------------------------
import type { PulsoVariantContent } from '../../../shared/data/variantContent';

function PulsoHeader({ content, brandName }: { content: PulsoVariantContent; brandName: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useAppearance();
  return (
    <header className="sticky top-0 z-50 bg-pulso-creme/95 backdrop-blur border-b border-pulso-dourado/30 font-pulso-body">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <Logo size={38} />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-bold text-pulso-verde text-base tracking-tight flex items-center gap-1.5">
              {brandName}
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
          <VariantSwitcher />
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
          <VariantSwitcher compact />
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
