//const express = require("express");
import express from 'express';
//const qs = require('qs');


//import { calculateBmi } from './bmiCalculator';
//import { calculateBmi } from './bmiCalculator';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//import calculateBmi from "./calculateExercises";
const { calculateBmi } = require("./bmiCalculator");
const { CalculateExercises } = require("./calculateExercises");
const app = express();
app.use(express.json());



app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack!");
});
app.get('/bmi', (req, res) => {

    const a : number = Number(req.query.height);
    const b : number = Number(req.query.weight);
    if (isNaN(a) || isNaN(b)) {
        res.send({error: "malformatted parameters"});
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result : string = calculateBmi(a,b);
    res.send({weight: a,
        height: b,
        bmi: result});
});

app.post('/exercises', (req, res) => {
    try {

        const content = req.body;
        console.log(content);
        
        if (isNaN(Number(content.target))) {
            //console.log("puuttu");
            res.status(400).send({error: "malformatted parameters"});
        }
        
        if (content.length<2||content.daily_exercises.length<1) {
            res.status(400).send({error: "parameters missing"});
        }
        if (!("target" in content)) {
            res.status(400).send({error: "parameters missing"});
        }
        for (const val of content.daily_exercises) {
            if (isNaN(Number(val))) {
                res.status(400).send({error: "malformatted parameters"});
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const json = CalculateExercises(content.daily_exercises, content.target);
        
        res.json(json);
    } catch(error) {
        console.log("Faiil");
        res.send({error: error.status});
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});