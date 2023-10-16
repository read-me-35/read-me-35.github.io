import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex justify-center">
      <div className=" w-1/2 border border-red-500 text-center">
        <h1 className="text-3xl font-bold text-blue-950">Hero Section</h1>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  );
}

export default App;
