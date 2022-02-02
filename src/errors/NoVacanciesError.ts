
export default class NoVacanciesError extends Error {
  constructor() {
    super("Não há mais vagas nesta atividade!");
  
    this.name = "NoVacanciesError";
  }
}
