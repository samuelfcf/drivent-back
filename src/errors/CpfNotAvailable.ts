import ConflictError from "@/errors/ConflictError";

export default class CpfNotAvailableError extends ConflictError {
  constructor(cpf: string) {
    super(`CPF "${cpf}" já está cadastrado!`);

    this.name = "CpfNotAvailable";
  }
}
