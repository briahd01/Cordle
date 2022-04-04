'use strict';

// create a file stream
//var fs = require('fs');
// constant variable - number of guesses will remain the same
const NUM_GUESSES = 6;
// create variable to count the guesses remaining, store the user's guess and the computer's chosen word to guess
let guessRemaining = NUM_GUESSES;
let userGuess = "";
let computerWord = "";
let nextLetter = 0;
let score = 0;

// exception handling for opening a file
    try {
      // read in file
      //var wordList = fs.readFileSync('c:/Users/Briah/OneDrive/Documents/JavaScriptPL/words.txt').toString().split("\r\n");
      var wordList = ["world", "april", "these", "march", "clone"]
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

  let found = pressedKey.match(/[a-z]/gi)
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

function deleteLetter(){
  let index = NUM_GUESSES - guessRemaining;
  let row = document.getElementsByClassName("letter-row")[index];

  let square = row.children[nextLetter - 1];
  square.textContent = "";
  square.classList.remove("filled-box");
  userGuess = userGuess.slice(0, userGuess.length - 1);
  nextLetter--;

}

function insertLetter(keyPressed){
  if (nextLetter == 5){
    return;
  }
  keyPressed = keyPressed.toLowerCase();

  let index = NUM_GUESSES - guessRemaining;
  let row = document.getElementsByClassName("letter-row")[index];

  let square = row.children[nextLetter];
  square.textContent = keyPressed;
  square.classList.add("filled-box");
  userGuess += keyPressed;
  nextLetter++;
}

// compare the guess with the expected word from word list
function compare(){
  let index = NUM_GUESSES - guessRemaining;
  let row = document.getElementsByClassName("letter-row")[index];

  if (!userGuess.length == 5){
    alert("ERROR: Not enough letters");
    return;

  }
  if (!wordList.includes(userGuess)){
    alert("ERROR: Word is not in list");
    return;
  }

    var i = 0;
    var color = "";
    while (i < 5){
      if (userGuess[i] == computerWord[i]){
        let square = row.children[i];
        square.style.backgroundColor = "indigo";
        color = "indigo";
  
      }
      else if (!computerWord.includes(userGuess[i])) {
        let square = row.children[i];
        square.style.backgroundColor = "gray";
        color = "gray";
      }
      else {
        let square = row.children[i];
        square.style.backgroundColor = "yellow";
        color = "yellow";
      }
      i++;
    }

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
      if (guessRemaining == 0){
        alert("Out of tries! The word was " + computerWord);
      }
    }
  }

  gameBoard();

  // // reassign everything 
  // function newGame(){
  //   userGuess = "";
  //   computerWord = "";
  //   nextLetter = 0;
  //   // exception handling for opening a file
  //   try {
  //     // read in file
  //     //var wordList = fs.readFileSync('c:/Users/Briah/OneDrive/Documents/JavaScriptPL/words.txt').toString().split("\r\n");
  //     var wordList = ["world", "april", "these", "march", "clone"]
  //     var index = Math.floor(Math.random() * wordList.length);
  //     // find and store a random word from list
	//     computerWord = wordList[index];
  //   }
  //   catch (err){
  //     console.log(err);
  //   }
  //   gameBoard();
  // }

