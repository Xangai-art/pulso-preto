import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
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

// Tema único de produção: Pulso Preto (PP3). Tokens `pulso-*` diretos.
export default function CheckIn() {
  const navigate = useNavigate();
  const addCheckIn = useAppStore((s) => s.addCheckIn);
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
      <div className="min-h-screen bg-pulso-creme font-pulso-body">
        <TopBar title="Check-in" showBack />
        <div className="px-5 pt-16 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="font-bold text-lg mb-2 text-pulso-verde font-pulso-display">
            Check-in enviado!
          </h2>
          <p className="text-sm mb-8 text-pulso-marrom/75">
            Obrigado por contribuir com a vigilância comunitária. Seus dados ajudam a detectar padrões de saúde
            na sua região, com total transparência.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full rounded-xl bg-pulso-verde text-pulso-creme font-semibold py-3"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pulso-creme font-pulso-body">
      <TopBar title="Check-in rápido" showBack />
      <div className="px-5 pt-4 pb-8 space-y-6">
        <div>
          <h2 className="font-bold text-sm mb-3 text-pulso-verde font-pulso-display">
            Você sentiu algum destes sintomas hoje?
          </h2>
          <div className="flex flex-wrap gap-2">
            {symptomOptions.map((s) => (
              <button
                key={s}
                onClick={() => toggleSymptom(s)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium border ${
                  symptoms.includes(s) ? 'bg-pulso-verde text-pulso-creme border-pulso-verde' : 'bg-white border-pulso-dourado/30 text-pulso-marrom'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-sm mb-3 text-pulso-verde font-pulso-display">
            Você tomou sua medicação conforme prescrito?
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {(['sim', 'parcial', 'nao', 'na'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setMedicationAdherence(v)}
                className={`rounded-lg py-2 text-xs font-semibold border ${
                  medicationAdherence === v ? 'bg-pulso-verde text-pulso-creme border-pulso-verde' : 'bg-white border-pulso-dourado/30 text-pulso-marrom'
                }`}
              >
                {v === 'na' ? 'N/A' : v}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-sm mb-3 text-pulso-verde font-pulso-display">
            Teve dificuldade de acesso a atendimento hoje?
          </h2>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => setAccessDifficulty(true)}
              className={`rounded-lg py-2 text-xs font-semibold border ${
                accessDifficulty === true ? 'bg-pulso-verde text-pulso-creme border-pulso-verde' : 'bg-white border-pulso-dourado/30 text-pulso-marrom'
              }`}
            >
              Sim
            </button>
            <button
              onClick={() => setAccessDifficulty(false)}
              className={`rounded-lg py-2 text-xs font-semibold border ${
                accessDifficulty === false ? 'bg-pulso-verde text-pulso-creme border-pulso-verde' : 'bg-white border-pulso-dourado/30 text-pulso-marrom'
              }`}
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
              className="w-full rounded-lg border border-pulso-dourado/30 p-3 text-sm"
            />
          )}
        </div>

        <div>
          <h2 className="font-bold text-sm mb-2 text-pulso-verde font-pulso-display">
            {question}
          </h2>
          <textarea
            value={rotatingAnswer}
            onChange={(e) => setRotatingAnswer(e.target.value)}
            rows={2}
            placeholder="Sua resposta (opcional)..."
            className="w-full rounded-lg border border-pulso-dourado/30 p-3 text-sm"
          />
        </div>

        <button
          onClick={submit}
          className="w-full rounded-xl bg-pulso-dourado text-pulso-verde font-bold py-3.5"
        >
          Enviar check-in
        </button>
      </div>
    </div>
  );
}
