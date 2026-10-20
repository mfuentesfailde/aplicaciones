/**********************************************************************************+**/
/* */
/**********************************************************************************+**/

//Dedinir veriables
let handPose;
let video;
let hands = [];

async function setup() {
  // Cargar la imagen y esperar a que termine
 // sol = await loadImage("assets/sol.png");
  //luna = await loadImage("assets/luna.png");
 // font = await loadFont('assets/Dax.ttf');

  createCanvas(600, 600);

  textAlign(CENTER, CENTER);
 //console.log("ml5 version:", ml5.version);
 video = createCapture(VIDEO); 
// Resize the webcam video to match the canvas size
  video.size(640, 480); 
// Hide the HTML video element
  video.hide();
  
   handPose = await ml5.handPose();
   handPose.detectStart(video, gotHands);


}
function draw() {

  background(220);
  
// Draw the webcam video on the canvas
  image(video, 0, 0);

 if (hands.length > 0) {
    let fingerX = hands[0].index_finger_tip.x;
    let fingerY = hands[0].index_finger_tip.y;
    let thumbX = hands[0].thumb_tip.x;
    let thumbY = hands[0].thumb_tip.y;

    noStroke();
    fill(255, 255, 0);
    circle(fingerX, fingerY, 20);
    fill(255, 0, 0);
    circle(thumbX, thumbY, 20);
    console.log(hands);
  }
}

function gotHands(results) {
  hands = results;
}