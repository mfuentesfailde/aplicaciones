
//Dedinir veriables
let h, m, s;
let sol;
let angle = 0;
let luna;
let dia;
let opacidad = 0;
let font;
let centroX;
let centroY;
let radio;
let btnStart;
let btnEnd;
let cuenta;

async function setup() {
  // Cargar la imagen y esperar a que termine
  sol = await loadImage("../assets/sol.png");
  luna = await loadImage("../assets/luna.png");
  font = await loadFont('../assets/Dax.ttf');

  createCanvas(300, 300);

  textAlign(CENTER, CENTER);

  imageMode(CENTER);
  btnStart = createButton('START');
  btnStart.position(width / 2, 250);
  btnStart.id('btn');
  btnStart.mousePressed(empezar);

  btnEnd = createButton('FINISH');
  btnEnd.position(width / 2, 250);
  btnEnd.id('btn');
  btnEnd.mousePressed(acabar);
cuenta = false;

}
function draw() {

  // Hora como números
  h = hour();
  m = minute();
  s = second();
  cuenta = getItem("cuenta");
if(!cuenta){
  btnEnd.hide();
}
  


  // Hora para mostrar
  let tiempoActual = `${nf(h, 2)}:${nf(m, 2)}`;
  let seg = `:${nf(s, 2)}`;

  // Centro
  centroX = width / 2;
  centroY = height / 2;

  // Movimiento de la imagen
  radio = 80;

  let posX = centroX + cos(angle) * radio;
  let posY = centroY + sin(angle) * radio;

  // Si es de día o de noche
  if (h >= 6 && h <= 18) {
    dia = true;
  } else {
    dia = false;
  }

  // FONDO E IMAGEN
  if (dia) {
    background(255);
    tint(255, 255);
    image(sol, posX, posY, 60, 60);
  } else {
    background(128);
    tint(255, 255);
    image(luna, posX, posY, 60, 60);
  }

  // AQUÍ dibujamos los círculos
  verPunto();

  // Mostrar hora
  if (dia) {
    fill(0);
  } else {
    fill(255);
  }
  textFont(font);
  textAlign(CENTER, CENTER);

  textSize(24);
  text(tiempoActual, centroX, centroY);

  textSize(14);
  text(seg, centroX + 40, centroY + 3);


  // Velocidad de la imagen
  angle += 0.015;
}

//Función para mostrar los circulos azules de los minutos 
function verPunto() {

  let radioMinutos = 150;
  let minutos = minute();

  for (let i = 0; i <= minutos; i++) {

    // este cófigo fue generado por+ IA
    let angulo = map(
      i,
      0,
      59,
      -HALF_PI,
      TWO_PI - HALF_PI
    );

    let x = centroX + cos(angulo) * radio;
    let y = centroY + sin(angulo) * radio;
    let tamano = 6;

    // El círculo actual aparece progresivamente
    if (i === minutos) {
      tamano = map(second(), 0, 59, 0, 6);
    }

    fill(119, 184, 214);
    noStroke();
    circle(x, y, tamano);
  }
}
function empezar() {
  btnStart.hide();
  btnEnd.show();
  cuenta = true;
  storeItem("cuenta", cuenta);
  storeItem("inicio", Date.now());
}
function acabar(){
  btnStart.show();
  btnEnd.hide();
  cuenta = false;
  storeItem("cuenta", cuenta);
// Recuperar instante inicial
let inicio = getItem("inicio");

// Tiempo transcurrido en segundos
let segundos = floor((Date.now() - inicio) / 1000);

let horas = floor(segundos / 3600);
let minutos = floor((segundos % 3600) / 60);
let segundosRestantes = segundos % 60;
console.log(horas +":"+minutos+":"+segundosRestantes)

}