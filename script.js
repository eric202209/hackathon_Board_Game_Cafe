// JavaScript for dynamic content generation

document.addEventListener('DOMContentLoaded', function() {
    // Example: Populate events dynamically
    const eventsData = [
        { title: "Board Game Night", description: "Join us for a fun evening of board games.", date: "2024-07-15", time: "18:00", rsvp: "link-to-rsvp" },
        // Add more events as needed
    ];

    function populateEvents() {
        const eventCardsContainer = document.getElementById('event-cards');
        eventCardsContainer.innerHTML = '';

        eventsData.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            eventCard.innerHTML = `
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p>Date: ${event.date}, Time: ${event.time}</p>
                <a href="${event.rsvp}" target="_blank">RSVP</a>
            `;
            eventCardsContainer.appendChild(eventCard);
        });
    }

    // Call function to populate events
    populateEvents();
});