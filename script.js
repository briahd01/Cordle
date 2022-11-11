'use strict';

// create a file stream
//var fs = require('fs');
// constant variable - number of guesses will remain the same
const NUM_GUESSES = 6;

// create variable to count the guesses remaining, store the user's guess and the computer's chosen word to guess
let guessRemaining = NUM_GUESSES;
let userGuess = ""; // will store users input
let computerWord = ""; // store random word
let nextLetter = 0; // for inserting and deleting

// exception handling for opening a file
    try {
      // read in file
      //var wordList = fs.readFileSync('c:/Users/Briah/OneDrive/Documents/JavaScriptPL/words.txt').toString().split("\r\n");

      var wordList = ["world", "april", "thief", "march", "clone"]
      var index = Math.floor(Math.random() * wordList.length);

      // find and store a random word from list
	    computerWord = wordList[index];
    }
    catch (err){
      console.log(err);
    }


// create the squares
function gameBoard(){
  let board = document.getElementById("game-board");

  // create 6 row elements
  for (let i = 0; i < NUM_GUESSES; ++i){
    let row = document.createElement("div");
    row.className = "letter-row";
    // create 5 elements for each row (will become the boxes)
    for (let j = 0; j < 5; ++j){
      let box = document.createElement("div");
      box.className = "letter-box";
      row.appendChild(box);
    }
    // add each row to the board
    board.appendChild(row);
  }
}

// this will look out for key presses
document.addEventListener("keyup", (e) =>{
  if (guessRemaining == 0) {
    return;
  }
  // convert pressed key letter/word into a string
  let pressedKey = String(e.key);

  // if backspace, delete the letter
  if (pressedKey == "Backspace"){
    deleteLetter();
    return;
  }
  // if the user pressed enter, that means there is a word to check
  if (pressedKey == "Enter"){
   compare();
   return;
  }

  let found = pressedKey.match(/[a-z]/gi);
  // check if the key is a letter
  if (!found || found.length > 1){
    return;
  }
  else{
    // insert the letter
    insertLetter(pressedKey);
    return;
  }
})

// removes the letter from the box
function deleteLetter(){
  // find the row the letter is in
  let index = NUM_GUESSES - guessRemaining;
  let row = document.getElementsByClassName("letter-row")[index];

  // find the box that has the letter
  let square = row.children[nextLetter - 1];
  // remove the letter
  square.textContent = "";
  square.classList.remove("filled-box"); // remove boarder
  
  // now the user guess has one less letter
  userGuess = userGuess.slice(0, userGuess.length - 1);
  nextLetter--;

}

// add the letter to the box
function insertLetter(keyPressed){
  // ignore if full
  if (nextLetter == 5){
    return;
  }
  // make it lowercase to properly compare
  keyPressed = keyPressed.toLowerCase();

  // find row
  let index = NUM_GUESSES - guessRemaining;
  let row = document.getElementsByClassName("letter-row")[index];

  // find square
  let square = row.children[nextLetter];
  square.textContent = keyPressed;
  square.classList.add("filled-box");
  userGuess += keyPressed; // add the letter to the word
  nextLetter++;
}

// compare the guess with the expected word from word list
function compare(){
  // find row
  let index = NUM_GUESSES - guessRemaining;
  let row = document.getElementsByClassName("letter-row")[index];

  // if the word is not five letters long, send an error
  if (userGuess.length != 5){
    alert("ERROR: Not enough letters!");
    return;

  }
  // if the word is not in the list, send an error
  if (!wordList.includes(userGuess)){
    alert("ERROR: Word is not in list");
    return;
  }

    var i = 0;
    // loop through each character of the word
    while (i < 5){
      // if they are in the same position, color the box indigo
      if (userGuess[i] == computerWord[i]){
        let square = row.children[i];
        square.style.backgroundColor = "indigo";
  
      }
      // if the letter is not in the computers word, color it gray
      else if (!computerWord.includes(userGuess[i])) {
        let square = row.children[i];
        square.style.backgroundColor = "gray";
      }
      // if the letter is in the word, color it yello
      else {
        let square = row.children[i];
        square.style.backgroundColor = "yellow";
      }
      // move to next letter
      i++;
    }
    // if the user one, send a message and reset
    if (userGuess == computerWord){
      alert("You got it!");
      guessRemaining = 0;
      return;
    }
    else{
      // reset everything
      guessRemaining--;
      userGuess = "";
      nextLetter = 0;
      // if the user lost, send an error
      if (guessRemaining == 0){
        alert("Out of tries! The word was " + computerWord);
      }
    }
  }

  // create game board
  gameBoard();

