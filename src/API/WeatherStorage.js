// через этот класс работаем с данными об искомом городе
// (сохраняем их в sessionStorage, чтоб после перезагрузки не потерять какой город искали)
export default class WeatherStorage {
    static getDefaultForecastData() { // возвращает данные о дефолтном городе, по которому будем выводить погоду (если юзер запретил определить его локацию)
        return {
            city: 'Москва',
            coords: {
                lat: '55.755819',
                lon: '37.617644',
            }
        };
    }

    static getForecastData() { // возвращает данные об искомом городе из sessionStorage
        return {
            city: sessionStorage.getItem('forecastCity'),
            coords: {
                lat: +sessionStorage.getItem('forecastLat'),
                lon: +sessionStorage.getItem('forecastLon'),
            }
        }
    }

    static setForecastData(forecastData) { // устанавливает данные о городе в sessionStorage
        sessionStorage.setItem('forecastCity', forecastData.city);
        sessionStorage.setItem('forecastLat', forecastData.coords.lat);
        sessionStorage.setItem('forecastLon', forecastData.coords.lon);
    }

    static clearForecastData() {
        sessionStorage.removeItem('forecastCity');
        sessionStorage.removeItem('forecastLat');
        sessionStorage.removeItem('forecastLon');
    }
}