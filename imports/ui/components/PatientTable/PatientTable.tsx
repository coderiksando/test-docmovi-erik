import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { PatientRow } from './';
import { PatientCollection } from '../../../api/PatientCollection';

export const PatientTable = () => {
  const patients = useTracker<Array<any>>(() => PatientCollection.find({}).fetch());
  
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:gap-6">
        <div className="mt-5 md:mt-0">
          <div className="overflow-hidden shadow sm:rounded-md">
            <p className="flex-auto flex-row justify-start text-xl px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600">
              Tabla de pacientes registrados
            </p>
            <div className="bg-white px-4 py-5 sm:p-6">

              <div className="flex flex-col">
                <div className="overflow-x-auto">
                  <div className="w-full inline-block align-middle">
                    <div className="overflow-x-auto border rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200 ">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase " >
                              RUT
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase " >
                              Nombre completo
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase " >
                              Comuna de origen
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase " >
                              Codigo postal
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase " >
                              Acción
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {
                            (patients.length > 0)
                            ? patients.map(
                              patient => <PatientRow
                                            key={patient.rut}
                                            patient={patient}/>
                            )
                            : <tr><td className="px-6 py-4 text-sm text-gray-800"> No existen pacientes actualmente... </td></tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>


  )
}
