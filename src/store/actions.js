// --- Action creators ---

const setForecastData = (payload) => {
    return {
        type: 'SET_FORECAST-DATA',
        payload
    };
};

const setCheckLocationNeeded = (payload) => {
    return {
        type: 'SET_CHECK-LOCATION',
        payload
    };
};

const setUser = (payload) => {
    return {
        type: 'SET_USER',
        payload
    };
};

const logout = () => {
    return {
        type: 'LOGOUT',
        payload: {}
    };
};

export { setForecastData, setCheckLocationNeeded, setUser, logout };