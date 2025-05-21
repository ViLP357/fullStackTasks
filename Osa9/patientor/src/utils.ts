import { Gender, newEntry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or a missing name");
    }
    return name;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect gender");
    }
    return gender;
};

const parseSsn = (ssn: unknown):string => {
    if (!ssn || !isString(ssn)) {
        throw new Error("Incorrect ssn");
    }
    return ssn;
};

const parseOccupation = (occupation: unknown) :string => {
    if (!occupation || !isString(occupation)) {
        throw new Error( "Invalid occupation");
    }
    return occupation;
};
const toNewPatient = (object: unknown) : newEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }
    console.log(object);
     if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'ssn' in object && 'occupation' in object)  {
        const newPatient: newEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };
        return newPatient;
    };
    throw new Error("Incorect data: some fields are missing!");
};

export default toNewPatient;