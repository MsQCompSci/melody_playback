# melody_playback
p5.Oscillators and Express.js playing back notes in melodies

[Link to Previous steps repo](https://github.com/MsQCompSci/play_ocsillator)

# Step 3 – Making the playback file

In this tutorial step, we focus on enhancing our melody application by adding a separate file, playback.js, dedicated to managing the playback of multiple notes. Writing code dedicated to one task allows for a cleaner and more organized code structure, making our application easier to maintain and extend. We will also modify sketch.js to control the playback.js file by creating a variable to keep track of notes that play, creating the oscillator that will play the note, and incorporating visual feedback and mouse interaction. By the end of this step, our application will be capable of playing a melody in the key of C major, demonstrating the fundamental concepts of sound generation and interaction in a web-based environment.

##Step 3a – playback.js

`playback.js` serves a crucial role in our application. It's specifically designed to control the playback of multiple notes, a key feature for any music-related application. By isolating this functionality in a separate file, we ensure that our code remains modular and maintainable.

1. Add a playback.js to the public folder in your project.

<code>|-- melody-app
    |-- public
        |-- index.html
        |-- playback.js
        |-- sketch.js
        |-- style.css
    |-- package.json
    |-- server.js </code>
Load playback.js in a script tag near the bottom of the <body> element in index.html.
		`<script src="playback.js"></script>`

- Bottom of index.html:
   
    <code><!-- existing code -->
    <script src="playback.js"></script>    
    <script src="sketch.js"></script>
  </body>
</html> </code>

2. In the` playback.js` file, declare a variable called frequencies and initialize it with an array of frequencies in C major. Start with the frequency for middle C at index 0, and include all frequencies in C major. 

- Add the following to the top of playback.js:

<code>//middle c
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
];<code>

3. Declare a variable called numNotes and initialize it with the number of notes in the scale. Declare a variable called oscillators and initialize it with an empty array. This will hold the oscillator objects you create later.

<code>//number of notes in scale
let numNotes = frequencies.length;

//empty array for oscillator objects
let oscillators = [];
</code>

4. Declare a new variable called melody and initialize it with a JSON object that contains the name of the melody, the array of indices for notes played, and the tempo of the melody. 
- The `notes` key holds an array of numbers that specify the index for each note in the frequencies array.
> Note: Index 0 in the notes array represents middle C, the first frequency in the frequencies array.
- The `tempo` key holds the number of beats per minute for the melody.

<code>//JSON object to play C Major Scale
let melody = {
  name: 'C Major Scale',
  notes: [0, 1, 2, 3, 4, 5, 6, 7],
  tempo: 100,
};</code>

5. Create variables to keep track of the number of notes in the melody, and the duration the note will play (in seconds) based on the melody’s tempo. Assume that each note plays for one beat.

</code>
//number of notes in the melody
let numIntervals = melody.notes.length;

//calculate duration of each note in seconds
let noteDuration = 60 / melody.tempo;
</code>

6. Define the `playNote()` function with a parameter `n` that controls the amount of time an oscillator plays, and modifies the sound with a short fade-in and fade-out for a more natural listening experience. The `playNote()` function:
- receives a number n that indicates the index of the oscillator object in the oscillators array that will play.
<ul><li>Start the oscillator at `oscillators[n]` as long as it hasn’t already started.
<ul><li> to check if the oscillator is playing, use its `.started` property</li>
<li> use the `start()` method to start the oscillator</li></ul></li></ul>
- Set the volume to 1 with a fade in of 0.01 seconds using the oscillators `amp()` method

<code>function playNote(n) {
  //start oscillator if needed
  if (!oscillators[n].started) {
    oscillators[n].start();
  }
 //increase volume with 0.01s fade-in
  oscillators[n].amp(1, 0.01);
}</code>


7. To control the amount of time a note plays, define a function called stopNote() with a parameter n, that stops the oscillator with a short fade-out. The `stopNote()` function:
- receives a number `n` that indicates the index of the oscillator object that is playing
- sets the volume to 0 with a fade out of 0.01 seconds using the oscillators `amp()` method
- uses the `stop()` method to stop the oscillator 

<code>
function stopNote(n) {
  //lower oscillator volume to 0
  oscillators[n].amp(0, 0.01);
  
  //stop the oscillator
  oscillators[n].stop();
}</code>

