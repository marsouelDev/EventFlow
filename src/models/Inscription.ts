import { TypeEvenement } from "./Evenement.js";
export class Inscription {
  private nom: string;
  private email: string;
  private nomEvent : string;
  private categarie : TypeEvenement;

  constructor(nom: string, email: string, nomEvent : string, categarie : TypeEvenement) {
    this.nom = nom;
    this.email = email;
    this.nomEvent = nomEvent;
    this.categarie = categarie;
  }

  getNom(): string {
    return this.nom;
  }

  getEmail(): string {
    return this.email;
  }
    getNomEvent(): string {
    return this.nomEvent;
  }

  getCategarie(): TypeEvenement {
    return this.categarie;
  }

}
