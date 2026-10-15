import { NavLink } from 'react-router-dom';
import { useAppearance } from '@shared/context/AppearanceContext';

const items = [
  { to: '/', label: 'Início', icon: '🏠' },
  { to: '/checkin', label: 'Check-in', icon: '✅' },
  { to: '/saude', label: 'Saúde', icon: '📚', pulsoIcon: '/static/brand/elementos/icone-livro-ideias.png' },
  { to: '/mapa', label: 'UBS', icon: '📍', pulsoIcon: '/static/brand/elementos/icone-hospital-comunidade.png' },
  { to: '/radar', label: 'Radar', icon: '📡', pulsoIcon: '/static/brand/elementos/icone-coracao-pulsa.png' },
  { to: '/perfil', label: 'Perfil', icon: '👤' },
];

// Tema Pulso Preto (PP1/PP2): mesma lógica de propagação de marca da TopBar
// (ver TopBar.tsx) — fundo creme/dourado em vez do branco/earth padrão GP0.
export default function BottomNav() {
  const { variantId } = useAppearance();
  const isPulso = variantId === 'pp1' || variantId === 'pp2';

  return (
    <nav
      className={
        isPulso
          ? 'fixed bottom-0 left-0 right-0 bg-pulso-creme border-t border-pulso-dourado/40 flex justify-between px-1 py-1.5 z-40 max-w-md mx-auto font-pulso-body'
          : 'fixed bottom-0 left-0 right-0 bg-white border-t border-earth-200 flex justify-between px-1 py-1.5 z-40 max-w-md mx-auto'
      }
    >
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            isPulso
              ? `flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-lg text-[10px] font-medium ${
                  isActive ? 'text-pulso-verde bg-pulso-dourado/15' : 'text-pulso-marrom/70'
                }`
              : `flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-lg text-[10px] font-medium ${
                  isActive ? 'text-brand-600 bg-brand-50' : 'text-earth-500'
                }`
          }
        >
          {isPulso && item.pulsoIcon ? (
            <img src={item.pulsoIcon} alt="" className="w-4 h-4 object-contain" />
          ) : (
            <span className="text-base">{item.icon}</span>
          )}
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
