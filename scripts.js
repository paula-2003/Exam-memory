const cards = document.querySelectorAll('.memory-card');    //Wählt alle Html-Elemente mit Klasse memory card aus speichert sie in die Variable cards

let isCardFlipped = false; // Wurde die Karte umgedreht oder nicht
let isBoardLocked = false;      //Ist das Spielfeld gesperrt oder nicht
let firstSelectedCard, secondSelectedCard; // speichern Informationen zu ausgewählten Html-Elementen 1 und 2 Karte um sie nacher vergleichen zu können
let scoreElement = document.getElementById("score");// speichert html-E welches den Punktestand zeigt
let allCardsMatched = false;// sind alle Karten gematched
let remainingCards = 8;// Wie viele Karten sind noch übrig


function revealCard() {   // Wird aufgerufen wenn auf Karte geklickt
    if (isBoardLocked) return; // Wenn spielfeld gesperrt, dann macht nichts
    if (this === firstSelectedCard) return; // Wenn auf gleiche Karte geklickt, dann macht nichts

    this.classList.add('flip');  // angeklickte Karte (this) wird css klasse flip angehängt die aussagt , das Karte auf Vorderseite dreht

    if (!isCardFlipped) {  //Überprüft ob noch keine Karte umgedreht wurde -> isCardFlipped= false
        isCardFlipped = true; // Zeigt an das die erste Karte umgedreht wurde
        firstSelectedCard = this;   // Angeklickte Karte(this) wird als erste Karte festgelegt
    } else {
        secondSelectedCard = this; // angeklickte Karte wird als zweite Karte festgelegt
        matchCards(); // funktion wird augerufen
    }
}
function matchCards() {  //Vergleicht Datensätze ob sie gleich sind
    const isMatch = firstSelectedCard.dataset.framework === secondSelectedCard.dataset.framework; // lokale Variable zum vergleichen  const weil sie sich nicht ändert

    isMatch ? foundMatch() : noMatch(); // kurze Schreibweise für if isMatch true dann foundMatch ansonsten noMatch
}

function foundMatch() {
    firstSelectedCard.removeEventListener('click', revealCard); // enfernt den eventListener, damit nichts passiert wenn man auf das paar klickt
    secondSelectedCard.removeEventListener('click', revealCard); // enfernt den eventListener, damit nichts passiert wenn man auf das paar klickt
    Highscore(); // ruft Funktion auf um Highscore zu ändern
    resetVariables(); //  ruft die Funktion auf
    remainingCards--; //verringert die Anzahl der verbleibenden Karten 
    if (remainingCards === 0) {  //überprüft, ob alle Karten gematcht wurden
        allCardsMatched = true; // setzt allCardsMatched auf True
        showEndMessage(); // ruft Funktion auf und blendet Satz ein
    }
}

function noMatch() {
    isBoardLocked = true; // Spielfeld wird gesperrt

    setTimeout(() => {
        firstSelectedCard.classList.remove('flip'); // Dreht die Karte wieder um
        secondSelectedCard.classList.remove('flip'); // Dreht die zweite Karten wieder um
        Highscore(); // ruft die Funktion zum Highfscore auf
        resetVariables(); // ruft die Funktion auf
    }, 3000); // nach 3 Sekunden drehen sie sich um
}
function resetVariables() {
    [isCardFlipped, isBoardLocked] = [false, false]; // setzt die Variablen auf ihre Anfangswerte zurück
    [firstSelectedCard, secondSelectedCard] = [null, null]; // setzt die Variablen auf ihre Anfangswerte zurück
}
function shuffleCards() { // vermischt die Karten
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16); // weist eine zufällige Ordnungszahl zu
        card.style.order = randomPos; // Zufallszahl = Ordnungszahl
    });
};

shuffleCards();

cards.forEach(card => card.addEventListener('click', revealCard)); // legt den Eventlistener an


let score = 0;
let x = 10;
function Highscore() { // Highscore
    if (firstSelectedCard.dataset.framework === secondSelectedCard.dataset.framework) {
        score += x;
    } else {
        score -= 0.5 * x;
        score = Math.max(score, 0)

    }
    scoreElement.innerText = score
}

function showEndMessage() { //Funktion für den  Satz am Ende
    const congrats = document.getElementById("congrats");
    congrats.innerText = `Herzlichen Glückwunsch, du hast das Spiel erfolgreich beendet. Dein Highscore ist: ${scoreElement.innerText}`;
}



