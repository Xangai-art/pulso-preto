import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { healthUnits } from '../data/project';
import { useAppearance } from '@shared/context/AppearanceContext';
import TopBar from '../components/TopBar';

// Tema Pulso Preto (PP1/PP2): mesma lógica de isPulso das demais páginas do app.
export default function ReportDiscrimination() {
  const navigate = useNavigate();
  const addReport = useAppStore((s) => s.addReport);
  const { variantId } = useAppearance();
  const isPulso = variantId === 'pp1' || variantId === 'pp2';
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [wantsFollowUp, setWantsFollowUp] = useState(true);
  const [done, setDone] = useState(false);

  function submit() {
    addReport({ location, description, wantsFollowUp });
    setDone(true);
  }

  if (done) {
    return (
      <div className={isPulso ? 'min-h-screen bg-pulso-creme font-pulso-body' : undefined}>
        <TopBar title="Direito à Saúde" showBack />
        <div className="px-5 pt-16 text-center">
          {isPulso ? (
            <img
              src="/static/brand/elementos/icone-mao-balanca.png"
              alt=""
              className="w-16 h-16 object-contain mx-auto mb-4"
            />
          ) : (
            <div className="text-5xl mb-4">⚖️</div>
          )}
          <h2 className={`font-bold text-lg mb-2 ${isPulso ? 'text-pulso-verde font-pulso-display' : 'text-earth-900'}`}>
            Relato registrado
          </h2>
          <p className={`text-sm mb-8 ${isPulso ? 'text-pulso-marrom/75' : 'text-earth-600'}`}>
            {wantsFollowUp
              ? 'Seu relato foi encaminhado com consentimento para acompanhamento institucional.'
              : 'Seu relato foi registrado de forma anônima e contribui para os dados agregados de discriminação institucional por UBS.'}
          </p>
          <button
            onClick={() => navigate('/')}
            className={
              isPulso
                ? 'w-full rounded-xl bg-pulso-verde text-pulso-creme font-semibold py-3'
                : 'w-full rounded-xl bg-brand-600 text-white font-semibold py-3'
            }
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={isPulso ? 'min-h-screen bg-pulso-creme font-pulso-body' : undefined}>
      <TopBar title="Direito à Saúde" showBack />
      <div className="px-5 pt-4 pb-8 space-y-5">
        <p className={`text-sm ${isPulso ? 'text-pulso-marrom/80' : 'text-earth-600'}`}>
          Sofreu discriminação em um atendimento de saúde? Seu relato ajuda a identificar padrões institucionais
          e pode ser encaminhado para acompanhamento, se você quiser.
        </p>

        <div>
          <label className={`block text-xs font-semibold mb-1.5 ${isPulso ? 'text-pulso-marrom' : 'text-earth-700'}`}>
            Onde aconteceu?
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={
              isPulso
                ? 'w-full rounded-lg border border-pulso-dourado/30 p-3 text-sm bg-white'
                : 'w-full rounded-lg border border-earth-200 p-3 text-sm bg-white'
            }
          >
            <option value="">Selecione a UBS ou local...</option>
            {healthUnits.map((u) => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
            <option value="Outro">Outro local</option>
          </select>
        </div>

        <div>
          <label className={`block text-xs font-semibold mb-1.5 ${isPulso ? 'text-pulso-marrom' : 'text-earth-700'}`}>
            Descreva o que aconteceu
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Conte com suas palavras..."
            className={
              isPulso
                ? 'w-full rounded-lg border border-pulso-dourado/30 p-3 text-sm'
                : 'w-full rounded-lg border border-earth-200 p-3 text-sm'
            }
          />
        </div>

        <label
          className={
            isPulso
              ? 'flex items-start gap-3 rounded-xl border border-pulso-dourado/25 p-4 cursor-pointer'
              : 'flex items-start gap-3 rounded-xl border border-earth-200 p-4 cursor-pointer'
          }
        >
          <input
            type="checkbox"
            checked={wantsFollowUp}
            onChange={(e) => setWantsFollowUp(e.target.checked)}
            className={isPulso ? 'mt-1 h-4 w-4 accent-pulso-verde' : 'mt-1 h-4 w-4 accent-brand-600'}
          />
          <span className={`text-sm ${isPulso ? 'text-pulso-marrom/85' : 'text-earth-700'}`}>
            Quero ser contatado(a) para acompanhamento institucional deste relato.
          </span>
        </label>

        <button
          onClick={submit}
          disabled={!description}
          className={
            isPulso
              ? 'w-full rounded-xl bg-pulso-dourado text-pulso-verde font-bold py-3.5 disabled:opacity-40'
              : 'w-full rounded-xl bg-brand-600 text-white font-semibold py-3.5 disabled:opacity-40'
          }
        >
          Enviar relato
        </button>
      </div>
    </div>
  );
}
