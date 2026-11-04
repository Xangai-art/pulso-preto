import { useCallback, useEffect, useState } from 'react';
import type { DiseaseCategory } from '@shared/data/diseases';
import { healthContent } from './healthContent';

export type HealthStatus = 'loading' | 'ready' | 'empty' | 'error' | 'offline';
export const HEALTH_CACHE = 'pulso-health-catalogue-v1.0';
const catalogueKey = '/__health_editorial/catalogue';
let sessionCatalogue: DiseaseCategory[] | undefined;

async function readCatalogue(offline: boolean): Promise<DiseaseCategory[]> {
  // Remove the entire legacy cache: it included sensitive reading-history IDs.
  if ('caches' in window) {
    try { await caches.delete('pulso-health-editorial-v1'); } catch { /* Storage unavailable. */ }
  }
  if (offline) {
    if (sessionCatalogue) return sessionCatalogue;
    try {
      const cache = await caches.open(HEALTH_CACHE);
      const response = await cache.match(catalogueKey);
      if (response) return (await response.json()).categories;
    } catch { /* No offline cache; report empty without inventing content. */ }
    return [];
  }
  const { diseaseCategories } = await import('@shared/data/diseases');
  sessionCatalogue = diseaseCategories;
  if ('caches' in window) {
    try {
      const cache = await caches.open(HEALTH_CACHE);
      await cache.put(catalogueKey, Response.json({ categories: diseaseCategories, versao_conteudo: healthContent.content_version, atualizado_em: healthContent.updated_at }));
    } catch { /* Public catalogue caching must not prevent reading online. */ }
  }
  return diseaseCategories;
}

export function useHealthCatalogue() {
  const [categories, setCategories] = useState<DiseaseCategory[]>([]);
  const [status, setStatus] = useState<HealthStatus>('loading');
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt(value => value + 1), []);
  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    const offline = !navigator.onLine;
    const timer = window.setTimeout(() => { cancelled = true; setStatus('error'); }, 8000);
    readCatalogue(offline).then(data => {
      if (cancelled) return;
      window.clearTimeout(timer);
      setCategories(data);
      setStatus(offline ? 'offline' : data.some(category => category.diseases.length) ? 'ready' : 'empty');
    }).catch(() => {
      if (!cancelled) { window.clearTimeout(timer); setStatus('error'); }
    });
    window.addEventListener('online', retry);
    window.addEventListener('offline', retry);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.removeEventListener('online', retry);
      window.removeEventListener('offline', retry);
    };
  }, [attempt, retry]);
  return { categories, status, retry };
}
