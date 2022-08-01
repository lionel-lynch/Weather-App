const geoCoderApiKey = 'ad341b6b-515e-4cd1-8329-7ad016422ad0';

const getWeatherApiUrl = (lat, lon) => {
    return `https://api.weatherbit.io/v2.0/forecast/daily?lang=ru&key=7d34c6147ddd4047a0cc21374030588c&lat=${lat}&lon=${lon}`;
};

export { geoCoderApiKey, getWeatherApiUrl };