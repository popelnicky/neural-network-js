import { NodeStatus } from "../models/NodeStatus.js";
import { Package } from "../models/Package.js";
import { NeuralNetwork } from "../services/NeuralNetwork.js";
import { Serializer } from "../services/Serializer.js";

export class NetworkController {
  constructor() {
    this.pool = [];

    this.neuralNode = new NeuralNetwork();
  }

  async run() {
    self.addEventListener("message", (req) => {
      this.handle(req);
    });

    this.send(NodeStatus.ON);

    await this.neuralNode.train();

    this.send(NodeStatus.READY);
  }

  handle(req) {
    console.log("On the worker layer:");
    console.log(req);
    console.log(self.btoa(req.data));
  }

  send(status, data = null) {
    self.postMessage(
      new Package(status, data ? Serializer.encode(data) : data)
    );
  }
}
