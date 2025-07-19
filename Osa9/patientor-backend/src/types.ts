
import { z } from 'zod';
import { newEntrySchema } from './utils';

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string,
    criteria: string
  }
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string,
    endDate: string
  }
}


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
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

//export enum EntryType {
//    HospitalEntry = "Hospital",
//    OccupationalHealthcareEntry = "OccupationalHealthcare",
//    HealthCheckEntry = "HealthCheck"
//}

export type NonSensitivePatientData  = Omit<Patient, 'ssn' | 'entries'>;

export type newEntry = Omit<Patient, "id" | 'entries'>;

export type newEntrySchema = z.infer<typeof newEntrySchema>; 