export interface Endpoint<Input, Output> {
  /** The endpoint name. */
  name: string;

  /** Convert the client input to Lyft's expected query string param. */
  convertInput(input: Input): any;

  /** Convert Lyft's output to the client's output. */
  convertOutput(output: any): Output;
}
