import { PatientCollection } from "../api/PatientCollection";

export const insertPatient = (form: any) => {
    const patient = PatientCollection.find({ rut: form.rut }).fetch();
    if ( patient.length > 0 ) return { msg: 'El rut que se intenta insertar está actualmente en uso', error: true };
    PatientCollection.insert(form);
    return { msg: 'El paciente fue insertado exitosamente', error: false };
}

export const deletePatient = (_id: string) => {
    const patient = PatientCollection.find({ _id }).fetch();
    if ( patient.length === 0 ) return { msg: 'El paciente que intenta eliminar no existe', error: true };
    PatientCollection.remove(_id);
    return { msg: 'El paciente fue eliminado exitosamente', error: false };
}
