import { UtilisateurService } from "../Services/utilsateurService.js";
import { InscriptionService } from "../Services/InscriptionService.js";
import { Utilisateur } from "../models/Utilisateur.js";
import { Inscription } from "../models/Inscription.js";
import { Evenement } from "../models/Evenement.js";
import { TypeEvenement } from "../models/Evenement.js";
import { InscriptionException } from "../Exception/InscriptionException.js";
import { Main } from "../Services/EventServices.js";
const categorie = document.getElementById("reg-event") as HTMLSelectElement;
const nom = document.getElementById("user-nameEtudiant") as HTMLInputElement;
const email = document.getElementById("user-email") as HTMLInputElement;
const nomEvent = document.getElementById("user-name") as HTMLInputElement;
const formulaire = document.getElementById("registration-form") as HTMLFormElement;
const bouton = document.querySelector<HTMLButtonElement>("#theme button");
const image = document.getElementById("image") as HTMLImageElement;

const soumettre = new InscriptionService();
const user = new UtilisateurService();
const app = new Main();


bouton?.addEventListener("click", () => {
  document.body.classList.toggle("sombre");
    if (document.body.classList.contains("sombre")) {
    image.src = "/images/icone-soliel.jfif";
  } else {
    image.src = "/images/icone-lune.jpg";
  }
});

/* recupere les valeur sur liste.html et affiche sur inscription.html  */
const param = new URLSearchParams(window.location.search);
const champsNomEvent = param.get("event");
const champsCategorie = param.get("type");

if(champsNomEvent){
    nomEvent.value = champsNomEvent;
    nomEvent.readOnly = true;
}
if(champsCategorie){
   const categorieValue = champsCategorie.toUpperCase();
    categorie.value =categorieValue ;
    console.log("Categorie URL :", champsCategorie);
    categorie.disabled = true;

}


function showErreur(input: HTMLInputElement, message: string): void {
    input.classList.add("errorInput");
    input.classList.remove("succesInput");

    let error = input.parentElement?.querySelector(".error-message") as HTMLDivElement;

    if (!error) {
        error = document.createElement("div");
        error.className = "error-message";
        input.parentElement?.appendChild(error);
    }

    error.textContent = message;
}

function clearErreur(input: HTMLInputElement): void {
    input.classList.remove("errorInput");

    const error = input.parentElement?.querySelector(".error-message");
    if (error) error.remove();
}



function correctNomEvent(): void {
    if (nomEvent.value.trim() !== "") {
        clearErreur(nomEvent);
        nomEvent.classList.add("succesInput");
    }
}

function correctNom(): void {
    if (nom.value.trim() !== "") {
        clearErreur(nom);
        nom.classList.add("succesInput");
    }
}

function correctEmail(): void {
    if (email.value.trim() === "") {
        clearErreur(email);
        email.classList.remove("succesInput");
        return;
    }

    if (!user.emailValide(email.value)) {
        showErreur(email, "Email invalide (ex: ex:nom@saintjeaningenier.org)");
        email.classList.remove("succesInput");
        return;
    }

    clearErreur(email);
    email.classList.add("succesInput");
}

function valideFormulaire(): boolean {
    let isValid = true;

    if (nomEvent.value.trim() === "") {
        showErreur(nomEvent, "Le nom de l'événement est obligatoire");
        isValid = false;
    }

    if (nom.value.trim() === "") {
        showErreur(nom, "Le nom de l'étudiant est obligatoire");
        isValid = false;
    }

    if (email.value.trim() === "") {
        showErreur(email, "L'email est obligatoire");
        isValid = false;
    }
    else if (!user.emailValide(email.value)) {
        showErreur(email, "Email invalide (ex: nom@domaine.com)");
        isValid = false;
    }

    return isValid;
}

nomEvent.addEventListener("keyup", correctNomEvent);
nomEvent.addEventListener("blur",correctNomEvent);
nom.addEventListener("keyup", correctNom);
nom.addEventListener ("blur",correctNom);
email.addEventListener("keyup", correctEmail);
email.addEventListener("blur",correctEmail);

formulaire.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!valideFormulaire()) {
        return;
    }
    const newParticipant: Utilisateur = new Utilisateur(nom.value,email.value);
    const newInscription : Inscription =  new Inscription(nom.value,email.value,nomEvent.value,categorie.value as TypeEvenement)
    
    function afficherMessage(message: string, couleur: string): void {
       const div = document.createElement("div");
       div.textContent = message;
       div.style.position = "fixed";
       div.style.top = "50%";
       div.style.right = "20px";
       div.style.transform = "translateY(-50%)";
       div.style.padding = "12px 24px";
       div.style.background = couleur;
       div.style.color = "white";
       div.style.borderRadius = "8px";
       div.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
       div.style.fontWeight = "600";
       div.style.zIndex = "1000";

       document.body.appendChild(div);
       setTimeout(() => div.remove(), 3000);
}


 try {
    app.charge();
  soumettre.charger();
  soumettre.VerifierPrescence(email.value, nomEvent.value);
  app.inscriptionPasse(nomEvent.value.trim(),categorie.value as TypeEvenement);
  
  if (!user.verifierUtilisateur(email.value)) {
    user.ajouterUtilisateur(newParticipant);
  }

  app.nombrePlaceDecrementer(nomEvent.value.trim(),categorie.value as TypeEvenement);
  

  soumettre.ajouterInscription(newInscription);

  afficherMessage("Votre inscription a réussi avec succès", "#22c55e");
  formulaire.reset();

} catch (e) {
  if (e instanceof InscriptionException) {
    afficherMessage(e.message, "#ef4444");
  } else {
    afficherMessage("Erreur inconnue", "#ef4444");
  }
}
formulaire.reset();
  
});
