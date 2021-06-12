import { Machine } from "./machine.model";

export class Station {
  id: Number;
  machines: Array<Machine>;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.machines = input.machines.map(elem => new Machine().deserialize(elem));
    return this;
  }
}
