<h1 align="center">⛅ Dynamic Weather Application</h1>

<p align="center">
  <em>A real-time weather tracking app featuring geolocation and dynamic API integration.</em>
</p>

---

## 📖 About The Project

This project is a fast, responsive Weather Application built with Vanilla JavaScript. It interfaces directly with the **OpenWeatherMap API** to deliver accurate, real-time weather data. 

The application is designed with a seamless user experience in mind, allowing users to either instantly fetch the weather for their current geographic location or search for conditions in any city worldwide. It features a clean, tabbed interface, graceful error handling for invalid searches, and session caching to optimize API calls.

## ✨ Key Features

* **Geolocation Integration:** Utilizes the browser's native Geolocation API to request user coordinates and automatically fetch local weather data upon approval.
* **City Search functionality:** Allows users to query the API for real-time weather metrics (Temperature, Wind Speed, Humidity, Cloudiness) for specific global cities.
* **Smart State Management:** Uses JavaScript to dynamically toggle UI states (Loading screens, Error states, Data displays, and Search forms) for a smooth Single Page Application (SPA) feel.
* **Session Storage Caching:** Saves the user's geolocation coordinates in `sessionStorage` so they aren't repeatedly prompted for location access on page reloads.
* **Robust Error Handling:** Features a custom UI fallback when a searched city is not found or when API limits/errors occur.

## 🛠️ Built With

* **HTML5:** Semantic structure and custom data attributes (`data-*`) for clean DOM selection.
* **CSS3:** Flexbox layouts, Google Fonts (Merriweather Sans), and custom CSS variables for easy theming.
* **Vanilla JavaScript (ES6+):** Async/Await API fetching, JSON parsing, and DOM manipulation.
* **OpenWeatherMap API:** Core weather data provider.

## 🚀 Getting Started

Since this project relies entirely on frontend web technologies and a public API, no build tools or local servers are required.

### Installation & Usage

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/weather-app.git](https://github.com/your-username/weather-app.git)

2. Navigate into the project directory:
    ```Bash
    cd weather-app

3. Open the project: <br>

    Double-click the index.html file to view the application directly in your web browser.
    Alternatively, open the project in your code editor and use an extension like Live Server for real-time updates.


## 📁 Project Structure
```text
weather-app/
├── Images/               # UI assets (weather icons, flags, loading spinners)
├── index.html            # Main markup and tab layouts
├── style.css             # UI styling and dynamic state classes (.active)
├── script.js             # API logic, geolocation handling, and UI updates
└── README.md             # Project documentation