import { Link } from 'react-router-dom';

// Aviso padrão de página "em construção" (decisão 20/10/2026 — /profissionais e
// /formacao publicadas antes do conteúdo final). Sem "placeholder" (D15): o texto
// diz o que a página VAI oferecer e aponta caminhos que já funcionam hoje.
export interface UnderConstructionLink {
  label: string;
  to: string;
  description: string;
}

export default function UnderConstruction({
  icon,
  title,
  intro,
  planned,
  meanwhile,
}: {
  icon: string;
  title: string;
  intro: string;
  planned: string[];
  meanwhile: UnderConstructionLink[];
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center gap-3 mb-4">
        <img src={icon} alt="" aria-hidden="true" className="w-12 h-12 object-contain" />
        <h1 className="text-3xl font-bold text-pulso-verde">{title}</h1>
      </div>

      <div
        role="status"
        className="inline-flex items-center gap-2 rounded-full border border-pulso-dourado/50 bg-pulso-dourado/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-pulso-marrom mb-6"
      >
        <span className="w-2 h-2 rounded-full bg-pulso-dourado" aria-hidden="true" />
        Em construção
      </div>

      <p className="text-pulso-marrom mb-10 max-w-2xl">{intro}</p>

      <section className="rounded-2xl border border-pulso-dourado/25 bg-white p-6 sm:p-8 mb-10">
        <h2 className="font-bold text-pulso-verde mb-4">O que esta página vai oferecer</h2>
        <ul className="space-y-2">
          {planned.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-pulso-marrom">
              <span className="text-pulso-dourado font-bold" aria-hidden="true">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <h2 className="font-bold text-pulso-verde mb-4">Enquanto isso, você pode</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {meanwhile.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="group rounded-xl border border-pulso-dourado/30 bg-pulso-creme p-5 hover:border-pulso-verde-accent hover:shadow-md transition"
          >
            <h3 className="font-bold text-pulso-verde mb-1">{l.label}</h3>
            <p className="text-sm text-pulso-marrom/80 leading-snug">{l.description}</p>
            <span className="mt-3 inline-block text-sm font-bold text-pulso-verde-medio group-hover:underline">Acessar →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
