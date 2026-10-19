import UnderConstruction from '../components/UnderConstruction';

// ENCONTRE UM PROFISSIONAL — hard service com rota própria (D7). Publicada "em
// construção" (20/10/2026) até existir a base de profissionais (pendência P3 —
// Find-a-Doctor: rede pública + privada, filtro de atendimento humanizado).
export default function Professionals() {
  return (
    <UnderConstruction
      icon="/static/brand/elementos/icone-coracao-pulsa.png"
      title="Encontre um profissional"
      intro="Aqui você vai poder encontrar profissionais de saúde com atendimento humanizado e culturalmente competente, na rede pública e na rede privada do Distrito Federal. Estamos montando essa base com cuidado, junto com a rede de parceiros."
      planned={[
        'Busca por especialidade, região administrativa e tipo de atendimento (Sistema Único de Saúde ou rede privada).',
        'Filtro de atendimento humanizado e culturalmente competente para a população negra.',
        'Informações de contato e de acesso de cada profissional ou serviço.',
        'Avaliação da experiência de atendimento pela própria comunidade.',
      ]}
      meanwhile={[
        { label: 'Rede SUS', to: '/rede-sus', description: 'Unidades de saúde do Distrito Federal por região, com endereços e serviços.' },
        { label: 'Ouvidoria', to: '/ouvidoria', description: 'Sofreu discriminação em um atendimento? Relate e conheça seus direitos.' },
        { label: 'Biblioteca de Saúde', to: '/saude', description: 'Informação de saúde com comprovação científica, organizada por tema.' },
      ]}
    />
  );
}
