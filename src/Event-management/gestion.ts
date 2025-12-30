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