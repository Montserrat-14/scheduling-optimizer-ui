export class Objective {
  name: string;
  value: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
