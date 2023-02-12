const cards = document.querySelectorAll('.memory-card');    //Wählt alle Html-Elemente mit Klasse memory card aus speichert sie in die Variable cards

let isCardFlipped = false; // Wurde die Karte umgedreht oder nicht
let isBoardLocked = false;      //Ist das Spielfeld gesperrt oder nicht
let firstSelectedCard, secondSelectedCard; // speichern Informationen zu ausgewählten Html-Elementen 1 und 2 Karte um sie nacher vergleichen zu können

function revealCard() {   // Wird aufgerufen wenn auf Karte geklickt
    if (isBoardLocked) return; // Wenn spielfeld gesperrt, dann macht nichts
    if (this === firstSelectedCard) return; // Wenn auf gleiche Karte geklickt, dann macht nichts

    this.classList.add('flip');  // angeklickte Karte (this) wird css klasse flip angehängt die aussagt , das Karte auf Vorderseite dreht

    if (!isCardFlipped) {  //Überprüft ob noch keine Karte umgedreht wurde -> isCardFlipped= false
        isCardFlipped = true; // Zeigt an das die erste Karte umgedreht wurde
        firstSelectedCard = this;   // Angeklickte Karte(this) wird als erste Karte festgelegt
    } else {
        secondSelectedCard = this; // angeklickte Karte wird als zweite Karte festgelegt

    }
}

function shuffleCards() { // vermischt die Karten
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16); // weist eine zufällige Ordnungszahl zu
        card.style.order = randomPos; // Zufallszahl = Ordnungszahl
    });
};

shuffleCards();


