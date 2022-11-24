import React from 'react';
import { PatientCreate } from './components/PatientCreation/index';
import { PatientTable } from './components/PatientTable';

export const App = () => (
  <div>
    <PatientCreate/>
    <br />
    <PatientTable/>
  </div>
);