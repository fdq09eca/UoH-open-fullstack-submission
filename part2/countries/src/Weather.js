import { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY
const weather_endpoint = (country) => `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=Metric&appid=${api_key}`

function WeatherIcon({ weather }) {
    const src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    const alt = `weathericon_${weather.icon}`;
    return <img alt={alt} src={src} />;
}

export function Weather({ country }) {
    const [weather, setWeather] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    function hook() {
        const handleResponse = response => {
            setWeather(response.data);
            setIsLoading(false);
        };
        const handleError = error => {
            setError(error);
            setIsLoading(false);
        };
        axios.get(weather_endpoint(country)).then(handleResponse, handleError);
    }

    useEffect(hook, [country]);

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>


    return <>
        <h2>Weather in {country.capital}</h2>
        <p>temperature: {weather.main.temp} Celcius</p>
        <WeatherIcon weather={weather.weather[0]} />
        <p>wind speed: {weather.wind.speed} m/s</p>
    </>;
}
