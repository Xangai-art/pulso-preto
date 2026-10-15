import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { priorityThemes } from '../data/diseases';
import { dfAdministrativeRegions, rideEntornoMunicipalities } from '../data/project';
import { fetchAddressByCep, formatCep, isValidCepFormat } from '../lib/viacep';
import { useAppearance } from '@shared/context/AppearanceContext';
import TopBar from '../components/TopBar';

const STEPS = ['perfil', 'saude', 'acesso', 'discriminacao'] as const;

// Tema Pulso Preto (PP1/PP2): isPulso propagado para todos os sub-componentes
// (ProgressBar, Section, Field, Select, GroupedSelect) via useAppearance()
// direto, já que ficam no mesmo módulo — evita precisar de uma prop `pulso`
// repetida em cada chamada.
export default function Baseline() {
  const navigate = useNavigate();
  const saveBaseline = useAppStore((s) => s.saveBaseline);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const { variantId } = useAppearance();
  const isPulso = variantId === 'pp1' || variantId === 'pp2';

  const [step, setStep] = useState(0);
  const [raceColor, setRaceColor] = useState('');
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('');
  const [income, setIncome] = useState('');
  const [ra, setRa] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [cepStatus, setCepStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [cepError, setCepError] = useState('');
  const [conditions, setConditions] = useState<string[]>([]);
  const [usesUbs, setUsesUbs] = useState('');
  const [accessBarriers, setAccessBarriers] = useState('');
  const [discriminationScale, setDiscriminationScale] = useState(0);

  function toggleCondition(id: string) {
    setConditions((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  }

  async function handleCepChange(value: string) {
    const formatted = formatCep(value);
    setCep(formatted);
    setCepStatus('idle');
    setCepError('');

    if (!isValidCepFormat(formatted)) return;

    setCepStatus('loading');
    const result = await fetchAddressByCep(formatted);
    if (result.ok && result.address) {
      setLogradouro(result.address.logradouro);
      setBairro(result.address.bairro);
      setCidade(result.address.localidade);
      setUf(result.address.uf);
      // Se a cidade retornada pelos Correios for uma RA/município já mapeado, pré-seleciona no campo RA.
      const matchedRa = [...dfAdministrativeRegions, ...rideEntornoMunicipalities.map((m) => m.nome)].find(
        (opt) => opt.toLowerCase().includes(result.address!.localidade.toLowerCase())
      );
      if (matchedRa && !ra) setRa(matchedRa);
      setCepStatus('ok');
    } else {
      setCepStatus('error');
      setCepError(result.errorMessage || 'CEP não encontrado.');
    }
  }

  function next() {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      saveBaseline({
        raceColor,
        age,
        education,
        income,
        ra,
        cep: cep || undefined,
        logradouro: logradouro || undefined,
        bairro: bairro || undefined,
        cidade: cidade || undefined,
        uf: uf || undefined,
        conditions,
        usesUbs,
        accessBarriers,
        discriminationScale,
      });
      completeOnboarding();
      navigate('/');
    }
  }

  function back() {
    if (step === 0) navigate('/consentimento');
    else setStep(step - 1);
  }

  return (
    <div className={isPulso ? 'min-h-screen bg-pulso-creme font-pulso-body' : undefined}>
      <TopBar title="Questionário de linha de base" showBack />
      <div className="px-5 pt-3 pb-8">
        <ProgressBar current={step} total={STEPS.length} />

        {step === 0 && (
          <Section title="Perfil sociodemográfico">
            <Field label="Raça/cor (autodeclaração)">
              <Select value={raceColor} onChange={setRaceColor} options={['Preta', 'Parda', 'Branca', 'Indígena', 'Amarela', 'Prefiro não informar']} />
            </Field>
            <Field label="Faixa de idade">
              <Select value={age} onChange={setAge} options={['18-24', '25-34', '35-49', '50-64', '65+']} />
            </Field>
            <Field label="Escolaridade">
              <Select value={education} onChange={setEducation} options={['Fundamental', 'Médio', 'Superior', 'Pós-graduação']} />
            </Field>
            <Field label="Renda familiar (salários mínimos)">
              <Select value={income} onChange={setIncome} options={['Até 1', '1-2', '2-4', '4-10', 'Acima de 10']} />
            </Field>
            <Field label="CEP (opcional — preenche o endereço automaticamente)">
              <input
                value={cep}
                onChange={(e) => handleCepChange(e.target.value)}
                placeholder="00000-000"
                inputMode="numeric"
                maxLength={9}
                className={
                  isPulso
                    ? 'w-full rounded-lg border border-pulso-dourado/30 p-3 text-sm bg-white'
                    : 'w-full rounded-lg border border-earth-200 p-3 text-sm bg-white'
                }
              />
              {cepStatus === 'loading' && (
                <p className={`text-xs mt-1 ${isPulso ? 'text-pulso-marrom/60' : 'text-earth-400'}`}>
                  Consultando endereço nos Correios (ViaCEP)...
                </p>
              )}
              {cepStatus === 'ok' && (
                <p className={`text-xs mt-1 ${isPulso ? 'text-pulso-verde-accent' : 'text-brand-600'}`}>
                  Endereço encontrado: {logradouro}{bairro ? `, ${bairro}` : ''} — {cidade}/{uf}
                </p>
              )}
              {cepStatus === 'error' && <p className="text-xs text-red-600 mt-1">{cepError}</p>}
            </Field>

            {(logradouro || bairro || cidade) && (
              <Field label="Endereço encontrado (edite se necessário)">
                <div className="space-y-2">
                  <input
                    value={logradouro}
                    onChange={(e) => setLogradouro(e.target.value)}
                    placeholder="Logradouro"
                    className={
                      isPulso
                        ? 'w-full rounded-lg border border-pulso-dourado/30 p-3 text-sm bg-white'
                        : 'w-full rounded-lg border border-earth-200 p-3 text-sm bg-white'
                    }
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                      placeholder="Bairro"
                      className={
                        isPulso
                          ? 'w-full rounded-lg border border-pulso-dourado/30 p-3 text-sm bg-white'
                          : 'w-full rounded-lg border border-earth-200 p-3 text-sm bg-white'
                      }
                    />
                    <input
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      placeholder="Cidade"
                      className={
                        isPulso
                          ? 'w-full rounded-lg border border-pulso-dourado/30 p-3 text-sm bg-white'
                          : 'w-full rounded-lg border border-earth-200 p-3 text-sm bg-white'
                      }
                    />
                  </div>
                </div>
              </Field>
            )}

            <Field label="Região Administrativa (DF) ou município do Entorno/RIDE">
              <GroupedSelect
                value={ra}
                onChange={setRa}
                groups={[
                  { label: 'Distrito Federal (Regiões Administrativas)', options: dfAdministrativeRegions },
                  { label: 'Entorno / RIDE-DF', options: rideEntornoMunicipalities.map((m) => `${m.nome} (${m.uf})`) },
                ]}
              />
            </Field>
          </Section>
        )}

        {step === 1 && (
          <Section title="Histórico de saúde" subtitle="Selecione as condições que você já teve diagnóstico ou suspeita.">
            <div className="space-y-2">
              {priorityThemes.map((t) => (
                <label
                  key={t.id}
                  className={
                    isPulso
                      ? `flex items-center gap-3 rounded-xl border p-3 text-sm cursor-pointer ${
                          conditions.includes(t.id) ? 'border-pulso-dourado bg-pulso-dourado/10' : 'border-pulso-dourado/25 bg-white'
                        }`
                      : `flex items-center gap-3 rounded-xl border p-3 text-sm cursor-pointer ${
                          conditions.includes(t.id) ? 'border-brand-300 bg-brand-50' : 'border-earth-200 bg-white'
                        }`
                  }
                >
                  <input
                    type="checkbox"
                    checked={conditions.includes(t.id)}
                    onChange={() => toggleCondition(t.id)}
                    className={isPulso ? 'h-4 w-4 accent-pulso-verde' : 'h-4 w-4 accent-brand-600'}
                  />
                  <span className="text-lg">{t.icon}</span>
                  <span className={isPulso ? 'text-pulso-marrom/90' : 'text-earth-800'}>{t.name}</span>
                </label>
              ))}
            </div>
          </Section>
        )}

        {step === 2 && (
          <Section title="Acesso ao SUS">
            <Field label="Você utiliza uma UBS de referência?">
              <Select value={usesUbs} onChange={setUsesUbs} options={['Sim, regularmente', 'Sim, raramente', 'Não conheço uma UBS de referência', 'Não utilizo o SUS']} />
            </Field>
            <Field label="Já enfrentou dificuldades de acesso? (opcional, descreva)">
              <textarea
                value={accessBarriers}
                onChange={(e) => setAccessBarriers(e.target.value)}
                rows={3}
                placeholder="Ex.: fila longa, falta de médico especialista, distância..."
                className={
                  isPulso
                    ? 'w-full rounded-lg border border-pulso-dourado/30 p-3 text-sm'
                    : 'w-full rounded-lg border border-earth-200 p-3 text-sm'
                }
              />
            </Field>
          </Section>
        )}

        {step === 3 && (
          <Section title="Experiência de discriminação" subtitle="Numa escala de 0 (nunca) a 5 (frequentemente), com que frequência você sentiu que foi tratado de forma diferente em um serviço de saúde por causa da sua raça/cor?">
            <div className="flex justify-between gap-2 mt-4">
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setDiscriminationScale(n)}
                  className={
                    isPulso
                      ? `flex-1 aspect-square rounded-lg font-bold text-sm ${
                          discriminationScale === n ? 'bg-pulso-verde text-pulso-creme' : 'bg-white border border-pulso-dourado/30 text-pulso-marrom'
                        }`
                      : `flex-1 aspect-square rounded-lg font-bold text-sm ${
                          discriminationScale === n ? 'bg-brand-600 text-white' : 'bg-white border border-earth-200 text-earth-700'
                        }`
                  }
                >
                  {n}
                </button>
              ))}
            </div>
            <div className={`flex justify-between text-[10px] mt-2 px-1 ${isPulso ? 'text-pulso-marrom/50' : 'text-earth-400'}`}>
              <span>Nunca</span>
              <span>Frequentemente</span>
            </div>
          </Section>
        )}

        <div className="flex gap-3 mt-8">
          <button
            onClick={back}
            className={
              isPulso
                ? 'flex-1 rounded-xl border border-pulso-dourado/40 text-pulso-marrom font-semibold py-3'
                : 'flex-1 rounded-xl border border-earth-300 text-earth-700 font-semibold py-3'
            }
          >
            Voltar
          </button>
          <button
            onClick={next}
            className={
              isPulso
                ? 'flex-1 rounded-xl bg-pulso-verde text-pulso-creme font-semibold py-3'
                : 'flex-1 rounded-xl bg-brand-600 text-white font-semibold py-3'
            }
          >
            {step === STEPS.length - 1 ? 'Concluir' : 'Continuar'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const { variantId } = useAppearance();
  const isPulso = variantId === 'pp1' || variantId === 'pp2';
  return (
    <div className="flex gap-1 mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full ${
            i <= current ? (isPulso ? 'bg-pulso-dourado' : 'bg-brand-600') : isPulso ? 'bg-pulso-dourado/20' : 'bg-earth-200'
          }`}
        />
      ))}
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  const { variantId } = useAppearance();
  const isPulso = variantId === 'pp1' || variantId === 'pp2';
  return (
    <div>
      <h2 className={`font-bold mb-1 ${isPulso ? 'text-pulso-verde font-pulso-display' : 'text-earth-900'}`}>{title}</h2>
      {subtitle && <p className={`text-xs mb-4 ${isPulso ? 'text-pulso-marrom/70' : 'text-earth-500'}`}>{subtitle}</p>}
      <div className="space-y-4 mt-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  const { variantId } = useAppearance();
  const isPulso = variantId === 'pp1' || variantId === 'pp2';
  return (
    <div>
      <label className={`block text-xs font-semibold mb-1.5 ${isPulso ? 'text-pulso-marrom' : 'text-earth-700'}`}>{label}</label>
      {children}
    </div>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  const { variantId } = useAppearance();
  const isPulso = variantId === 'pp1' || variantId === 'pp2';
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={
        isPulso
          ? 'w-full rounded-lg border border-pulso-dourado/30 p-3 text-sm bg-white'
          : 'w-full rounded-lg border border-earth-200 p-3 text-sm bg-white'
      }
    >
      <option value="">Selecione...</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

function GroupedSelect({
  value,
  onChange,
  groups,
}: {
  value: string;
  onChange: (v: string) => void;
  groups: { label: string; options: string[] }[];
}) {
  const { variantId } = useAppearance();
  const isPulso = variantId === 'pp1' || variantId === 'pp2';
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={
        isPulso
          ? 'w-full rounded-lg border border-pulso-dourado/30 p-3 text-sm bg-white'
          : 'w-full rounded-lg border border-earth-200 p-3 text-sm bg-white'
      }
    >
      <option value="">Selecione...</option>
      {groups.map((g) => (
        <optgroup key={g.label} label={g.label}>
          {g.options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
