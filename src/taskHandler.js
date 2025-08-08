//taskHandler.js

import { getCurrentWeather } from './api.js'
import { cityInput } from './elements.js'

export async function getCity(e){
    e.preventDefault();
     
    const city = cityInput.value;
    
    if(!city) return;

    try {
        const weatherData = await getCurrentWeather(city);
        console.log(weatherData);
    } catch (error) {
        console.error(error);
    }
}