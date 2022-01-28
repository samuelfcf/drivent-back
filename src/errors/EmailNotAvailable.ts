import ConflictError from "@/errors/ConflictError";

export default class EmailNotAvailableError extends ConflictError {
  constructor(email: string) {
    super(`Email "${email}" está sendo utilizado por outro usuário!`);

    this.name = "EmailNotAvailableError";
  }
}
