//import toNewPatient from '../utils';
import express from 'express';
import patientService from '../services/patientService';
//import { newEntry, Patient } from '../types';
import { newEntrySchema } from '../utils';
import { z } from 'zod';


const router = express.Router();

router.get('/', (_req, res) => {
    //console.log(patientService.getNonSensitivePatientData());
    res.send(patientService.getNonSensitivePatientData());
    //res.send({test: "res"});
});

router.post('/', (req, res) => {
    try {

        //const { name, dateOfBirth, ssn, gender, occupation } = req.body;
        const newPatient = newEntrySchema.parse((req.body));
        const addedPatient = patientService.addPatient(newPatient);
        //const 
        res.json(addedPatient);
    } catch(error: unknown) {
        if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
        } else {
        res.status(400).send({ error: 'unknown error' });
        }
    }
});  

export default router;