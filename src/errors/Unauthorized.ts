export default class UnauthorizedError extends Error {
  constructor() {
    super("Você precisa estar logado para continuar");

    this.name = "UnauthorizedError";
  }
}
