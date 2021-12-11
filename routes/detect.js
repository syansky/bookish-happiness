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
    
    ageVal = parseFloat(age);
    bmiVal = parseFloat(bmi);
    glucoseVal = parseFloat(glucose);

    // Parameter mapping
    if (gender === 'male') {
        genderVal = 1;
    }
    else {
        genderVal = 0;
    }

    if (residence === 'urban') {
        residenceVal = 2;
    }
    else {
        residenceVal = 1;
    }

    if (work === 'govt-job') {
        workVal = 5;
    }
    else if (work === 'private') {
        workVal = 4;
    }
    else if (work === 'self-employed') {
        workVal = 3;
    }
    else if (work === 'children') {
        workVal = 2;
    }else {
        workVal = 1;
    }

    if (smoke === 'smokes') {
        smokeVal = 3;
    }
    else if (smoke === 'formerly-smoked') {
        smokeVal = 2;
    }
    else {
        smokeVal = 4;
    }
    
    if (hipertension === 'yes') {
        hipertensionVal = 1;
    }
    else {
        hipertensionVal = 0;
    }

    if (heart === 'yes') {
        heartVal = 1;
    }
    else {
        heartVal = 0;
    }

    if (married === 'yes') {
        marriedVal = 1;
    }
    else {
        marriedVal = 0;
    }

    const inputArray = [genderVal, ageVal, hipertensionVal, heartVal, marriedVal, workVal, residenceVal, glucoseVal, bmiVal, smokeVal];
    const inputTensor = tf.tensor(inputArray).reshape([-1, 10]);

    console.log(inputArray);

    const bpnn = new BPNN();
    predictUserData = async () => {
        await bpnn.load();
        const predictionResult = bpnn.predict(inputTensor).flatten();
        const resultArray = await predictionResult.array();
        console.log(resultArray);
        res.render('pages/detect', { prediction_result: resultArray });
    };

    predictUserData();
});

module.exports = router;