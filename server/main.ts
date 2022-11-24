import { Meteor } from 'meteor/meteor';
import { PatientCollection } from '../imports/api/PatientCollection';
import { intPatient } from '../imports/interfaces/patient';

export const patientCreation = (patient: intPatient) => {
  return PatientCollection.insert(patient);
}

Meteor.startup(async () => {
  if (PatientCollection.find().count() === 0) {
    [
      {
        firstName: 'Erik',
        fLastName: 'Sandoval',
        mLastName: 'Sepúlveda',
        rut: '18.576.437-0',
        comuna: 'Talca',
        region: 'Región del Maule',
        postalCode: 3460000
      },
      {
        firstName: 'Sergio',
        fLastName: 'Valdés',
        mLastName: 'Rojas',
        rut: '88.888.888-8',
        comuna: 'Talca',
        region: 'Región del Maule',
        postalCode: 3460000
      },
      {
        firstName: 'Savio',
        fLastName: 'Campos',
        mLastName: 'Albornoz',
        rut: '99.999.999-9',
        comuna: 'Linares',
        region: 'Región del Maule',
        postalCode: 3470000
      }
    ].forEach(patientCreation);
    
  }
});
