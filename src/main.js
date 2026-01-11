import './style.css'

/**
 * ------------------------------------------------------------------------
 * Global Configuration & Initialization
 * ------------------------------------------------------------------------
 */

const API_KEY = import.meta.env.VITE_API_KEY;
const app = document.getElementById('js--app-id');

// Inject static favicon dynamically (prevents 404 on favicon request)
const faviconLink = document.createElement('link');
faviconLink.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌦️</text></svg>";
faviconLink.rel = 'icon';
document.head.appendChild(faviconLink);

/**
 * Maps OpenWeatherMap conditions to Tailwind CSS gradient classes.
 */
const weatherBackgrounds = {
  Clear: 'bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800',
  Clouds: 'bg-gradient-to-br from-slate-400 via-slate-600 to-slate-800',
  Rain: 'bg-gradient-to-br from-slate-700 via-blue-900 to-slate-900',
  Drizzle: 'bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800',
  Thunderstorm: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900',
  Snow: 'bg-gradient-to-br from-blue-100 via-blue-300 to-slate-500',
  Mist: 'bg-gradient-to-br from-slate-500 via-gray-600 to-slate-800',
  Default: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black'
};

/**
 * ------------------------------------------------------------------------
 * View Layer (UI Generation)
 * ------------------------------------------------------------------------
 */

/**
 * Generates an inline SVG string for weather icons.
 * @param {string} weatherMain - The main weather condition (e.g., 'Clear', 'Rain').
 * @param {string} sizeClass - Tailwind classes for sizing (default: "w-24 h-24").
 * @returns {string} SVG HTML string.
 */
const getWeatherIcon = (weatherMain, sizeClass = "w-24 h-24") => {
  const commonClasses = `${sizeClass} mx-auto drop-shadow-md`;
  
  switch (weatherMain) {
    case 'Clear':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="${commonClasses} text-yellow-300 animate-pulse"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" /></svg>`;
    
    case 'Clouds':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="${commonClasses} text-gray-300"><path fill-rule="evenodd" d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 20.25H6.75a5.25 5.25 0 01-2.25-10.5z" clip-rule="evenodd" /></svg>`;
    
    case 'Rain':
    case 'Drizzle':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="${commonClasses} text-blue-300"><path fill-rule="evenodd" d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 20.25H6.75a5.25 5.25 0 01-2.25-10.5z" clip-rule="evenodd" /><path d="M9.75 21a.75.75 0 001.5 0v-2.25a.75.75 0 00-1.5 0V21zM12.75 21a.75.75 0 001.5 0v-2.25a.75.75 0 00-1.5 0V21z" /></svg>`;
    
    case 'Thunderstorm':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="${commonClasses} text-yellow-400"><path fill-rule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clip-rule="evenodd" /></svg>`;
    
    case 'Snow':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="${commonClasses} text-white"><line x1="12" y1="2" x2="12" y2="22"></line><line x1="12" y1="2" x2="12" y2="22" transform="rotate(60 12 12)"></line><line x1="12" y1="2" x2="12" y2="22" transform="rotate(120 12 12)"></line><path d="M12 6 L10 4 M12 6 L14 4"></path><path d="M12 18 L10 20 M12 18 L14 20"></path><path d="M12 6 L10 4 M12 6 L14 4" transform="rotate(60 12 12)"></path><path d="M12 18 L10 20 M12 18 L14 20" transform="rotate(60 12 12)"></path><path d="M12 6 L10 4 M12 6 L14 4" transform="rotate(120 12 12)"></path><path d="M12 18 L10 20 M12 18 L14 20" transform="rotate(120 12 12)"></path></svg>`;
    
    default:
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="${commonClasses} text-slate-400"><path fill-rule="evenodd" d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 20.25H6.75a5.25 5.25 0 01-2.25-10.5z" clip-rule="evenodd" /></svg>`;
  }
};

/**
 * Injects the initial HTML structure into the app container.
 */
