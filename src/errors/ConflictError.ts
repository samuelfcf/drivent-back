export default class ConflictError extends Error {
  object: any;
  constructor(message: string, object?: any) {
    super(message);

    this.name = "ConflictError";
    this.object = object;
  }
}
