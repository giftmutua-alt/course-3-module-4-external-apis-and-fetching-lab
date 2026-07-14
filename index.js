// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const stateInput = document.getElementById("state-input");
const fetchAlertsButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

function displayAlerts(data) {
  // Clear previous alerts
  alertsDisplay.innerHTML = "";

  // Hide previous errors
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");

  // Summary
  const summary = document.createElement("h2");
  summary.textContent = `${data.title}: ${data.features.length}`;
  alertsDisplay.appendChild(summary);

  // List of headlines
  const list = document.createElement("ul");

  data.features.forEach((alert) => {
    const item = document.createElement("li");
    item.textContent = alert.properties.headline;
    list.appendChild(item);
  });

  alertsDisplay.appendChild(list);
}

function showError(message) {
  alertsDisplay.innerHTML = "";
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

function fetchWeatherAlerts(state) {
  if (!state) {
    showError("Please enter a state abbreviation.");
    return;
  }

  fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to fetch weather alerts.");
      }

      return response.json();
    })
    .then((data) => {
      displayAlerts(data);

      // Clear input
      stateInput.value = "";
    })
    .catch((error) => {
      console.log(error.message);
      showError(error.message);
    });
}

fetchAlertsButton.addEventListener("click", () => {
  const state = stateInput.value.trim().toUpperCase();
  fetchWeatherAlerts(state);
});