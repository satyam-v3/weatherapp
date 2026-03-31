// Element Selectors
const userTab = document.querySelector("[data-UserWeather]");
const searchTab = document.querySelector("[data-SearchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const searchInput = document.querySelector('[data-searchInput]');
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const grantAccessButton = document.querySelector("[data-grantAccess]");

// Error UI Selectors
const notFound = document.querySelector('.errorContainer');
const errorBtn = document.querySelector('[data-errorButton]');
const errorText = document.querySelector('[data-errorText]');
const errorImage = document.querySelector('[data-errorImg]');

// Initialization
let currentTab = userTab;
currentTab.classList.add("current-tab");
getFromSessionStorage();

// Tab Switching Logic
function switchTab(clickedTab) {
    if (clickedTab != currentTab) {
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        // If switching to Search Weather tab
        if (!searchForm.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
            notFound.classList.remove("active"); // Hide error screen
        }
        // If switching to Your Weather tab
        else {
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            notFound.classList.remove("active"); // Hide error screen
            getFromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    switchTab(searchTab);
});

// Check Session Storage for Coordinates
function getFromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("userCoordinates");

    if (!localCoordinates) {
        grantAccessContainer.classList.add("active");
    } else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

// Fetch Weather for User's Location
async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    
    grantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");
    notFound.classList.remove("active");

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        
        if (!data.sys) {
            throw data;
        }
        
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (err) {
        loadingScreen.classList.remove('active');
        notFound.classList.add('active');
        errorImage.style.display = 'none';
        errorText.innerText = `Error: ${err?.message}`;
        errorBtn.style.display = 'block';
        errorBtn.addEventListener("click", getLocation); // Retry getting location
    }
}

// Render Weather Data to UI
function renderWeatherInfo(weatherInfo) {
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windSpeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp.toFixed(2)} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed.toFixed(2)} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity.toFixed(2)} %`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all.toFixed(2)} %`;
}

// Geolocation Handling
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        grantAccessButton.style.display = 'none';
    }
}

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("userCoordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

grantAccessButton.addEventListener("click", getLocation);

// Search Form Handling
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if (cityName === "") {
        return;
    } else {
        fetchSearchWeatherInfo(cityName);
        searchInput.value = "";
    }
})

// Fetch Weather for Searched City
async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    notFound.classList.remove("active");

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        
        if (!data.sys) {
            throw data;
        }
        
        loadingScreen.classList.remove('active');
        userInfoContainer.classList.add('active');
        renderWeatherInfo(data);
    } catch (err) {
        loadingScreen.classList.remove('active');
        userInfoContainer.classList.remove('active');
        notFound.classList.add('active');
        errorImage.style.display = 'block'; 
        errorText.innerText = "City not found!";
        errorBtn.style.display = "none";
    }
}