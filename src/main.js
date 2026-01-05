import './style.css'

const app = document.getElementById('js--app-id');

function renderScreen() {
  app.innerHTML = `
    <h1 class="text-2xl font-bold text-center mb-6">🌤️ Weather Forecast</h1>

    <div class="flex gap-2 mb-6">
      <input type="text" id="js--cityInput-id" placeholder="Enter city..." class="flex-1 p-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:border-blue-500 text-sm"/>
      <button id="js--searchBtn-id" class="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-medium transition-colors">Search</button>
    </div>

    <div id="js--weatherResult-id" class="text-center space-y-4">
      <div class="text-5xl font-bold text-blue-400">--°C</div>
      <div class="text-slate-400 text-lg">Waiting for data...</div>
      <div class="flex justify-between mt-6 text-sm text-slate-400 border-t border-slate-700 pt-4">
        <span>Wind: <span id="js--windSpeed-id" class="text-white">-- km/h</span></span>
        <span>Humidity: <span id="js--humidity-id" class="text-white">--%</span></span>
      </div>
    </div>
  `
}

renderScreen();
