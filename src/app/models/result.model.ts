import { Objective } from "./objective.model";
import { Station } from "./station.model";

export class Result {
  stations: Array<Station>;
  objectives: Array<Objective>;

  deserialize(input: any): this {
    this.stations = input.map(elem => new Station().deserialize(elem));
    this.objectives = input.map(elem => new Objective().deserialize(elem));
    return this;
  }
}
