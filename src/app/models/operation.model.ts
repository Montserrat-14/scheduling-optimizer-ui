export class Operation {
  id: number;
  job: string;
  startTime: number;
  endTime: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
