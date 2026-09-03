/* configuracion del lienzo */
const lienzo = document.getElementById("lienzo-estrellas");
const contexto = lienzo.getContext("2d");

/* forzamos tamaño */
lienzo.width = window.innerWidth;
lienzo.height = window.innerHeight;

let estrellas = [];

/* creamos las estrellas */
function crearEstrellas(cantidad) {
  for (let i = 0; i < cantidad; i++) {
    estrellas.push({
      x: Math.random() * lienzo.width,
      y: Math.random() * lienzo.height,
      radioBase: Math.random() * 2 + 0.5,
      vida: Math.random() * 100 + 100,
      edad: 0
    });
  }
}

/* dibujo */
function dibujarEstrellas() {
  contexto.clearRect(0, 0, lienzo.width, lienzo.height);

  estrellas.forEach(estrella => {
    estrella.edad++;
    let progreso = estrella.edad / estrella.vida;
    let opacidad = Math.sin(progreso * Math.PI);

    contexto.fillStyle = "white";
    contexto.beginPath();
    contexto.arc(estrella.x, estrella.y, estrella.radioBase, 0, Math.PI * 2);
    contexto.fill();

    if (estrella.edad >= estrella.vida) {
      estrella.edad = 0;
      estrella.x = Math.random() * lienzo.width;
      estrella.y = Math.random() * lienzo.height;
    }
  });
}

function animar() {
  dibujarEstrellas();
  requestAnimationFrame(animar);
}

/* encender todo */
crearEstrellas(150);
animar();

window.onresize = () => {
  lienzo.width = window.innerWidth;
  lienzo.height = window.innerHeight;
};