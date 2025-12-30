import { InscriptionException } from "../Exception/InscriptionException.js";
//declaration d'une enumeration pour l'eevenement 
export enum TypeEvenement {
    Conference = "CONFERENCE",
    Sport = "SPORT",
    Atelier = "ATELIER",
    Autre = "AUTRE"
}

export  class Evenement {
    private titre: string;
    private description: string;
    private date: Date;
    private lieu: string;
    private categorie: TypeEvenement;
    private capacite: number;
    private placeRestant : number;
     

    constructor( titre: string, description: string, date: Date, lieu: string, categorie: TypeEvenement, capacite: number
  ,placeRestant?: number) {
        this.titre = titre;
        this.description = description;
        this.date = date;
        this.lieu = lieu;
        this.categorie = categorie;
        this.capacite = capacite;
        this.placeRestant = placeRestant ?? capacite;
    }

    // Getters permettant d'acceder au differents donnees
    getTitre(): string {
        return this.titre;
    }

    getDescription(): string {
        return this.description;
    }

    getDate(): Date {
        return this.date;
    }

    getLieu(): string {
        return this.lieu;
    }

    getCategorie(): TypeEvenement {
        return this.categorie;
    }

    getCapacite(): number {
        return this.capacite;
    }
   getPlaceRestant() : number{
       return this.placeRestant;
   }
    
   estComplet () : boolean{
 return this.placeRestant <= 0;
}
   
 decrementation() : void{
    if(this.estComplet()){
        throw new InscriptionException("Pour cet évènement le nombre de places est plein");
    }
    else{
        this.placeRestant = this.placeRestant - 1 ;
    }
 }

    
}
