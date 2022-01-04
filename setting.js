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

  if (tabName == "tabs-1") {
    displayCards(sessionStorage.getItem("cardNumber"))
  }

  $("#save_settings").click(() => {
    var playerName = $("#player_name").val();
    var cardNumber = $("#num_cards").val();


    if (playerName == "") {
      window.alert("Please enter your name.")
    }

    else {
      // set player name and card number
      sessionStorage.setItem("playerName", playerName);
      sessionStorage.setItem("cardNumber", cardNumber);
      // display player name on screen
      $("#player").html("Player: " + sessionStorage.getItem("playerName"))
    }
  })
}

function checkSelectedPairs(card1, card2) {
  card1 = card1.split("_")
  card2 = card2.split("_")

  if (card1[1] == card2[1] && card1[2] != card2[2]) {
    // matched if only if card1 and card2 are same image index, and card1 is not card2
    return true
  }

  else {
    return false
  }

}

// when a card is selected
function showCardFront(cardName) {
  let cardIndex = cardName.split("_")

  // TODO: CHECK IF THE CARD(EVERY) SELECTED ARE MATCHED --> avoid select repeatedly
  if ($(`#${cardName}`).attr("src") == "./images/back.png") {
    $(`#${cardName}`).attr("src", `./images/card_${cardIndex[1]}.png`)




    let currentSelectedPair = JSON.parse(sessionStorage.getItem("currentSelectedPair"))

    if (currentSelectedPair.pickA == "") {
      currentSelectedPair.pickA = cardName
      sessionStorage.setItem("currentSelectedPair", JSON.stringify(currentSelectedPair))
    }

    else if (currentSelectedPair.pickB == "") {
      currentSelectedPair.pickB = cardName
      sessionStorage.setItem("currentSelectedPair", JSON.stringify(currentSelectedPair))

      let isMatched = checkSelectedPairs(currentSelectedPair.pickA, currentSelectedPair.pickB)
      if (isMatched) {
        calculateCorrectness()
        sessionStorage.setItem("currentSelectedPair", JSON.stringify({ pickA: "", pickB: "" }))
      }

      else {
        // set timer to flip
        window.setTimeout(showCardBack, 1000)
        /*not reset the session storage here cuz still need the card name to flip (showCardBack)*/
      }
    }
    console.log(sessionStorage.getItem("currentSelectedPair"))
  }

  else {
    console.log('this card has been matched')
  }
}

function showCardBack() {
  let cardPair = JSON.parse(sessionStorage.getItem("currentSelectedPair"))

  $(`#${cardPair.pickA}`).attr("src", "./images/back.png")
  $(`#${cardPair.pickB}`).attr("src", "./images/back.png")
  sessionStorage.setItem("currentSelectedPair", JSON.stringify({ pickA: "", pickB: "" }))

}

function calculateHighestScore() {
  let highScore = 0
  sessionStorage.setItem("highestScore", highScore)
}

function calculateCorrectness() {
  let totalPair = sessionStorage.getItem("cardNumber")
  let matchedPair = sessionStorage.getItem("matchedPair")

  if (matchedPair / totalPair == 1) {
    // save the game over score
    calculateHighestScore()

  }

  return matchedPair / totalPair

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
  // clear the previous card disply
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
  while (pairsToPick--) {
    let randomIndex = Math.floor(Math.random() * cardList.length)
    pickedPair.push(cardList[randomIndex]+"_a")
    pickedPair.push(cardList[randomIndex]+"_b")
    cardList.splice(randomIndex, 1)
  }

  pickedPair = shuffleCardArr(pickedPair)
  // console.log(pickedPair)

  let appendCount = pickedPair.length - 1
  // for (let x=0; x<row; x++){
  //   for (let y=0; y<col; y++){
  //     // $("#cards").prepend(`<div><img src="./images/back.png" /> ${pickedPair[appendCount]}</div>`)
  //     console.log(pickedPair[appendCount])
  //     appendCount--
  //   }
  // }
}



// driver
$(document).ready(() => {
  sessionStorage.clear()

  // default card count--> tab 1 is open by default
  // clean previous data
  sessionStorage.setItem("cardNumber", 48);
  sessionStorage.setItem("currentSelectedPair", JSON.stringify({ pickA: "", pickB: "" }))
  sessionStorage.setItem("allScore", JSON.stringify([]))

  // for display
  sessionStorage.setItem("playerName", "John Doe");
  sessionStorage.setItem("highScore", 0)
  sessionStorage.setItem("correct", 0)

  // default open
  $("#btn-tabs-3").click()

  $("#cards").prepend(`
 <div>
  <img src="./images/back.png" id="card_1_a" onclick="showCardFront('card_1_a')" />
</div>`)

  $("#cards").prepend(`
 <div>
  <img src="./images/back.png" id="card_1_b" onclick="showCardFront('card_1_b')" />
</div>`)

  $("#cards").prepend(`
 <div>
  <img src="./images/back.png" id="card_2_a" onclick="showCardFront('card_2_a')" />
</div>`)

  $("#cards").prepend(`
 <div>
  <img src="./images/back.png" id="card_3_a" onclick="showCardFront('card_3_a')" />
</div>`)

})