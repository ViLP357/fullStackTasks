import { useParams } from "react-router-dom";
import patientService from '../../services/patients';
import { useState, useEffect } from "react";
import { Patient, Gender } from '../../types';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const PatientPage =  () => {
    const empty = {
          id: '',
          name: '',
          occupation: '',
          gender: Gender.Other,
          ssn: '',
          dateOfBirth: '',
          entries: []
    };

    const [ newPatient, setNewPatient ] = useState<Patient>(empty);


    const {id}  = useParams();
    
    useEffect(() => {
        const loader = async () => {
            if (id) {
                const data = await patientService.getOnePatient(id);
                setNewPatient(data);
            }
        };
        loader();
    }, );

    if (id) {

    
    return (
        <div>
        <h2>{newPatient.name}
        {newPatient.gender==="male" && <MaleIcon style={{color: 'black'}}></MaleIcon>}
        {newPatient.gender==="female" && <FemaleIcon style={{color: 'black'}}></FemaleIcon>}

        {newPatient.gender==="other"  && <QuestionMarkIcon style={{color: 'black'}}></QuestionMarkIcon>}
        </h2>
        <p>ssn: {newPatient.ssn}</p>
        <p>Occupation: {newPatient.occupation}</p>
        </div>
    );
} 
return (<p></p>);
};

export default PatientPage;