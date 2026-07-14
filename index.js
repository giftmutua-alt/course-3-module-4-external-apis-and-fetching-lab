// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const button = document.getElementById('fetch-button');
const input = document.getElementById('state-input');
const alertsContainer = document.getElementById('alerts-container');
const errorMessage = document.getElementById('error-message');

function displayAlerts(data) {
    // Clear previous alerts
    alertsContainer.innerHTML = '';

    // Hide and clear any previous error messages
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    // Get the title and number of alerts
    const title = data.title;
    const numberOfAlerts = data.features.length;

    // Show summary message
    const summary = document.createElement('p');
    summary.textContent = `${title}: ${numberOfAlerts}`;
    alertsContainer.appendChild(summary);

    // Create a list for all alert headlines
    const ul = document.createElement('ul');

    // Loop through each alert and display its headline
    data.features.forEach(alert => {
        const li = document.createElement('li');
        li.textContent = alert.properties.headline;
        ul.appendChild(li);
    });

    alertsContainer.appendChild(ul);
}

function fetchWeatherAlerts(state) {
    // Validate input - must be 2 capital letters
    if (!state || state.trim() === '') {
        throw new Error('Please enter a valid state abbreviation.');
    }

    fetch(`https://api.weather.gov/alerts/active?area=${state}`)
        .then(response => response.json())
        .then(data => {
            // Clear the input field
            input.value = '';

            // Display the alerts
            displayAlerts(data);
        })
        .catch(error => {
            // Show error message in the error div
            errorMessage.style.display = 'block';
            errorMessage.textContent = error.message;
        });
}

button.addEventListener('click', () => {
    const state = input.value.trim().toUpperCase();

    try {
        fetchWeatherAlerts(state);
    } catch (error) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = error.message;
    }
});

if (typeof module !== 'undefined') {
    module.exports = { fetchWeatherAlerts, displayAlerts };
}