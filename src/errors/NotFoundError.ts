export default class NotFoundError extends Error {
  constructor() {
    super("Sem resultados para esta busca!");

    this.name = "NotFoundError";
  }
}
