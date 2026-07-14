// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
function displayAlerts(data) {
    const alertsContainer = document.getElementById('alerts-container');
    const errorMessage = document.getElementById('error-message');

    alertsContainer.innerHTML = '';
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    const title = data.title;
    const numberOfAlerts = data.features.length;

    const summary = document.createElement('p');
    summary.textContent = `${title}: ${numberOfAlerts}`;
    alertsContainer.appendChild(summary);

    const ul = document.createElement('ul');

    data.features.forEach(alert => {
        const li = document.createElement('li');
        li.textContent = alert.properties.headline;
        ul.appendChild(li);
    });

    alertsContainer.appendChild(ul);
}

function fetchWeatherAlerts(state) {
    const errorMessage = document.getElementById('error-message');
    const input = document.getElementById('state-input');

    if (!state || state.trim() === '') {
        throw new Error('Please enter a valid state abbreviation.');
    }

    return fetch(`https://api.weather.gov/alerts/active?area=${state}`)
        .then(response => response.json())
        .then(data => {
            input.value = '';
            displayAlerts(data);
        })
        .catch(error => {
            errorMessage.style.display = 'block';
            errorMessage.textContent = error.message;
        });
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const button = document.getElementById('fetch-button');
        const input = document.getElementById('state-input');
        const errorMessage = document.getElementById('error-message');

        if (button) {
            button.addEventListener('click', () => {
                const state = input.value.trim().toUpperCase();
                try {
                    fetchWeatherAlerts(state);
                } catch (error) {
                    errorMessage.style.display = 'block';
                    errorMessage.textContent = error.message;
                }
            });
        }
    });
}

if (typeof module !== 'undefined') {
    module.exports = { fetchWeatherAlerts, displayAlerts };
}