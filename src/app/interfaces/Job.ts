import { Operation } from "./Operation";

export interface Job {
  name: string;
  description: string;
  operations?: Array<Operation>
}
