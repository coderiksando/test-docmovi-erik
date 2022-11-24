import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { validateRut, formatRut } from 'rutlib/lib';
import { updateMessage } from '../../../store/patients';

interface PatientCreationInputProps {
    formInput: { label: string, type: string, name: string },
    onRegister: Function
}

export const PatientCreationInput = ({ formInput, onRegister }: PatientCreationInputProps) => {
    const { label, type, name } = formInput;
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    const valiations = (event: any) => {
        if ( name !== 'rut') {
            if ( event.target.value.length === 0 ) {
                setErrorMessage('Campo requerido');
                dispatch(updateMessage({ from: name, message: `El campo ${label} es requerido`, errorType: true }));
            }
            if ( type === 'string' && !event.target.value?.match(/^[A-Za-zÀ-ú\s]*$/) ) {
                setErrorMessage('El campo de entrada solo permite letras y espacios');
                dispatch(updateMessage({ from: name, message: `El campo ${label} solo permite letras y espacios`, errorType: true }));
            }
            if ( type === 'number' && event.target.value < 0 ) {
                setErrorMessage('El campo de entrada solo permite valores positivos');
                dispatch(updateMessage({ from: name, message: `El campo ${label} solo permite valores positivos`, errorType: true }));
            }
        } else {
            if ( event.target.value.length > 1) event.target.value = formatRut(event.target.value);
            if ( !validateRut(event.target.value) ) {
                setErrorMessage('RUT inválido');
                dispatch(updateMessage({ from: name, message: `El ${label} es inválido`, errorType: true }));
            }
            if ( event.target.value.length === 0 ) {
                setErrorMessage('Campo requerido');
                dispatch(updateMessage({ from: name, message: `El campo ${label} es requerido`, errorType: true }));
            }
        }
    }

    return (
        <div className="col-span-12 sm:col-span-6">
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                {
                    ...onRegister(name, {
                        onChange: (event: any) => {
                            setErrorMessage('');
                            dispatch(updateMessage({ from: name, message: ``, errorType: false }));
                            valiations(event);
                        }
                    })
                }
                type={type}
                name={name}
                id={name}
                autoComplete={name}
                className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 px-2 border-slate-500"
            />
            <div className={(!errorMessage) ? 'text-green-700' : 'text-red-700'}>
                <span className={'flex items-center font-medium tracking-wide text-xs mt-1 ml-1'} >
                    { 
                        errorMessage &&
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                    }
                    {errorMessage}
                </span>
            </div>
        </div>
    )
}