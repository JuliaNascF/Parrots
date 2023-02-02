let firstCard = false;
let contCartaVirada = 0;
let contarTodasViradas = 0;
let minhaArray
let minhaArray2
let amountCards
let timer = document.querySelector(".timer");
let timeConvert = Number(timer.textContent);
let seconds
let tempo


function DistributeCards() {

    var cards = document.querySelector("main");
    cards.innerHTML = "";
    amountCards = 0;
    while (amountCards % 2 !== 0 || amountCards > 14 || amountCards < 4) {
        amountCards = Number(prompt("Com quantas cartas você quer jogar? ( Precisa ser par de 4 à 14)"));
    }

    timeConvert = 0;
    tempo = setInterval(function () {
        timeConvert++
        timer.textContent = timeConvert
    }, 1000)

    minhaArray = ["images/bobrossparrot.gif", "images/explodyparrot.gif", "images/fiestaparrot.gif", "images/metalparrot.gif", "images/revertitparrot.gif", "images/tripletsparrot.gif", "images/unicornparrot.gif"]
    minhaArray.sort(comparador);
    let arrayCartas = []

    for (let i = 0; i < amountCards / 2; i++) {
        let gif = minhaArray[i];
        arrayCartas.push(gif, gif)

    }
    arrayCartas.sort(comparador)

    for (let i = 0; i < amountCards; i++) {
        let gif = arrayCartas[i]
        cards.innerHTML += `<div onclick= "virarCarta(this)" class="card">
        <div class="front-card face"> 
        <img src="images/back.png"> </div>
        
        <div class="back-card face">
        <img src= "${gif}">
        </div>
        
        </div>`

    }

}
DistributeCards()

function virarCarta(card) {

    contCartaVirada++
    card.querySelector(".front-card ").classList.toggle("spin-front-card");
    card.querySelector(".back-card ").classList.toggle("spin-back-card");
    card.onclick = null;


    if (!firstCard) {
        firstCard = card
    } else {
        if (firstCard.querySelector(".back-card img").src === card.querySelector(".back-card img").src) {
            card.onclick = null;
            firstCard.onclick = null;
            contarTodasViradas++


        } else {
            let card2 = firstCard
            setTimeout(function () {
                card2.querySelector(".front-card ").classList.toggle("spin-front-card");
                card2.querySelector(".back-card ").classList.toggle("spin-back-card");
                card.querySelector(".front-card ").classList.toggle("spin-front-card");
                card.querySelector(".back-card ").classList.toggle("spin-back-card");
                card2.onclick = function () {
                    virarCarta(this)
                }
                card.onclick = function () {
                    virarCarta(this)
                }
            }, 1000)
        }

        firstCard = false;

    }
    if (amountCards / 2 === contarTodasViradas) {
        tempoJogo = timer.innerHTML;

        setTimeout(alert, 500, `Você ganhou em ${contCartaVirada} jogadas! A duração do jogo foi de ${tempoJogo} segundos!`);
        console.log(contarTodasViradas)
        clearInterval(tempo);
        setTimeout(Recomeço, 600);
    }
}

function Recomeço() {
    let reiniciar = ""
    while (reiniciar !== "sim" && reiniciar !== "não") {
        reiniciar = prompt(`Gostaria de jogar novamente? (sim ou não)`);
        if (reiniciar == "sim") {
            contCartaVirada = 0;
            contarTodasViradas = 0;
            DistributeCards()
        }
    }
}
function comparador() {
    return Math.random() - 0.5;
}


