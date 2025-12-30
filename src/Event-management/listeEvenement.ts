import { Evenement, TypeEvenement } from "../models/Evenement.js";
import { Main } from "../Services/EventServices.js";

const contenue = document.getElementById("liste-event") as HTMLDivElement;
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

  liste.forEach((e) => {
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

    actions.append(detail, participer);

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
  console.log("Bouton cliqué, catégorie normalisée:", categorie);
});


    if (estEvenementPasse(e)) {
      participer.disabled = true;
      participer.textContent = "Clôturé";
    }

    card.append(h3, pDate, pLieu, pCategorie, pCapacite, pCapaciteRestant, actions);
    contenue.appendChild(card);
  });
}


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
    resultat = resultat.filter(ev => {
      console.log('Comparaison catégorie:', ev.getCategorie(), categorieChoisir);
      return normalizeText(ev.getCategorie()) === normalizeText(categorieChoisir);
    });
  }

  afficherEvenements(resultat);
}

filtrationDate.addEventListener("input", filtrerEvenements);
filtrationCategorie.addEventListener("change", filtrerEvenements);

afficher.addEventListener("click", () => {
  afficherEvenements(evenement);
});

afficherEvenements(evenement)
