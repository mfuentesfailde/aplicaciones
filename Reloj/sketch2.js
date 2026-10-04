let sol;
let angle = 0;
let luna;
let logo;
let dia;
let opacidad=0;
let vectores = [];
async function setup() {
  // Cargar la imagen y esperar a que termine
  sol = await loadImage("assets/sol.png");
  luna = await loadImage("assets/luna.png");
  logo = await loadImage("assets/logo.png");

  createCanvas(1000, 800);

  textAlign(CENTER, CENTER);
 
  imageMode(CENTER);
  vectores.push(new Vector(50, 500, 25, 255));
vectores.push(new Vector(40, 500, 25, 200));
vectores.push(new Vector(30, 500, 25, 150));
vectores.push(new Vector(20, 500, 25, 100));
vectores.push(new Vector(10, 500, 25, 50));
  
}

function draw() {
 

    // Define la hora actual  
  let h = nf(hour(), 2);
  let m = nf(minute(), 2);
  let s = nf(second(), 2);

  let tiempoActual = `${h}:${m}`;
  let seg=`:${s}`;

  // Moovimiento de la imagen
  let centroX = width / 2+100;
  let centroY = height / 2-100;
  
  let radio = 170;

  let posX = centroX + cos(angle) * radio;
  let posY = centroY + sin(angle) * radio;
  
  //si es por el día o por la noche
  if (h>=18 || h<=6){
    dia = false;
  } else {
    dia = true;
   ;
  }


  /// IMAGENES
  if(dia){
    background(255);
    tint(255, 255);
    image(sol, posX, posY);
  } else {
    background(128);
    tint(255, 255);
    image(luna, posX, posY);
  }
  

  //Mostrar hora 
  fill(0);
  textSize(48);
  text(tiempoActual, centroX, centroY);
  textSize(32);
  text(seg, centroX+85, centroY+3);
  
  // Hacer aparecer el logo poco a poco
  opacidad = min(opacidad + 1, 255);
  tint(255, opacidad);
  image(logo, 200, height/2-100);

  fill(0)
 for (let v of vectores) {
  v.move();
}
  
  // Velocidad 
  angle += 0.015;
}
class Vector {

 constructor(pPosX, pPosY, d, opacidad){
    this.posX = pPosX;
    this.posY = pPosY;
    this.d = d;
    this.opacidad = opacidad
  }
/*
display(){
  circle(this.posX, this.posY, this.d);
}*/
  move() {
    fill(255, this.opacidad);
    noStroke();
    circle(this.posX, this.posY, this.d);
    this.posX += 3;
  }
}