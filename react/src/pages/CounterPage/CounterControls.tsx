// Description: Provides buttons to change the counter value
export interface ControlProps {
  incCount: () => void;
  decCount: () => void;
}

function CounterControls({incCount, decCount}: ControlProps) {
  return <div>
    <button onClick={incCount}>+1</button>
    <button onClick={decCount}>-1</button>
  </div>;
}

export default CounterControls;