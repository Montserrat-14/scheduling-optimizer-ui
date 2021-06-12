import { Operation } from "./operation.model";

export class Machine {
  name: string;
  operations: Array<Operation>;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.operations = input.operations.map(elem => new Operation().deserialize(elem));
    return this;
  }
}
