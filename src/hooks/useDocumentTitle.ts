import { useEffect } from 'react';

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `Abyot | ${title}` : 'Abyot | አብዮት — Revolutionary Analysis';
    return () => {
      document.title = prev;
    };
  }, [title]);
}
