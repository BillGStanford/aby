import { useState, useEffect, useCallback } from 'react';
import { Annotation } from '../types';

const STORAGE_KEY = 'abyot_annotations';

export function useAnnotations(slug: string) {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const all: Annotation[] = JSON.parse(raw);
        setAnnotations(all.filter((a) => a.slug === slug));
      }
    } catch {
      setAnnotations([]);
    }
  }, [slug]);

  const saveToStorage = useCallback((updated: Annotation[]) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const all: Annotation[] = raw ? JSON.parse(raw) : [];
      const others = all.filter((a) => a.slug !== slug);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...others, ...updated]));
    } catch {
      // silently fail
    }
  }, [slug]);

  const addAnnotation = useCallback(
    (selectedText: string, note: string, color: string = '#C9A84C') => {
      const newAnnotation: Annotation = {
        id: `ann_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        slug,
        selectedText,
        note,
        createdAt: new Date().toISOString(),
        color,
      };
      const updated = [...annotations, newAnnotation];
      setAnnotations(updated);
      saveToStorage(updated);
      return newAnnotation;
    },
    [annotations, slug, saveToStorage]
  );

  const deleteAnnotation = useCallback(
    (id: string) => {
      const updated = annotations.filter((a) => a.id !== id);
      setAnnotations(updated);
      saveToStorage(updated);
    },
    [annotations, saveToStorage]
  );

  const updateAnnotation = useCallback(
    (id: string, note: string) => {
      const updated = annotations.map((a) => (a.id === id ? { ...a, note } : a));
      setAnnotations(updated);
      saveToStorage(updated);
    },
    [annotations, saveToStorage]
  );

  return { annotations, addAnnotation, deleteAnnotation, updateAnnotation };
}
