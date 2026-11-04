import { useHealthText } from '../lib/healthI18n';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { healthServices, dataStatus, phoneHref } from '@shared/data/healthServices';
import { useAppStore } from '../store/useAppStore';
import { ClinicalText, HealthLayout } from '../components/HealthComponents';
import { orderUnits, normalize } from '../lib/healthPresentation';
import { healthContent } from '../lib/healthContent';

const types: Record<string, string> = { ubs: 'Unidade Básica de Saúde', hospital: 'Hospital', upa: 'Pronto atendimento', apoio_violencia: 'Apoio à violência' };
export default function MapUbs() {
  const [params] = useSearchParams();
  const { t, localeId } = useHealthText();
  const consent = useAppStore(state => state.consent.level4_geolocation);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number }>();
  const [locationMessage, setLocationMessage] = useState('');
  const [locating, setLocating] = useState(false);
  useEffect(() => { if (!consent) setLocation(undefined); }, [consent]);
  function locate() {
    if (!consent || !navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(position => {
      setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
      setLocationMessage('Localização obtida. Distâncias em linha reta, quando disponíveis.'); setLocating(false);
    }, () => { setLocationMessage('Não foi possível obter sua localização. Você pode buscar pelo nome ou região.'); setLocating(false); }, { timeout: 8000, maximumAge: 0 });
  }
  // condicao never participates in filtering, clinical referral or storage.
  const shown = orderUnits(healthServices.filter(unit => (!type || unit.tipo === type) && normalize(`${unit.nome} ${unit.endereco.logradouro} ${unit.endereco.bairro ?? ''}`).includes(normalize(search)))
    .map(unit => ({ ...unit, name: unit.nome, lat: unit.geo.lat, lng: unit.geo.lng })), consent ? location : undefined).slice(0, params.get('limite') === '3' ? 3 : 10);
  return <HealthLayout back="/saude">
    <div className="health-stack" data-screen="S4">
      <h2>{t('Serviços de saúde')}</h2>
      <p data-network-disclaimer>{t(healthContent.servicos.aviso)}</p>
      <label>{t('Buscar unidade ou região')}<input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder={t('Nome da unidade ou região')} /></label>
      <label>{t('Tipo de unidade')}<select value={type} onChange={event => setType(event.target.value)}>
        <option value="">{t('Todos os serviços')}</option>{Object.entries(types).map(([id, label]) => <option key={id} value={id}>{t(label)}</option>)}
      </select></label>
      {consent ? <button type="button" onClick={locate} disabled={locating || !navigator.geolocation}>{t(locating ? 'Buscando localização…' : 'Usar minha localização')}</button>
        : <p>{t('Autorize a localização no Perfil.')} <Link to="/perfil">{t('Perfil')}</Link></p>}
      {!location && <p>{t('Ative a localização para ver a distância. A lista segue ordem alfabética.')}</p>}
      {locationMessage && <p role="status">{t(locationMessage)}</p>}
      <p>{t('Exibimos até 10 resultados. Distâncias em linha reta.')}</p>
      <p role="status" aria-live="polite">{shown.length} {t('Serviços de saúde')}</p>
      {shown.length === 0 && <section role="status" className="health-state"><p>{t('Nenhum serviço encontrado. Tente outra região ou tipo de unidade.')}</p><button type="button" onClick={() => setSearch('')}>{t('Limpar busca')}</button></section>}
      <ol className="health-stack health-services" aria-label={t('Serviços de saúde')}>
        {shown.map(unit => <li key={unit.id} data-service-id={unit.id} className="health-panel">
          <h3 lang="pt-BR">{unit.nome}</h3><p>{t(types[unit.tipo])}</p><p lang="pt-BR">{unit.endereco.logradouro}{unit.endereco.bairro ? `, ${unit.endereco.bairro}` : ''}</p>
          {dataStatus(unit) !== 'validado' && <p>{t(dataStatus(unit) === 'desatualizado' ? 'Dados desatualizados — confirme na unidade.' : healthContent.servicos.fallbacks.pendente)}</p>}
          <p>{unit.distance == null ? t(healthContent.servicos.fallbacks.distancia) : `${unit.distance.toLocaleString(localeId === 'es' ? 'es' : 'pt-BR', { maximumFractionDigits: 1 })} ${t('km em linha reta')}`}</p>
          <p>{unit.horario.is24h && unit.horario.escopo === 'setor' ? t(healthContent.servicos.horario_24h) : unit.horario.descricao ?? t(healthContent.servicos.fallbacks.horario)}</p>
          {unit.telefones.length ? <p lang="pt-BR">{unit.telefones.join(' / ')}</p> : <p>{t(healthContent.servicos.fallbacks.telefone)}</p>}
          <div className="health-filters">
            {phoneHref(unit.telefones[0]) && <a href={phoneHref(unit.telefones[0])} aria-label={`${t('Ligar')} — ${unit.nome}`}>{t('Ligar')}</a>}
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(unit.lat != null && unit.lng != null ? `${unit.lat},${unit.lng}` : `${unit.nome}, ${unit.endereco.logradouro}, Distrito Federal`)}`} target="_blank" rel="noopener noreferrer">{t('Como chegar')}</a>
            <a href={unit.fonte.url} target="_blank" rel="noopener noreferrer">{t('Ver fonte')}</a>
          </div>
        </li>)}
      </ol>
      <section className="health-panel"><h2>{t('Antes de ir')}</h2><p><ClinicalText text={t(healthContent.servicos.antes_de_ir.texto)} /></p></section>
    </div>
  </HealthLayout>;
}
