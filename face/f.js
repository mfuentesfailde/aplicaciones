let faceMesh;
let video;
let faces = [];

async function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  faceMesh = await ml5.faceMesh();
  faceMesh.detectStart(video, gotFaces);
}

function gotFaces(results) {
  faces = results;
}

function draw() {
  image(video, 0, 0);

  if (faces.length > 0) {

    // índices aproximados de labios
    let superior = faces[0].keypoints[13];
    let inferior = faces[0].keypoints[14];

    let apertura = dist(
      superior.x, superior.y,
      inferior.x, inferior.y
    );

    fill(255, 0, 0);
    text("Apertura: " + nf(apertura, 1, 1), 20, 30);

    if (apertura > 15) {
      text("BOCA ABIERTA", 20, 60);
      console.log("boca");
    }
  }
}