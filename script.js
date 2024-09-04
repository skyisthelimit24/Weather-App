const apiKey = "1dcc87966facdadfbd5d619aebd91647";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const weatherIconElement = document.getElementById("weatherIcon"); // The img element

// Add event listener for the search button click
searchButton.addEventListener("click", () => {
  const location = locationInput.value;
  if (location) {
    fetchWeather(location);
  }
});

// Add event listener for pressing the "Enter" key
locationInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent the default form submission or other actions
    const location = locationInput.value;
    if (location) {
      fetchWeather(location);
    }
  }
});

function fetchWeather(location) {
  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      locationElement.textContent = data.name;
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;

      function capitalizeWords(description) {
        return description
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }

      let capitalizedDescription = capitalizeWords(data.weather[0].description);
      descriptionElement.textContent = capitalizedDescription;

      // Get the weather icon code
      const iconCode = data.weather[0].icon;

      // Set the image source to the corresponding icon URL
      weatherIconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}
