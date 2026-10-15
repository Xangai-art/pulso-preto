import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';
import { useAppearance } from '@shared/context/AppearanceContext';
import BottomNav from './components/BottomNav';

import Welcome from './pages/Welcome';
import Consent from './pages/Consent';
import Baseline from './pages/Baseline';
import Home from './pages/Home';
import CheckIn from './pages/CheckIn';
import HealthLibrary from './pages/HealthLibrary';
import DiseaseDetail from './pages/DiseaseDetail';
import MapUbs from './pages/MapUbs';
import Radar from './pages/Radar';
import Profile from './pages/Profile';
import ReportDiscrimination from './pages/ReportDiscrimination';

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
  const { variantId } = useAppearance();
  const isPulso = variantId === 'pp1' || variantId === 'pp2';

  return (
    <div
      className={
        isPulso
          ? 'min-h-screen bg-pulso-creme flex flex-col max-w-md mx-auto relative'
          : 'min-h-screen bg-earth-50 flex flex-col max-w-md mx-auto relative'
      }
    >
      <div className="flex-1 pb-20">
        <Routes>
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
        </Routes>
      </div>
      {consent.level1_appUsage && onboarded && <BottomNav />}
    </div>
  );
}

export default App;
