import { Gender, newEntry } from "./types";
import { z } from 'zod';

export const newEntrySchema = z.object({
  name: z.string(),
  gender: z.nativeEnum(Gender),
  ssn: z.string(),
  dateOfBirth: z.string().date(),
  occupation: z.string(), //optional()
  entries: z.array(z.string()).optional()
});
export const toNewPatient = (object: unknown) : newEntry => {
    return newEntrySchema.parse(object);
};

const EntryTypeOnlySchema = z.object({
  type: z.enum(['Hospital', 'OccupationalHealthcare', 'HealthCheck']),
});

export const isValidEntryType = (entry: unknown): boolean => {
  return EntryTypeOnlySchema.safeParse(entry).success;
};