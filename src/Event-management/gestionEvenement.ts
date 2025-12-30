console.log("mais change avec succes vous pouvez commencer l'enregistrement")
import { Evenement } from "../models/Evenement.js";
import { Main } from "../Services/EventServices.js";
import { TypeEvenement } from "../models/Evenement.js";

const formulaire = document.getElementById("evenement-form") as HTMLFormElement;
const titre = document.getElementById("title") as HTMLInputElement;
const description = document.getElementById("description") as HTMLTextAreaElement;
const date = document.getElementById("date") as HTMLInputElement;
const lieu = document.getElementById("location") as HTMLInputElement;
const categorie = document.getElementById("category") as HTMLSelectElement;
const capacite = document.getElementById("capacity") as HTMLInputElement; 
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

const app = new Main() ;


/*fonction permettant d'afficher le champs description en rouges si il y'a erreur*/

function showErreurArea(area : HTMLTextAreaElement, messageArea : string){
  area.classList.add("error-area");

  let errorArea = area.parentElement?.querySelector(".error-message") as HTMLDivElement;

  if(!errorArea){
    errorArea = document.createElement("div"); 
    errorArea.className = "error-message";
    area.parentElement?.appendChild(errorArea);
  }

  errorArea.textContent = messageArea;
}
function clearErreurArea(area: HTMLTextAreaElement): void {
  area.classList.remove("error-area");
  const error = area.parentElement?.querySelector(".error-message");
  if (error) {
    error.remove();
  }
}

/* fonction permettant d'afficher le champs description  correct en  vert  */
function showCorrectDescription(area : HTMLTextAreaElement ) : void {
  area.classList.remove("error-area");
  area.classList.add("succes-area");
  area.classList.remove("error-area")
  const error = area.parentElement?.querySelector(".error-message")
  if(error){
    error.remove();
  }else{
    description.classList.remove("succes-area");
  } 
}
/*fonction permettant de verifier si le champs description  pleine et afficher les champs en vert*/

function correctDescription(): void {
  if (description.value.trim() !== "") {
    showCorrectDescription(description);
  }
}
/* fonction permettant d'afficher les autres champs en rouges si il y'a erreur */

function showErreurInput(input: HTMLInputElement , message: string): void {
  input.classList.add("error-input");

  let error = input.parentElement?.querySelector(".error-message") as HTMLDivElement;

  if (!error) {
    error = document.createElement("div");
    error.className = "error-message";
    input.parentElement?.appendChild(error);
  }

  error.textContent = message;
}

function clearErreurInput(input: HTMLInputElement) : void{
  input.classList.remove("error-input");
  const error = input.parentElement?.querySelector(".error-message");

  if(error){
    error.remove();
  }
}

/* fonction permettant d'afficher le champs titre  correct en  vert  */
function showCorrectTitre(input : HTMLInputElement ) : void {
  input.classList.remove("error-input");
  input.classList.add("succes-input");
  input.classList.remove("error-input")
  const error = input.parentElement?.querySelector(".error-message")
  if(error){
    error.remove();
  }else{
    titre.classList.remove("succes-input");
  } 
}
/*fonction permettant de verifier si le champs titre  pleine et afficher les champs en vert*/

function correctTitre(): void {
  if (titre.value.trim() !== "") {
    showCorrectTitre(titre);
  }
}
/* fonction permettant d'afficher le champs date  correct en  vert  */
function showCorrectDate(input : HTMLInputElement ) : void {
  input.classList.remove("error-input");
  input.classList.add("succes-input");
  input.classList.remove("error-input")
  const error = input.parentElement?.querySelector(".error-message")
  if(error){
    error.remove();
  }else{
    date.classList.remove("succes-input");
  } 
}
/*fonction permettant de verifier si le champs date  pleine et afficher les champs en vert*/

function correctDate(): void {
  if (date.value.trim() !== "") {
    showCorrectDate(date);
  }
}
/* fonction permettant d'afficher le champs localisation  correct en  vert  */
function showCorrectLocation(input : HTMLInputElement ) : void {
  input.classList.remove("error-input");
  input.classList.add("succes-input");
  input.classList.remove("error-input")
  const error = input.parentElement?.querySelector(".error-message")
  if(error){
    error.remove();
  }else{
    lieu.classList.remove("succes-input");
  } 
}
/*fonction permettant de verifier si le champs localisation  pleine et afficher les champs en vert*/

function CorrectLocation(): void {
  if (lieu.value.trim() !== "") {
    showCorrectLocation(lieu);
  }
}

/* fonction permettant de verifier si ses champs sont pleines */

function valideFormulaire() : boolean {
  let isValid : boolean = true;

  if(titre.value.trim() === ""){
    showErreurInput(titre,"Le titre est obligatoire");
    isValid = false;
  }
  else{
    clearErreurInput(titre);
  }

  if(description.value.trim() === ""){
    showErreurArea(description,"La description est obligatoire");
    isValid = false;
  }
  else{
    clearErreurArea(description);
  }

  if(date.value.trim() === ""){
    showErreurInput(date,"La date est obligatoire");
    isValid = false;
  } else {
    // Validation date inférieure à aujourd'hui
    const dateEvenement = new Date(date.value).setHours(0, 0, 0, 0);;
    const today = new Date().setHours(0, 0, 0, 0);;
   
    if (dateEvenement < today) {
      showErreurInput(date, "La date ne peut pas être antérieure à aujourd'hui");
      isValid = false;
    } else {
      clearErreurInput(date);
    }
  }

  if(lieu.value.trim() === ""){
    showErreurInput(lieu,"Le lieu est obligatoire");
    isValid = false;
  }
  else{
    clearErreurInput(lieu);
  }

  return isValid;
}

  titre.addEventListener("keyup", correctTitre);
  titre.addEventListener("blur", correctTitre);
  date.addEventListener("change", correctDate);
  date.addEventListener("blur", correctDate);
  lieu.addEventListener("keyup", CorrectLocation);
  lieu.addEventListener("blur", CorrectLocation);
  description.addEventListener("keyup", correctDescription);
  description.addEventListener("blur", correctDescription);

formulaire.addEventListener( "submit", (event)=>{

    event.preventDefault();
   
    if(!valideFormulaire()){
      return;
    }
    /*  le charge des anciens evenement, elles restent même après rechargement  */
    app.charge();
    /* ajout de d'un evenement dans la table d'evenement */
        const newEvenement:Evenement = new Evenement(titre.value,description.value,new Date(date.value),lieu.value,categorie.value as  TypeEvenement ,Number(capacite.value));
        app.ajouterEvenement(newEvenement);
          localStorage.setItem(
    "evenements",JSON.stringify(app.getTabEvenement())
  );
       const messageSucces = document.createElement("div");
       messageSucces.textContent = "Évènement ajouté avec succès !";
       messageSucces.style.position = "fixed";
       messageSucces.style.top = "50%";                
       messageSucces.style.right = "20px";             
       messageSucces.style.transform = "translateY(-50%)"; 

       messageSucces.style.padding = "12px 24px";
       messageSucces.style.background = "#22c55e";
       messageSucces.style.color = "white";
       messageSucces.style.borderRadius = "8px";
       messageSucces.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
       messageSucces.style.fontWeight = "600";
       messageSucces.style.zIndex = "1000";

       document.body.appendChild(messageSucces);

       setTimeout(() => messageSucces.remove(), 3000);
       formulaire.reset();

})

