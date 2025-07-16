let state: unknown[] = []; // 전체 애플리케이션의 상태 저장소, useState마다 하나씩 값이 저장됨

let stateIndex = 0; // 현재 실행 중인 useState가 몇 번째인지 추적하는 변수

let effects: {
  callback: () => void;
  deps?: unknown[];
  prevDeps?: unknown[];
  cleanup?: () => void;
}[] = [];

let effectIndex = 0;

let componentFn: () => void; // 실행할 함수형 컴포넌트

export const instance = {
  mount(fn: () => void) {
    componentFn = fn; // 컴포넌트 첫 진입시 실행
    this.render();
  },
  render() {
    stateIndex = 0;
    effectIndex = 0;
    componentFn();

    effects.forEach((effect) => {
      const shouldRun =
        !effect.deps ||
        !effect.prevDeps ||
        effect.deps.some((dep, i) => dep !== effect.prevDeps![i]);

      if (shouldRun) {
        if (effect.cleanup) {
          effect.cleanup();
        }
        const isCleanUp = effect.callback();
        effect.cleanup =
          typeof isCleanUp === 'function' ? isCleanUp : undefined;

        effect.prevDeps = effect.deps ? [...effect.deps] : undefined;
      }
    });
  },
  getNextIndex() {
    return stateIndex++;
  },

  getState(index: number) {
    return state[index];
  },
  setState(index: number, value: unknown) {
    state[index] = value;
  },

  getEffectIndex() {
    return effectIndex++;
  },
  setEffect(index: number, value: { callback: () => void; deps?: unknown[] }) {
    effects[index] = {
      ...effects[index],
      ...value,
    };
  },
};
