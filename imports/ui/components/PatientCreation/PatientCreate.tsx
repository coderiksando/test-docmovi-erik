import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../store';
import { useForm } from 'react-hook-form';

import Chile from '../../../data/comunasRegionesChile.json';
import { PatientCreationDropdown, PatientCreationInput } from './';
import { insertPatient } from '../../../services/submitForm';
import { chargingPatients, finishedload, insertMessage } from '../../../store/patients';
import Swal from 'sweetalert2';

export const PatientCreate = () => {
  const { register, handleSubmit, setValue, getValues, reset } = useForm<any>();
  const { messages, isSaving } = useSelector((state: RootState) => state.patients);
  const dispatch = useDispatch();

  const { regiones } = Chile;
  const [selectedOption, setSelectedOption] = useState(regiones[0].region);
  const [comunas, setComunas] = useState(regiones[0].comunas);
  
  useEffect(() => {
    resetFormAndData();
  }, []);

  useEffect(() => {
    const selectedRegion = regiones.find(item => item.region === selectedOption);
    if (selectedRegion) {
      setComunas(selectedRegion.comunas);
      setValue('comuna' as any, selectedRegion.comunas[0]);
    }
  }, [selectedOption]);

  const onSubmitNewPatient = (form: FormData) => {
    const formData = Object.keys(getValues()).map(key => { if (getValues()[key] !== '') return true }).filter(m=> m);
    const lengthMessage = messages.map(item => { if (item.errorType) return item.message }).filter(m => m).length;
    if (lengthMessage === 0 && formData.length === 7 ) {
      dispatch(chargingPatients());
      const res = insertPatient(form);
      dispatch(finishedload());
      Swal.fire({
        icon: `${(res.error)? 'error': 'success'}`,
        title: `${(res.error)? 'Error': 'Éxito'}`,
        text: `${res.msg}`
      });
      if (!res.error) resetFormAndData();
    } else {
      const errorText = ( lengthMessage > 0 ) 
        ? messages.map(item => { if (item.errorType) return '<br>' + item.message  }).filter(m => m).toString()
        : 'El formulario debe ser rellenado';
      Swal.fire({
        icon: 'error',
        title: 'Formulario de registro incorrecto',
        html: `${errorText}`
      });
    }
  }

  const resetFormAndData = () => {
    dispatch(insertMessage({
      messages: [
        { from: 'firstName', message: '', errorType: false },
        { from: 'fLastName', message: '', errorType: false },
        { from: 'mLastName', message: '', errorType: false },
        { from: 'rut', message: '', errorType: false },
        { from: 'postalCode', message: '', errorType: false }
      ]
    }));
    reset();
    setSelectedOption(regiones[0].region);
  }

  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:gap-6">
        <div className="mt-5 md:mt-0">
          <form onSubmit={handleSubmit((form) => onSubmitNewPatient(form))}>
            <div className="shadow sm:rounded-md">
              <p className="flex-auto flex-row justify-start text-xl px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600">
                Formulario de registro de pacientes
              </p>
              <div className="overflow-x-auto bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-12 gap-6">
                  <PatientCreationInput
                    key='firstName'
                    onRegister={register}
                    formInput={{ label: 'Nombre', type: 'string', name: 'firstName' }} />
                  <PatientCreationInput
                    key='fLastName'
                    onRegister={register}
                    formInput={{ label: 'Apellido Paterno', type: 'string', name: 'fLastName' }} />
                  <PatientCreationInput
                    key='mLastName'
                    onRegister={register}
                    formInput={{ label: 'Apellido Materno', type: 'string', name: 'mLastName' }} />
                  <PatientCreationInput
                    key='rut'
                    onRegister={register}
                    formInput={{ label: 'RUT', type: 'string', name: 'rut' }} />

                  <PatientCreationDropdown
                    key='region'
                    onRegister={register}
                    setSelectedOption={setSelectedOption}
                    formInput={{ label: 'Región', name: 'region' }}
                    dataList={regiones.map(item => item.region)} />
                  <PatientCreationDropdown
                    key='comuna'
                    onRegister={register}
                    formInput={{ label: 'Comuna', name: 'comuna' }}
                    dataList={comunas} />

                  <PatientCreationInput
                    key='codPostal'
                    onRegister={register}
                    formInput={{ label: 'Código postal', type: 'number', name: 'postalCode' }} />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <input
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75"
                  disabled={isSaving}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
