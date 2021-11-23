let myWidth;
let myHeight;



class obj1 {
  constructor() {
    this.angulo = 90;
    this.radio = 1;
  }

  b1() {
    
    this.radio = this.radio + PI / random(100);
    
  }
  b2() {
    
    this.angulo = this.angulo + random(PI / 1);
  }

  crearEspiral() {
    
    push();
    
    this.b1();
    this.b2();

    ellipse(this.radio * cos(radians(this.angulo)), this.radio * sin(radians(this.angulo)), 10, 10);

    rotate(radians(90));
    ellipse(this.radio * cos(radians(this.angulo)), this.radio * sin(radians(this.angulo)), 10, 10);

    rotate(radians(180));
    ellipse(this.radio * cos(radians(this.angulo)), this.radio * sin(radians(this.angulo)), 10, 10);

    rotate(radians(270));
    ellipse(this.radio * cos(radians(this.angulo)), this.radio * sin(radians(this.angulo)), 10, 10);
    pop();
  }
}

class obj2 {
  constructor() {
    this.posX = width;
    this.posY = height;

    this.velX = 4;
    this.velY = 4;
  }

  declaracio() {
    posX = width;
    posY = height;

    velX = 4;
    velY = 4;

    posX += velX;
    posY += velY;
  }

  b2Obj2() {
    if (this.posX < 0 || this.posX > width / 2) {
      this.velX = -this.velX + 4;
    }
    //comprovem la posició Y
    if (this.posY < -100 || this.posY > height) {
      this.velY = -this.velY + 4;
    }
  }

  actualitzar() {
    this.posX += this.velX + random(-100, 100);
    this.posY += this.velY + random(-10, 4);
  }

  crearEstela() {
    this.actualitzar();

    stroke(255, 0, 0, random(30, 100));
    strokeWeight(random(0, 10));
    noFill();

    square(this.posX, this.posY, random(5, 100));
    this.b2Obj2();
  }

  crearEstelaB() {
    actualitzar();

    stroke(0, 0, 255, random(30, 100));
    strokeWeight(random(0, 10));
    noFill();

    square(posX, posY, random(5, 100));
    b2Obj2();
  }

  crearEstelaD() {
    actualitzar();

    stroke(0, 255, 0, random(30, 100));
    strokeWeight(10);
    noFill();

    square(posX, posY, random(5, 100));
    b2Obj2();
  }
  
  crearEstelaDit(DitposX,DitposY){
    push();
    
    r = random(-90, 180);
    angle = angle + r;
    rotate(cos(angle));
    
    stroke(255, 0, 0, random(30, 100));
    strokeWeight(10);
    noFill();
    //square(DitposX-width/2, DitposY-height/2 - 100, random(5, 100));
    square(DitposX, DitposY, random(5, 100));
    pop();
    
  }
  
}

let a;
let b;
let pXdit;
let pYdit;

let posXDit;
let posYDit;

let dit_X;
let dit_Y;

let angle;
let r;

function setup() {
  createCanvas(600, 600);
  background(0);
  myWidth = width;
  a = new obj1();
  b = new obj2();
  
  sketch = createCanvas(640, 480);

  //Use capture from p5js
  capture = createCapture(VIDEO);
  capture.hide();
   mydrawCaptureCameraEffect();
  // Colors for each fingertip
  colorMap = [
    // Left fingertips
    [
      color(0, 0, 0),
      color(255, 0, 255),
      color(0, 0, 255),
      color(255, 255, 255),
    ],
    // Right fingertips
    [color(182, 54, 124), color(122, 255, 0), color(0, 165, 255), color(0, 44, 0)],
  ];

  // #1 Turn on some models (hand tracking) and the show debugger
  // @see https://handsfree.js.org/#quickstart-workflow
  handsfree = new Handsfree({
    showDebug: true, // Comment this out to hide the default webcam feed with landmarks
    hands: true,
    setup: {
      video: {
        $el: capture.elt,
      },
    },
  });

  // Add webcam buttons under the canvas
  // Handsfree.js comes with a bunch of classes to simplify hiding/showing things when things are loading
  // @see https://handsfree.js.org/ref/util/classes.html#started-loading-and-stopped-states
  buttonStart = createButton("Start Webcam");
  buttonStart.class("handsfree-show-when-stopped");
  buttonStart.class("handsfree-hide-when-loading");
  buttonStart.mousePressed(() => handsfree.start());

  // Create a "loading..." button
  buttonLoading = createButton("...loading...");
  buttonLoading.class("handsfree-show-when-loading");

  // Create a stop button
  buttonStop = createButton("Stop Webcam");
  buttonStop.class("handsfree-show-when-started");
  buttonStop.mousePressed(() => handsfree.stop());

}

