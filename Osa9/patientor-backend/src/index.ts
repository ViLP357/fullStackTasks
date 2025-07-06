import express from 'express';
import diagnosisRoute from './routes/diagnoses';
import patientRoute from './routes/patients';
import cors from 'cors';
const app = express();
app.use(express.json());

const PORT = 3000;
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});


app.use('/api/diagnoses', diagnosisRoute);

app.use('/api/patients', patientRoute);

//app.use('/api/patients', )

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});