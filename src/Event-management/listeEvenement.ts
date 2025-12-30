import { Evenement, TypeEvenement } from "../models/Evenement.js";
import { Main } from "../Services/EventServices.js";

const contenue = document.getElementById("liste-event") as HTMLDivElement;
const rechercher = document.querySelector(".btn-rechercher") as HTMLButtonElement;
const afficher = document.querySelector(".btn-afficher") as HTMLButtonElement;
const filtrationDate = document.getElementById("date") as HTMLInputElement ; 
const filtrationCategorie = document.getElementById("categorie") as HTMLSelectElement;
const bouton = document.querySelector<HTMLButtonElement>("#theme button");
const image = document.getElementById("image") as HTMLImageElement;

bouton?.addEventListener("click", () => {
  document.body.classList.toggle("sombre");
    if (document.body.classList.contains("sombre")) {
    image.src = "/images/icone-soliel.jfif";
  } else {
    image.src = "/images/icone-lune.jpg";
  }
});


const app = new Main();
app.charge();

const evenement: Evenement[] = app.getTabEvenement();
function liste(Liste : Evenement[]) :void{

if (evenement.length === 0) {
    contenue.textContent = "Aucun evenement disponible ";
    contenue.style.textAlign = "center";
    contenue.style.fontSize = "20px";
    contenue.style.color = "#16c4bbff";
 
}

contenue.style.display = "grid";
contenue.style.gridTemplateColumns = "repeat(auto-fit, minmax(280px, 1fr))";
contenue.style.gap = "25px";
contenue.style.padding = "20px";

evenement.forEach((e) => {
    const card = document.createElement("div");
    card.classList.add("event-card");

/* fonction permettant de verifier si date d'un evenemet est passee c'est a dire verifier que la date de l'evenement soit petit que la date present */
   function estEvenementPasse(e: Evenement): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dateEvent = new Date(e.getDate());
  dateEvent.setHours(0, 0, 0, 0);

  return dateEvent < today;
}

const badge = document.createElement("span");
badge.classList.add("badge");

if (estEvenementPasse(e)) {
  card.classList.add("event-passe");
  badge.textContent = "Terminé";
  badge.classList.add("badge-termine");
} else {
  badge.textContent = "En cours";
  badge.classList.add("badge-encours");
}

card.appendChild(badge);

    const h3 = document.createElement("h3");
    h3.textContent = "Le titre de l'évènement est : " + e.getTitre();

    const pDate = document.createElement("p");
    pDate.textContent = "La date 📅 est le " + e.getDate().toLocaleDateString();

    const pLieu = document.createElement("p");
    pLieu.textContent = "Elle se déroule 📍 à " + e.getLieu();

    const pCategorie = document.createElement("p");
    pCategorie.textContent = "Elle est de type : " + e.getCategorie();

    const pCapacite = document.createElement("p");
    pCapacite.textContent =
        "Le nombre de places maximun👥 est de " + e.getCapacite().toLocaleString() + " places";

    
    const pCapaciteRestant = document.createElement("p");
    pCapaciteRestant.textContent =
        "Le nombre de places restant 👥 est de " + e.getPlaceRestant().toLocaleString() + " places";

    const actions = document.createElement("div");
    actions.classList.add("event-actions");

    const detail = document.createElement("button");
    detail.textContent = "Voir détails";
    detail.classList.add("bouton-details");

    const participer = document.createElement("button");
    participer.textContent = "Participer";
    participer.classList.add("bouton-participer");
    actions.append(detail, participer);
    
     detail.addEventListener("click",()=>{
       let pDetail = card.querySelector(".description") as HTMLParagraphElement;
           if(!pDetail){
            pDetail = document.createElement("p");
            pDetail.textContent = "les details sont : " + e.getDescription();
            pDetail.classList.add("description");
            card.insertBefore(pDetail,actions);
            detail.textContent = " masquer details";
           }
         else{
            pDetail.remove();
            detail.textContent = "voir detail";
        } 
    });
    /* permet de quitter du bouton participe sur la page liste.html vers inscription.html*/
     participer.addEventListener("click",()=>{
        const nomEvent = e.getTitre();
        const categorie = e.getCategorie();
        const parametre = new  URLSearchParams({event :nomEvent , type :categorie});
        window.location.href =`Inscription.html?${parametre.toString()}`;
         console.log("Bouton cliqué");
      
       }) ;
   /*permert de griser le bouton participer et qui vas se voir est Clôturé */
     if (estEvenementPasse(e)) {
  participer.disabled = true;
  participer.textContent = "Clôturé";
}

    card.append(h3, pDate, pLieu, pCategorie, pCapacite,pCapaciteRestant, actions);
    contenue.appendChild(card);   
});
}

liste(evenement);

