import { Result } from "./result.model";

export class Problem {
  id: number;
  results: Array<Result>;

  deserialize(input: any): this {
    this.id = input.id;
    this.results = input.results.map(elem => new Result().deserialize(elem));
    return this;
  }
}
