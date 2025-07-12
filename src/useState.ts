import { instance } from './instance';

export function useState<T>(
  initialValue: T
): [T, (newValue: T | ((prev: T) => T)) => void] {
  const index = instance.getNextIndex();

  if (instance.getState(index) === undefined) {
    instance.setState(index, initialValue);
  }

  const setState = (newValue: T | ((prev: T) => T)) => {
    const prev = instance.getState(index) as T;
    const nextValue =
      typeof newValue === 'function'
        ? (newValue as (prev: T) => T)(prev)
        : newValue;

    if (Object.is(prev, nextValue)) return;

    instance.setState(index, nextValue);
    instance.render();
  };

  const value = instance.getState(index) as T;
  return [value, setState];
}
