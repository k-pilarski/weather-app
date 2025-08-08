import { currentWeather } from './elements.js';

export function renderWeather(wData){
    currentWeather.innerHTML = '';
    let weatherIcon = '🔥';

    currentWeather.innerHTML += `
        <h2>Current Weather - ${wData.main.temp} ${weatherIcon}</h2>    
    `
};