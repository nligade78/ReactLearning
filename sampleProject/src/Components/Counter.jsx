import React, { useState } from "react";

// usteState
const Counter = () => {
  const [count, setCount] = useState(10);
  return (
    <div>
      <div>UseState</div>
      <p>Count Component = {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count + 1)}>Decrement</button>
    </div>
  );
};
export default Counter;
