const express = require('express');
const router = express.Router();
const tf = require('@tensorflow/tfjs');

const {BPNN} = require('../bpnn-model.js');

router.get('/', async (req, res) => {
    res.render('pages/detect');
});

router.post('/', async (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const bmi = req.body.bmi;
    const glucose = req.body.glucose;
    const residence = req.body.residence;
    const work = req.body.work;
    const smoke = req.body.smoke;
    const hipertension = req.body.hipertension;
    const heart = req.body.heart;
    const married = req.body.married;

    var ageVal, genderVal, bmiVal, glucoseVal, residenceVal, workVal, smokeVal, hipertensionVal, heartVal, marriedVal;
    
    const GENDER_MIN = 1;
    const GENDER_MAX = 3;
    const AGE_MIN = 0.08;
    const AGE_MAX = 82;
    const HIPERTENSION_MIN = 0;
    const HIPERTENSION_MAX = 1;
    const HEART_MIN = 0;
    const HEART_MAX = 1;
    const MARRIED_MIN = 0;
    const MARRIED_MAX = 1;
    const WORK_MIN = 1;
    const WORK_MAX = 5;
    const RESIDENCE_MIN = 1;
    const RESIDENCE_MAX = 2;
    const GLUCOSE_MIN = 55.12;
    const GLUCOSE_MAX = 271.74;
    const BMI_MIN = 10.3;
    const BMI_MAX = 78;
    const SMOKE_MIN = 1;
    const SMOKE_MAX = 4;

    function normalize(min, max, x) {
        y = (x-min) / (max-min);
        return y;
    }

    ageVal = parseFloat(normalize(AGE_MIN, AGE_MAX, age));
    bmiVal = parseFloat(normalize(BMI_MIN, BMI_MAX, bmi));
    glucoseVal = parseFloat(normalize(GLUCOSE_MIN, GLUCOSE_MAX, glucose));

    // Parameter mapping
    if (gender === 'male') {
        genderVal = parseFloat(normalize(GENDER_MIN, GENDER_MAX, 1));
    }
    else {
        genderVal = parseFloat(normalize(GENDER_MIN, GENDER_MAX, 0));
    }

    if (residence === 'urban') {
        residenceVal = parseFloat(normalize(RESIDENCE_MIN, RESIDENCE_MAX, 2));
    }
    else {
        residenceVal = parseFloat(normalize(RESIDENCE_MIN, RESIDENCE_MAX, 1));
    }

    if (work === 'govt-job') {
        workVal = parseFloat(normalize(WORK_MIN, WORK_MAX, 5));
    }
    else if (work === 'private') {
        workVal = parseFloat(normalize(WORK_MIN, WORK_MAX, 4));
    }
    else if (work === 'self-employed') {
        workVal = parseFloat(normalize(WORK_MIN, WORK_MAX, 3));
    }
    else if (work === 'children') {
        workVal = parseFloat(normalize(WORK_MIN, WORK_MAX, 2));
    }else {
        workVal = parseFloat(normalize(WORK_MIN, WORK_MAX, 1));
    }

    if (smoke === 'smokes') {
        smokeVal = parseFloat(normalize(SMOKE_MIN, SMOKE_MAX, 3));
    }
    else if (smoke === 'formerly-smoked') {
        smokeVal = parseFloat(normalize(SMOKE_MIN, SMOKE_MAX, 2));
    }
    else {
        smokeVal = parseFloat(normalize(SMOKE_MIN, SMOKE_MAX, 4));
    }
    
    if (hipertension === 'yes') {
        hipertensionVal = parseFloat(normalize(HIPERTENSION_MIN, HIPERTENSION_MAX, 1));
    }
    else {
        hipertensionVal = parseFloat(normalize(HIPERTENSION_MIN, HIPERTENSION_MAX, 0));
    }

    if (heart === 'yes') {
        heartVal = parseFloat(normalize(HEART_MIN, HEART_MAX, 1));
    }
    else {
        heartVal = parseFloat(normalize(HEART_MIN, HEART_MAX, 0));
    }

    if (married === 'yes') {
        marriedVal = parseFloat(normalize(MARRIED_MIN, MARRIED_MAX, 1));
    }
    else {
        marriedVal = parseFloat(normalize(MARRIED_MIN, MARRIED_MAX, 0));
    }

    const inputArray = [genderVal, ageVal, hipertensionVal, heartVal, marriedVal, workVal, residenceVal, glucoseVal, bmiVal, smokeVal];
    const inputTensor = tf.tensor(inputArray).reshape([-1, 10]);

    console.log(inputArray);

    const bpnn = new BPNN();
    predictUserData = async () => {
        await bpnn.load();
        const predictionResult = bpnn.predict(inputTensor).flatten();
        const resultArray = await tf.round(predictionResult).array();
        console.log(resultArray);
        res.render('pages/detect', { prediction_result: resultArray });
    };

    predictUserData();
});

module.exports = router;