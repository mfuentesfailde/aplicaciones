
let faceMesh;
let video;
let faces = [];
let anchoVideo;
let altoVideo;

let cepillo1;
let cepillo2;
let calabaza;
let calabazaVerde;
let tela1;
let tela2;
let x = 0;
let suelo = 350;
let alturaSalto = 120;
let anchoCalabaza = 150;
let altoCalabaza = 150;
let cep1X
let cep2X;
let velocidad = 4;
let opacidad;

let inicio;
let textoCreado;
let p2;


let intro;
let buttom;


function preload() {
    faceMesh = ml5.faceMesh({
        maxFaces: 1,
        refineLandmarks: false,
        flipHorizontal: false
    });
}

async function setup() {

    anchoVideo = 640;
    altoVideo = 480;

    createCanvas(840, 680);

    cepillo1 = await loadImage("assets/cepillo1.png");
    cepillo2 = await loadImage("assets/cepillo2.png");
    tela1 = await loadImage("assets/tela1.png");
    tela2 = await loadImage("assets/tela2.png");
    calabaza = await loadImage("assets/calabaza.png");
    calabazaVerde = await loadImage("assets/calabaza_verde.png");

    fontHal = await loadFont('assets/October.ttf');


    video = createCapture(VIDEO);
    video.size(anchoVideo, altoVideo);
    video.hide();

    faceMesh = await ml5.faceMesh({
        maxFaces: 1
    });

    faceMesh.detectStart(video, gotFaces);

    inicio = true;
    textoCreado = false;
    cep1X = width / 2;
    cep2X = width / 2;
    opacidad=0;

}

function draw() {

    background(207, 193, 174);
     // Hacer aparecer las telarañas poco a poco
    push()
    opacidad = min(opacidad + 1, 255);
    tint(255, opacidad);
    image(tela1, width - 150, height - 150, 150, 150);
    image(tela2, 10, height - 150, 150, 150);
    pop();
    if (inicio) {
        animaCepillos();
        cep1X += velocidad;
        cep2X -= velocidad;
        if (cep2X < 10) {
            intro = createP('HealthSmile os desea');
            intro.position(300, 60);
            intro.id('texto_intro');
            textFont(fontHal);
            textSize(48);
            text("Feliz Halloween", 300, 200);
            animaCalabaza();
        }
    } else {


        // Mostrar la cámara
        let videoX = (width - anchoVideo) / 2;
        let videoY = (height - altoVideo) / 2;

        imageMode(CORNER);
        image(video, videoX, videoY, anchoVideo, altoVideo);

        // Comprobar que hay una cara detectada
        if (faces.length > 0) {
            let cara = faces[0];

            // Comprobar que existen los keypoints
            if (cara.keypoints && cara.keypoints.length > 0) {

                // Puntos de referencia aproximados
                let superior = cara.keypoints[13];
                let inferior = cara.keypoints[14];

                let apertura = dist(
                    superior.x, superior.y,
                    inferior.x, inferior.y
                );

                if (apertura > 15) {
                    fill(0);
                    stroke(0);
                    textSize(22);
                    text("BOCA ABIERTA", 20, 60);
                    console.log("boca");
                }
                noFill();
                stroke("#a86832");
                strokeWeight(5);
                //  rect(superior.x-30, superior.y, 50, inferior.y - superior.y);  
                rect(
                    superior.x + videoX - 30,
                    superior.y + videoY,
                    50,
                    inferior.y - superior.y
                );

            }
        }
    }
}
function gotFaces(results) {
    faces = results;
}
function detectarBoca() {
    inicio = false;
      if (p2) {
        p2.remove();
        p2 = null;
    }

    if (intro) {
        intro.remove();
        intro = null;
    }

    if (button) {
        button.remove();
        button = null;
    }
}
function verBoton() {

    let button = createButton('COMENZAR');
    button.position(width / 2, 550);
    button.id('buttom');
    button.mousePressed(detectarBoca);

}
function animaCepillos() {
    image(cepillo1, cep1X, 100, 150, 150);
    image(cepillo2, cep2X, 100, 150, 150);
}
function animaCalabaza() {
    x += velocidad;
    let posX = x;

    // Movimiento vertical en forma de arco
    let fase = (x % 150) / 150;
    let posY = suelo - alturaSalto * 4 * fase * (1 - fase);


    push(); // Guardar la configuración actual
    imageMode(CENTER);
    image(calabaza, posX, posY, anchoCalabaza, altoCalabaza);
    pop(); // Restaurar la configuración anterior
    if (x > width - 30 && !textoCreado) {
        textoCreado = true;
        verTexto();
    }
}
function verTexto() {
    p2 = createP("Vamos a ver qué bien abres la boca, para lavarse los" +
        " dientes e ir al dentista hay que abrir mucho la boca. Dale al botón para ver cómo abres la boca.");

    p2.position(100, 350);
    p2.id('texto');
  
    if (!buttom) {
        verBoton();
    }

}