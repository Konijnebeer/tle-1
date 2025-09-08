import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main>
        Start
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </main>
    </>
  );
}

export default App;
