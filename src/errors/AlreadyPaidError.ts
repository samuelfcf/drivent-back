export default class AlreadyPaidError extends Error {
  constructor() {
    super("Este ingresso já foi pago!");
  
    this.name = "AlreadyPaidError";
  }
}
