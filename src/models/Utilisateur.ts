export class Utilisateur {
  private nom: string;
  private email: string;

  constructor(nom: string, email: string) {
    this.nom = nom;
    this.email = email;
  }


  getNom(): string {
    return this.nom;
  }


  getEmail(): string {
    return this.email;
  }
  

}
