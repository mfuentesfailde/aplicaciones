
let faceMesh;
let video;
let faces = [];
let inicio
let anchoVideo;
let altoVideo;
let canvasAncho = 1000;
let canvasAlto = 800;

let cepillo1;
let cepillo2;

// Posición del vídeo en el canvas
let xVideo;
let yVideo;

// Escala entre las coordenadas originales y las dibujadas
let escalaX;
let escalaY;

function preload() {
  faceMesh = ml5.faceMesh({
    maxFaces: 1,
    refineLandmarks: false,
    flipHorizontal: false
  });
}

async function setup() {
  createCanvas(canvasAncho, canvasAlto);

    cepillo1 = await loadImage("assets/cepillo1.png");
    cepillo2 = await loadImage("assets/cepillo2.png");



  anchoVideo = 640;
  altoVideo = 480;
  // Centrar el vídeo
  xVideo = (width - anchoVideo) / 2;
  yVideo = (height - altoVideo) / 2;

  video = createCapture(VIDEO);
  video.size(anchoVideo, altoVideo);
  video.hide();

  // Calcular la escala de las coordenadas
  escalaX = anchoVideo / 640;
  escalaY = altoVideo / 480;
  faceMesh.detectStart(video, gotFaces);
  inicio = true;
  
}

function draw() {
background(207, 193, 174);
  if(inicio){
  
 let button = createButton('COMENZAR');
  button.position(100, 100);
  button.id('buttom');
  button.mousePressed(detectarBoca);

  } else {

  // Mostrar la cámara
image(video, xVideo, yVideo, anchoVideo, altoVideo);

  // Comprobar que hay una cara detectada
  if (faces.length > 0) {
    faceMesh.detectStart(video, gotFaces);
    let cara = faces[0];

    // Comprobar que existen los keypoints
    if (cara.keypoints && cara.keypoints.length > 0) {

      // Puntos de referencia aproximados
      let superior = cara.keypoints[13];
      let inferior = cara.keypoints[14];

   // Convertir las coordenadas de ml5 al canvas
      let sx = xVideo + superior.x * escalaX;
      let sy = yVideo + superior.y * escalaY;

      let ix = xVideo + inferior.x * escalaX;
      let iy = yVideo + inferior.y * escalaY;

      let apertura = dist(sx, sy, ix, iy);

  if (apertura > 15) {
    fill(0);
    noStroke();
    textSize(22);
      text("BOCA ABIERTA", 20, 60);
      console.log("boca");
    }
        noFill();
        stroke("#a86832");
        strokeWeight(5);
       rect(superior.x-30, superior.y, 50, inferior.y - superior.y);  
  
    }
  }
}
}
function detectarBoca(){
  inicio = false;
}
function gotFaces(results) {
  faces = results;
}
