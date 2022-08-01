import React, { useState } from 'react';
import ForecastHeader from '../ForecastHeader/ForecastHeader';
import ForecastDetailCard from '../ForecastDetailCard/ForecastDetailCard';
import ForecastSlider from '../ForecastSlider/ForecastSlider';
import ForecastChart from '../ForecastChart/ForecastChart';
import './WeatherInterface.css';

const WeatherInterface = ({ weatherData }) => {
    let [test, setTest] = useState([
        {datetime: '2021-07-27', weather: {code: '200'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '201'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '202'}, temp: 0},
        {datetime: '2021-07-27', weather: {code: '230'}, temp: -0.5},
        {datetime: '2021-07-27', weather: {code: '231'}, temp: 0.5},
        {datetime: '2021-07-27', weather: {code: '232'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '233'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '300'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '301'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '302'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '500'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '501'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '511'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '502'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '520'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '521'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '522'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '600'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '601'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '602'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '610'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '611'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '612'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '621'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '622'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '623'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '700'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '711'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '721'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '731'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '741'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '751'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '800'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '801'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '802'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '803'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '804'}, temp: 23},
        {datetime: '2021-07-27', weather: {code: '900'}, temp: 23},
    ]);

    return(
        <div className="weather-interface">
            <ForecastHeader />

            <div className="weather-interface__cards">
                <div className="weather-interface__card">
                    <ForecastDetailCard day="Сегодня" forecastData={weatherData[0]} />
                </div>

                <div className="weather-interface__card">
                    <ForecastDetailCard day="Завтра" forecastData={weatherData[1]} />
                </div>
            </div>

            <div className="weather-interface__slider">
                <ForecastSlider weatherData={weatherData} />
            </div>

            <div className="weather-interface__chart">
                <ForecastChart weatherData={weatherData} />
            </div>
        </div>
    );
};

export default WeatherInterface;