function afficherEvenements (liste : Evenement[]) : void {
     contenue.innerHTML = "";
    if (liste.length === 0) {
    contenue.textContent = "Aucun evenement disponible ";
    contenue.style.textAlign = "center";
    contenue.style.fontSize = "20px";
    contenue.style.color = "#16c4bbff";
 
}

contenue.style.display = "grid";
contenue.style.gridTemplateColumns = "repeat(auto-fit, minmax(280px, 1fr))";
contenue.style.gap = "25px";
contenue.style.padding = "20px";

liste.forEach((e) => {
    const card = document.createElement("div");
    card.classList.add("event-card");

    const h3 = document.createElement("h3");
    h3.textContent = "Le titre de l'évènement est : " + e.getTitre();

    const pDate = document.createElement("p");
    pDate.textContent = "La date 📅 est le " + e.getDate().toLocaleDateString();

    const pLieu = document.createElement("p");
    pLieu.textContent = "Elle se déroule 📍 à " + e.getLieu();

    const pCategorie = document.createElement("p");
    pCategorie.textContent = "Elle est de type " + e.getCategorie();

    const pCapacite = document.createElement("p");
    pCapacite.textContent =
        "Le nombre de places 👥 est de " + e.getCapacite().toLocaleString() + " places";

    const actions = document.createElement("div");
    actions.classList.add("event-actions");

    const detail = document.createElement("button");
    detail.textContent = "Voir détails";
    detail.classList.add("bouton-details");

    const participer = document.createElement("button");
    participer.textContent = "Participer";
    participer.classList.add("bouton-participer");

    actions.append(detail, participer);
     detail.addEventListener("click",()=>{
       let pDetail = card.querySelector(".description") as HTMLParagraphElement;
           if(!pDetail){
            pDetail = document.createElement("p");
            pDetail.textContent = "les details sont : " + e.getDescription();
            pDetail.classList.add("description");
            card.insertBefore(pDetail,actions);
            detail.textContent = " masquer details";
           }
         else{
            pDetail.remove();
            detail.textContent = "voir detail";
        }
    })
   
    card.append(h3, pDate, pLieu, pCategorie, pCapacite, actions);
    contenue.appendChild(card);   
});

}

rechercher.addEventListener("click", () => {
  let resultal = evenement;

  const dateChoisir = filtrationDate.value;
  if (dateChoisir) {
    resultal = resultal.filter(ev => {
      const eventDate = new Date(ev.getDate());
      const eventDateTab = eventDate.toISOString().split("T")[0];
      return eventDateTab === dateChoisir;
    });
    
  }
    
  const categorieChoisir = filtrationCategorie.value;

  if (categorieChoisir ) {
    resultal = resultal.filter(ev => ev.getCategorie().toUpperCase() === categorieChoisir.toUpperCase());
    console.log("Après filtre catégorie :", resultal.length);
  }

  afficherEvenements(resultal);
});

afficher.addEventListener(("click"),()=>{

contenue.innerHTML = "";

contenue.style.display = "grid";
contenue.style.gridTemplateColumns = "repeat(auto-fit, minmax(280px, 1fr))";
contenue.style.gap = "25px";
contenue.style.padding = "20px";

evenement.forEach((e) => {
    const card = document.createElement("div");
    card.classList.add("event-card");

   function estEvenementPasse(e: Evenement): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dateEvent = new Date(e.getDate());
  dateEvent.setHours(0, 0, 0, 0);

  return dateEvent < today;
}

const badge = document.createElement("span");
badge.classList.add("badge");

if (estEvenementPasse(e)) {
  card.classList.add("event-passe");
  badge.textContent = "Terminé";
  badge.classList.add("badge-termine");
} else {
  badge.textContent = "En cours";
  badge.classList.add("badge-encours");
}

card.appendChild(badge);

    const h3 = document.createElement("h3");
    h3.textContent = "Le titre de l'évènement est : " + e.getTitre();

    const pDate = document.createElement("p");
    pDate.textContent = "La date 📅 est le " + e.getDate().toLocaleDateString();

    const pLieu = document.createElement("p");
    pLieu.textContent = "Elle se déroule 📍 à " + e.getLieu();

    const pCategorie = document.createElement("p");
    pCategorie.textContent = "Elle est de type : " + e.getCategorie();

    const pCapacite = document.createElement("p");
    pCapacite.textContent =
        "Le nombre de places maximun👥 est de " + e.getCapacite().toLocaleString() + " places";

    
    const pCapaciteRestant = document.createElement("p");
    pCapaciteRestant.textContent =
        "Le nombre de places restant 👥 est de " + e.getPlaceRestant().toLocaleString() + " places";

    const actions = document.createElement("div");
    actions.classList.add("event-actions");

    const detail = document.createElement("button");
    detail.textContent = "Voir détails";
    detail.classList.add("bouton-details");

    const participer = document.createElement("button");
    participer.textContent = "Participer";
    participer.classList.add("bouton-participer");
    actions.append(detail, participer);
    
     detail.addEventListener("click",()=>{
       let pDetail = card.querySelector(".description") as HTMLParagraphElement;
           if(!pDetail){
            pDetail = document.createElement("p");
            pDetail.textContent = "les details sont : " + e.getDescription();
            pDetail.classList.add("description");
            card.insertBefore(pDetail,actions);
            detail.textContent = " masquer details";
           }
         else{
            pDetail.remove();
            detail.textContent = "voir detail";
        } 
    });
    
     participer.addEventListener("click",()=>{
        const nomEvent = e.getTitre();
        const categorie = e.getCategorie();
        const parametre = new  URLSearchParams({event :nomEvent , type :categorie});
        window.location.href =`Inscription.html?${parametre.toString()}`;
         console.log("Bouton cliqué");
      
       }) ;
  
     if (estEvenementPasse(e)) {
  participer.disabled = true;
  participer.textContent = "Clôturé";
}

    card.append(h3, pDate, pLieu, pCategorie, pCapacite,pCapaciteRestant, actions);
    contenue.appendChild(card);   
});

});




