
import { z } from 'zod';
import { newEntrySchema } from './utils';

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}
export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type NonSensitivePatientData  = Omit<Patient, 'ssn'>;

export type newEntry = Omit<Patient, "id">;

export type newEntrySchema = z.infer<typeof newEntrySchema>; 