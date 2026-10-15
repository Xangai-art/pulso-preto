import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ConsentState {
  level1_appUsage: boolean; // obrigatório
  level2_research: boolean;
  level3_aggregation: boolean;
  level4_geolocation: boolean;
  consentedAt?: string;
}

export interface BaselineData {
  raceColor?: string;
  age?: string;
  education?: string;
  income?: string;
  ra?: string; // Região Administrativa (DF) ou município da RIDE/Entorno
  cep?: string;
  logradouro?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  conditions: string[]; // ids das condições autodeclaradas
  usesUbs?: string;
  accessBarriers?: string;
  discriminationScale?: number; // 0-5
  completedAt?: string;
}

export interface CheckIn {
  id: string;
  date: string;
  symptoms: string[];
  medicationAdherence?: 'sim' | 'parcial' | 'nao' | 'na';
  accessDifficulty?: boolean;
  accessDetails?: string;
  rotatingAnswer?: string;
}

export interface DiscriminationReport {
  id: string;
  date: string;
  location: string;
  description: string;
  wantsFollowUp: boolean;
}

interface AppState {
  onboarded: boolean;
  consent: ConsentState;
  baseline: BaselineData | null;
  checkIns: CheckIn[];
  reports: DiscriminationReport[];
  radarOptIn: boolean;
  setConsent: (c: Partial<ConsentState>) => void;
  completeOnboarding: () => void;
  saveBaseline: (b: BaselineData) => void;
  addCheckIn: (c: Omit<CheckIn, 'id' | 'date'>) => void;
  addReport: (r: Omit<DiscriminationReport, 'id' | 'date'>) => void;
  setRadarOptIn: (v: boolean) => void;
  resetAll: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      onboarded: false,
      consent: {
        level1_appUsage: false,
        level2_research: false,
        level3_aggregation: false,
        level4_geolocation: false,
      },
      baseline: null,
      checkIns: [],
      reports: [],
      radarOptIn: false,
      setConsent: (c) =>
        set((s) => ({
          consent: { ...s.consent, ...c, consentedAt: new Date().toISOString() },
        })),
      completeOnboarding: () => set({ onboarded: true }),
      saveBaseline: (b) => set({ baseline: { ...b, completedAt: new Date().toISOString() } }),
      addCheckIn: (c) =>
        set((s) => ({
          checkIns: [
            { ...c, id: crypto.randomUUID(), date: new Date().toISOString() },
            ...s.checkIns,
          ],
        })),
      addReport: (r) =>
        set((s) => ({
          reports: [
            { ...r, id: crypto.randomUUID(), date: new Date().toISOString() },
            ...s.reports,
          ],
        })),
      setRadarOptIn: (v) => set({ radarOptIn: v }),
      resetAll: () =>
        set({
          onboarded: false,
          consent: {
            level1_appUsage: false,
            level2_research: false,
            level3_aggregation: false,
            level4_geolocation: false,
          },
          baseline: null,
          checkIns: [],
          reports: [],
          radarOptIn: false,
        }),
    }),
    { name: 'gente-preta-sentinela' }
  )
);
