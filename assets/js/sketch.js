let remixA, remixB, remixC;
let canvas;

function setup() {
  // Crear el lienzo y asociarlo al contenedor, usando el tamaño de la ventana
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5-container');

  // Definir colores aleatorios para las formas
  remixA = color(random(255), random(255), random(255));
  remixB = color(random(255), random(255), random(255));
  remixC = color(random(255), random(255), random(255));
}

function draw() {
  // Bucle para repetir el patrón en el lienzo actual, adaptado al ancho y alto de la ventana
  for (let posY = 0; posY < height; posY += 60) {
    for (let posX = 0; posX < width; posX += 100) {
      patron(posX - 13, posY - 13);
    }
  }
}

// Función que crea el patrón de la figura base
function patron(posX, posY) {
  fill(remixA);
  beginShape();
  vertex(posX + 10, posY + 40);
  vertex(posX + 40, posY + 10);
  vertex(posX + 60, posY + 30);
  vertex(posX + 80, posY + 10);
  vertex(posX + 110, posY + 40);
  vertex(posX + 80, posY + 70);
  vertex(posX + 60, posY + 50);
  vertex(posX + 40, posY + 70);
  vertex(posX + 10, posY + 40);
  endShape(CLOSE);

  fill(remixB);
  quad(posX + 50, posY + 70, posX + 60, posY + 60, posX + 70, posY + 70, posX + 60, posY + 80);

  fill(remixB);
  circle(posX + 10, posY + 70, 20);

  fill(remixC);
  triangle(posX + 20, posY + 40, posX + 40, posY + 20, posX + 40, posY + 60);
  triangle(posX + 80, posY + 20, posX + 100, posY + 40, posX + 80, posY + 60);

  line(posX + 50, posY + 40, posX + 70, posY + 40);
}

// Redimensiona el lienzo cuando cambia el tamaño de la ventana
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}