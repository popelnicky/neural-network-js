import { Architect, Trainer } from "synaptic";
import trainCfg from "../models/train_config.json";

export class NeuralNetwork {
  constructor() {
    this.perceptron = null;
    this.trainer = null;
    this.colors = [];
  }

  async train() {
    return new Promise((resolve, reject) => {
      const result = { status: "ok", data: null };

      if (this.trainer) {
        result.data = { message: "already trained" };

        resolve(result);

        return;
      }

      this.colors = trainCfg.colors;

      this.perceptron = new Architect.Perceptron(3, 14, this.colors.length);
      this.trainer = new Trainer(this.perceptron);

      const data = this.trainer.train(trainCfg.set, {
        rate: 0.1,
        iterations: 100000,
        error: 0.005,
        shuffle: true,
        cost: Trainer.cost.CROSS_ENTROPY,
      });

      result.data = data;

      resolve(result);
    });
  }

  recognize(color) {
    let result = [];

    if (this.perceptron) {
      const data = this.perceptron.activate([
        color.R / 255,
        color.G / 255,
        color.B / 255,
      ]);
      let decision = 0;
      let max = 0;

      for (let i = 0; i < data.length; i++) {
        const val = data[i];

        if (val > max) {
          decision = i;
          max = val;
        }
      }

      result = this.colors[decision];
    }

    return result;
  }
}
