document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('countries-container');
    const modal = document.getElementById('modal');
    const modalDetails = document.getElementById('modal-details');
    const closeButton = document.getElementById('close-btn');

    if (!container || !modal || !modalDetails || !closeButton) {
        console.error('Uno o más elementos del DOM no se encontraron.');
        return;
    }

    async function fetchCountries() {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            if (!response.ok) throw new Error('Error al obtener los datos');
            const countries = await response.json();
            displayCountries(countries);
        } catch (error) {
            console.error('Error:', error);
            container.innerHTML = `<p>Error al cargar los datos.</p>`;
        }
    }

    function displayCountries(countries) {
        container.innerHTML = '';  
        countries.sort((a, b) => a.name.common.localeCompare(b.name.common, 'es', { sensitivity: 'base' }));

        countries.forEach(country => {
            const card = document.createElement('div');
            card.classList.add('country-card');
            card.innerHTML = `
                <img src="${country.flags.png}" alt="Bandera de ${country.name.common}">
                <p>${country.name.common}</p>
            `;
            card.addEventListener('click', () => showDetails(country));
            container.appendChild(card);
        });
    }

    function showDetails(country) {
        modalDetails.innerHTML = `
            <h2>${country.name.common}</h2>
            <img src="${country.flags.png}" alt="Bandera de ${country.name.common}">
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'No disponible'}</p>
            <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Lado de circulación:</strong> ${country.car?.side === 'right' ? 'Derecha' : 'Izquierda'}</p>
        `;
        modal.style.display = 'block';
    }

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    fetchCountries();
});
