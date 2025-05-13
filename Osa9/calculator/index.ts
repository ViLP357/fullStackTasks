//const express = require("express");
import express from 'express';
//import { calculateBmi } from './bmiCalculator';
//import { calculateBmi } from './bmiCalculator';
const { calculateBmi } = require("./bmiCalculator");
const app = express();

app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack!");
});
app.get('/bmi', (_req, res) => {
    const a : number = Number(190);
    const b : number = Number(80);

    const result : string = calculateBmi(a,b);
    res.send({weight: a,
        height: b,
        bmi: result});
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})