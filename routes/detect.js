const express = require('express');
const router = express.Router();
const tf = require('@tensorflow/tfjs');

const {BPNN} = require('../bpnn-model.js');
const datasetConst = require('../public/dataset/dataset_config.json');

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
    
    const GENDER_MIN = datasetConst.gender.GENDER_MIN;
    const GENDER_MAX = datasetConst.gender.GENDER_MAX;
    const AGE_MIN = datasetConst.age.AGE_MIN;
    const AGE_MAX = datasetConst.age.AGE_MAX;
    const HIPERTENSION_MIN = datasetConst.hipertension.HIPERTENSION_MIN;
    const HIPERTENSION_MAX = datasetConst.hipertension.HIPERTENSION_MAX;
    const HEART_MIN = datasetConst.heart.HEART_MIN;
    const HEART_MAX = datasetConst.heart.HEART_MAX;
    const MARRIED_MIN = datasetConst.married.MARRIED_MIN;
    const MARRIED_MAX = datasetConst.married.MARRIED_MAX;
    const WORK_MIN = datasetConst.work.WORK_MIN;
    const WORK_MAX = datasetConst.work.WORK_MAX;
    const RESIDENCE_MIN = datasetConst.residence.RESIDENCE_MIN;
    const RESIDENCE_MAX = datasetConst.residence.RESIDENCE_MAX;
    const GLUCOSE_MIN = datasetConst.glucose.GLUCOSE_MIN;
    const GLUCOSE_MAX = datasetConst.glucose.GLUCOSE_MAX;
    const BMI_MIN = datasetConst.bmi.BMI_MIN;
    const BMI_MAX = datasetConst.bmi.BMI_MAX;
    const SMOKE_MIN = datasetConst.smoke.SMOKE_MIN;
    const SMOKE_MAX = datasetConst.smoke.SMOKE_MAX;

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