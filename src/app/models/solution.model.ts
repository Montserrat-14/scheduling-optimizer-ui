import { Objective } from "./objective.model";
import { Station } from "./station.model";

export class Solution {
  stations: Array<Station>;
  objectives: Array<Objective>;

  deserialize(input: any): this {
    this.objectives = input.objectives.map(elem => new Objective().deserialize(elem));
    this.stations = input.stations.map(elem => new Station().deserialize(elem));
    return this;
  }
}
