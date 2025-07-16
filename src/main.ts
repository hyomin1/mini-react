import { instance } from './instance';
import { useEffect } from './useEffect';
import { useState } from './useState';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('effect 실행', count);

    return () => {
      console.log('cleanup 실행');
    };
  }, [count]);
  setTimeout(() => {
    setCount((prev) => prev + 1);
  }, 1000);

  console.log('count: ', count);
}

instance.mount(Counter);