8. Modify  `playNote()` so that it controls the amount of time each note plays. Use setTimeout() to trigger stopNote() after the note plays for one beat (the number of seconds specified in noteDuration). 
- `setTimeout()` executes a function with a delay measured in milliseconds. noteDuration can be converted to milliseconds using the expression  noteDuration * 1000. Delaying `stopNote()` by `noteDuration` plays the note for one beat.
- Add this line of code at the bottom of playNote():

<code>
//stop the note after noteDuration * 1000 milliseconds
setTimeout(function() { stopNote(n); }, noteDuration * 1000);
</code>
  
9. Define the `play()` function which schedules when each note in the melody.notes array will be played throughout the melody. The elements in `melody.notes` include all notes in the melody, in order (with index 0 being the first note and index `melody.notes.length - 1` being the last index). Each note can be played at a specific time after the melody starts using `setTimeout()` to trigger `playNote()`. The `play()` function should:
- use a `for` loop to iterate through the array in `melody.notes`
- define a local variable called `note` that saves the number in the element in the melody.notes array with index i.
<ul><li>use `setTimeout()` to trigger `playNote()` at a time equal to the noteDuration in milliseconds times the index number i: noteDuration * 1000 * i
<ul><li>Notes in any melody are played one after the other at a rate defined by the melody’s tempo (in beats per minute). The first note is played on the first beat, and each consecutive note is played on consecutive beats until the song ends. With this knowledge, you calculated the number of seconds each note should be played using melody.tempo, and saved it in noteDuration. </li>
<li>We can represent the time to delay before playing each note using the expression:  `noteDuration * 1000 * i` . This is because if a note is played on each beat of a melody:
<ul><li>the first note will play at a time 0 milliseconds after the melody starts</li>
<li>the second note will play after the first, at a time equal to noteDuration * 1000 milliseconds</li>
<li>the third note will play after the second, which means it will need to be delayed for the same amount of time it takes to play two notes - a time equal to noteDuration * 1000 * 2 milliseconds </li>
<li>the fourth note will play after the third at a time equal to noteDuration * 1000 * 3 milliseconds</li>
<li>This pattern continues until all notes are played. The pattern you see above shows that on each iteration, noteDuration * 1000 changes by a factor of 1 enabling us to use i as a multiplier.</li></ul></li></ul>

<code> function play() {
  for (let i = 0; i < melody.notes.length; i += 1) {
      //save note index
      let note = melody.notes[i];

     //play all notes
     setTimeout(function() { playNote(note); }, noteDuration * 1000 * i);
      }
  } </code>

> Try This!
> Experiment with different tempos. See how changing the tempo property in the melody object affects the playback of the melody.

## Step 3b – Updating sketch.js
Define a new Boolean variable called isPlaying to keep track of if a melody is playing.

<code>//Boolean variable for melody playing state
let isPlaying = false;
<code>

1. Initialize all oscillators needed to play notes in the C major scale. 
- In setup(), replace the line of code that initializes an oscillator object with a for loop to initialize multiple oscillator objects, and place them into the oscillators array defined in `playback.js`:
- Create a `for` loop that uses each frequency in the `frequencies` array, defined in `playback.js`, to initialize a new oscillator object
- Add each oscillator to the `oscillators` array. This will create oscillator objects for all the possible notes that can be played in the sketch.

<code>function setup() {
createCanvas(400,400);
//initialize oscillators and place in oscillators array
  for (let freq of frequencies) {
    osc = new Oscillator(freq);
    oscillators.push(osc);
  }

  //… text styling
}</code>

2. Play the melody when the mouse is pressed in `mousePressed()`:
- Call `play()` if the melody is not already playing
- Change the value of `isPlaying` to `true` if it is `false`.

<code>//play melody
if (isPlaying === false) {
    play();
    isPlaying = true;
  }</code>

3. Display text instructions, the melody name and the frequency of each note played on the canvas. Only display instructions when the melody is not playing. Replace the code in draw with:

<code>background(225);

  //display melody name
  text(melody.name, width / 2, 50);
   
  //display instruction if melody is not playing
   if (isPlaying === false) {
      text('Click to play', width / 2, height / 2);
    }else{
  //display frequency using for loop looking through oscillator array  
    for (let sound of oscillators) {
      if (sound.started === true) { //check if the oscillator is playing
        //get the frequency (round to nearest whole number with floor())
        freq = floor(sound.getFreq()); 
        
        //display the frequency
        text(`${freq} Hz`, width / 2, height / 2);
      }
    }
  }</code>

  Refresh the browser and enjoy!
