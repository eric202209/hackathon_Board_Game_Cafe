document.addEventListener('DOMContentLoaded', function() {
    const eventsData = [
        { 
            title: "Board Game Night", 
            description: "Join us for a fun evening of board games. <br>We're thrilled to host Modern Horizons 3 all weekend!", 
            prices: {
                collectorBooster: { memberPrice: "$395", nonMemberPrice: "$420" },
                playBooster: { memberPrice: "$255", nonMemberPrice: "$270" }
            },
            date: "2024-07-15", 
            time: "18:00",
            prizing: "Top 8 players receive prizes in store credit and promos. <br>First 32 registrants get a Springleaf Drum participation promo", 
            rsvp: "link-to-rsvp" 
        }
    ];

    function populateEvents() {
        const eventCardsContainer = document.getElementById('event-cards');
        if (!eventCardsContainer) {
            console.error("Unable to find 'event-cards' container in the DOM.");
            return;
        }
        eventCardsContainer.innerHTML = ''; // Clear existing content

        eventsData.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            eventCard.innerHTML = `
                <h2>${event.title}</h2>
                <p>${event.description}</p>
                <h3>Prices:</h3>
                <p>Collector Booster boxes: Members: ${event.prices.collectorBooster.memberPrice}, Non-members: ${event.prices.collectorBooster.nonMemberPrice}</p>
                <p>Play booster boxes: Members: ${event.prices.playBooster.memberPrice}, Non-members: ${event.prices.playBooster.nonMemberPrice}</p>
                <h3>Date: ${event.date}, Time: ${event.time}</h3>
                <p>${event.prizing}</p>
                <a href="${event.rsvp}" target="_blank">RSVP</a>
            `;
            eventCardsContainer.appendChild(eventCard);
        });
    }

    // Call the function to populate events
    populateEvents();
});
