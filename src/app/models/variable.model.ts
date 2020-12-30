export class Variable {
  name: string;
  value: any;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
