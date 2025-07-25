import patientData from '../../data/patients';
import {v1 as uuid } from "uuid";
import { isValidEntryType } from '../utils';
import { NonSensitivePatientData, Patient, newEntry,} from '../types';



const getPatients = (): Patient[] => {
    return patientData;
};

const getOnePatient = (idReq: string): Patient | null => {
    
    const patient = patientData.find(p => p.id === idReq);
   
    if (patient && patient.entries) {
       patient.entries.forEach((entry) => {
            if (!isValidEntryType(entry)) {
            console.error('Virheellinen entry.type:', entry);
            }
        });
        //if (patient.entries && patient.entries[0].type === EntryType.HealthCheckEntry )
        return patient;
    } 
    return null;

};

const getNonSensitivePatientData = () : NonSensitivePatientData[] => {
    return patientData.map(({id , name, dateOfBirth, gender, occupation, entries}) => ({
        id, name, dateOfBirth, gender, occupation, entries
    }));
};



const addPatient = (entry : newEntry): Patient => {
        const id = uuid();
        const newPatient = {
            id : id,
            entries: [],
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