import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Navegação por âncora entre rotas (ex.: /sobre#parceiros, /rede-sus#encontre-um-profissional,
// /#fale-conosco). O React Router não rola até o hash por conta própria; sem hash,
// volta ao topo a cada troca de página.
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    const tick = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (tries++ < 20) {
        window.setTimeout(tick, 50);
      }
    };
    tick();
  }, [pathname, hash]);
  return null;
}
