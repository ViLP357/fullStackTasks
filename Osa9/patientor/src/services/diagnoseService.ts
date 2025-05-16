import diagnoseData from '../../data/diagnoses';

import { DiagnoseObject } from '../types';

//const diagnoses: DiagnoseObject[] = diagnoseData; // as DiagnoseObject[]

const getDiagnoses = (): DiagnoseObject[] => {
    //return diagnoses;
    return diagnoseData;
};

//const add

export default {
    getDiagnoses
};