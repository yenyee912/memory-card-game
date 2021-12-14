"use strict"

function openTab(evt, tabName) {
  var tabcontent = document.getElementsByClassName("tabcontent");
  var tablinks = document.getElementsByClassName("tablinks");

  for (let i = 0; i < 3; i++) {
    tabcontent[i].style.display = "none";
    tablinks[i].className = tablinks[i].className.replace(" active", "");
    tablinks[i].className = tablinks[i].className.replace(" tabButtonSelected", "");

  }

  $(`#${tabName}`).css("display", "block");
  $(`#${tabName}`).addClass("active");
  $(`#btn-${tabName}`).addClass("tabButtonSelected");

  console.log(`#${tabName}`)

}

function displayCards(){
  for (let row=0; row<6; row++){
    for (let col=0; col<8; col++){
      
      
    }
  }
}

$(document).ready(() => {
  // default open
  $("#btn-tabs-1").click()

  $("#save_settings").click(() => {
    var playerName = $("#player_name").val();
    var cardNumber = $("#num_cards").val();

    if (playerName == "") {
      window.alert("Please enter your name.")
    }

    sessionStorage.setItem("playerName", playerName);
    $("#player").html("Player: " + sessionStorage.getItem("playerName"))

    console.log(playerName, cardNumber)

  })





})