import { Result } from "./result.model";

export class Problem {
  results: Array<Result>;

  deserialize(input: any): this {
    this.results = input.results.map(elem => new Result().deserialize(elem));
    return this;
  }
}
