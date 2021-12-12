const express = require('express');
const router = express.Router();
const tf = require('@tensorflow/tfjs');

const {BPNN} = require('../bpnn-model.js');

router.get('/', async (req, res) => {
    const bpnn = new BPNN();
    predictUserData = async () => {
        await bpnn.load();
        const predictionResult = bpnn.predict(inputTensor).flatten();
        const resultArray = await tf.round(predictionResult).array();
        console.log(resultArray);
        res.render('pages/train', { prediction_result: resultArray });
    };

    //predictUserData();
    res.render('pages/train');
});

module.exports = router;