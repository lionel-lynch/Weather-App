import React from 'react';
import WeatherInterface from './../components/WeatherInterface/WeatherInterface';
import SkeletonScreen from '../components/UI/MainSkeleton/MainSkeleton';
import Alert from './../components/UI/Alert/Alert';
import { useSelector } from 'react-redux';

const Home = ({ dataLoading, dataLoaded, weatherData }) => {
    // флаг - необходимо ли пытаться определить геолокацию юзера
    const checkLocationNeeded = useSelector((state) => state.weatherData.checkLocationNeeded);

    return (
        <>
            {
                checkLocationNeeded ? (
                    <div className="home-alert-wrap" style={{ fontSize: '18px' }}>
                        <Alert text="Проверяем Вашу геолокацию..." type="warning" />
                    </div>
                ) : (
                    dataLoading ? (
                        <SkeletonScreen />
                    ) : (
                        dataLoaded ?
                            <WeatherInterface weatherData={weatherData} />
                            :
                            <div className="home-alert-wrap">
                                <Alert text="Ошибка, данные не загружены, перезагрузите страницу" type="error" />
                            </div>
                    )
                )
            }
        </>
    );
};

export default Home;