import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: { 
        increment: state => { state.value++; },
        decrement: state => { state.value--; },
        incrementByAmount: (state, action: PayloadAction<number>) => { state.value += action.payload },
    }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectCount = (state: RootState) => state.counter.value;
export default counterSlice.reducer;