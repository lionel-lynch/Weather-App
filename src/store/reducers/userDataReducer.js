import TokenStorage from './../../API/TokenStorage';
import WeatherStorage from '../../API/WeatherStorage';

const defaultState = {
    accessToken: '',
    refreshToken: '',
};

export const userDataReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            TokenStorage.setAccessToken(action.payload.accessToken);
            TokenStorage.setRefreshToken(action.payload.refreshToken);
            return { ...state, ...action.payload };

        case 'LOGOUT':
            TokenStorage.removeAccessToken();
            TokenStorage.removeRefreshToken();
            WeatherStorage.clearForecastData();
            return { accessToken: '', refreshToken: '' };

        default:
            return state;
    }
};