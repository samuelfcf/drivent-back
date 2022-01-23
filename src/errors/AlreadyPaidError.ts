export default class AlreadyPaidError extends Error {
  constructor() {
    super("This ticket has been paid already!");
  
    this.name = "AlreadyPaidError";
  }
}
