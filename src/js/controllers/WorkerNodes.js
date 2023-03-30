import { Package } from "../models/Package.js";
import { NodeCommand } from "../constants/NodeCommand.js";
import { NodeStatus } from "../constants/NodeStatus.js";
import { Serializer } from "../services/Serializer.js";

export class WorkerNodes {
  constructor(main) {
    this.main = main;
    this.nodes = {};
    this.pool = [];
    this.packSize = 1024;
    this.start = 0;
  }

  dispatchTo(id, status) {
    let node = this.nodes[id];

    if (!node) {
      node = new Worker("network.min.js");

      this.nodes[id] = node;

      node.addEventListener("message", (resp) => {
        this.operate(resp.data);
      });

      this.sendTo(node, NodeCommand.SET_ID, id);
    }

    this.sendTo(node, status, id);
  }

  recognize(pool) {
    if (this.pool.length > 0) {
      return;
    }

    this.pool = pool;
    this.start = 0;

    for (let id in this.nodes) {
      const node = this.nodes[id];

      this.sendTo(node, NodeCommand.GET_STATUS);
    }
  }

  operate(pkg) {
    const node = this.nodes[pkg.from];

    switch (pkg.msg) {
      case NodeStatus.READY: {
        if (pkg.payload) {
          const result = Serializer.decode(pkg.payload);

          this.main.setResult(result);
        }

        if (this.start >= this.pool.length) {
          this.pool = [];

          return;
        }

        const end =
          this.pool.length - this.start < this.packSize
            ? this.pool.length
            : this.start + this.packSize;
        const pack = this.pool.slice(this.start, end);

        this.start += this.packSize;

        this.sendTo(node, NodeCommand.RECOGNIZE, pack);

        break;
      }
    }
  }

  sendTo(node, msg, data = null) {
    const payload = data ? Serializer.encode(data) : data;

    node.postMessage(new Package("main", msg, payload));
  }
}
