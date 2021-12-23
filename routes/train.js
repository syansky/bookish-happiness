const express = require('express');
const router = express.Router();
const tf = require('@tensorflow/tfjs');

const {BPNN} = require('../bpnn-model.js');

router.get('/', async (req, res) => {
    const bpnn = new BPNN();

    trainSetup = async () => {
        await bpnn.load();
        const trainDataset = bpnn.trainSetup();

        console.log(trainDataset);
        res.render('pages/train', { trainSet: trainDataset });
   };

   trainSetup();
});

router.get('/model', async (req, res) => {
    const modelJson = 'C:/Users/yansk/Documents/Visual Studio Code/UNTAR/Skripsi/public/model/model.json';
    res.download(modelJson);
});

router.get('/group1-shard1of1.bin', async (req, res) => {
    const modelBin = 'C:/Users/yansk/Documents/Visual Studio Code/UNTAR/Skripsi/public/model/group1-shard1of1.bin';
    res.download(modelBin);
});

module.exports = router;