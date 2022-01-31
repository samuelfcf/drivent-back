export default class InvalidUserError extends Error {
  constructor() {
    super("Combinação entre email e senha não encontrada!");
  
    this.name = "InvalidUserError";
  }
}
