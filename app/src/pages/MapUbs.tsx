import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { healthUnits, regionalHospitals, emergencyUnits, cepavUnits } from '@shared/data/project';
import { useAppStore } from '../store/useAppStore';
import { HealthLayout } from '../components/HealthComponents';
import { citizenText, orderUnits, normalize } from '../lib/healthPresentation';

type Unit = { id: string; name: string; type: string; address: string; phone?: string; hours?: string; lat?: number; lng?: number };
const units: Unit[] = [
  ...healthUnits.map(unit => ({ id: unit.id, name: unit.name.replace(/^UBS\b/, 'Unidade Básica de Saúde'), type: 'Unidade Básica de Saúde', address: `${unit.endereco}, ${unit.ra}, Distrito Federal` })),
  ...regionalHospitals.map(unit => ({ id: unit.id, name: unit.nome, type: 'Hospital', address: `${unit.endereco}, Distrito Federal`, phone: unit.telefone,
    hours: unit.servicos.find(service => /24h/i.test(service)), lat: unit.lat, lng: unit.lng })),
  ...emergencyUnits.map(unit => ({ id: unit.id, name: unit.nome.replace(/^UPA\b/, 'Unidade de Pronto Atendimento'), type: 'Pronto atendimento', address: `${unit.endereco}, ${unit.ra}, Distrito Federal` })),
  ...cepavUnits.map(unit => ({ id: unit.id, name: unit.nome.replace(/^CEPAV\b/, 'Centro de atendimento a pessoas em situação de violência'), type: 'Apoio à violência', address: `${unit.endereco}, Distrito Federal`, phone: unit.telefone })),
];
export default function MapUbs() {
  const [params] = useSearchParams();
  const consent = useAppStore(state => state.consent.level4_geolocation);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('Unidade Básica de Saúde');
  const [location, setLocation] = useState<{ lat: number; lng: number }>();
  const [locationMessage, setLocationMessage] = useState('');
  const [locating, setLocating] = useState(false);
  useEffect(() => { if (!consent) setLocation(undefined); }, [consent]);
  function locate() {
    if (!consent || !navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(position => {
      setLocation({ lat: position.coords.latitude, lng: position.coords.longitude }); setLocationMessage('Localização obtida. Distâncias em linha reta, quando disponíveis.'); setLocating(false);
    }, () => { setLocationMessage('Não foi possível obter sua localização. Você pode buscar pelo nome ou região.'); setLocating(false); }, { timeout: 8000, maximumAge: 0 });
  }
  const shown = orderUnits(units.filter(unit => unit.type === type && normalize(`${unit.name} ${unit.address}`).includes(normalize(search))), consent ? location : undefined);
  return <HealthLayout back="/saude">
    <div className="health-stack" data-screen="S4">
      <h2>Onde me atender</h2>
      {params.get('condicao') && <p>Busca iniciada a partir de uma condição. A rede abaixo é geral: a relação entre condição e serviço ainda precisa ser validada.</p>}
      <label>Buscar unidade ou região<input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Nome da unidade ou região" /></label>
      <label>Tipo de unidade<select value={type} onChange={event => setType(event.target.value)}>
        {['Unidade Básica de Saúde', 'Hospital', 'Pronto atendimento', 'Apoio à violência'].map(label => <option key={label}>{label}</option>)}
      </select></label>
      {consent ? <button type="button" onClick={locate} disabled={locating || !navigator.geolocation}>{locating ? 'Buscando localização…' : 'Usar minha localização'}</button>
        : <p>Para calcular distâncias, autorize a geolocalização no <Link to="/perfil">Perfil</Link>. Você pode consultar a lista sem autorizar.</p>}
      {locationMessage && <p role="status">{locationMessage}</p>}
      <p>Fonte: <a href="https://info.saude.df.gov.br/busca-saude-ubs/" target="_blank" rel="noopener noreferrer">Secretaria de Saúde do Distrito Federal — Busca Saúde</a>. Exibimos até 10 resultados. Unidades sem coordenadas não têm distância calculada e aparecem em ordem alfabética, após as unidades com distância conhecida.</p>
      {shown.length === 0 && <section role="status" className="health-state"><p>Nenhum serviço encontrado. Tente outra região ou tipo de unidade.</p><button type="button" onClick={() => setSearch('')}>Limpar busca</button></section>}
      <ol className="health-stack health-services" aria-label="Serviços de saúde">
        {shown.map(unit => <li key={unit.id} className="health-panel">
          <h3>{citizenText(unit.name)}</h3><p>{unit.type}</p><p>{unit.address}</p>
          <p>{unit.distance == null ? 'Distância indisponível' : `${unit.distance.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} km em linha reta`}</p>
          <p>Horário: {unit.hours ? `${unit.hours}. Confirme os demais serviços antes de ir.` : 'não informado na base. Confirme antes de ir.'}</p>
          <div className="health-filters">
            {unit.phone ? <a href={`tel:+55${unit.phone.split('/')[0].replace(/\D/g, '')}`} aria-label={`Ligar para ${unit.name}`}>Ligar</a> : <button type="button" disabled>Ligar indisponível</button>}
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(unit.lat != null && unit.lng != null ? `${unit.lat},${unit.lng}` : `${unit.name}, ${unit.address}`)}`} target="_blank" rel="noopener noreferrer" aria-label={`Ver rota para ${unit.name}, abre mapa externo`}>Rota</a>
          </div>
        </li>)}
      </ol>
      <section className="health-panel"><h2>Antes de ir</h2><ul><li>Documento com foto.</li><li>Cartão do Sistema Único de Saúde (SUS).</li><li>Lista de remédios em uso.</li></ul></section>
    </div>
  </HealthLayout>;
}
