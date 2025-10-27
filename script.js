var straal = 30;
var xPositie;
var yPositie;
var xSnelheid = 5;
var ySnelheid = 5;
// variabelen voor de ping pong bal


class Raster {
  constructor(r,k) {
    this.aantalRijen = r;
    this.aantalKolommen = k;
    this.celGrootte = null;
  }

  berekenCelGrootte() {
    this.celGrootte = canvas.width / this.aantalKolommen;
  }

  teken() {
    push();
    noFill();
    stroke('grey');
    for (var rij = 0;rij < this.aantalRijen;rij++) {
      for (var kolom = 0;kolom < this.aantalKolommen;kolom++) {
        rect(kolom*this.celGrootte,rij*this.celGrootte,this.celGrootte,this.celGrootte);
      }
    }
    pop();
  }
}

class Jos {
  constructor() {
    this.x = 400;
    this.y = 300;
    this.animatie = [];
    this.frameNummer =  3;
    this.stapGrootte = null;
    this.gehaald = false;
  }
// i.p.v pijlen kan je nu WASD gebruiken
  beweeg() {
      if (keyIsDown(65)) {
      this.x -= this.stapGrootte;
      this.frameNummer = 2;
    }
    if (keyIsDown(68)) {
      this.x += this.stapGrootte;
      this.frameNummer = 1;
    }
    if (keyIsDown(87)) {
      this.y -= this.stapGrootte;
      this.frameNummer = 4;
    }
    if (keyIsDown(83)) {
      this.y += this.stapGrootte;
      this.frameNummer = 5;
    }

    this.x = constrain(this.x,0,canvas.width);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);

    if (this.x == canvas.width) {
      this.gehaald = true;
    }
  }

  wordtGeraakt(vijand) {
    if (this.x == vijand.x && this.y == vijand.y) {
      return true;
    }
    else {
      return false;
    }
  }

 toon() {
    image(this.animatie[this.frameNummer],this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}  

class Vijand {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.stapGrootte = null;
  }

class Raket {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.snelheid = random
  }
}




  beweeg(); {
    this.x += floor(random(-1,2))*this.stapGrootte;
    this.y += floor(random(-1,2))*this.stapGrootte;

    this.x = constrain(this.x,0,canvas.width - raster.celGrootte);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
  }

  toon(); {
    image(this.sprite,this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}


function setup() {
  canvas = createCanvas(900,600);
  canvas.parent();
  frameRate(10);
  textFont("Verdana");
  textSize(90);

  levens = 1;
  // Zet startlevens op 1
  
  // de raster is 12 cellen hoog en 18 cellen breed
  raster = new Raster(12,18);
  raster.berekenCelGrootte();

  eve = new Jos();
  eve.stapGrootte = 1*raster.celGrootte;
  // de speler begint bij x=0 en in het midden van het canvas
  eve.x = 0;
  eve.y = (raster.aantalRijen /2)*raster.celGrootte;
  
  for (var b = 0;b < 6;b++) {
    frameEve = loadImage("images/sprites/Eve100px/Eve_" + b + ".png");
    eve.animatie.push(frameEve);
  }

  alice = new Vijand(700,200);
  alice.stapGrootte = 1*eve.stapGrootte;
  alice.sprite = loadImage("images/sprites/Alice100px/Alice.png");

  bob = new Vijand(600,400);
  bob.stapGrootte = 1*eve.stapGrootte;
  bob.sprite = loadImage("images/sprites/Bob100px/Bob.png");  

  xPositie = width / 2;
  yPositie = height / 2;
  // start positie van de ping pong bal
}


function draw() {
  
  background('brug');
  raster.teken();
  eve.beweeg();
  alice.beweeg();
  bob.beweeg();
  eve.toon();
  alice.toon();
  bob.toon();
  
  ellipse(xPositie, yPositie, 2 * straal);
  fill('red'); 

  xPositie += xSnelheid;
  yPositie += ySnelheid;
  // Positie van de ping pong bal updaten

  if (xPositie < straal || xPositie > width - straal) {
    xSnelheid *= -1;
  }

  if (yPositie < straal || yPositie > height - straal) {
    ySnelheid *= -1;
  }
 
  if (dist(eve.x + raster.celGrootte / 2, eve.y + raster.celGrootte / 2, xPositie, yPositie) < straal)   {
  levens += 1;

  xPositie = random(straal, width - straal);
  yPositie = random(straal, height - straal);
    
    if (levens == 0) {
    noLoop();
    background(red);
    fill('white');
    text("Je hebt verloren!",30,300);
    }
  }
  
  if (eve.wordtGeraakt(alice) || eve.wordtGeraakt(bob)) {
      noLoop();
  }
    
  if (eve.gehaald) {
    background(green);
    fill('white');
    text("Je hebt gewonnen!",30,300);
    noLoop();
    }
}
