//middle c
let first = 262;

//c major
let frequencies = [
  first,
  first * 9/8,
  first * 5/4,
  first * 4/3,
  first * 3/2,
  first * 5/3,
  first * 15/8,
  first * 2
];

//number of notes in scale
let numNotes = frequencies.length;

//empty array for oscillator objects
let oscillators = [];

//JSON object to play C Major Scale
let melody = {
    name: 'C Major Scale',
    notes: [0, 1, 2, 3, 4, 5, 6, 7],
    tempo: 100,
  };

//time in seconds for each beat
let noteDuration = 60/melody.tempo

function playNote(n) {
    //start oscillator if needed
    if (!oscillators[n].started) {
      oscillators[n].start();
    }
    //increase volume with 0.01s fade-in
    oscillators[n].amp(1, 0.01);
  
    //stop the note after noteDuration * 1000 miliseconds
    setTimeout(function() { stopNote(n); }, noteDuration * 1000);
  }

function stopNote(n) {
    //lower oscillator volume to 0
    oscillators[n].amp(0, 0.01);
    
    //stop the oscillator
    oscillators[n].stop();
 }

function play() {
    for (let i = 0; i < melody.notes.length; i ++) {
        //save note index
        let note = melody.notes[i];
  
        //play all notes
        setTimeout(function() { playNote(note); }, noteDuration * 1000 * i);
    }
}
  
  
  
  

