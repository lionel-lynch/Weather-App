import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend
} from 'chart.js';
import ForecastDescriber from './../../API/ForecastDescriber';
import './ForecastChart.css';

const ForecastChart = ({ weatherData }) => {
    const [chartProportion, setChartProportion] = useState(3); // пропорции графика
    const chartData = { // данные, которые будем выводить в графике
        labels: new Array(weatherData.length),
        temps: new Array(weatherData.length),
    };

    // подготавливаем данные для вывода в график
    weatherData.forEach((item, ind) => {
        chartData.labels[ind] = ForecastDescriber.getForecastDate(item.datetime); // преобразуем дату из серверного формата в удобочитаемый
        chartData.temps[ind] = item.temp;
    });

    // по ресайзу окна будем немного изменять пропорции графика
    const onChartResize = () => {
        const windowWidth = document.documentElement.clientWidth;

        if (windowWidth <= 500) {
            setChartProportion(1.8);
        } else {
            setChartProportion(3);
        }
    };

    // регистрация компонентов графика
    ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend,);

    return (
        <div className="forecast-chart">
            <h2 className="forecast-chart__title">
                График изменения температуры по дням
            </h2>

            <div className="forecast-chart__chart">
                <Line
                    options={{
                        responsive: true,
                        aspectRatio: chartProportion,
                        onResize: onChartResize
                    }}
                    data={{
                        labels: chartData.labels,
                        datasets: [
                            {
                                label: 'Температура',
                                data: chartData.temps,
                                borderColor: '#2196F3',
                                backgroundColor: '#2196F3',
                            },
                        ]
                    }} 
                />
            </div>
        </div>
    );
};

export default ForecastChart;