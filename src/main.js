import './style.css'

const API_KEY = import.meta.env.VITE_API_KEY;
const app = document.getElementById('js--app-id');

/**
 * Returns SVG string based on weather condition
 */
const getWeatherIcon = (weatherMain) => {
  switch (weatherMain) {
    case 'Clear':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-24 h-24 mx-auto text-yellow-400 animate-pulse">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>`;
    
    case 'Clouds':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-24 h-24 mx-auto text-gray-400">
          <path fill-rule="evenodd" d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 20.25H6.75a5.25 5.25 0 01-2.25-10.5z" clip-rule="evenodd" />
        </svg>`;

    case 'Rain':
    case 'Drizzle':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-24 h-24 mx-auto text-blue-400">
          <path fill-rule="evenodd" d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 20.25H6.75a5.25 5.25 0 01-2.25-10.5z" clip-rule="evenodd" />
          <path d="M9.75 21a.75.75 0 001.5 0v-2.25a.75.75 0 00-1.5 0V21zM12.75 21a.75.75 0 001.5 0v-2.25a.75.75 0 00-1.5 0V21z" />
        </svg>`;
    
    case 'Thunderstorm':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-24 h-24 mx-auto text-yellow-300">
          <path fill-rule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clip-rule="evenodd" />
        </svg>`;

    case 'Snow':
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-24 h-24 mx-auto text-white">
          <line x1="12" y1="2" x2="12" y2="22"></line>
          <line x1="12" y1="2" x2="12" y2="22" transform="rotate(60 12 12)"></line>
          <line x1="12" y1="2" x2="12" y2="22" transform="rotate(120 12 12)"></line>
          <path d="M12 6 L10 4 M12 6 L14 4"></path>
          <path d="M12 18 L10 20 M12 18 L14 20"></path>
          <path d="M12 6 L10 4 M12 6 L14 4" transform="rotate(60 12 12)"></path>
          <path d="M12 18 L10 20 M12 18 L14 20" transform="rotate(60 12 12)"></path>
          <path d="M12 6 L10 4 M12 6 L14 4" transform="rotate(120 12 12)"></path>
          <path d="M12 18 L10 20 M12 18 L14 20" transform="rotate(120 12 12)"></path>
        </svg>`;

    default:
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-24 h-24 mx-auto text-slate-400">
          <path fill-rule="evenodd" d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 20.25H6.75a5.25 5.25 0 01-2.25-10.5z" clip-rule="evenodd" />
        </svg>`;
  }
};

function renderScreen() {
  app.innerHTML = `
    <h1 class="text-2xl font-bold text-center mb-6 text-white tracking-wide">🌤️ Weather Forecast</h1>

    <div class="flex gap-2 mb-2 relative">
      <input 
        type="text" 
        id="js--cityInput-id" 
        placeholder="Enter city..." 
        class="flex-1 p-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button 
        id="js--searchBtn-id" 
        class="bg-blue-600 hover:bg-blue-500 text-white w-24 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed">
        Search
      </button>
    </div>

    <div id="js--error-message-id" class="h-6 text-center text-red-400 text-sm font-medium mb-4 opacity-0 transition-opacity"></div>

    <div id="js--weatherResult-id" class="text-center transition-all duration-300">
      
      <h2 id="js--city-name-id" class="text-3xl font-bold text-white mb-2 drop-shadow-lg"></h2>

      <div id="js--icon-container-id" class="mb-4 min-h-[6rem] flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-20 h-20 text-slate-600">
           <path fill-rule="evenodd" d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 20.25H6.75a5.25 5.25 0 01-2.25-10.5z" clip-rule="evenodd" />
        </svg>
      </div>

      <div id="js--temp-id" class="text-6xl font-bold text-white mb-2 tracking-tighter">--°</div>
      <div id="js--description-id" class="text-blue-200 text-xl font-medium capitalize mb-8">Start by searching a city</div>
      
      <div class="flex justify-between items-center bg-slate-700/30 p-4 rounded-xl border border-white/5">
        <div class="flex flex-col">
          <span class="text-slate-400 text-xs uppercase tracking-wider">Wind</span>
          <span id="js--windSpeed-id" class="text-white font-semibold text-lg">-- km/h</span>
        </div>
        <div class="w-px h-8 bg-slate-600"></div>
        <div class="flex flex-col">
          <span class="text-slate-400 text-xs uppercase tracking-wider">Humidity</span>
          <span id="js--humidity-id" class="text-white font-semibold text-lg">--%</span>
        </div>
      </div>
    </div>
  `
}

renderScreen();

// Select DOM elements
const searchBtn = document.getElementById('js--searchBtn-id');
const cityInput = document.getElementById('js--cityInput-id');
const tempElement = document.getElementById('js--temp-id');
const descElement = document.getElementById('js--description-id');
const windElement = document.getElementById('js--windSpeed-id');
const humidityElement = document.getElementById('js--humidity-id');
const iconContainer = document.getElementById('js--icon-container-id');
const errorElement = document.getElementById('js--error-message-id');
const cityNameElement = document.getElementById('js--city-name-id'); // Selection of new element

/**
 * UI Helper Functions
 */

const showError = (message) => {
  errorElement.innerText = message;
  errorElement.classList.remove('opacity-0');
  cityInput.classList.add('border-red-500');
};

const hideError = () => {
  errorElement.classList.add('opacity-0');
  cityInput.classList.remove('border-red-500');
};

const setLoadingState = (isLoading) => {
  if (isLoading) {
    cityInput.disabled = true;
    searchBtn.disabled = true;
    searchBtn.innerHTML = `
      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    `;
  } else {
    cityInput.disabled = false;
    searchBtn.disabled = false;
    searchBtn.innerText = 'Search';
    cityInput.focus();
  }
};

/**
 * Logic
 */

const fetchWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`City "${city}" not found.`);
    } else {
      throw new Error(`Something went wrong (${response.status})`);
    }
  }

  return await response.json();
};

const updateUI = (data) => {
  if (!data) return;

  cityNameElement.innerText = `${data.name}, ${data.sys.country}`;

  tempElement.innerText = `${Math.round(data.main.temp)}°`;
  descElement.innerText = data.weather[0].description;
  windElement.innerText = `${data.wind.speed} km/h`;
  humidityElement.innerText = `${data.main.humidity}%`;

  const weatherMain = data.weather[0].main;
  iconContainer.innerHTML = getWeatherIcon(weatherMain);
};

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
  } finally {
    setLoadingState(false);
  }
};

searchBtn.addEventListener('click', handleSearch);

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSearch();
});