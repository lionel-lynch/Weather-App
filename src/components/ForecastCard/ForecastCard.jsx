import React from 'react';
import './ForecastCard.css';
import ForecastDescriber from './../../API/ForecastDescriber';

const ForecastCard = ({ forecastData }) => {
    const weatherIcon = ForecastDescriber.getForecastIcon(forecastData.weather.code);

    return (
        <div className="forecast-card">
            <div className="forecast-card__week-day">
                {ForecastDescriber.getRelativeWeekDay(forecastData.datetime)}
            </div>

            <div className="forecast-card__date">
                {ForecastDescriber.getForecastDate(forecastData.datetime)}
            </div>

            <div className="forecast-card__img">
                <img 
                    src={require(`./../../images/weather/${weatherIcon}`).default}
                    alt="weather icon"
                />
            </div>

            <div className="forecast-card__temp">
                {forecastData.temp > 0 ? `+${forecastData.temp}` : `${forecastData.temp}`}°
            </div>

            <div className="forecast-card__description">
                {ForecastDescriber.getForecastDescription(forecastData.weather.code)}
            </div>
        </div>
    )
};

export default ForecastCard;