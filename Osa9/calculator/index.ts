//const express = require("express");
import express from 'express';
//const qs = require('qs');


//import { calculateBmi } from './bmiCalculator';
//import { calculateBmi } from './bmiCalculator';
const { calculateBmi } = require("./bmiCalculator");
const app = express();



app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack!");
});
app.get('/bmi', (req, res) => {

    
    //console.log(req.url);
    //const [, params] = req.url.split('?');
//
    //const parsedParams = qs.parse(params);
    //console.log(parsedParams);
    
    const a : number = Number(req.query.height) || 190;
    const b : number = Number(req.query.weight) || 89;


    const result : string = calculateBmi(a,b);
    res.send({weight: a,
        height: b,
        bmi: result});
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})