import { NavLink } from 'react-router-dom';

const items = [
  { to: '/', label: 'Início', icon: '🏠' },
  { to: '/checkin', label: 'Check-in', icon: '✅' },
  { to: '/saude', label: 'Saúde', icon: '📚', pulsoIcon: '/static/brand/elementos/icone-livro-ideias.png' },
  { to: '/mapa', label: 'Unidades', icon: '📍', pulsoIcon: '/static/brand/elementos/icone-hospital-comunidade.png' },
  { to: '/radar', label: 'Radar', icon: '📡', pulsoIcon: '/static/brand/elementos/icone-coracao-pulsa.png' },
  { to: '/perfil', label: 'Perfil', icon: '👤' },
];

// BottomNav do App Sentinela — identidade ÚNICA de produção (PP3).
// Fundo creme, ícones oficiais (elementos do pacote de identidade), tipografia
// oficial. HISTÓRICO: ramificava por variante durante o teste CEOS (encerrado).
export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-pulso-creme border-t border-pulso-dourado/40 flex justify-between px-1 py-1.5 z-40 max-w-md mx-auto font-pulso-body">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-lg text-[10px] font-medium ${
              isActive ? 'text-pulso-verde bg-pulso-dourado/15' : 'text-pulso-marrom/70'
            }`
          }
        >
          {item.pulsoIcon ? (
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
