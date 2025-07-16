import { instance } from './instance';

export function useEffect(callback: () => void, deps?: unknown[]) {
  const index = instance.getEffectIndex();

  instance.setEffect(index, {
    callback,
    deps,
  });
}
