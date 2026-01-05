import './style.css'

/**
 * Configuration
 * Access the API key from environment variables (Vite specific)
 */
const API_KEY = import.meta.env.VITE_API_KEY;
const app = document.getElementById('js--app-id');

/**
 * Renders the initial UI structure into the DOM.
 * Includes IDs for dynamic updates (js--temp-id, js--description-id, etc.)
 */
function renderScreen() {
  app.innerHTML = `
    <h1 class="text-2xl font-bold text-center mb-6">🌤️ Weather Forecast</h1>

    <div class="flex gap-2 mb-6">
      <input 
        type="text" 
        id="js--cityInput-id" 
        placeholder="Enter city..." 
        class="flex-1 p-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:border-blue-500 text-sm"
      />
      <button 
        id="js--searchBtn-id" 
        class="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-medium transition-colors">
        Search
      </button>
    </div>

    <div id="js--weatherResult-id" class="text-center space-y-4">
      <div id="js--temp-id" class="text-5xl font-bold text-blue-400">--°C</div>
      
      <div id="js--description-id" class="text-slate-400 text-lg capitalize">Waiting for data...</div>
      
      <div class="flex justify-between mt-6 text-sm text-slate-400 border-t border-slate-700 pt-4">
        <span>Wind: <span id="js--windSpeed-id" class="text-white">-- km/h</span></span>
        <span>Humidity: <span id="js--humidity-id" class="text-white">--%</span></span>
      </div>
    </div>
  `
}

// Initialize UI
renderScreen();

/**
 * DOM Elements Selection
 * Must be selected AFTER renderScreen() is executed
 */
const searchBtn = document.getElementById('js--searchBtn-id');
const cityInput = document.getElementById('js--cityInput-id');
const tempElement = document.getElementById('js--temp-id');
const descElement = document.getElementById('js--description-id');
const windElement = document.getElementById('js--windSpeed-id');
const humidityElement = document.getElementById('js--humidity-id');

/**
 * Fetches weather data from OpenWeatherMap API
 * @param {string} city - The name of the city to search for
 * @returns {Promise<Object|null>} - Weather data object or null on error
 */
const fetchWeather = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`City not found or API error (${response.status})`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    alert(error.message);
    return null;
  }
};

/**
 * Updates the DOM elements with fetched weather data
 * @param {Object} data - The data object returned from the API
 */
const updateUI = (data) => {
  if (!data) return;

  // Round temperature to nearest integer
  tempElement.innerText = `${Math.round(data.main.temp)}°C`;
  descElement.innerText = data.weather[0].description;
  windElement.innerText = `${data.wind.speed} km/h`;
  humidityElement.innerText = `${data.main.humidity}%`;
};

/**
 * Main handler for the search event
 */
const handleSearch = async () => {
  const city = cityInput.value.trim();
  
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  // Visual feedback: clear previous data or show loading state could go here
  
  const weatherData = await fetchWeather(city);
  
  if (weatherData) {
    updateUI(weatherData);
    console.log(`Updated weather for ${city}`);
  }
};

/**
 * Event Listeners
 */
searchBtn.addEventListener('click', handleSearch);

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSearch();
});