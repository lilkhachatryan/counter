import React, { useState, useEffect } from "react";
import { getInitialValue } from "../mocks/mockBackend";

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchInitialValue = async () => {
      try {
        const response = await getInitialValue();
        if (response && response.data !== undefined) {
          setCount(response.data);
        }
      } catch (error) {
        console.error("Error fetching initial value:", error);
      }
    };
    fetchInitialValue();
  }, []);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const randomize = () => setCount(Math.floor(Math.random() * 100));

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={randomize}>Randomize</button>
    </div>
  );
};

export default Counter;
