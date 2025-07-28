import { useParams } from "react-router-dom";
import patientService from '../../services/patients';
import diagnoseService from '../../services/diagnoses';
import { useState, useEffect } from "react";
import { Patient, Gender, Entry, Diagnosis } from '../../types';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HospitalEntry = ({e, diagnoses} : Props) => {
    return (
        <div style={{ border: "1px solid black", padding: "5px", borderRadius: "10px", margin: "5px"}}>
            <p key={e.id}>
                <p>{e.date} <LocalHospitalIcon style={{color: "black"}}></LocalHospitalIcon>  </p>
                <p>{e.description}</p>
                
                    {e.diagnosisCodes?.map((d: string) => (
                        <li key ={d}> {d}{" "} 
                            {diagnoses.find((dg: Diagnosis) => dg['code'] === d).name}
                        </li>
                    ))}
                <p>Diagnose by {e.specialist}</p>
            </p>
    
        </div>
    );
};
const OccupationalEntry = ({e, diagnoses} : Props) => {
    return (
        <div style={{ border: "1px solid black", padding: "5px", borderRadius: "10px", margin: "5px"}}>
            <p key={e.id}>
                <p>{e.date} <WorkIcon style={{color:"black"}}/> {e.employerName}</p>
                <p>{e.description}</p>
                    {e.diagnosisCodes?.map((d: string) => (
                        <li key ={d}> {d}{" "} 
                            {diagnoses.find((dg: Diagnosis) => dg['code'] === d).name}
                        </li>
                    ))}
                <p>Diagnose by {e.specialist}</p>
            </p>
    
        </div>
    );
};

const HealthCheckEntry = ({e, diagnoses} : Props) => {
    if (!diagnoses) return (
        <p>Loading</p>
    );

    let heartColor : string = "green";
    if (e.healthCheckRating === 1) heartColor = "yellow";
    if (e.healthCheckRating === 2) heartColor = "orange";
    if (e.healthCheckRating === 3) heartColor = "red";
    return (
        <div style={{ border: "1px solid black", padding: "5px", borderRadius: "10px", margin: "5px"}}>
            <p key={e.id}>
                <p>{e.date}<MedicalServicesIcon style={{color: "black"}}/> </p>
                <p>{e.description}</p>

                <FavoriteIcon style={{color: heartColor}}/>

                    {e.diagnosisCodes?.map((d: string) => (
                        <li key ={d}> {d}{" "} 
                            {diagnoses.find((dg: Diagnosis) => dg['code'] === d).name}
                        </li>
                    ))}
                <p>Diagnose by {e.specialist}</p>
            </p>
    
        </div>
    );
};

interface Props {
    e: Entry
    diagnoses: Diagnosis[]
}

const EntryObj = ({e, diagnoses} : Props) => {
    switch (e.type) {
        case "Hospital":
            return <HospitalEntry e={e} diagnoses={diagnoses}/>;
        case "OccupationalHealthcare":
            return <OccupationalEntry e={e} diagnoses={diagnoses}/>;
        default: 
            return <HealthCheckEntry e={e} diagnoses={diagnoses}/>;
    }
};

const PatientPage = () => {
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
    const [ diagnoses, setDiagnoses ] = useState<Diagnosis[]>([]);


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

    useEffect(() => {
        const fetchDiagnoseList = async () => {
            const diagnoses = await diagnoseService.getAll();
            setDiagnoses(diagnoses);
        };
    void fetchDiagnoseList();
    }, []);

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
        <h3>entries</h3>
        {newPatient.entries?.map((e: Entry) => (
            <EntryObj e={e} diagnoses= {diagnoses}/>
        ))}
        </div>
    );
} 
return (<p></p>);
};

export default PatientPage;