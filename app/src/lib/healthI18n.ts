import { useAppearance } from '@shared/context/AppearanceContext';
import { healthTranslate } from './healthContent';

export function useHealthText() {
  const { localeId } = useAppearance();
  return { localeId, t: (text: string) => healthTranslate(localeId, text) };
}
