require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const MODEL_URL = 'file://public/model/model.json';

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

    predict(input) {
        return this.model.predict(input);
    }

    summary() {
        this.model.summary();
    };
};

module.exports = {
    BPNN
};