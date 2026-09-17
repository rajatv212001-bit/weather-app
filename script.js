

let searchInput = document.getElementById("search");
let submitButton = document.getElementById("submit");
let weatherData = document.getElementById("weather-data");



submitButton.addEventListener("click", function () {
  let city = searchInput.value.trim();

  if (city === "") {
    alert("Please enter a city name!");
    return;
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      let cityName = data.name;
      let temp = Math.round(data.main.temp);
      let description = data.weather[0].description;
      let humidity = data.main.humidity;
      let windSpeed = data.wind.speed;

      let iconCode=data.weather[0].icon;
      let iconUrl=`https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      
    

      weatherData.innerHTML = `
        <img src="${iconUrl}" alt="${description}" class="weather-icon" />

        <h2>${cityName}</h2>
        <p>${temp}°C</p>
        <p>${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `;

      weatherData.style.display = "block";
    })
    .catch((error) => {
      weatherData.innerHTML = `<p>City not found. Please try again.</p>`;
      weatherData.style.display = "block";
    });
});
