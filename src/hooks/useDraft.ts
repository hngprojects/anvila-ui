import { useCallback, useEffect, useRef } from "react";

export function useDraft<T extends Record<string, unknown>>(
  key: string,
  data: T,
  onRestore: (draft: T) => void,
  omitKeys: (keyof T)[] = [],
) {
  const restoredRef = useRef(false);
  const onRestoreRef = useRef(onRestore);

  useEffect(() => {
    onRestoreRef.current = onRestore;
  }, [onRestore]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<T>;
        onRestoreRef.current(parsed as T);
      }
    } catch {}
    setTimeout(() => {
      restoredRef.current = true;
    }, 0);
  }, [key]);

  // Persist on change
  const serialized = JSON.stringify(data);
  useEffect(() => {
    if (!restoredRef.current) return;
    const toSave = { ...JSON.parse(serialized) } as T;
    omitKeys.forEach((k) => delete toSave[k]);
    localStorage.setItem(key, JSON.stringify(toSave));
  }, [key, serialized, omitKeys]);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(key);
  }, [key]);

  return { clearDraft };
}
