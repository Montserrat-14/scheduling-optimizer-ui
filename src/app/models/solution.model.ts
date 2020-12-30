import { Variable } from "./variable.model";

export class Solution {
  variables: Array<Variable>;

  deserialize(input: any): this {
    this.variables = input.map(elem => new Variable().deserialize(elem));
    return this;
  }
}