function renderScreen() {
  app.innerHTML = `
    <h1 class="text-2xl font-bold text-center mb-6 text-white tracking-wide drop-shadow-md">🌤️ Weather Forecast</h1>

    <div class="flex gap-2 mb-2 relative">
      <input 
        type="text" 
        id="js--cityInput-id" 
        placeholder="Enter city..." 
        class="flex-1 p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-slate-300 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
      />
      
      <button 
        id="js--locBtn-id" 
        class="bg-white/20 hover:bg-white/30 border border-white/30 text-white w-12 rounded-xl flex items-center justify-center transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
        title="Use my location">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>
      </button>

      <button 
        id="js--searchBtn-id" 
        class="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-4 rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed backdrop-blur-sm">
        Search
      </button>
    </div>

    <div id="js--error-message-id" class="h-6 text-center text-red-200 text-sm font-bold mb-4 opacity-0 transition-opacity drop-shadow-md"></div>

    <div id="js--weatherResult-id" class="text-center transition-all duration-300">
      
      <h2 id="js--city-name-id" class="text-3xl font-bold text-white drop-shadow-lg"></h2>
      <div id="js--date-time-id" class="text-white/80 text-sm font-light mb-4 tracking-wider"></div>

      <div id="js--icon-container-id" class="mb-4 min-h-[6rem] flex items-center justify-center filter drop-shadow-xl">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-20 h-20 mx-auto text-slate-400/80"><path fill-rule="evenodd" d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 20.25H6.75a5.25 5.25 0 01-2.25-10.5z" clip-rule="evenodd" /></svg>
      </div>

      <div id="js--temp-id" class="text-6xl font-bold text-white mb-2 tracking-tighter drop-shadow-lg">--°</div>
      <div id="js--description-id" class="text-white/80 text-xl font-medium capitalize mb-8 drop-shadow-md">Start by searching a city</div>
      
      <div class="grid grid-cols-2 gap-4 bg-black/20 p-4 rounded-xl border border-white/10 backdrop-blur-md mb-8">
        <div class="flex flex-col items-center">
          <span class="text-white/60 text-xs uppercase tracking-wider mb-1">Wind</span>
          <span id="js--windSpeed-id" class="text-white font-semibold text-lg">-- km/h</span>
        </div>
        <div class="flex flex-col items-center border-l border-white/10">
          <span class="text-white/60 text-xs uppercase tracking-wider mb-1">Humidity</span>
          <span id="js--humidity-id" class="text-white font-semibold text-lg">--%</span>
        </div>
        <div class="flex flex-col items-center border-t border-white/10 pt-3">
          <span class="text-white/60 text-xs uppercase tracking-wider mb-1">Feels Like</span>
          <span id="js--feels-like-id" class="text-white font-semibold text-lg">--°</span>
        </div>
        <div class="flex flex-col items-center border-l border-t border-white/10 pt-3">
          <span class="text-white/60 text-xs uppercase tracking-wider mb-1">Pressure</span>
          <span id="js--pressure-id" class="text-white font-semibold text-lg">-- hPa</span>
        </div>
      </div>

      <div class="text-center">
        <h3 class="text-white/90 text-sm font-semibold mb-3 uppercase tracking-wider">5-Day Forecast</h3>
        <div id="js--forecast-container-id" class="grid grid-cols-5 gap-2">
           <div class="text-center text-white/40 text-xs col-span-5 py-4">Forecast data will appear here</div>
        </div>
      </div>

    </div>
  `
}

renderScreen();

/**
 * ------------------------------------------------------------------------
 * DOM Elements Selection
 * ------------------------------------------------------------------------
 */

const searchBtn = document.getElementById('js--searchBtn-id');
const locBtn = document.getElementById('js--locBtn-id');
const cityInput = document.getElementById('js--cityInput-id');
const cityNameElement = document.getElementById('js--city-name-id');
const dateTimeElement = document.getElementById('js--date-time-id');
const tempElement = document.getElementById('js--temp-id');
const descElement = document.getElementById('js--description-id');
const iconContainer = document.getElementById('js--icon-container-id');
const errorElement = document.getElementById('js--error-message-id');
const windElement = document.getElementById('js--windSpeed-id');
const humidityElement = document.getElementById('js--humidity-id');
const feelsLikeElement = document.getElementById('js--feels-like-id');
const pressureElement = document.getElementById('js--pressure-id');
const forecastContainer = document.getElementById('js--forecast-container-id');

/**
 * ------------------------------------------------------------------------
 * Helper Functions (Formatting & State)
 * ------------------------------------------------------------------------
 */

/**
 * Formats local time based on the timezone offset.
 * Returns string in "Weekday | HH:MM" format.
 */
const calculateLocalTime = (timezoneOffset) => {
  const now = new Date();
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
  const cityTime = new Date(utcTime + (timezoneOffset * 1000));
  
  const options = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'short', 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  };
  
  return cityTime.toLocaleDateString('en-US', options).replace(',', '').replace(' at', ' |');
};

/**
 * Updates the document body background based on weather condition.
 */
const updateBackground = (weatherMain) => {
  const body = document.body;
  const newClass = weatherBackgrounds[weatherMain] || weatherBackgrounds.Default;
  body.className = `bg-slate-950 text-white min-h-screen flex items-center justify-center font-sans p-4 transition-all duration-700 ease-in-out ${newClass}`;
};

/**
 * Displays an error message and highlights the input.
 */
const showError = (message) => {
  errorElement.innerText = message;
  errorElement.classList.remove('opacity-0');
  cityInput.classList.add('border-red-400');
};

/**
 * Hides the error message and resets input highlight.
 */
const hideError = () => {
  errorElement.classList.add('opacity-0');
  cityInput.classList.remove('border-red-400');
};

/**
 * Toggles the loading state (spinners, disabled inputs).
 */
