var guessesLeft = 10;
//var highScores = new Array([9, "HarryJamesPotter"], [3, "ZedCthulhu"], [2, "NearlyDied"]);
var answer = Math.floor(Math.random() * 101);
var db = "http://empty-fire-4863.herokuapp.com/highscores";

$(function() {
  updateScore(guessesLeft);
  populateHighScores(highScores);
});

function populateHighScores(scores) {
  //scores.sort(compareNumbers);
  $.get(db, function(scores) {
    $('div#highScores').empty();
    for (var i = 0; i < scores.length; ++i) {
      $('div#highScores').append("<p>" + scores[i].name + " " + scores[i].score + "</p>");
    }
  });
}

function updateScore(score) {
  $('h2#score span#guessesLeft').append(score);
}

function gameLogic(){
  var input = document.getElementById( "guess" );
  var guess = parseFloat( input.value );
  if(guess==answer && guessesLeft>0){
    updateView("<b>THE GALACTIC EMPIRE SALUTES YOU!</b>");
    biWinning();
    populateHighScores(highScores);
    return;
  }else if(guess<answer && guessesLeft>0){
    valuer("TOO LOW!");
  }else if(guess>answer && guessesLeft>0){
    valuer("TOO HIGH!");
  }else{
    updateView("<b>BOO YOU WHORE!</b>");
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
  guessesLeft = guessesLeft-1 ;
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
  guessesLeft = 10;
  answer = Math.floor(Math.random() * 101);
  updateScore(guessesLeft);
  populateHighScores(highScores);
  document.getElementById( "guess" );
  guess = parseFloat( input.value );
}

funtion to_db(name, score){
  $.post(db, { "name": userName, "score": score});
}