import { instance } from './instance';
import { useState } from './useState';

function Counter() {
  const [count, setCount] = useState(0);

  setTimeout(() => {
    setCount(1);
  }, 0);

  console.log('count: ', count);
}

instance.mount(Counter);
