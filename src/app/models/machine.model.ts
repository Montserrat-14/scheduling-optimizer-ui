import { Operation } from "./operation.model";

export class Machine {
  operations: Array<Operation>;

  deserialize(input: any): this {
    this.operations = input.map(elem => new Operation().deserialize(elem));
    return this;
  }
}
