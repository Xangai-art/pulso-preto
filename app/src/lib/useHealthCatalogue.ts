import { useCallback, useEffect, useState } from 'react';
import type { DiseaseCategory } from '@shared/data/diseases';

export type HealthStatus = 'loading' | 'ready' | 'empty' | 'error' | 'offline';
export const HEALTH_CACHE = 'pulso-health-editorial-v1';
const catalogueKey = '/__health_editorial/catalogue';
const openedKey = (id: string) => `/__health_editorial/opened/${encodeURIComponent(id)}`;

async function readCatalogue(offline: boolean): Promise<DiseaseCategory[]> {
  if (offline) {
    if (!('caches' in window)) return [];
    const cache = await caches.open(HEALTH_CACHE);
    const response = await cache.match(catalogueKey);
    if (!response) return [];
    const categories = await response.json() as DiseaseCategory[];
    const saved = new Set((await cache.keys()).map(request => new URL(request.url).pathname));
    return categories.map(category => ({ ...category, diseases: category.diseases.filter(disease => saved.has(openedKey(disease.id))) }));
  }
  const { diseaseCategories } = await import('@shared/data/diseases');
  if ('caches' in window) {
    try {
      const cache = await caches.open(HEALTH_CACHE);
      await cache.put(catalogueKey, Response.json(diseaseCategories));
    } catch { /* Storage denied/full must not prevent reading online content. */ }
  }
  return diseaseCategories;
}

export async function saveOpenedCondition(id: string) {
  if (!navigator.onLine || !('caches' in window)) return;
  try {
    const cache = await caches.open(HEALTH_CACHE);
    await cache.put(openedKey(id), Response.json({ version: 1 }));
  } catch { /* Best-effort public editorial cache; never stores personal data. */ }
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
    // Bound the skeleton. A timeout shows retry, not an endless loading screen.
    const timer = window.setTimeout(() => {
      cancelled = true;
      setStatus('error');
    }, 2000);
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
