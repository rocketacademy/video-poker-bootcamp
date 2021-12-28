//---DOCUMENT OBJECT MODEL---//
let readyButton = document.createElement("button");
let gameMessage = document.createElement("div");
let dealButton = document.createElement("button");
dealButton.setAttribute("id", "deal-button");
dealButton.innerHTML = "DEAL";
dealButton.disabled = true;
let outputMessage = document.createElement("div");
outputMessage.id = "output-message";
let table = document.getElementById("table");
// BET ONCE BUTTON //
let betOneButton = document.createElement("button");
betOneButton.innerHTML = "BET ONE";
betOneButton.setAttribute("id", "bet-one");
// BET ALL BUTTON //
let betAllButton = document.createElement("button");
betAllButton.innerHTML = "MAX BET";
betAllButton.setAttribute("id", "bet-all");
// FINAL DEAL BUTTON AFTER CHOOSING CARDS TO BE HELD //
let finalDealButton = document.createElement("button");
finalDealButton.setAttribute("id", "finaldeal-button");
finalDealButton.innerHTML = "LOCK IT IN";
// CONTAINER FOR ALL BUTTONS //
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("button-cont");
buttonContainer.appendChild(betOneButton);
buttonContainer.appendChild(betAllButton);
buttonContainer.appendChild(dealButton);
