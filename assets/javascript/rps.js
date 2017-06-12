/**
Copyright (c) 2011-2017 GitHub Inc.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


This application bundles the following third-party packages in accordance
with the following licenses:


Package: *
License: BSD
License Source: LICENSE
Source Text:

Copyright (c) Rajat Luthra (rajatluthra@gmail.com)
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

**/
/**
  Author: Rajat Luthra
  Date:   May 12th, 2017.

  Purpose: Multiplayer Game js.
**/
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
