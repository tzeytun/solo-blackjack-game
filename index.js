let cards = []
let sumCards = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let errorEl = document.getElementById("error-el")
let profitEl = document.getElementById("profit-el")
let lossEl = document.getElementById("loss-el")
let chip10 = document.getElementById("chip10-el")
let chip50 = document.getElementById("chip50-el")
let chip100 = document.getElementById("chip100-el")
let isChecked = false
let selectedBet = 0;

    let Greeting = prompt("Please enter a name before starting the game.");

    if (Greeting) {
        isChecked = true
        alert(`Welcome, ${Greeting}!`)
    }

    let player = {
        playerName : `${Greeting}`,
        chips : 200 
    }

    let playerEl = document.getElementById("player-el")
    playerEl.textContent = player.playerName + " : $" + player.chips

    console.log(cards)



function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    let cardValue = randomNumber;
    let cardImage = "";

   

    if (randomNumber > 10) {
        cardValue = 10;
        cardImage = `images/K.svg`;  

    } else if (randomNumber === 1) {
        cardValue = 11;
        cardImage = `images/A.svg`;

    } else {
        cardImage = `images/${randomNumber}.svg`; 
    }



    return {
        value: cardValue,
        image: cardImage
    };
}

chip10.addEventListener("click", function() {

    if (isAlive) {
        errorEl.textContent = "You can't change your bet during an ongoing game!";
        return;
    }
    selectedBet = 10;
    errorEl.textContent = "" 
    alert("You have selected a bet of $10. Now you can start.")
});

chip50.addEventListener("click", function() {

    if (isAlive) {
        errorEl.textContent = "You can't change your bet during an ongoing game!";
        return;
    }

    selectedBet = 50
    errorEl.textContent = ""
    alert("You have selected a bet of $50. Now you can start.")
});

chip100.addEventListener("click", function() {

    if (isAlive) {
        errorEl.textContent = "You can't change your bet during an ongoing game!";
        return;
    }

    selectedBet = 100
    errorEl.textContent = ""
    alert("You have selected a bet of $100. Now you can start.")
});

function startGame() {

    if (isAlive === true && hasBlackJack === false){

        errorEl.textContent = "You need to finish your current game before starting a new one!"
        return;

    } 

    if (selectedBet === 0) {
        errorEl.textContent = "You need to select a bet before playing!";
        return;
    }

    if (player.chips === 0) {
        errorEl.textContent = "You haven't enough money to play!";
        return;
    }

    messageEl.textContent = "";
    profitEl.textContent = "";
    lossEl.textContent = "";
    errorEl.textContent = "";

    isAlive = true;
    hasBlackJack = false;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sumCards = firstCard.value + secondCard.value;

    renderGame();
}


function renderGame() {
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.innerHTML += `<img src="${cards[i].image}" alt="card" style="width:50px; height:75px;"> `;
    }

    sumEl.textContent = "Sum: " + sumCards;
    if (sumCards <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sumCards === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
        player.chips += selectedBet * 2;
        playerEl.textContent = player.playerName + " : $" + player.chips
        profitEl.textContent = `You won $${selectedBet * 2}!` 

    } else {
        message = "You're out of the game!";
        isAlive = false;
        player.chips -= selectedBet;
        playerEl.textContent = player.playerName + " : $" + player.chips;
        lossEl.textContent = `You lost $${selectedBet}!`
    }
    messageEl.textContent = message;
}

function newCard() {

    errorEl.textContent = "";

    if (isAlive === false) {
        errorEl.textContent = "You need to start the game before drawing a card.";
        return;
    
    }
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard();
        sumCards += card.value;
        cards.push(card);
        renderGame();
        
    } else if (isAlive === false || hasBlackJack === true) {
        showErrorMessage();
    }

}

function showErrorMessage() {
    let errMessage = "Sorry, you can't draw a card.";
    errorEl.textContent = errMessage;
}


