// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const stateInput = document.getElementById("state-input");
const getAlertsButton = document.getElementById("get-alerts");
const weatherAlerts = document.getElementById("weather-alerts");
const errorMessage = document.getElementById("error-message");

function displayAlerts(data) {
    // Clear previous alerts
    weatherAlerts.innerHTML = "";

    // Hide previous error
    errorMessage.textContent = "";
    errorMessage.style.display = "none";

    // Create summary
    const summary = document.createElement("h2");
    summary.textContent = `${data.title}: ${data.features.length}`;

    weatherAlerts.appendChild(summary);

    // Create list
    const list = document.createElement("ul");

    data.features.forEach(alert => {
        const li = document.createElement("li");
        li.textContent = alert.properties.headline;
        list.appendChild(li);
    });

    weatherAlerts.appendChild(list);
}

function fetchWeatherAlerts(state) {

    // Empty input check
    if (!state) {
        errorMessage.textContent = "Please enter a state abbreviation.";
        errorMessage.style.display = "block";
        return;
    }

    fetch(`https://api.weather.gov/alerts/active?area=${state}`)
        .then(response => {

            if (!response.ok) {
                throw new Error("Unable to fetch weather alerts.");
            }

            return response.json();
        })

        .then(data => {
            console.log(data);

            displayAlerts(data);

            // Clear input
            stateInput.value = "";
        })

        .catch(error => {
            console.log(error.message);

            weatherAlerts.innerHTML = "";

            errorMessage.textContent = error.message;
            errorMessage.style.display = "block";
        });
}

getAlertsButton.addEventListener("click", () => {
    const state = stateInput.value.trim().toUpperCase();

    fetchWeatherAlerts(state);
});