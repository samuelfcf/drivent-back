export default class UnsubscribeTimeOverError extends Error {
  constructor() {
    super("O período para se desinscrever dessa atividade já passou!");
  
    this.name = "UnsubscribeTimeOverError";
  }
}
