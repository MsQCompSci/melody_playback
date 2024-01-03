//variable for oscialtor object
let osc;

//varable for frequency
let freq = 262;

//Boolean variable for melody playing state
let isPlaying = false;

function setup() {
  createCanvas(400, 400);

 //initialize oscillators and place in oscillators array
 for (let freq of frequencies) {
  osc = new p5.Oscillator(freq);
  oscillators.push(osc);
}
  //set text size
  textAlign(CENTER, CENTER);
  textSize(30);
}
  
function draw() {
  background(220);

//display melody name  
text(melody.name, width / 2, 50);
 
//display instruction if melody is not playing
 if (isPlaying === false) {
    text('Click to play', width / 2, height / 2);
  }else{
//display frequency using for loop looking through oscillator array  
  for (let sound of oscillators) {
    if (sound.started === true) { //check if the oscillator is playing
      let 
      //get the frequency (round to nearest whole number with floor())
      freq = floor(sound.getFreq()); 
      
      //display the frequency
      text(`${freq} Hz`, width / 2, height / 2);
    }
  }
  }

}

//start sound when mouse is pressed
function mousePressed() {
  //check if melody is playing
  if(isPlaying === false){
    //play sound and change state
    play();
    isPlaying = true;
  }
}

//stop sounds when mouse button is not pressed
function mouseReleased() {
  osc.stop();
}
