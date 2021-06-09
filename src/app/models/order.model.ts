import { Solution } from "./solution.model";

export class Order {
  solutions: Array<Solution>;

  deserialize(input: any): this {
    this.solutions = input.solutions.map(elem => new Solution().deserialize(elem));
    return this;
  }
}
