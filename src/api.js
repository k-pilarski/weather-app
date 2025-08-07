//api.js

const API_KEY = 'ee58aec0c94e3f73d2f483c7e3a7ccb8';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getCurrentWeather(city) {
    try {
        const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);

        if (!response.ok) {
            throw new Error('City not found or API error.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching current weather:', error);
        throw error;
    }
}

