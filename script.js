'use strict';

// create a file stream
//var fs = require('fs');
// constant variable - number of guesses will remain the same
const NUM_GUESSES = 6;
// create variable to count the guesses remaining, store the user's guess and the computer's chosen word to guess
let guessRemaining = NUM_GUESSES;
let userGuess = "";
let computerWord = "";

// exception handling for opening a file
    try {
      // read in file
      //var wordList = fs.readFileSync('c:/Users/Briah/OneDrive/Documents/JavaScriptPL/words.txt').toString().split("\r\n");
      var wordList = ["hello", "world", "cycle", "drama", "april"]
      var index = Math.floor(Math.random() * wordList.length);
      // find and store a random word from list
	    computerWord = wordList[index];
    }
    catch (err){
      console.log(err);
    }

// for debugging  
console.log(computerWord);

// create the squares
function gameBoard(){
  let board = document.getElementById("game-board");

  for (let i = 0; i < NUM_GUESSES; ++i){
    let row = document.createElement("div");
    row.className = "letter-row";

    for (let j = 0; j < 5; ++j){
      let box = document.createElement("div");
      box.className = "letter-box";
      row.appendChild(box);
    }
    board.appendChild(row);
  }
}
gameBoard();

// this will look out for key presses
document.addEventListener("keyup", (e) =>{
  if (guessRemaining == 0) {
    return;
  }
  let pressedKey = String(e.key);
  if (pressedKey == "Backspace"){
    // delete
    return;
  }
  
})



