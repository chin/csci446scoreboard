var guessesLeft = 10;
//var highScores = new Array([9, "HarryJamesPotter"], [3, "ZedCthulhu"], [2, "NearlyDied"]);
var answer = Math.floor(Math.random() * 101);
var db = "http://empty-fire-4863.herokuapp.com/boards";
var boards;

$(function() {
  updateScore(guessesLeft);
  populateHighScores();
});

function populateHighScores() {
  //scores.sort(compareNumbers);
  $.get(db, function(boards){
    $('div#highScores').empty();
    for (var i = 0; i < boards.length; ++i) {
      $('div#highScores').append("<p>" + boards[i].name + " " + boards[i].score + "</p>");
    }
  });
}

function updateScore(board) {
  $('h2#score span#guessesLeft').empty();
  $('h2#score span#guessesLeft').append(board);
}

function gameLogic(){
  var input = document.getElementById( "guess" );
  var guess = parseFloat( input.value );
  if(guess==answer && guessesLeft>0){
    updateView("<b>THE GALACTIC EMPIRE SALUTES YOU!</b>");
    biWinning();
    populateHighScores();
  }else if(guess<answer && guessesLeft>0){
    valuer("TOO LOW!");
  }else if(guess>answer && guessesLeft>0){
    valuer("TOO HIGH!");
  }else{
    alert("BOO YOU WHORE! Play Again");
    reset();
  }
  gLeft();
}

function updateView(text){
  $('p#explanation').empty();
  $('p#explanation').append(text);
}

function biWinning(){
  var name=prompt("Please enter your name:");
  //populateHighScores([guessesLeft, name]);
  to_db(name, guessesLeft);
  reset();
}

function valuer(text){
  updateView(text);
  guessesLeft = guessesLeft-1;
  updateScore(guessesLeft);
}

function gLeft(){
  $('h2#score span#guessesLeft').empty();
  $('h2#score span#guessesLeft').append(guessesLeft);
}

function compareNumbers(a, b) {
     return parseInt(a[0]) - parseInt(b[0]);
}

function reset(){
  var guessesLeft = 10;
  var answer = Math.floor(Math.random() * 101);
  updateScore(guessesLeft);
  populateHighScores();
  document.getElementById( "guess" );
  var guess = parseFloat( input.value );
}

function to_db(name, score){
  $.post(db, { "name": name, "score": score});
}