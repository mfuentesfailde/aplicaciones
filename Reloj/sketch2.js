let sol;
let angle = 0;
let luna;
let logo;
let dia;
let opacidad=0;
let vectores = [];
let returnVectores = [];
let font;
let punto;

async function setup() {
  // Cargar la imagen y esperar a que termine
  sol = await loadImage("assets/sol.png");
  luna = await loadImage("assets/luna.png");
  logo = await loadImage("assets/logo.png");
  font = await loadFont('assets/Dax.ttf');

  createCanvas(1000, 800);

  textAlign(CENTER, CENTER);
 
  imageMode(CENTER);
/*
  let  vecX=50;
  let opo = 255;
  for (let i = 0; i < vectores.length; i++) {
    vectores[i] = new Vector(vecX, 500, 25, opo);
    vecX -= 10;
    opo -=50;
}
  */

vectores.push(new Vector(50, 500, 25, 255));
vectores.push(new Vector(40, 500, 25, 200));
vectores.push(new Vector(30, 500, 25, 150));
vectores.push(new Vector(20, 500, 25, 100));
vectores.push(new Vector(10, 500, 25, 50));

returnVectores.push(new Vector(900, 680, 25, 255));
returnVectores.push(new Vector(910, 680, 25, 200));
returnVectores.push(new Vector(920, 680, 25, 150));
returnVectores.push(new Vector(930, 680, 25, 100));
returnVectores.push(new Vector(940, 680, 25, 50));
  let x = random(0, 900);
  let color = random(0, 255);
 punto = new Vector(x,70,8,color);
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
if (h >= 6 && h <= 18) {
  dia = true;
  } else {
    dia = false;
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
  if (dia){
    fill(0);  
  } else{
    fill(255);
  }
  textSize(48);
  text(tiempoActual, centroX, centroY);
  textSize(32);
  text(seg, centroX+85, centroY+3);
  
  // Hacer aparecer el logo poco a poco
  opacidad = min(opacidad + 1, 255);
  tint(255, opacidad);
  image(logo, 200, height/2-100);


  if(s<30){
  for (let v of vectores) {
      v.move();
  }
  }else{
  for(vec of returnVectores){
    vec.vuelta();
  }
  }
/*for(let i=0; i<m; i++){
  console.log("en el for");
  let x = random(0, 900);
  let color = random(0, 255);
  let punto = new Vector(x,70,15,color);
  punto.circMinutos();

}*/

  punto.circMinutos();


  textFont(font);
  textAlign(CENTER, CENTER);
  textSize(92);

  if (dia){
    fill(0);  
  } else{
    fill(255);
  }
  text("Concello de Lugo", 450, 580);  
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

  circMinutos(){
    fill(this.opacidad);  
    noStroke();
    circle(this.posX, this.posY, this.d);
    this.posY++;
  }


  }
