export default class CannotEnrollBeforeStartDateError extends Error {
  constructor() {
    super("O cadastro não é permitido antes do início do evento!");

    this.name = "CannotEnrollBeforeStartDateError";
  }
}
