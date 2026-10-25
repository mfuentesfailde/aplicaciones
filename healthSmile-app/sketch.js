
let faceLandmarker;

let jawOpen = 0;
let hayCara = false;
let ultimoVideoTime = -1;
let bocaEstabaAbierta = false;

const UMBRAL_BOCA = 0.35;

let video;
let anchoVideo;
let altoVideo;

//variables para las imagenes
let cepillo1;
let cepillo2;
let calabaza;
let calabazaVerde;
let tela1;
let tela2;
let araña;

// variables para las animaciones
let x = 0;
let suelo = 350;
let alturaSalto = 120;
let anchoCalabaza = 150;
let altoCalabaza = 150;
let cep1X
let cep2X;
let arañaY;
let velocidad = 4;
let opacidad;
//Variable para mostrar la pantalla inicial 
let inicio;
//variables para los textos 
let titulo
let textoCreado;
let p2;
let resultadoTxt;
let intro;
let buttom;

let risa;
//Tamano del la calabaza del resultado
let calabazaSize = 80;

let tiempoBocaAbierta = 0;
let ultimoFrame = 0

async function setup() {
    

    anchoVideo = 640;
    altoVideo = 480;

    createCanvas(840, 680);

    document.getElementById("p5_loading").remove();


    try {
        const { FilesetResolver, FaceLandmarker } =
            window.MediaPipeVision;

        console.log("Cargando MediaPipe...");

        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        faceLandmarker = await FaceLandmarker.createFromOptions(
            vision,
            {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task"
                },
                runningMode: "VIDEO",
                numFaces: 1,
                outputFaceBlendshapes: true
            }
        );

        console.log("MediaPipe Face Landmarker cargado");

    } catch (error) {
        console.error("Error al cargar MediaPipe:", error);
    }

    // Crear la cámara una sola vez
    video = createCapture(VIDEO);
    video.size(anchoVideo, altoVideo);
    video.hide();
    cepillo1 = await loadImage("assets/cepillo1.png");
    cepillo2 = await loadImage("assets/cepillo2.png");
    tela1 = await loadImage("assets/tela1.png");
    tela2 = await loadImage("assets/tela2.png");
    araña= await loadImage("assets/arana.png");

    calabaza = await loadImage("assets/calabaza.png");
    calabazaVerde = await loadImage("assets/calabaza_verde.png");

    fontHal = await loadFont('assets/October.ttf');
    risa = createAudio('assets/risa.wav');

    inicio = true;
    textoCreado = false;
    cep1X = width / 2;
    cep2X = width / 2;
    arañaY = 150;
    opacidad = 0;
    resultadoTxt = createP("Abre la boca");
    resultadoTxt.position(width - 300, 30);
    resultadoTxt.id('resultado');
    resultadoTxt.hide();


    intro = createP('HealthSmile os desea');
    intro.position(300, 60);
    intro.id('texto_intro');
    intro.hide();


    titulo = createP('HealthSmile');
    titulo.position(100, 10);
    titulo.id('texto_intro');
    titulo.hide();
}

function draw() {

    background(207, 193, 174);
    // Hacer aparecer las telarañas poco a poco
    push()
    opacidad = min(opacidad + 1, 255);
    tint(255, opacidad);
    image(tela1, width - 150, height - 150, 150, 150);
    image(tela2, 2, height - 150, 150, 150);
    pop();

    if (inicio) {
        animaCepillos();
        cep1X += velocidad;
        cep2X -= velocidad;
        arañaY += velocidad/2;

        if (cep2X < 10) {
            intro.show();
            textFont(fontHal);
            textSize(48);
            text("Feliz Halloween", 300, 200);
            animaCalabaza();
        }
    } else {
        push()
        opacidad = min(opacidad + 1, 255);
        tint(255, opacidad);
        image(cepillo1, 20, 20, 80, 80);
        image(cepillo2, 20, 20, 80, 80);
        titulo.show();
        pop();

        // Mostrar la cámara
        let videoX = (width - anchoVideo) / 2;
        let videoY = (height - altoVideo) / 2;

        imageMode(CORNER);
        image(video, videoX, videoY, anchoVideo, altoVideo);

        // Comprobar que hay una cara detectada
        actualizarDeteccionBoca();

        if (hayCara) {
            resultadoTxt.show();
            resultadoTxt.position(width - 300, 30);

            const bocaAbierta = jawOpen > UMBRAL_BOCA;

            let ahora = millis();
            let delta = ahora - ultimoFrame;
            ultimoFrame = ahora;
            if (bocaAbierta) {
                resultadoTxt.html("Muy bien");
                tiempoBocaAbierta += delta;
                textSize(22);
                text( nf(tiempoBocaAbierta / 1000, 0, 1)+" segundos", width-300, height-50);
                image(
                    calabazaVerde,
                    width / 2,
                    height - 100,
                    calabazaSize,
                    calabazaSize
                );

                // Reproducir la risa solo al abrir la boca
                if (!bocaEstabaAbierta) {
                    risa.play();
                }

            } else {
                resultadoTxt.html("Abre la boca");
                tiempoBocaAbierta =0;
                image(
                    calabaza,
                    width / 2,
                    height - 100,
                    calabazaSize,
                    calabazaSize
                );

                // Detener la risa solo al cerrar la boca
                if (bocaEstabaAbierta) {
                    risa.stop();
                }
            }

            bocaEstabaAbierta = bocaAbierta;

        } else {
            resultadoTxt.hide();

            if (bocaEstabaAbierta) {
                risa.stop();
            }

            bocaEstabaAbierta = false;
        }
    }
}

function detectarBoca() {
    inicio = false;
    console.log(inicio);
    if (p2) {
        p2.remove();
        p2 = undefined;
    }
    if (intro) {
        intro.remove();
        intro = undefined;
    }

    if (buttom) {
        buttom.remove();
        buttom = undefined;
    }
}
function verBoton() {

    buttom = createButton('COMENZAR');
    buttom.position(width / 2, 550);
    buttom.id('buttom');
    buttom.mousePressed(detectarBoca);

}
function animaCepillos() {
    image(cepillo1, cep1X, 100, 150, 150);
    image(cepillo2, cep2X, 100, 150, 150);
    image(araña, width/2-150, arañaY, 200, 200);
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

    p2.position(250, 300);
    p2.id('texto');

    if (inicio) {
        verBoton();
    }

}

function actualizarDeteccionBoca() {
    if (!faceLandmarker || !video || !video.elt) {
        return;
    }

    const elementoVideo = video.elt;

    // Esperar a que la cámara tenga un fotograma disponible
    if (elementoVideo.readyState < 2 ||
        elementoVideo.videoWidth === 0) {
        return;
    }

    // No analizar dos veces el mismo fotograma
    if (elementoVideo.currentTime === ultimoVideoTime) {
        return;
    }

    ultimoVideoTime = elementoVideo.currentTime;

    try {
        const resultado = faceLandmarker.detectForVideo(
            elementoVideo,
            performance.now()
        );

        hayCara = resultado.faceLandmarks.length > 0;
        jawOpen = 0;

        if (
            hayCara &&
            resultado.faceBlendshapes &&
            resultado.faceBlendshapes.length > 0
        ) {
            const categorias =
                resultado.faceBlendshapes[0].categories;

            const mandibula = categorias.find(
                categoria => categoria.categoryName === "jawOpen"
            );

            if (mandibula) {
                jawOpen = mandibula.score;
            }
        }
    } catch (error) {
        console.error("Error al detectar la boca:", error);
    }
}
