/** Initilize variables to be used for the Game **/
var myGameOptions = ["paper", "rock", "scissors"];
var myScore = 0;
var compScore = 0;
var draw = 0;

/** Helper function to return Random Number between min and max **/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** This method will be called by Key Press or Button Press event **/
function playGame(mySelection) {
    /** Get the Game Array Option Value using Random Number between 0~2 **/
    var compRandomSelection = myGameOptions[getRandomInt(0,2)];

    /** Get First Char from the compRandomSelection as mySelction only has single char **/
    var compSelection = compRandomSelection.charAt(0);

    /** Play Remote Game **/
    playRemoteGame(mySelection, compSelection);
}

function playRemoteGame(mySelectionLocal, compSelection) {
  if ("0"==mySelectionLocal) return false;
  if ("0"==compSelection) return false;

  //RESET GLOBAL
  mySelection = "";
  remoteSelection = "";

  /**  Temp score we will use it later for calculation **/
  var tmpMyScore = myScore;
  var tmpCScore = compScore;
  var tmpDScore = draw;

  /** Actual Game logic **/
  if (mySelectionLocal  === compSelection) {
    draw++;
  } else if (mySelectionLocal=='r') {
      if (compSelection=='p') compScore++;
      if (compSelection=='s')  myScore++;
  } else if (mySelectionLocal=='p') {
    if (compSelection=='r') myScore++;
    if (compSelection=='s') compScore++;
  } else if (mySelectionLocal=='s') {
    if (compSelection=='p') myScore++;
    if (compSelection=='r') compScore++;
  }
  /** Helper Functions for Display On Screen **/
  updateSelectionsOnScreen(mySelectionLocal, compSelection);
  updateScoreOnScreen(myScore, compScore, draw);
  updateScoreBoardOnScreen(myScore, compScore, draw, tmpMyScore, tmpCScore, tmpDScore);

  return true;
}

/** Update Span to Show My and Computer selection **/
function updateSelectionsOnScreen(mySelection, compSelection) {
  document.getElementById('myCurrentSelection').textContent = mySelection;
  document.getElementById('compCurrentSelection').textContent = compSelection;
}

/** Update Span to Show scores **/
function updateScoreOnScreen(myScore, compScore, draw) {
  document.getElementById('ourWin').textContent = myScore;
  document.getElementById('compWin').textContent = compScore;
  document.getElementById('draw').textContent = draw;
}

/** Add New Row and Cells to show Game scores **/
function updateScoreBoardOnScreen(myScore, compScore, draw, tmpMyScore, tmpCScore, tmpDScore) {
  var scoreBoardTable  = document.getElementById("scoreBoard");

  /** Using -1 to add row at the end, use 0 if you want to add new row on top. **/
  var newRow = scoreBoardTable.insertRow(-1);

  /** adding 3 new columns . **/
  var myCol = newRow.insertCell(0);
  var coCol = newRow.insertCell(1);
  var dCol = newRow.insertCell(2);

  /** Adding text to newly added 3 row cells **/
  myCol.innerHTML = parseInt(myScore) - parseInt(tmpMyScore);
  coCol.innerHTML = parseInt(compScore) - parseInt(tmpCScore);
  dCol.innerHTML = parseInt(draw) - parseInt(tmpDScore);
}

/** document.onkeypress is fired when we press key **/
document.onkeypress = function(event) {
  if(event.key=='r' || event.key=='p' || event.key=='s' )
    playGame(event.key);
}
