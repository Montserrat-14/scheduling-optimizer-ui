import { Variable } from "./variable.model";

export class Objective {
  variables: Array<Variable>;

  deserialize(input: any): this {
    this.variables = input.map(elem => new Variable().deserialize(elem));
    return this;
  }
}
