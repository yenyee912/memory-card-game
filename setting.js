"use strict"

// control the click of tab
function openTab(evt, tabName) {
  var tabcontent = document.getElementsByClassName("tabcontent");
  var tablinks = document.getElementsByClassName("tablinks");

  // remove classes of all tabs --> hide and show all remove
  for (let i = 0; i < 3; i++) {
    tabcontent[i].style.display = "none";
    tablinks[i].className = tablinks[i].className.replace(" active", "");
    tablinks[i].className = tablinks[i].className.replace(" tabButtonSelected", "");
  }

  // add back the classes to the selected tab
  $(`#${tabName}`).css("display", "block");
  $(`#${tabName}`).addClass("active");
  $(`#btn-${tabName}`).addClass("tabButtonSelected");

  // user click start game, play game
  if (tabName == "tabs-1") {
    // if (sessionStorage.getItem("isNewGame"))
    displayCards(sessionStorage.getItem("cardNumber"));
  }

  //tabs-2 is for instruction

  // for tabs-3 only
  $("#save_settings").click(() => {
    var playerName = $("#player_name").val();
    var cardNumber = $("#num_cards").val();

    if (playerName == "") {
      window.alert("Please enter your name.");
    }

    else {
      // set player name and card number
      sessionStorage.setItem("playerName", playerName);
      sessionStorage.setItem("cardNumber", cardNumber);
      sessionStorage.setItem("isNewGame", true); // new setting, new game

      // display player name on screen
      $("#player").html("Player: " + sessionStorage.getItem("playerName"));
      $("#correct").html(`Click Play Game`);

    }
  })
}

function makeSelection(cardName) {
  let isPairFormed = sessionStorage.getItem("isPairFormed");
  let currentSelectedPair = JSON.parse(sessionStorage.getItem("currentSelectedPair"));


  if (isPairFormed==2){  
    console.log(currentSelectedPair, isPairFormed)

    console.log("wait for flip card and start new pair, dont rush")
  }

  else{
  let currentSelectedPair = JSON.parse(sessionStorage.getItem("currentSelectedPair"));

  console.log(cardName)
  let cardIndex = cardName.split("_")
  if ($(`#${cardName}`).attr("src") == "./images/back.png") {
    $(`#${cardName}`).attr("src", `./images/card_${cardIndex[1]}.png`);

    if (currentSelectedPair.pickA == "") {
      currentSelectedPair.pickA = cardName;
      sessionStorage.setItem("currentSelectedPair", JSON.stringify(currentSelectedPair));
      sessionStorage.setItem("isPairFormed", 1);

    }

    else if (currentSelectedPair.pickB == "") {
      currentSelectedPair.pickB = cardName;
      sessionStorage.setItem("currentSelectedPair", JSON.stringify(currentSelectedPair));
      sessionStorage.setItem("isPairFormed", 2);
      processSelectedPairs(currentSelectedPair.pickA, currentSelectedPair.pickB); // this is actually a checking function

    }
  }

  else{
    console.log('this card has been matched');
  }
}
}

// check if you need to flip card or not
function processSelectedPairs(card1, card2) {
  // let isGoodPair= false;
  let card1Index = card1.split("_");
  let card2Index = card2.split("_");

  if (card1Index[1] == card2Index[1] && card1Index[2] != card2Index[2]) {
    // matched if only if card1 and card2 are same image index, and card1 is not card2
    let currentMatchedPair = sessionStorage.getItem("matchedPair")
    sessionStorage.setItem("matchedPair", currentMatchedPair+=1);

    sessionStorage.setItem("currentSelectedPair", JSON.stringify({ pickA: "", pickB: "" }))
    sessionStorage.setItem("isPairFormed", 0);

    gameOverCheck(); // function to push highscore

  }

  else {
    // flip card
    window.setTimeout(flipCard, 1500);
  }

}

