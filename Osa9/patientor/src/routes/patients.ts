import toNewPatient from '../utils';
import express from 'express';
import patientService from '../services/patientService';


const router = express.Router();

router.get('/', (_req, res) => {
    //console.log(patientService.getNonSensitivePatientData());
    res.send(patientService.getNonSensitivePatientData());
    //res.send({test: "res"});
});

router.post('/', (req, res) => {
    try {

        //const { name, dateOfBirth, ssn, gender, occupation } = req.body;
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        //const 
        res.json(addedPatient);
    } catch(error: unknown) {
        let errorMessage = 'Somethinf went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});  

export default router;