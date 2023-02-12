const cards = document.querySelectorAll('.memory-card');    //Wählt alle Html-Elemente mit Klasse memory card aus speichert sie in die Variable cards

function shuffleCards() { // vermischt die Karten
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16); // weist eine zufällige Ordnungszahl zu
        card.style.order = randomPos; // Zufallszahl = Ordnungszahl
    });
};

shuffleCards();