function flipCard() {
  let cardPair = JSON.parse(sessionStorage.getItem("currentSelectedPair"))
  // $("#cards").attr();
  // console.log(`#${cardPair.pickA}`);
  // console.log(`#${cardPair.pickB}`);

  $(`#${cardPair.pickA}`).attr("src", "./images/back.png")
  $(`#${cardPair.pickB}`).attr("src", "./images/back.png")
  sessionStorage.setItem("currentSelectedPair", JSON.stringify({ pickA: "", pickB: "" }))
  sessionStorage.setItem("isPairFormed", 0);

}

function gameOverCheck(){
  let currentMatchedPair = sessionStorage.getItem("matchedPair");
  let totalPair = sessionStorage.getItem("cardNumber")/2;

  if (currentMatchedPair==totalPair){
    console.log("Game Over, update high score");
    calculateHighestScore();
  }

}

function calculateHighestScore() {
  let highScore = 0
  sessionStorage.setItem("highestScore", highScore)
}


function shuffleCardArr(arr) {

  let currentIndex = arr.length
  let randomIndex;
  // console.log(randomIndex)

  // While there remain elements to shuffle-->> currentIndex != 0
  while (currentIndex != 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    // console.log(Math.floor(Math.random() * currentIndex), (Math.random() * currentIndex), currentIndex)
    currentIndex--;

    // And swap it with the current element
    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  }

  return arr

}

function displayCards(cardCountToDisplay) {
  // clear the previous card display
  let cardList = []
  // $("#cards").empty() 

  // card constant :improvement which can be done-> accept number pick
  for (let i = 1; i <= 24; i++) {
    cardList.push(`card_${i}`)
  }

  var row, col;

  if (cardCountToDisplay == 8) {
    row = 8
    col = 1
  }

  if (cardCountToDisplay == 16) {
    row = 8
    col = 2
  }

  if (cardCountToDisplay == 24) {
    row = 8
    col = 3
  }

  if (cardCountToDisplay == 32) {
    row = 8
    col = 4
  }

  if (cardCountToDisplay == 40) {
    row = 8
    col = 5
  }

  if (cardCountToDisplay == 48) {
    row = 8
    col = 6
  }

  // pairs to pick
  let pairsToPick = cardCountToDisplay / 2
  $("#correct").html(`Correct: 0/${pairsToPick}`)

  console.log("pairsToPick", pairsToPick)
  let pickedPair = []

  // generate card list to display
  while (pairsToPick--) {
    let randomIndex = Math.floor(Math.random() * cardList.length)
    pickedPair.push(cardList[randomIndex] + "_a")
    pickedPair.push(cardList[randomIndex] + "_b")
    cardList.splice(randomIndex, 1)
  }

  pickedPair = shuffleCardArr(pickedPair)
  // console.log(pickedPair)

  let appendCount = pickedPair.length - 1
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < col; y++) {
      $("#cards").prepend(
        `<div>
        <img src="./images/back.png" id="${pickedPair[appendCount]}" onclick="makeSelection('${pickedPair[appendCount]}')" /> </div>`)
      // ${ pickedPair[appendCount] }
      // console.log(pickedPair[appendCount])
      appendCount--
    }
  }
}



// driver
$(document).ready(() => {
  sessionStorage.clear()

  // default card count--> tab 1 is open by default
  // clean previous data
  sessionStorage.setItem("cardNumber", 48);
  sessionStorage.setItem("currentSelectedPair", JSON.stringify({ pickA: "", pickB: "" }))
  sessionStorage.setItem("allScore", JSON.stringify([]))
  sessionStorage.setItem("isPairFormed", 0);
  sessionStorage.setItem("matchedPair", 0);

  // for display
  sessionStorage.setItem("playerName", "John Doe");
  sessionStorage.setItem("highScore", 0)
  sessionStorage.setItem("correct", 0)

  // default open
  $("#btn-tabs-3").click()



})