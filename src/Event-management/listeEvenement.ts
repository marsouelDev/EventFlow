import { Evenement } from "../models/Evenement.js";
import { Main } from "../Services/EventServices.js";

const contenue = document.getElementById("liste-event") as HTMLDivElement;
const afficher = document.querySelector(".btn-afficher") as HTMLButtonElement;
const filtrationDate = document.getElementById("date") as HTMLInputElement; 
const filtrationCategorie = document.getElementById("categorie") as HTMLSelectElement;
const bouton = document.querySelector<HTMLButtonElement>("#theme button");
const image = document.getElementById("image") as HTMLImageElement;

const modal = document.getElementById("suppression") as HTMLDivElement;
const inputPassword = document.getElementById("admin-password") as HTMLInputElement;
const erreurSuppression = document.getElementById("erreur-suppression") as HTMLParagraphElement;
const btnValiderSuppression = document.getElementById("valider-suppression") as HTMLButtonElement;
const btnAnnulerSuppression = document.getElementById("annuler-suppression") as HTMLButtonElement;

/* Mot de passe administrateur pour suppression */
const ADMIN_PASSWORD = "Max67172..";

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

function estEvenementPasse(e: Evenement): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateEvent = new Date(e.getDate());
  dateEvent.setHours(0, 0, 0, 0);
  return dateEvent < today;
}

function normalizeText(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

function afficherEvenements(liste: Evenement[]): void {
  contenue.innerHTML = "";

  if (liste.length === 0) {
    contenue.textContent = "Aucun evenement disponible ";
    contenue.style.textAlign = "center";
    contenue.style.fontSize = "20px";
    contenue.style.color = "#16c4bbff";
    return;
  }

  contenue.style.display = "grid";
  contenue.style.gridTemplateColumns = "repeat(auto-fit, minmax(280px, 1fr))";
  contenue.style.gap = "25px";
  contenue.style.padding = "20px";

  liste.forEach((e, index) => {
    const card = document.createElement("div");
    card.classList.add("event-card");

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
      "Le nombre de places maximum 👥 est de " + e.getCapacite().toLocaleString() + " places";

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

    const supprimer = document.createElement("button");
    supprimer.textContent = "Supprimer";
    supprimer.classList.add("bouton-supprimer");

    actions.append(detail, participer, supprimer);

    detail.addEventListener("click", () => {
      let pDetail = card.querySelector(".description") as HTMLParagraphElement;
      if (!pDetail) {
        pDetail = document.createElement("p");
        pDetail.textContent = "Les détails sont : " + e.getDescription();
        pDetail.classList.add("description");
        card.insertBefore(pDetail, actions);
        detail.textContent = "Masquer détails";
      } else {
        pDetail.remove();
        detail.textContent = "Voir détails";
      }
    });

    participer.addEventListener("click", () => {
      const nomEvent = e.getTitre();
      const categorie = normalizeText(e.getCategorie());
      const parametre = new URLSearchParams({ event: nomEvent, type: categorie });
      window.location.href = `Inscription.html?${parametre.toString()}`;
    });

    if (estEvenementPasse(e)) {
      participer.disabled = true;
      participer.textContent = "Clôturé";
    }

    supprimer.addEventListener("click", () => {
      ouvrirSuppresionOnglet(index);
    });

    card.append(h3, pDate, pLieu, pCategorie, pCapacite, pCapaciteRestant, actions);
    contenue.appendChild(card);
  });
}

let evenementASupprimerIndex: number | null = null;

function ouvrirSuppresionOnglet(index: number) {
  evenementASupprimerIndex = index;
  erreurSuppression.textContent = "";
  inputPassword.value = "";
  modal.classList.remove("hidden");
  inputPassword.focus();
}

function fermeSuppressionOnglet() {
  evenementASupprimerIndex = null;
  modal.classList.add("hidden");
  erreurSuppression.textContent = "";
  inputPassword.value = "";
}

btnValiderSuppression.addEventListener("click", () => {
  const mdp = inputPassword.value.trim();
  if (mdp === "") {
    erreurSuppression.textContent = "Veuillez entrer le mot de passe.";
    return;
  }
  if (mdp !== ADMIN_PASSWORD) {
    erreurSuppression.textContent = "Mot de passe incorrect.";
    return;
  }

  if (evenementASupprimerIndex !== null) {
    evenement.splice(evenementASupprimerIndex, 1);
    afficherEvenements(evenement);
    fermeSuppressionOnglet();
      const messageSucces = document.createElement("div");
       messageSucces.textContent = "Évènement est supprimer avec succès !";
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
  }
});

btnAnnulerSuppression.addEventListener("click", () => {
  fermeSuppressionOnglet();
});

function filtrerEvenements(): void {
  let resultat = [...evenement];

  const dateChoisir = filtrationDate.value;
  if (dateChoisir) {
    resultat = resultat.filter(ev => {
      const eventDate = new Date(ev.getDate());
      const eventDateAuto = eventDate.toISOString().split("T")[0];
      return eventDateAuto === dateChoisir;
    });
  }

  const categorieChoisir = filtrationCategorie.value;
  if (categorieChoisir) {
    resultat = resultat.filter(ev => normalizeText(ev.getCategorie()) === normalizeText(categorieChoisir));
  }

  afficherEvenements(resultat);
}

filtrationDate.addEventListener("input", filtrerEvenements);
filtrationCategorie.addEventListener("change", filtrerEvenements);

afficher.addEventListener("click", () => {
  afficherEvenements(evenement);
});

afficherEvenements(evenement);
