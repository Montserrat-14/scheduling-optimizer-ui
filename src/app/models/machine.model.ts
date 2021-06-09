import { Operation } from "./operation.model";

export class Machine {
  name: string;
  operations: Array<Operation>;

  deserialize(input: any): this {
    this.operations = input.operations.map(elem => new Operation().deserialize(elem));
    Object.assign(this, input);
    return this;
  }
}
