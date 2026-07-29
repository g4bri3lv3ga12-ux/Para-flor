const envelope = document.getElementById("envelope");

const openButton =
  document.getElementById("openButton");

const closeButton =
  document.getElementById("closeButton");

const heartsContainer =
  document.getElementById("heartsContainer");

let envelopeIsOpen = false;
let heartTimers = [];

/* Crear un corazón */

function createHeart() {
  const heart = document.createElement("span");

  heart.classList.add("flying-heart");
  heart.textContent = "♥";

  const size =
    Math.floor(Math.random() * 35) + 25;

  const startX =
    Math.floor(Math.random() * 100) - 50;

  const endX =
    Math.floor(Math.random() * 260) - 130;

  const endY =
    -(Math.floor(Math.random() * 170) + 130);

  const rotation =
    Math.floor(Math.random() * 90) - 45;

  const duration =
    Math.random() * 1.5 + 2.2;

  heart.style.setProperty(
    "--size",
    `${size}px`
  );

  heart.style.setProperty(
    "--start-x",
    `${startX}px`
  );

  heart.style.setProperty(
    "--end-x",
    `${endX}px`
  );

  heart.style.setProperty(
    "--end-y",
    `${endY}px`
  );

  heart.style.setProperty(
    "--rotation",
    `${rotation}deg`
  );

  heart.style.setProperty(
    "--duration",
    `${duration}s`
  );

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

/* Lanzar varios corazones */

function launchHearts() {
  const numberOfHearts = 16;

  for (
    let index = 0;
    index < numberOfHearts;
    index++
  ) {
    const timer = setTimeout(() => {
      if (envelopeIsOpen) {
        createHeart();
      }
    }, index * 110);

    heartTimers.push(timer);
  }
}

/* Limpiar los corazones */

function clearHearts() {
  heartTimers.forEach((timer) => {
    clearTimeout(timer);
  });

  heartTimers = [];

  heartsContainer.innerHTML = "";
}

/* Abrir sobre */

function openEnvelope() {
  if (envelopeIsOpen) {
    return;
  }

  envelopeIsOpen = true;

  envelope.classList.remove("closing");
  envelope.classList.add("open");

  openButton.disabled = true;
  closeButton.disabled = false;

  const timer = setTimeout(() => {
    launchHearts();
  }, 900);

  heartTimers.push(timer);
}

/* Cerrar sobre */

function closeEnvelope() {
  if (!envelopeIsOpen) {
    return;
  }

  envelopeIsOpen = false;

  clearHearts();

  envelope.classList.remove("open");
  envelope.classList.add("closing");

  openButton.disabled = false;
  closeButton.disabled = true;

  setTimeout(() => {
    envelope.classList.remove("closing");
  }, 1500);
}

/* Botones */

openButton.addEventListener(
  "click",
  openEnvelope
);

closeButton.addEventListener(
  "click",
  closeEnvelope
);

closeButton.disabled = true;