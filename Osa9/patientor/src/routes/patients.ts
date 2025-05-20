import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    //console.log(patientService.getNonSensitivePatientData());
    res.send(patientService.getNonSensitivePatientData());
    //res.send({test: "res"});
});

export default router;