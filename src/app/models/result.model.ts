import { Objective } from './objective.model';
import { Solution } from './solution.model';

export class Result {
  solution: Solution;
  objective: Objective;

  deserialize(input: any): this {
    this.solution = new Solution().deserialize(input.solution);
    this.objective = new Objective().deserialize(input.objective);
    return this;
  }

  getSolutionByIndex(index: number) {
    return this.solution.variables[index].value;
  }

  getObjectiveByIndex(index: number) {
    return this.objective.variables[index].value;
  }
}
