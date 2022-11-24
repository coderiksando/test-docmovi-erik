import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { intPatient } from '../../../interfaces/patient';
import { deletePatient } from '../../../services/submitForm';
import { RootState } from '../../../store';
import { chargingPatients, finishedload } from '../../../store/patients';

interface intPatientWithId extends intPatient {
    _id: string
}
interface intPatientData {
    patient: intPatientWithId
}

export const PatientRow = ({patient}: intPatientData) => {
    const { _id, firstName, fLastName, mLastName, rut, comuna, region, postalCode } = patient;
    const { isSaving } = useSelector((state: RootState) => state.patients);
    const dispatch = useDispatch();

    const onDelete = () => {
        dispatch(chargingPatients());
        const res = deletePatient(_id);
        dispatch(finishedload());
        Swal.fire({
          icon: `${(res.error)? 'error': 'success'}`,
          title: `${(res.error)? 'Error': 'Éxito'}`,
          text: `${res.msg}`
        });
    }

    return (
        <tr>
            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                {rut}
            </td>
            <td className="px-6 py-4 text-sm text-gray-800">
                {`${firstName} ${fLastName} ${mLastName}`}
            </td>
            <td className="px-6 py-4 text-sm text-gray-800">
                {`${comuna}, ${region}`}
            </td>
            <td className="px-6 py-4 text-sm text-gray-800">
                {postalCode}
            </td>
            <td className="px-6 py-4 text-sm font-medium text-right flex justify-center">
                <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-75" 
                    onClick={onDelete} 
                    disabled={isSaving}>
                    Borrar
                </button>
            </td>
        </tr>
    )
}
