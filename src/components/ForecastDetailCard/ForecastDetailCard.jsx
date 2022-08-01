import React, { useState, useEffect } from 'react';
import './ForecastDetailCard.css';
import sunIcon from './../../images/icons/sun.svg';
import dropIcon from './../../images/icons/drop.svg';
import cloudIcon from './../../images/icons/cloud.svg';
import windIcon from './../../images/icons/wind.svg';
import ForecastDescriber from './../../API/ForecastDescriber';

const ForecastDetailCard = ({ day, forecastData }) => {
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');

    const weatherIcon = ForecastDescriber.getForecastIcon(forecastData.weather.code);           // название файла с иконкой, характеризующей погоду
    const weatherAnimation = ForecastDescriber.getForecastAnimation(forecastData.weather.code); // название файла с анимацией, характеризующей погоду
    const getTempDegree = (value) => value > 0 ? `+${value}` : `${value}`; // возвращает строку с температурой

    // возвращает среднее арифметическое из массива приблизительных температур
    const getApproximateTemp = (appTemps) => {
        let tempsSumInit = 0;
        let tempsSum = appTemps.reduce((sum, item) => sum + item, tempsSumInit);

        return Math.trunc(tempsSum / appTemps.length);
    };

    useEffect(() => {
        let sunriseDate = new Date(forecastData.sunrise_ts * 1000);
        let sunsetDate = new Date(forecastData.sunset_ts * 1000);

        setSunrise(`${sunriseDate.getHours()}:${sunriseDate.getMinutes()}`);
        setSunset(`${sunsetDate.getHours()}:${sunsetDate.getMinutes()}`);
    }, []);

    return (
        <div className="forecast-detail">

            <div className="forecast-detail__head">
                <div className="forecast-detail__title forecast-detail__info-item">
                    {day}
                </div>

                <div className="forecast-detail__head-info">
                    <div className="forecast-detail__temp-wrap">
                        <img
                            src={require(`./../../images/weather/${weatherIcon}`).default}
                            className="forecast-detail__weather-icon"
                        />

                        <div className="forecast-detail__temp forecast-detail__info-item">
                            {getTempDegree(forecastData.temp)}°
                        </div>
                    </div>

                    <div className="forecast-detail__weather">
                        <div className="forecast-detail__description forecast-detail__info-item">
                            {ForecastDescriber.getForecastDescription(forecastData.weather.code)}
                        </div>

                        <div className="forecast-detail__sun-info forecast-detail__info-item">
                            <img src={sunIcon} alt="sun icon" />
                            <span>Восход: {sunrise}</span>
                        </div>

                        <div className="forecast-detail__feels forecast-detail__info-item">
                            Ощущается как <span style={{ fontWeight: '600' }}>
                                            {getTempDegree(getApproximateTemp([forecastData.app_max_temp, forecastData.app_min_temp]))}°
                                          </span>
                        </div>

                        <div className="forecast-detail__sun-info forecast-detail__info-item">
                            <img src={sunIcon} alt="sun icon" />
                            <span>Закат: {sunset}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="forecast-detail__body">
                <div className="forecast-detail__items">

                    <div className="forecast-detail__item  forecast-detail__item--hum">
                        <div className="forecast-detail__item-icon">
                            <img src={dropIcon}  alt="drop icon" />
                        </div>

                        <div className="forecast-detail__item-descr forecast-detail__info-item">
                            <span className="forecast-detail__item-text">Влажность:</span> {forecastData.rh}%
                        </div>
                    </div>

                    <div className="forecast-detail__item  forecast-detail__item--clouds">
                        <div className="forecast-detail__item-icon">
                            <img src={cloudIcon}  alt="cloud icon" />
                        </div>

                        <div className="forecast-detail__item-descr forecast-detail__info-item">
                            <span className="forecast-detail__item-text">Облачность:</span> {forecastData.clouds}%
                        </div>
                    </div>

                    <div className="forecast-detail__item  forecast-detail__item--wind">
                        <div className="forecast-detail__item-icon">
                            <img src={windIcon} alt="wind icon" />
                        </div>

                        <div className="forecast-detail__item-descr forecast-detail__info-item">
                            <span className="forecast-detail__item-text">Ветер:</span> {forecastData.wind_spd} м/с, {ForecastDescriber.getWindDirection(forecastData.wind_cdir)}
                        </div>
                    </div>

                </div>
            </div>

            <div className="forecast-detail__background">
                <img 
                    src={require(`./../../images/weather-animated/${weatherAnimation}.gif`).default} 
                    alt="weather animated" 
                />
            </div>

        </div>
    );
};

export default ForecastDetailCard;