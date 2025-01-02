'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { increment } from '../store/index/example'; 

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);

  const dispatch = useDispatch();

  return (
    <div>
      <p>Counter: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  );
}
