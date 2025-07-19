
import { z } from 'zod';
import { newEntrySchema } from './utils';

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
    
}
export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string,
    entries?: Entry[]
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type NonSensitivePatientData  = Omit<Patient, 'ssn' | 'entries'>;

export type newEntry = Omit<Patient, "id" | 'entries'>;

export type newEntrySchema = z.infer<typeof newEntrySchema>; 