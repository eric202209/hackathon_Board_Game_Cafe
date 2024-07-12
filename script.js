// JavaScript for dynamic content generation

document.addEventListener('DOMContentLoaded', function() {
    // Example: Populate events dynamically
    const eventsData = [
        { title: "Board Game Night", 
          description: "Join us for a fun evening of board games. <br>We're thrilled to host Modern Horizons 3 all weekend!", 
          price:"Collector Booster boxes: Members: $395, Non-members: $420 <br>Play booster boxes: Members: $255, Non-members: $270",
          date: "2024-07-15", 
          time: "18:00",
          prizing: "Top 8 players receive prizes in store credit and promos. <br>First 32 registrants get a Springleaf Drum participation promo", 
          rsvp: "link-to-rsvp" },
    ];

    function populateEvents() {
        const eventCardsContainer = document.getElementById('event-cards');
        eventCardsContainer.innerHTML = '';

        eventsData.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            eventCard.innerHTML = `
                <h2>${event.title}</h2>
                <h3>${event.description}</h3>
                <p>${event.price}</p>
                <h3>Date: ${event.date}, Time: ${event.time}</h3>
                <p>${event.prizing}</p>
                <a href="${event.rsvp}" target="_blank">RSVP</a>
            `;
            eventCardsContainer.appendChild(eventCard);
        });

        // Animate the <p> elements
        setTimeout(() => {
            document.querySelectorAll('section p').forEach(p => {
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
            });
        }, 100); // Delay for smooth transition
    }

    // Call function to populate events
    populateEvents();
});