function mydrawCaptureCameraEffect(){
  //Draw camera centered with a semi transparect rect over
  push();
  imageMode(CENTER);
  translate(width, 0);
  scale(-1, 1);
  image(capture, width * 0.5, height * 0.5, width, height);
  noStroke();
  fill(10, 10, 10, 200);
  rect(0, 0, width, height);
  pop();
}

function draw() {
  

  //mydrawCaptureCameraEffect(); //added to original code

  fingerPaint();
  //drawHands();
  
}


paint = [];

function fingerPaint() {
  // Check for pinches and create dots if something is pinched
  const hands = handsfree.data?.hands;
  if (hands?.pinchState) {
    // Loop through each hand
    hands.pinchState.forEach((hand, handIndex) => {
      // Loop through each finger
      hand.forEach((state, finger) => {
        // Other states are "start" and "released"
        if (state === "held"){
          if (handIndex ==1 && finger ==0){  //pausar o reproduir espiral central
               pXdit=hands.curPinch[1][0].x;    
               pYdit=hands.curPinch[1][0].y;
                modeNormal(pXdit,pYdit);
          }
          if (handIndex ==0 && finger ==0){ //pintar estela vermella
            let posXDit = sketch.width -hands.curPinch[0][0].x * sketch.width;
            let posYDit = hands.curPinch[0][0].y * sketch.height;        
            b.crearEstelaDit(posXDit,posYDit);
          }
         if (handIndex ==0 && finger ==2){ //crear espiral lila
            let dit_X = sketch.width -hands.curPinch[0][1].x * sketch.width;
            let dit_Y = hands.curPinch[0][1].y * sketch.height; 
            modeA(dit_X,dit_Y);
         }
             
          if (handIndex ==1 && finger ==3){  //borrar
          borrar()
          }
        
      
  
        }
      });
    });
  }

  // Draw the paint
  paint.forEach((dot) => {
    fill(colorMap[dot[2]][dot[3]]);
    circle(
      sketch.width - dot[0] * sketch.width,
      dot[1] * sketch.height,
      dot[4]
    );
  });

  // Clear everything if the left [0] pinky [3] is pinched
  if (hands?.pinchState && hands.pinchState[0][3] === "released") {
    paint = [];
  }
}

/**
 * #3 Draw the hands into the P5 canvas
 * @see https://handsfree.js.org/ref/model/hands.html#data
 */
function drawHands() {
  const hands = handsfree.data?.hands;

  // Bail if we don't have anything to draw
  if (!hands?.landmarks) return;

  // Draw keypoints
  hands.landmarks.forEach((hand, handIndex) => {
    hand.forEach((landmark, landmarkIndex) => {
      // Set color
      // @see https://handsfree.js.org/ref/model/hands.html#data
      if (colorMap[handIndex]) {
        switch (landmarkIndex) {
          case 8:
            fill(colorMap[handIndex][0]);
            break;
          case 12:
            fill(colorMap[handIndex][1]);
            break;
          case 16:
            fill(colorMap[handIndex][2]);
            break;
          case 20:
            fill(colorMap[handIndex][3]);
            break;
          default:
            fill(color(255, 255, 255));
        }
      }

      // Set stroke
      if (handIndex === 0 && landmarkIndex === 8) {
        stroke(color(255, 255, 255));
        strokeWeight(5);
        circleSize = 40;
      } else {
        stroke(color(0, 0, 0));
        strokeWeight(0);
        circleSize = 10;
      }

      circle(
        // Flip horizontally
        sketch.width - landmark.x * sketch.width,
        landmark.y * sketch.height,
        circleSize
      );
    });
  });
}








function modeNormal(ditX,ditY) {
  
  
  translate(ditX+300, ditY+300);
  fill(random(50, 255));
  noStroke();
  a.b1();//
  a.b2();//
  a.crearEspiral();

  stroke(255, 100); //el 100 es la transparència
  strokeWeight(random(0, 10));
  noFill();
  

  
}

function modeA(dit_X,dit_Y) {
  translate(dit_X, dit_Y);

  fill(255, 0, 255);
  noStroke();

  a.crearEspiral();

  stroke(255, 100); //el 100 es la transparència
  strokeWeight(random(0, 10));
  noFill();
}

function borrar() {
  background(0);
  
}

