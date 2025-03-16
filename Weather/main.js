function GetWeather() {
  const selectWeather = document.querySelector("#weatherIMG");
  const details = document.querySelector("#details");
  const error = document.querySelector("#error");
  const cityInput = document.querySelector("#cityInput");
  const weatherIcons = {
    Clear: "images/clear.png",
    Clouds: "images/clouds.png",
    Drizzle: "images/drizzle.png",
    Mist: "images/mist.png",
    Rain: "images/rain.png",
    Wind: "images/wind.png",
    Snow: "images/snow.png",
  };

  document.querySelector("button").onclick = () => {
    const cityName = cityInput.value.trim();
    if (!cityName) {
      error.style.display = "block";
      error.style.opacity = "0";
      setTimeout(() => {
        error.style.transition = "opacity 0.3s ease";
        error.style.opacity = "1";
      }, 10);
      details.classList.remove("active");
      return;
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=c96917e577617e96fa9c88bb28889d00`
    )
      .then((response) => {
        if (!response.ok) {
          details.classList.remove("active");
          error.style.display = "block";
          error.style.opacity = "0";
          setTimeout(() => {
            error.style.transition = "opacity 0.3s ease";
            error.style.opacity = "1";
          }, 10);
          throw new Error("Invalid City Name!");
        }
        return response.json();
      })
      .then((data) => {
        details.classList.add("active");
        error.style.display = "none";
        document.querySelector("#temp").innerHTML = Math.floor(data.main.temp) + " °C";
        document.querySelector("#cityName").innerHTML = data.name;
        document.querySelector("#humidity").innerHTML = data.main.humidity + " %";
        document.querySelector("#windSpeed").innerHTML = data.wind.speed + " km/h";
        selectWeather.src = weatherIcons[data.weather[0].main] || "images/clouds.png";
        cityInput.value = "";
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  const darkModeToggle = document.createElement("button");
  darkModeToggle.innerHTML = '<i class="bi bi-moon"></i>';
  darkModeToggle.style.cssText = `
    position: fixed;
    top: 30px;
    right: 30px;
    background: #ffd700;
    border: 0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
  `;
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    darkModeToggle.innerHTML = isDark
      ? '<i class="bi bi-sun"></i>'
      : '<i class="bi bi-moon"></i>';
    darkModeToggle.style.transform = "rotate(360deg)";
    setTimeout(() => {
      darkModeToggle.style.transform = "rotate(0deg)";
    }, 300);
  });
  document.body.appendChild(darkModeToggle);

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css";
  document.head.appendChild(link);

  cityInput.focus();
}

GetWeather();