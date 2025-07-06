import patientData from '../../data/patients';
import {v1 as uuid } from "uuid";

import { NonSensitivePatientData, Patient, newEntry } from '../types';

const getPatients = (): Patient[] => {
    return patientData;
};

const getOnePatient = (idReq: string): Patient | null => {
    
    const patient = patientData.find(p => p.id === idReq);
    if (patient) {
        return patient;
    } 
    return null;

};

const getNonSensitivePatientData = () : NonSensitivePatientData[] => {
    return patientData.map(({id , name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};



const addPatient = (entry : newEntry): Patient => {
        const id = uuid();
        const newPatient = {
            id : id,
            ...entry
        };
        patientData.push(newPatient);
        return newPatient;
    };
export default{
    getPatients,
    getNonSensitivePatientData,
    addPatient,
    getOnePatient
};