import { configureStore } from '@reduxjs/toolkit';
import { patientsSlice } from './patients';

export const store = configureStore({
    reducer: {
        patients: patientsSlice.reducer
    },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;