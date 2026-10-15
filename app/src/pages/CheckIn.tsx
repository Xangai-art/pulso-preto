import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { useAppearance } from '@shared/context/AppearanceContext';
import TopBar from '../components/TopBar';

const symptomOptions = [
  'Tosse', 'Febre', 'Falta de ar', 'Dor de cabeça', 'Fadiga', 'Dor no corpo', 'Ansiedade', 'Nenhum sintoma',
];

const rotatingQuestions = [
  'Como está sua qualidade de sono nos últimos 7 dias?',
  'Você conseguiu se alimentar de forma regular esta semana?',
  'Como você avalia seu bem-estar emocional hoje?',
  'Você usou redes sociais por mais de 4h hoje?',
];

// Tema Pulso Preto (PP1/PP2): mesma lógica de isPulso das demais páginas do app.
export default function CheckIn() {
  const navigate = useNavigate();
  const addCheckIn = useAppStore((s) => s.addCheckIn);
  const { variantId } = useAppearance();
  const isPulso = variantId === 'pp1' || variantId === 'pp2';
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [medicationAdherence, setMedicationAdherence] = useState<'sim' | 'parcial' | 'nao' | 'na'>('na');
  const [accessDifficulty, setAccessDifficulty] = useState<boolean | null>(null);
  const [accessDetails, setAccessDetails] = useState('');
  const [rotatingAnswer, setRotatingAnswer] = useState('');
  const [done, setDone] = useState(false);

  const question = rotatingQuestions[new Date().getDate() % rotatingQuestions.length];

  function toggleSymptom(s: string) {
    setSymptoms((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));
  }

  function submit() {
    addCheckIn({
      symptoms,
      medicationAdherence,
      accessDifficulty: accessDifficulty ?? false,
      accessDetails,
      rotatingAnswer,
    });
    setDone(true);
  }

  if (done) {
    return (
      <div className={isPulso ? 'min-h-screen bg-pulso-creme font-pulso-body' : undefined}>
        <TopBar title="Check-in" showBack />
        <div className="px-5 pt-16 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className={`font-bold text-lg mb-2 ${isPulso ? 'text-pulso-verde font-pulso-display' : 'text-earth-900'}`}>
            Check-in enviado!
          </h2>
          <p className={`text-sm mb-8 ${isPulso ? 'text-pulso-marrom/75' : 'text-earth-600'}`}>
            Obrigado por contribuir com a vigilância comunitária. Seus dados ajudam a detectar padrões de saúde
            na sua região, com total transparência.
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
      <TopBar title="Check-in rápido" showBack />
      <div className="px-5 pt-4 pb-8 space-y-6">
        <div>
          <h2 className={`font-bold text-sm mb-3 ${isPulso ? 'text-pulso-verde font-pulso-display' : 'text-earth-900'}`}>
            Você sentiu algum destes sintomas hoje?
          </h2>
          <div className="flex flex-wrap gap-2">
            {symptomOptions.map((s) => (
              <button
                key={s}
                onClick={() => toggleSymptom(s)}
                className={
                  isPulso
                    ? `rounded-full px-3 py-1.5 text-xs font-medium border ${
                        symptoms.includes(s) ? 'bg-pulso-verde text-pulso-creme border-pulso-verde' : 'bg-white border-pulso-dourado/30 text-pulso-marrom'
                      }`
                    : `rounded-full px-3 py-1.5 text-xs font-medium border ${
                        symptoms.includes(s) ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-earth-200 text-earth-700'
                      }`
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className={`font-bold text-sm mb-3 ${isPulso ? 'text-pulso-verde font-pulso-display' : 'text-earth-900'}`}>
            Você tomou sua medicação conforme prescrito?
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {(['sim', 'parcial', 'nao', 'na'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setMedicationAdherence(v)}
                className={
                  isPulso
                    ? `rounded-lg py-2 text-xs font-semibold border ${
                        medicationAdherence === v ? 'bg-pulso-verde text-pulso-creme border-pulso-verde' : 'bg-white border-pulso-dourado/30 text-pulso-marrom'
                      }`
                    : `rounded-lg py-2 text-xs font-semibold border ${
                        medicationAdherence === v ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-earth-200 text-earth-700'
                      }`
                }
              >
                {v === 'na' ? 'N/A' : v}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className={`font-bold text-sm mb-3 ${isPulso ? 'text-pulso-verde font-pulso-display' : 'text-earth-900'}`}>
            Teve dificuldade de acesso a atendimento hoje?
          </h2>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => setAccessDifficulty(true)}
              className={
                isPulso
                  ? `rounded-lg py-2 text-xs font-semibold border ${
                      accessDifficulty === true ? 'bg-pulso-verde text-pulso-creme border-pulso-verde' : 'bg-white border-pulso-dourado/30 text-pulso-marrom'
                    }`
                  : `rounded-lg py-2 text-xs font-semibold border ${
                      accessDifficulty === true ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-earth-200 text-earth-700'
                    }`
              }
            >
              Sim
            </button>
            <button
              onClick={() => setAccessDifficulty(false)}
              className={
                isPulso
                  ? `rounded-lg py-2 text-xs font-semibold border ${
                      accessDifficulty === false ? 'bg-pulso-verde text-pulso-creme border-pulso-verde' : 'bg-white border-pulso-dourado/30 text-pulso-marrom'
                    }`
                  : `rounded-lg py-2 text-xs font-semibold border ${
                      accessDifficulty === false ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-earth-200 text-earth-700'
                    }`
              }
            >
              Não
            </button>
          </div>
          {accessDifficulty && (
            <textarea
              value={accessDetails}
              onChange={(e) => setAccessDetails(e.target.value)}
              rows={2}
              placeholder="Descreva brevemente (opcional)..."
              className={
                isPulso
                  ? 'w-full rounded-lg border border-pulso-dourado/30 p-3 text-sm'
                  : 'w-full rounded-lg border border-earth-200 p-3 text-sm'
              }
            />
          )}
        </div>

        <div>
          <h2 className={`font-bold text-sm mb-2 ${isPulso ? 'text-pulso-verde font-pulso-display' : 'text-earth-900'}`}>
            {question}
          </h2>
          <textarea
            value={rotatingAnswer}
            onChange={(e) => setRotatingAnswer(e.target.value)}
            rows={2}
            placeholder="Sua resposta (opcional)..."
            className={
              isPulso
                ? 'w-full rounded-lg border border-pulso-dourado/30 p-3 text-sm'
                : 'w-full rounded-lg border border-earth-200 p-3 text-sm'
            }
          />
        </div>

        <button
          onClick={submit}
          className={
            isPulso
              ? 'w-full rounded-xl bg-pulso-dourado text-pulso-verde font-bold py-3.5'
              : 'w-full rounded-xl bg-brand-600 text-white font-semibold py-3.5'
          }
        >
          Enviar check-in
        </button>
      </div>
    </div>
  );
}
