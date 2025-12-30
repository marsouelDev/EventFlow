import { InscriptionException } from "../Exception/InscriptionException.js";
import { Inscription } from "../models/Inscription.js";

export class InscriptionService {

private tabInscription : Inscription[] = [];

constructor(){
    this.tabInscription;
     this.charger();
}

getTabInscription () : Inscription[]{
    return this.tabInscription;
}

 sauvegarder(): void {
    localStorage.setItem("inscriptions", JSON.stringify(this.tabInscription));
  }

   charger(): void {
    const data = localStorage.getItem("inscriptions");
    if (!data) return;

    const elements = JSON.parse(data);
    if (!Array.isArray(elements)) return;

    this.tabInscription = elements.map(
      (i: any) => new Inscription(i.nom, i.email, i.nomEvent, i.categorie)
    );
  }


ajouterInscription(I : Inscription) : void{
    this.tabInscription.push(I);
    this.sauvegarder();
}


   
VerifierPrescence(email :string,nomEvent : string ) : void  {
  const trouve = this.tabInscription.some(i => 
    i.getEmail() === email && i.getNomEvent() === nomEvent 
  );
  if(trouve){
    throw new InscriptionException (" Vous etez déjà inscrit à cet évènement");
  }
 
}
  
}