const setLoadingState = (isLoading) => {
  if (isLoading) {
    cityInput.disabled = true;
    searchBtn.disabled = true;
    locBtn.disabled = true;
    searchBtn.innerHTML = `
      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    `;
  } else {
    cityInput.disabled = false;
    searchBtn.disabled = false;
    locBtn.disabled = false;
    searchBtn.innerText = 'Search';
    cityInput.focus();
  }
};

/**
 * ------------------------------------------------------------------------
 * Business Logic (API & Data)
 * ------------------------------------------------------------------------
 */


/**
 * Handles API responses and throws errors on non-200 status.
 */
const handleApiResponse = async (weatherRes, forecastRes) => {
  if (!weatherRes.ok) throw new Error(`API Error (${weatherRes.status})`);
  
  const weatherData = await weatherRes.json();
  const forecastData = await forecastRes.json();
  return { weatherData, forecastData };
};

/**
 * Fetches current weather and forecast by city name.
 */
const fetchWeather = async (city) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  const [weatherRes, forecastRes] = await Promise.all([
    fetch(weatherUrl),
    fetch(forecastUrl)
  ]);

  if (!weatherRes.ok && weatherRes.status === 404) {
    throw new Error(`City "${city}" not found.`);
  }

  return handleApiResponse(weatherRes, forecastRes);
};

/**
 * Fetches current weather and forecast by GPS coordinates.
 */
const fetchWeatherDataByCoords = async (lat, lon) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const [weatherRes, forecastRes] = await Promise.all([
    fetch(weatherUrl),
    fetch(forecastUrl)
  ]);

  return handleApiResponse(weatherRes, forecastRes);
};

/**
 * Filters the 5-day forecast to get one reading per day (approx. 12:00 PM).
 */
const processForecastData = (list) => {
  const dailyData = list.filter(item => item.dt_txt.includes("12:00:00"));
  
  // Fallback if 12:00 entries are missing
  if (dailyData.length < 5) {
     return list.filter((_, index) => index % 8 === 0).slice(0, 5);
  }
  
  return dailyData.slice(0, 5);
};

/**
 * Updates the DOM elements with the fetched weather data.
 */
const updateUI = ({ weatherData, forecastData }) => {
  // 1. Current Weather
  cityNameElement.innerText = `${weatherData.name}, ${weatherData.sys.country}`;
  dateTimeElement.innerText = calculateLocalTime(weatherData.timezone);
  tempElement.innerText = `${Math.round(weatherData.main.temp)}°`;
  descElement.innerText = weatherData.weather[0].description;
  windElement.innerText = `${weatherData.wind.speed} km/h`;
  humidityElement.innerText = `${weatherData.main.humidity}%`;
  feelsLikeElement.innerText = `${Math.round(weatherData.main.feels_like)}°`;
  pressureElement.innerText = `${weatherData.main.pressure} hPa`;

  const weatherMain = weatherData.weather[0].main;
  iconContainer.innerHTML = getWeatherIcon(weatherMain, "w-24 h-24");
  updateBackground(weatherMain);

  // 2. Forecast
  const filteredForecast = processForecastData(forecastData.list);
  
  forecastContainer.innerHTML = filteredForecast.map(day => {
    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const temp = Math.round(day.main.temp);
    const icon = getWeatherIcon(day.weather[0].main, "w-6 h-6");

    return `
      <div class="bg-black/20 rounded-xl p-2 flex flex-col items-center justify-center border border-white/5 backdrop-blur-sm transition-transform hover:scale-105">
        <span class="text-white/70 text-xs font-medium mb-1">${dayName}</span>
        <div class="mb-1">${icon}</div>
        <span class="text-white font-bold text-sm">${temp}°</span>
      </div>
    `;
  }).join('');
};

/**
 * ------------------------------------------------------------------------
 * Event Handlers & Listeners
 * ------------------------------------------------------------------------
 */

const handleSearch = async () => {
  const city = cityInput.value.trim();
  
  if (!city) {
    showError("Please enter a city name.");
    return;
  }
  
  hideError();
  setLoadingState(true);

  try {
    const weatherData = await fetchWeather(city);
    updateUI(weatherData);
  } catch (error) {
    console.error(error);
    showError(error.message);
    cityNameElement.innerText = '';
    dateTimeElement.innerText = '';
  } finally {
    setLoadingState(false);
  }
};

const handleLocationSearch = () => {
  if (!navigator.geolocation) {
    showError("Geolocation is not supported by your browser");
    return;
  }

  hideError();
  setLoadingState(true);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      
      try {
        const data = await fetchWeatherDataByCoords(latitude, longitude);
        updateUI(data);
        cityInput.value = ""; 
      } catch (error) {
        console.error("🚨 API Error details:", error);
        showError(`GPS Error: ${error.message}`);
      } finally {
        setLoadingState(false);
      }
    },
    (error) => {
      console.error("Geolocation Error:", error);
      showError("Location access denied or unavailable");
      setLoadingState(false);
    }
  );
};

searchBtn.addEventListener('click', handleSearch);
locBtn.addEventListener('click', handleLocationSearch);

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSearch();
});