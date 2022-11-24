import { createSlice } from '@reduxjs/toolkit';

interface initialStateInterface {
    isSaving: boolean,
    messages: Array<{
        from: string,
        message: string,
        errorType: boolean
    }>,
    patients: Array<object>
}
const initialState: initialStateInterface = {
    isSaving: false,
    messages: [],
    patients: []
}

export const patientsSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        insertMessage: (state, action) => {
            state.messages = [];
            state.messages = action.payload.messages;
        },
        updateMessage: (state, action) => {
            const { from, message, errorType } = action.payload;
            const indexMessage = state.messages.findIndex((mes) => mes.from === from);
            state.messages[indexMessage].message = message;
            state.messages[indexMessage].errorType = errorType;
        },
        chargingPatients: (state) => {
            state.isSaving = true;
        },
        finishedload: (state) => {
            state.isSaving = false;
        },
        incorporatePatients: (state, action) => {
            state.patients = action.payload.patients;
        }
    },
})

export const { chargingPatients, finishedload, insertMessage, updateMessage } = patientsSlice.actions;