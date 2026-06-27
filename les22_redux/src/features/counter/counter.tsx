import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { decrement, increment, selectCount } from './counterSlice';

import '../../App.css';

function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        <button 
          aria-label='Increment Value' 
          onClick={() => dispatch(increment())}
        >Increment</button>
        <span>{count}</span>
        <button
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
        >Decrement</button>
      </div>
    </>
  )
}

export default Counter;
