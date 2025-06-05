async function getWeather() {
      const city = document.getElementById("cityInput").value.trim();
      const resultDiv = document.getElementById("weatherResult");

      if (!city) {
        resultDiv.innerHTML = "<p>Please enter a city name.</p>";
        return;
      }

      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=4706061c3bb551df451c13e7ba2ff9f5&units=metric`);
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Error fetching data");
        }
        const data = await res.json();
        const windChill = data.main.temp < 10
          ? (13.12 + 0.6215 * data.main.temp - 11.37 * Math.pow(data.wind.speed, 0.16) + 0.3965 * data.main.temp * Math.pow(data.wind.speed, 0.16)).toFixed(1)
          : "Not applicable";

        resultDiv.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p><strong>🌡 Temp:</strong> ${data.main.temp} °C</p>
          <p><strong>🌥 Weather:</strong> ${data.weather[0].description}</p>
          <p><strong>💧 Humidity:</strong> ${data.main.humidity}%</p>
          <p><strong>🌬 Wind Speed:</strong> ${data.wind.speed} m/s</p>
          <p><strong>❄ Wind Chill:</strong> ${windChill} °C</p>
        `;
      } catch (err) {
        resultDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
      }
    }