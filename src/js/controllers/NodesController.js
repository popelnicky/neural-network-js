import { Package } from "../models/Package.js";
import { NodeCommand } from "../models/NodeCommand.js";
import { NodeStatus } from "../models/NodeStatus.js";
import { Serializer } from "../services/Serializer.js";

export class NodesController {
  constructor(mainRef) {
    this.mainRef = mainRef;
    this.nodes = {};
    this.pool = [];
    this.packSize = 1024;
    this.start = 0;
  }

  signalFor(id) {
    let node = this.nodes[id];

    if (!node) {
      node = new Worker("network.min.js");

      this.nodes[id] = node;

      node.addEventListener("message", (resp) => {
        this.operate(resp.data);
      });

      this.sendTo(node, NodeCommand.SET_ID, id);
    }
  }

  run(pool) {
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

          this.mainRef.setResult(result);
        }

        if (this.start >= this.pool.length) {
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
      case NodeStatus.BUSY:
      case NodeStatus.ON: {
        setTimeout(() => {
          this.sendTo(node, NodeCommand.GET_STATUS);
        }, 1000);

        break;
      }
      default: {
      }
    }
  }

  sendTo(node, msg, data = null) {
    const payload = data ? Serializer.encode(data) : data;

    node.postMessage(new Package("main", msg, payload));
  }
}
