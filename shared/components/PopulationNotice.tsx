import { useAppearance } from '../context/AppearanceContext';
import { publicHealthCopy } from '../data/publicHealthCopy';

export default function PopulationNotice({ className = 'text-sm mt-3 mb-4' }: { className?: string }) {
  const { localeId } = useAppearance();
  return <p lang={localeId === 'es' ? 'es-419' : 'pt-BR'} className={className} data-population-notice>
    {publicHealthCopy[localeId].populationNotice}
  </p>;
}
