import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useGet } from './hooks/requests';
import { geoCoderApiKey, getWeatherApiUrl } from './apiConfig';
import { useSelector, useDispatch } from 'react-redux';
import { setForecastData, setCheckLocationNeeded } from './store/actions';
import useAuth from './hooks/useAuth';
import RequireAuth from './hoc/RequireAuth';
import AuthPageWrap from './hoc/AuthPageWrap';

import './styles/fonts.css';
import './styles/reset.min.css';
import './styles/App.css';

import Home from './pages/Home';
import SignUp from './pages/SignUp/SignUp';
import SearchClarify from './pages/SearchClarify/SearchClarify';
import PageNotFound from './pages/PageNotFound';
import Layout from './pages/Layout';
import SignIn from './pages/SignIn/SignIn';

const App = () => {
    const [dataLoading, setDataLoading] = useState(true); // флаг - грузятся ли данные
    const [dataLoaded, setDataLoaded] = useState(false);  // флаг - загрузились ли данные
    const [weatherData, setWeatherData] = useState([]);   // данные о погоде

    const [forecastCity, setForecastCity] = useState(useSelector((state) => state.weatherData.forecastData)); // данные о городе, прогноз по которому выводим
    let checkLocationNeeded = useSelector((state) => state.weatherData.checkLocationNeeded); // флаг - необходимо ли пытаться определить геолокацию юзера
    
    const dispatch = useDispatch();
    const get = useGet();

    // получает данные о погоде по API, и сохраняет их в массиве
    const fetchWeatherData = (coords) => {
        setDataLoading(true); // выставляем флаг, что данные грузятся

        // GET-запрос через специальный класс для запросов, используемый во всём приложении
        get(getWeatherApiUrl(coords.lat, coords.lon))
        .then((resp) => {
            if (resp.data && resp.data.length > 0) {
                setDataLoaded(true);
                setWeatherData(resp.data);
            } else {
                setDataLoaded(false);
            }
        })
        .catch((err) => {
            setDataLoaded(false);
            console.log(err);
        })
        .finally(() => {
            setDataLoading(false);
        });
    }

    // сохраняет данные о новом искомом городе в sessionStorage и ищет данные о погоде по этому городу
    const searchForecast = (city, searchCoords) => {
        const forecastDataObj = {
            city: city,
            coords: {
                lat: searchCoords.lat,
                lon: searchCoords.lon,
            }
        };

        dispatch(setForecastData(forecastDataObj));
        setForecastCity(forecastDataObj);
        fetchWeatherData(searchCoords);
    }

    // проверить геолокацию юзера - если успешно - подгрузить погоду по геолокации
    // если не успешно - подгрузить погоду по дефолтному месту (по дефолту - Москва)
    const checkGeolocation = () => {
        navigator.geolocation.getCurrentPosition(userAcceptedGeolocation, userDeniedGeolocation);
    };

    // колбэк, вызывается если юзер разрешил определить его геолокацию
    const userAcceptedGeolocation = (pos) => {
        // выставляем флаг, что определение геолокации больше не требуется
        checkLocationNeeded = false;
        dispatch(setCheckLocationNeeded(false));
        
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        // определяем название города юзера с помощью геокодера яндекса
        get(`https://geocode-maps.yandex.ru/1.x/?apikey=${geoCoderApiKey}&geocode=${lon},${lat}&format=json`)
        .then((resp) => {
            const userCityData = resp.response.GeoObjectCollection.featureMember[0].GeoObject.description;

            if (userCityData) {
                searchForecast(userCityData.split(',')[0], {
                    lat,
                    lon,
                });
            } else {
                searchForecast(forecastCity.city, {
                    ...forecastCity.coords
                });
            }
        })
        .catch((err) => {
            console.log(err);
            searchForecast(forecastCity.city, {
                ...forecastCity.coords
            });
        });
    }

    // колбэк, вызывается если юзер запретил определить его геолокацию
    const userDeniedGeolocation = () => {
        // выставляем флаг, что определение геолокации больше не требуется
        checkLocationNeeded = false;
        dispatch(setCheckLocationNeeded(false));

        searchForecast(forecastCity.city, {
            ...forecastCity.coords
        });
    };
    
    // старт приложения - проверяем, надо ли подтягивать геолокацию юзера,
    // если да - запрашиваем геолокацию
    // если нет - грузим данные о погоде в месте где уже искали
    // (либо в дефолтном месте, зависит от того сохранены ли данные о уже искомом городе в sessionStorage)
    const appStart = () => {
        if (checkLocationNeeded) {
            checkGeolocation();
            return;
        }

        fetchWeatherData({
            lat: forecastCity.coords.lat,
            lon: forecastCity.coords.lon,
        });
    }

    const isAuth = useAuth(); // авторизован ли пользователь
    
    useEffect(() => {
        if (isAuth) {
            appStart();
        }
    }, []);

    return (
        <div className="main-wrap">
            <Routes>
                <Route path="/" element={<Layout dataLoaded={dataLoaded} searchForecast={searchForecast} />}>
                    <Route
                        index
                        element={
                            <RequireAuth>
                                <Home dataLoading={dataLoading} dataLoaded={dataLoaded} weatherData={weatherData} />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/search-clarify"
                        element={
                            <RequireAuth>
                                <SearchClarify searchForecast={searchForecast} />
                            </RequireAuth>
                        }
                    />
                </Route>
                <Route 
                    path="/sign-up" 
                    element={
                        <AuthPageWrap>
                            <SignUp />
                        </AuthPageWrap>
                    } 
                />
                <Route 
                    path="/sign-in" 
                    element={
                        <AuthPageWrap>
                            <SignIn appStart={appStart} />
                        </AuthPageWrap>
                    } 
                />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
};

export default App;