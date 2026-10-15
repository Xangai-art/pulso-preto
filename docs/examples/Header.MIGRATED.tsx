/**
 * EXEMPLO DE MIGRAÇÃO: Header.tsx
 * 
 * ANTES: Hardcoded "Gente Preta" na linha 39
 * DEPOIS: Consome Brand Canon via project-adapter
 * 
 * DIFF:
 * - import { projectInfo } from '@/data/project';  ❌ REMOVIDO
 * + import { projectInfo } from '@shared/data/project-adapter';  ✅ ADICIONADO
 * 
 * - <span className="...">Gente Preta</span>  ❌ HARDCODED
 * + <span className="...">{projectInfo.name}</span>  ✅ DINÂMICO
 * 
 * RESULTADO:
 * - Mudar CURRENT_BRAND_VERSION em brand-canon.ts → Header mostra novo nome
 * - Zero risco de esquecer atualizar este arquivo
 * - Funciona para site/ e app/ sem duplicação
 */

import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';
import { projectInfo } from '@shared/data/project-adapter'; // ← NOVO IMPORT

// Menu reorganizado (pacote v4.3, 17/08/2026): 3 links primários + 2 grupos em
// dropdown (Saberes / Instituição), recuperado nesta sessão.
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
    { to: '/transparencia', label: 'Transparência' },
    { to: '/arquitetura', label: 'Relatório de Arquitetura' },
  ],
};

const allMobileItems = [...primaryNavItems, ...saberesGroup.items, ...instituicaoGroup.items];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-palha-100/95 backdrop-blur border-b border-earth-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-earth-900 text-lg shrink-0">
          <Logo size={36} />
          {/* 
            ✅ MIGRADO: Agora consome Brand Canon
            
            ANTES: <span className="hidden sm:inline font-editorial italic">Gente Preta</span>
            DEPOIS: <span className="hidden sm:inline font-editorial italic">{projectInfo.name}</span>
            
            BENEFÍCIO:
            - Trocar CURRENT_BRAND_VERSION = 'pulso-preto-v1' → Header mostra "Pulso Preto"
            - Trocar CURRENT_BRAND_VERSION = 'gente-preta-v1' → Header mostra "Gente Preta"
            - A/B testing nativo (feature flag muda versionId)
          */}
          <span className="hidden sm:inline font-editorial italic">{projectInfo.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-sm">
          {primaryNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-medium transition-colors border-b-2 ${
                  isActive
                    ? 'border-brasa-500 text-earth-900'
                    : 'border-transparent text-earth-700 hover:bg-palha-200'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Dropdown: Saberes */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('saberes')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="px-3 py-2 rounded-md font-medium text-earth-700 hover:bg-palha-200 transition-colors flex items-center gap-1">
              {saberesGroup.label}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown === 'saberes' && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-earth-100 rounded-md shadow-lg min-w-[220px] py-1">
                {saberesGroup.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm transition-colors ${
                        isActive ? 'bg-brasa-50 text-brasa-700 font-medium' : 'text-earth-700 hover:bg-palha-50'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown: Instituição */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('instituicao')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="px-3 py-2 rounded-md font-medium text-earth-700 hover:bg-palha-200 transition-colors flex items-center gap-1">
              {instituicaoGroup.label}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown === 'instituicao' && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-earth-100 rounded-md shadow-lg min-w-[220px] py-1">
                {instituicaoGroup.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm transition-colors ${
                        isActive ? 'bg-brasa-50 text-brasa-700 font-medium' : 'text-earth-700 hover:bg-palha-50'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/baixar-app"
            className="ml-2 px-4 py-2 bg-brasa-500 text-white rounded-md font-medium hover:bg-brasa-600 transition-colors"
          >
            Baixar App
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-earth-700 hover:bg-palha-200 rounded-md"
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-earth-100 bg-white">
          <nav className="px-4 py-2 space-y-1">
            {allMobileItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? 'bg-brasa-50 text-brasa-700' : 'text-earth-700 hover:bg-palha-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/baixar-app"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 bg-brasa-500 text-white rounded-md text-sm font-medium hover:bg-brasa-600 transition-colors mt-2"
            >
              Baixar App
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
