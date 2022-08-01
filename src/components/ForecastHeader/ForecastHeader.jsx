import React from 'react';
import DateTime from '../DateTime/DateTime';
import './ForecastHeader.css';
import calendarIcon from './../../images/icons/calendar.svg';
import { cityIn } from 'lvovich';
import { useSelector } from 'react-redux';

const ForecastHeader = () => {
    const forecastData = useSelector((state) => state.weatherData.forecastData);

    return (
        <div className="forecast-header">
            <h1 className="forecast-header__title">
                Погода в {cityIn(forecastData.city)}
            </h1>

            <div className="forecast-header__time">
                <div className="forecast-header__calendar-icon">
                    <img src={calendarIcon} alt="calendar icon" />
                </div>

                <DateTime />
            </div>
        </div>
    );
};

export default ForecastHeader;