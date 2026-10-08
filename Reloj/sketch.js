let h,m,s;
let sol;
let angle = 0;
let luna;
let dia;
let opacidad=0;
let vectores = [];
let returnVectores = [];
let font;
let puntitos =[];
let centroX;
let centroY;
let radio;

async function setup() {
  // Cargar la imagen y esperar a que termine
  sol = await loadImage("assets/sol.png");
  luna = await loadImage("assets/luna.png");
  font = await loadFont('assets/Dax.ttf');

  createCanvas(600, 600);

  textAlign(CENTER, CENTER);
 
  imageMode(CENTER);

vectores.push(new Vector(50, 80, 25, 255));
vectores.push(new Vector(40, 80, 25, 200));
vectores.push(new Vector(30, 80, 25, 150));
vectores.push(new Vector(20, 80, 25, 100));
vectores.push(new Vector(10, 80, 25, 50));

returnVectores.push(new Vector(900, 500, 25, 255));
returnVectores.push(new Vector(910, 500, 25, 200));
returnVectores.push(new Vector(920, 500, 25, 150));
returnVectores.push(new Vector(930, 500, 25, 100));
returnVectores.push(new Vector(940, 500, 25, 50));
 


}function draw() {

  // Hora como números
  h = hour();
  m = minute();
  s = second();

  // Hora para mostrar
  let tiempoActual = `${nf(h, 2)}:${nf(m, 2)}`;
  let seg = `:${nf(s, 2)}`;

  // Centro
  centroX = width / 2;
  centroY = height / 2;

  // Movimiento de la imagen
 radio = 170;

  let posX = centroX + cos(angle) * radio;
  let posY = centroY + sin(angle) * radio;

  // Día o noche
  if (h >= 6 && h <= 18) {
    dia = true;
  } else {
    dia = false;
  }

  // FONDO E IMAGEN
  if (dia) {
    background(255);
    tint(255, 255);
    image(sol, posX, posY);
  } else {
    background(128);
    tint(255, 255);
    image(luna, posX, posY);
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

  textSize(48);
  text(tiempoActual, centroX, centroY);

  textSize(32);
  text(seg, centroX + 85, centroY + 3);

  // Vectores
  if (s < 30) {
    for (let v of vectores) {
      v.move();
    }
  } else {
    for (let vec of returnVectores) {
      vec.vuelta();
    }
  }
 //Mostrar titulo 
  if (dia) {
    fill(0);
  } else {
    fill(255);
  }
  textSize(14); 
   text("Timeline by Maríaff", 520,550);

  // Velocidad
  angle += 0.015;
}
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


    let tamano = 12;

    // El minuto actual aparece progresivamente
    if (i === minutos) {
      tamano = map(second(), 0, 59, 0, 12);
    }

    fill(119, 184, 214);
    noStroke();

    circle(x, y, tamano);
  }
}
class Vector {

 constructor(pPosX, pPosY, d, opacidad){
    this.posX = pPosX;
    this.posY = pPosY;
    this.d = d;
    this.opacidad = opacidad
  }

  move() {
    if (dia){
    fill(0, this.opacidad);  
    } else{
      fill(255, this.opacidad);
    }
    noStroke();
    circle(this.posX, this.posY, this.d);
    this.posX += 2;
  }

  vuelta(){
   if (dia){
    fill(0, this.opacidad);  
    } else{
      fill(255, this.opacidad);
    }
    noStroke();
    circle(this.posX, this.posY, this.d);
    this.posX -= 2;
  }

  }
