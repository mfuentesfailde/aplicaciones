
let faceMesh;
let video;
let faces = [];

function preload() {
  faceMesh = ml5.faceMesh({
    maxFaces: 1,
    refineLandmarks: false,
    flipHorizontal: false
  });
}

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  background(0);

  // Mostrar la cámara
  image(video, 0, 0, width, height);

  // Dibujar los puntos detectados
  for (let face of faces) {
    for (let keypoint of face.keypoints) {
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 5);
    }
  }
}

function gotFaces(results) {
  faces = results;
}
