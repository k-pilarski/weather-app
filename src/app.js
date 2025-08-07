//app.js

import { getCurrentWeather } from './api.js'


async function init() {
    try {
        const weatherData = await getCurrentWeather('Lublin');
        console.log(weatherData);
    } catch (error) {
        console.error(error);
    }
}

init();
