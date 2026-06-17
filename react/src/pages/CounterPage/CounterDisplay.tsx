// Description: Shows the current value of the counter
function CounterDisplay({ count }: { count: number }) {
  return <div>
    <p className="text">{count}</p>
  </div>;
}

export default CounterDisplay;