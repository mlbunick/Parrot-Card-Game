let parrots = [
    "bobrossparrot.gif",
    "explodyparrot.gif",
    "fiestaparrot.gif",
    "metalparrot.gif",
    "revertitparrot.gif",
    "tripletsparrot.gif",
    "unicornparrot.gif"
];

let deck = [];
let totalClicks = 0;
let qtdCards;

function buildDeck(){
    let attempts = 0;
    let maxAttempts = 3;

    while (attempts < maxAttempts) {
        qtdCards = prompt("Quantas cartas o jogo terá?");
        qtdCards = parseInt(qtdCards, 10);

        if (!isNaN(qtdCards) && validateGame(qtdCards)) {
            break;
        }
        
        alert("Por favor, insira um número válido de cartas.");
    }

    deck = [];

    for(let i = 0; i < (qtdCards / 2); i++){
        deck.push(parrots[i]);
        deck.push(parrots[i]);
    }

    deck.sort(() => Math.random() - 0.5); 

    start();
}
function start() {
    const cardElement = document.getElementsByClassName('cards')[0];
    let cardHTML = '';

    for (let i = 0; i < deck.length; i++) {
        cardHTML += `
        <div class="card card-${deck[i]}" data-id="${deck[i]}" onclick="turnCard(event)">

            <div class="front-face face">
            <img src="./assets/back.png">
            </div>

            <div class="back-face face">
            <img src="./assets/${deck[i]}">
            </div>

        </div>`;
    }

    cardElement.innerHTML = cardHTML;
}

let firstCardClicked = null;
let firstCardId = null;
let isProcessing = false;

function turnCard(event) { 
    totalClicks++;
    console.log(totalClicks);

    if (isProcessing) return; 

    const element = event.currentTarget;
    const id = element.getAttribute('data-id');

    if (element.classList.contains('clicked') || element.classList.contains('match')) {
        return;
    }

    element.classList.add('clicked');

    if (!firstCardClicked) {
        firstCardClicked = element;
        firstCardId = id;
        
    } else {
        const secondCardClicked = element;
        const secondCardId = id;

        if (firstCardClicked && secondCardClicked) {
            isProcessing = true;

            if (firstCardId === secondCardId) {
                firstCardClicked.classList.remove('clicked');
                secondCardClicked.classList.remove('clicked');

                firstCardClicked.classList.add('match');
                secondCardClicked.classList.add('match');

                firstCardClicked = null;
                firstCardId = null;
                isProcessing = false; 

                cardsMatch = document.getElementsByClassName('match');

                if (cardsMatch.length == qtdCards) {
                    setTimeout(() => {
                      alert(`Ganhou em ${totalClicks} jogadas!`);
                      playAgain();
                    }, 1000);
                }

            } else {
                setTimeout(() => {
                    if (firstCardClicked) firstCardClicked.classList.remove('clicked');
                    if (secondCardClicked) secondCardClicked.classList.remove('clicked');

                    firstCardClicked = null;
                    firstCardId = null;
                    isProcessing = false;
                }, 1000);
            }
        }
    }
}

function playAgain() {
    alert('Game Over!');
    location.reload();
}

function validateGame(qtdCards){
    if(qtdCards >=4 && (qtdCards % 2 === 0) && qtdCards <= 14){return true;}

    return false;
}

buildDeck();