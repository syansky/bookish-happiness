require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const MODEL_URL = 'file://public/model/model.json';
const TRAIN_DATA_PATH = 'file://public/dataset/train_dataset.csv';
const TEST_DATA_PATH = 'file://public/dataset/test_dataset.csv';
const datasetConst = require('./public/dataset/dataset_config.json');

class BPNN {
    constructor() {};

    async load() {
        this.model = await tf.loadLayersModel(MODEL_URL);
        console.log('Model loaded.');
    };

    dispose() {
        if (this.model) {
          this.model.dispose();
        }
    };

    getModel() {
        return this.model;
    }

    predict(input) {
        return this.model.predict(input);
    }

    summary() {
        this.model.summary();
    };

    trainSetup() {
        function normalize(min, max, x) {
            y = (x-min) / (max-min);
            return y;
        }

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

        const TRAINING_DATA_LENGTH = 7278;
        const TEST_DATA_LENGTH = 2427;

        // Converts a row from the CSV into features and labels.
        // Each feature field is normalized within training data constants
        const csvTransform =
        ({xs, ys}) => {
        const values = [
            normalize(xs.gender, GENDER_MIN, GENDER_MAX), 
            normalize(xs.age, AGE_MIN, AGE_MAX), 
            normalize(xs.hipertension, HIPERTENSION_MIN, HIPERTENSIONMAX), 
            normalize(xs.heart, HEART_MIN, HEART_MAX), 
            normalize(xs.married, MARRIED_MIN, MARRIED_MAX), 
            normalize(xs.work, WORK_MIN, WORK_MAX), 
            normalize(xs.residence, RESIDENCE_MIN, RESIDENCE_MAX), 
            normalize(xs.glucose, GLUCOSE_MIN, GLUCOSE_MAX), 
            normalize(xs.bmi, BMI_MIN, BMI_MAX), 
            normalize(xs.smoke, SMOKE_MIN, SMOKE_MAX)
        ];
        return {xs: values, ys: ys.stroke};
        };

        // Load all training data in one batch to use for evaluation
        const trainingValidationData =
        tf.data.csv(TRAIN_DATA_PATH, {columnConfigs: {pitch_code: {isLabel: true}}})
            .map(csvTransform)
            .batch(TRAINING_DATA_LENGTH);

        // Load all test data in one batch to use for evaluation
        const testValidationData =
        tf.data.csv(TEST_DATA_PATH, {columnConfigs: {pitch_code: {isLabel: true}}})
            .map(csvTransform)
            .batch(TEST_DATA_LENGTH);

        return trainingValidationData;
    }
};

module.exports = {
    BPNN
};