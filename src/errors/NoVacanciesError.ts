export default class NoVacanciesError extends Error {
  object: any
  constructor(object: any) {
    super("Não há mais vagas nesta atividade!");
  
    this.name = "NoVacanciesError";
    this.object = object;
  }
}
