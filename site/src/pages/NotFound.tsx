import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-32 text-center">
      <h1 className="text-4xl font-bold text-earth-900 mb-4">404</h1>
      <p className="text-earth-600 mb-8">Página não encontrada.</p>
      <Link to="/" className="text-brand-600 font-medium hover:underline">← Voltar para o início</Link>
    </div>
  );
}
