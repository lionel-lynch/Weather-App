import WeatherStorage from "../../API/WeatherStorage";

// ---- логика по созданию дефолтного стейта ----
let checkLocationNeeded = false;                     // нужно ли делать запрос на геолокацию юзера
let forecastData = WeatherStorage.getForecastData(); // данные о искомом городе (его название и координаты)

if (!forecastData.city) { // если данных об искомом городе нет - берём дефолтные
    forecastData = WeatherStorage.getDefaultForecastData();
    checkLocationNeeded = true;
}

// дефолтный стейт
const defaultState = {
    forecastData,
    checkLocationNeeded,
};

export const weatherDataReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_FORECAST-DATA':
            WeatherStorage.setForecastData(action.payload);
            return { ...state, forecastData: action.payload };

        case 'SET_CHECK-LOCATION':
            return { ...state, checkLocationNeeded: action.payload };

        default:
            return state;
    }
};