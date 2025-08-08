//taskHandler.js

import { getCurrentWeather } from './api.js'
import { cityInput } from './elements.js'
import { renderWeather } from './render.js';

export async function getCity(e){
    e.preventDefault();
     
    const city = cityInput.value;
    
    if(!city) return;

    try {
        const weatherData = await getCurrentWeather(city);
        console.log(weatherData);
        renderWeather(weatherData);
    } catch (error) {
        console.error(error);
    }
}