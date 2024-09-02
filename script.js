/* Efeito da barra de progresso */
const navbar = document.querySelector(".navbar");
const navbarOffsetTop = navbar.offsetTop;
const sections = document.querySelectorAll("section");
const navbarLinks = document.querySelectorAll(".navbar-link");
const progress = document.querySelector(".progress-bars-wrapper");
const progressBarPercents = [97, 90, 72, 80, 48];

window.addEventListener("scroll", () => {
  mainFn();
});

const mainFn = () => {
  if (window.scrollY >= navbarOffsetTop) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }

  sections.forEach((section, i) => {
    if (window.scrollY >= section.offsetTop - 10) {
      navbarLinks.forEach((navbarLink) => {
        navbarLink.classList.remove("change");
      });
      navbarLinks[i].classList.add("change");
    }
  });

  if (window.scrollY + window.innerHeight >= progress.offsetTop) {
    document.querySelectorAll(".progress-percent").forEach((el, i) => {
      el.style.width = `${progressBarPercents[i]}%`;
      el.previousElementSibling.firstElementChild.textContent = progressBarPercents[i];
    });
  }
};

mainFn();

window.addEventListener("resize", () => {
  location.reload();
});

/* Efeito de Digitação e Deleção */
const CONTENT = [
  "ENGENHEIRO DE SOFTWARE",
  "DESENVOLVEDOR FRONT-END",
];

let part = 0;
let partIndex = 0;
let intervalVal;
const element = document.querySelector("#text-name");
const cursor = document.querySelector("#cursor");

// Implementa o efeito de digitação
const type = () => {
  const text = CONTENT[part].substring(0, partIndex + 1);
  element.textContent = text;
  partIndex++;

  if (text === CONTENT[part]) {
    cursor.style.display = 'none';
    clearInterval(intervalVal);
    setTimeout(() => {
      intervalVal = setInterval(deleteText, 50);
    }, 1000);
  }
};

// Implementa o efeito de deleção
const deleteText = () => {
  const text = CONTENT[part].substring(0, partIndex - 1);
  element.textContent = text;
  partIndex--;

  if (text === '') {
    clearInterval(intervalVal);

    part = (part + 1) % CONTENT.length;
    partIndex = 0;

    setTimeout(() => {
      cursor.style.display = 'inline-block';
      intervalVal = setInterval(type, 100);
    }, 200);
  }
};

// Inicia o efeito de digitação ao carregar
intervalVal = setInterval(type, 100);