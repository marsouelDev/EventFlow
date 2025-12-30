import { Evenement } from "../models/Evenement.js";
import { TypeEvenement } from "../models/Evenement.js";
import { InscriptionException } from "../Exception/InscriptionException.js";


export class Main {
    
    private tabEvenement: Evenement[] = [];

      
    constructor() {
        this.tabEvenement = [];       
    }

    getTabEvenement(): Evenement[] {
        return this.tabEvenement;
    }

     /* methode permettant de sauvergarde mon tableau charge en memoire sur le navigateur*/
    private sauvergardeTableau() : void {
        localStorage.setItem("evenements",JSON.stringify(this.tabEvenement));
    }
    
    ajouterEvenement(e: Evenement): void {
        this.tabEvenement.push(e);
        this.sauvergardeTableau();
    } 
    /* methode permettant de charge mon tableau sur le navigateur  */
  charge(): void { 
    /* la lecture du localStorage grace au getItem */
  const data = localStorage.getItem("evenements");

/* permet de verifier si il y'a des donnees sur la tableau charge en memoire */
  if (!data) {
    this.tabEvenement = [];
    return;
  }
/* je transforme mon objet json en javascript*/
  const elements = JSON.parse(data);
/* je verifier que les donnees sont dans un tableau si ce n'est pas le cas on vide le tableau  */
  if (!Array.isArray(elements)) {
    this.tabEvenement = [];
    return;
  }

  this.tabEvenement = elements
  /* je filtre les elements valide */
    .filter(
      (e: any) =>
        e &&
        e.titre &&
        e.description &&
        e.date &&
        e.lieu && 
        e.categorie &&      
        e.capacite !== undefined &&
        e.placeRestant !== undefined
    )
    /*je selection tout les element pour afficher au navigateur */
    .map(
      (e: any) =>
        new Evenement(
          e.titre,
          e.description,
          new Date(e.date),
          e.lieu,
          e.categorie,
          e.capacite,
          e.placeRestant
        
        )
    );
}


nombrePlaceDecrementer(nomEvent: string, categorie: TypeEvenement): void {

  const categorieNorm = categorie.toLowerCase().trim();
  const evenement = this.getTabEvenement().find(e =>
    e.getTitre().trim() === nomEvent.trim() && e.getCategorie().toLowerCase().trim() === categorieNorm
  );

  if (!evenement) {
    throw new InscriptionException("L'événement n'existe pas !");
  }

  evenement.decrementation();
  this.sauvergardeTableau();
}

estEvenementPasse(e : Evenement): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dateEvent = new Date(e.getDate());
  dateEvent.setHours(0, 0, 0, 0);
   return dateEvent < today;

}
inscriptionPasse(nomEvent: string, categorie: TypeEvenement): void {
    const categorieNorm = categorie.toLowerCase().trim();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  const evenement = this.getTabEvenement().find(e =>
    e.getTitre().trim() === nomEvent.trim() && e.getCategorie().toLowerCase().trim() === categorieNorm 
  );
  
  if (!evenement) {
    throw new InscriptionException("L’événement n’existe pas");
  }

  if (this.estEvenementPasse(evenement)) {
    throw new InscriptionException(
      "Impossible de s’inscrire : l’événement est déjà terminé"
    );
  }
}


    }
   
