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

  if (tabName== "tabs-1"){
    displayCards(sessionStorage.getItem("cardNumber"))
  }

  console.log(`#${tabName}`)

}

function shuffleCardArr(arr){

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

function displayCards(cardCountToDisplay){
// clear the previous card disply
  let cardList= []
  for (let i = 1; i <= 24; i++) {
    cardList.push(`card_${i}`)
  }

  console.log(cardList)

  $("#cards").empty() 
  var row, col;

  if (cardCountToDisplay== 8){
    row=8
    col=1
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
  console.log("pairsToPick", pairsToPick)
  let pickedPair= []
  while (pairsToPick --){
    let randomIndex = Math.floor(Math.random() * cardList.length)
    pickedPair.push(cardList[randomIndex])
    cardList.splice(randomIndex, 1)
    // console.log(pairsToPick)
    // break;
  }

  pickedPair = shuffleCardArr(pickedPair)
  console.log(cardList)

  for (let x=0; x<row; x++){
    for (let y=0; y<col; y++){
      $("#cards").prepend(`<img src="./images/back.png" />`)
    }
  }
}

$(document).ready(() => {
  sessionStorage.clear()
  // default open

  // default card count--> tab 1 is open by default
  sessionStorage.setItem("cardNumber", 48);
  $("#btn-tabs-1").click()

  // set session storage
  $("#save_settings").click(() => {
    var playerName = $("#player_name").val();
    var cardNumber = $("#num_cards").val();

    if (playerName == "") {
      window.alert("Please enter your name.")
    }

    else{    
      // set player name and card number
      sessionStorage.setItem("playerName", playerName);
      sessionStorage.setItem("cardNumber", cardNumber);
      // display player name on screen
      $("#player").html("Player: " + sessionStorage.getItem("playerName"))
    
      displayCards(sessionStorage.getItem("cardNumber"))

      // console.log(playerName, cardNumber)
    }



  })


})