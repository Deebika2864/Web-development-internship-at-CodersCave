const apiKey = 'd1e2d0763204896fd894698f5c6e27ee'; 

document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    fetchWeatherData(city);
});

function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
            fetchForecastData(data.coord.lat, data.coord.lon); 
        })
        .catch(error => {
            alert(error.message);
        });
}

function displayWeatherData(data) {
    document.getElementById('city-name').innerText = data.name;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
    document.getElementById('description').innerText = `Weather: ${data.weather[0].description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
}

function fetchForecastData(lat, lon) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayForecastData(data.list);
        });
}

function displayForecastData(forecastData) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ''; 

    for (let i = 0; i < forecastData.length; i += 8) { 
        const item = forecastData[i];
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        
        forecastItem.innerHTML = `
            <h3>${new Date(item.dt * 1000).toLocaleDateString()}</h3>
            <p>Temp: ${item.main.temp} °C</p>
            <p>${item.weather[0].description}</p>
            <p>Humidity: ${item.main.humidity}%</p>
        `;
        forecastContainer.appendChild(forecastItem);
    }
}
