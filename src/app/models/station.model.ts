import { Machine } from "./machine.model";

export class Station {
  id: Number;
  machines: Array<Machine>;

  deserialize(input: any): this {
    this.machines = input.machines.map(elem => new Machine().deserialize(elem));
    Object.assign(this, input);
    return this;
  }
}
