import { useState } from "react";
import CounterDisplay from "./CounterDisplay";
import CounterControls from "./CounterControls";
import { useTheme } from '../../context/ThemeContext.tsx';

// TODO: Use useEffect to show a message when counter > 5
// TODO: Use useEffect to reset counter to 0 if it becomes negative
function CounterPage() {
  const [count, setCount] = useState(0);
  const { theme } = useTheme();

  const incCount = () => setCount(c => c + 1);
  const decCount = () => setCount(c => Math.max(0, c - 1));

  return (
    <div className={theme === "dark" ? "dark" : "light"}>
      <CounterDisplay count={count}/>
      <CounterControls incCount={incCount} decCount={decCount}/>
      {count > 5 && <p>You passed 5</p>}
    </div>
  );
}

export default CounterPage;