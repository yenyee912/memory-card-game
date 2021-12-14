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


function displayCards(cardCountToDisplay){

  let cardList= []
  let row, col
  $("#cards").empty()

  for (let i=1; i<= 24; i++){
    cardList.push(`card${i}`)
  }
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

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }  

  for (let x=0; x<row; x++){
    for (let y=0; y<col; y++){
      $("#cards").prepend(`<img src="./images/back.png" id="${getRandomArbitrary(1,24)}" />`)
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

    // set player name and card number
    sessionStorage.setItem("playerName", playerName);
    sessionStorage.setItem("cardNumber", cardNumber);
    displayCards(sessionStorage.getItem("playerName"))
    // display player name on screen
    $("#player").html("Player: " + sessionStorage.getItem("playerName"))

    console.log(playerName, cardNumber)

  })





})