import diagnoseData from '../../data/diagnoses';

import { Diagnosis } from '../types';

//const diagnoses: DiagnoseObject[] = diagnoseData; // as DiagnoseObject[]

const getDiagnoses = (): Diagnosis[] => {
    //return diagnoses;
    return diagnoseData;
};

//const add

export default {
    getDiagnoses
};