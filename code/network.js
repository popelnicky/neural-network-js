import { ColorModel } from "./js/models/ColorModel.js";
import { NeuralNetwork } from "./js/services/NeuralNetwork.js";

const nn = new NeuralNetwork();

nn.train().then((results) => {
  const result = nn.recognize(new ColorModel(214, 127, 255));

  console.log(result);
});
