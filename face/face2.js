let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipped: false };
async function setup() {
     createCanvas(640, 480);

// Wait until the FaceMesh model is fully loaded.

  faceMesh = await ml5.faceMesh(options);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
   faceMesh.detectStart(video, gotFaces);
}
function gotFaces(results) {
  
// Save the output to the faces variable
  faces = results;
}
function draw() {
  image(video, 0, 0, width, height);
    for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
        for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j];
       fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 5);
    }
  }
}