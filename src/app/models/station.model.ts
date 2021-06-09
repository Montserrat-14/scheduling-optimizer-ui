import { Machine } from "./machine.model";

export class Station {
  machines: Array<Machine>;

  deserialize(input: any): this {
    this.machines = input.machines.map(elem => new Machine().deserialize(elem));
    return this;
  }
}
