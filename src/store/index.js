import { createStore, combineReducers } from 'redux';
import { weatherDataReducer } from './reducers/weatherDataReducer';
import { userDataReducer } from './reducers/userDataReducer';

const rootReducer = combineReducers({
    weatherData: weatherDataReducer,
    userData: userDataReducer
});

const store = createStore(rootReducer);

export { store };