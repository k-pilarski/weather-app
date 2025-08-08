import { currentWeather } from './elements.js';

export function renderWeather(wData){
    currentWeather.innerHTML = '';
    
    currentWeather.innerHTML += `
        <h2>Current Weather</h2>    
        <li>${wData.main.temp}</li>
    `
};