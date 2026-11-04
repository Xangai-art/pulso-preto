import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';
import BottomNav from './components/BottomNav';

const Welcome = lazy(() => import('./pages/Welcome'));
const Consent = lazy(() => import('./pages/Consent'));
const Baseline = lazy(() => import('./pages/Baseline'));
const Home = lazy(() => import('./pages/Home'));
const CheckIn = lazy(() => import('./pages/CheckIn'));
const HealthLibrary = lazy(() => import('./pages/HealthLibrary'));
const DiseaseDetail = lazy(() => import('./pages/DiseaseDetail'));
const MapUbs = lazy(() => import('./pages/MapUbs'));
const Radar = lazy(() => import('./pages/Radar'));
const Profile = lazy(() => import('./pages/Profile'));
const ReportDiscrimination = lazy(() => import('./pages/ReportDiscrimination'));
const Faq = lazy(() => import('./pages/Faq'));

function RequireOnboarding({ children }: { children: React.ReactNode }) {
  const onboarded = useAppStore((s) => s.onboarded);
  const consent = useAppStore((s) => s.consent);
  if (!consent.level1_appUsage) {
    return <Navigate to="/consentimento" replace />;
  }
  if (!onboarded) {
    return <Navigate to="/linha-de-base" replace />;
  }
  return <>{children}</>;
}

function App() {
  const consent = useAppStore((s) => s.consent);
  const onboarded = useAppStore((s) => s.onboarded);

  return (
    <div className="min-h-screen bg-pulso-creme font-pulso-body flex flex-col max-w-md mx-auto relative">
      <div className="flex-1 pb-20">
        <Suspense fallback={<p role="status" className="p-4">…</p>}><Routes>
          <Route path="/bem-vindo" element={<Welcome />} />
          <Route path="/consentimento" element={<Consent />} />
          <Route path="/linha-de-base" element={<Baseline />} />

          <Route
            path="/"
            element={
              <RequireOnboarding>
                <Home />
              </RequireOnboarding>
            }
          />
          <Route
            path="/checkin"
            element={
              <RequireOnboarding>
                <CheckIn />
              </RequireOnboarding>
            }
          />
          <Route
            path="/saude"
            element={
              <RequireOnboarding>
                <HealthLibrary />
              </RequireOnboarding>
            }
          />
          <Route
            path="/saude/:categoryId/:diseaseId"
            element={
              <RequireOnboarding>
                <DiseaseDetail />
              </RequireOnboarding>
            }
          />
          <Route
            path="/mapa"
            element={
              <RequireOnboarding>
                <MapUbs />
              </RequireOnboarding>
            }
          />
          <Route
            path="/radar"
            element={
              <RequireOnboarding>
                <Radar />
              </RequireOnboarding>
            }
          />
          <Route
            path="/perfil"
            element={
              <RequireOnboarding>
                <Profile />
              </RequireOnboarding>
            }
          />
          <Route
            path="/perguntas"
            element={
              <RequireOnboarding>
                <Faq />
              </RequireOnboarding>
            }
          />
          <Route
            path="/denunciar"
            element={
              <RequireOnboarding>
                <ReportDiscrimination />
              </RequireOnboarding>
            }
          />

          <Route
            path="*"
            element={
              !consent.level1_appUsage ? (
                <Navigate to="/bem-vindo" replace />
              ) : !onboarded ? (
                <Navigate to="/linha-de-base" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes></Suspense>
      </div>
      {consent.level1_appUsage && onboarded && <BottomNav />}
    </div>
  );
}

export default App;
