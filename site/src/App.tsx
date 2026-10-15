import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import HealthLibrary from './pages/HealthLibrary';
import DiseaseDetail from './pages/DiseaseDetail';
import ClinicalTrials from './pages/ClinicalTrials';
import TraditionalMedicine from './pages/TraditionalMedicine';
import Memory from './pages/Memory';
import News from './pages/News';
import Community from './pages/Community';
import SusNetwork from './pages/SusNetwork';
import Transparency from './pages/Transparency';
import AppAccess from './pages/AppAccess';
import Architecture from './pages/Architecture';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-earth-800">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          {/* Biblioteca de Saúde — página única e canônica, unificando o antigo par
              /saude (HealthLibrary) + /biblioteca-saude (BibliotecaSaude, aposentada).
              Mantém a estética de /saude (preferida) + busca/filtro por categoria. */}
          <Route path="/saude" element={<HealthLibrary />} />
          <Route path="/saude/:categoryId/:diseaseId" element={<DiseaseDetail />} />
          <Route path="/biblioteca-saude" element={<Navigate to="/saude" replace />} />
          <Route path="/biblioteca" element={<Navigate to="/saude" replace />} />
          <Route path="/ensaios-clinicos" element={<ClinicalTrials />} />
          <Route path="/ensaios" element={<Navigate to="/ensaios-clinicos" replace />} />
          {/* Medicina Tradicional Brasileira — pacote v4.3 (17/08/2026), recuperado nesta sessão */}
          <Route path="/medicina-tradicional-brasileira" element={<TraditionalMedicine />} />
          <Route path="/medicina-tradicional" element={<Navigate to="/medicina-tradicional-brasileira" replace />} />
          <Route path="/memoria" element={<Memory />} />
          <Route path="/noticias" element={<News />} />
          <Route path="/comunidade" element={<Community />} />
          <Route path="/rede-sus" element={<SusNetwork />} />
          <Route path="/transparencia" element={<Transparency />} />
          <Route path="/arquitetura" element={<Architecture />} />
          <Route path="/acessar-app" element={<AppAccess />} />
          {/* Baixe o App Sentinela — alias canônico do pacote v4.2 */}
          <Route path="/baixar" element={<AppAccess />} />
          <Route path="/baixe-o-app" element={<Navigate to="/baixar" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
