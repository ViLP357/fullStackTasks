import patientData from '../../data/patients';


import { NonSensitivePatientData, Patient } from '../types';

const getPatients = (): Patient[] => {
    return patientData;
};

const getNonSensitivePatientData = () : NonSensitivePatientData[] => {
    return patientData.map(({id , name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};
export default{
    getPatients,
    getNonSensitivePatientData
};