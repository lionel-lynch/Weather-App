import React, { useState, useEffect } from 'react';
import './Header.css';
import { useDispatch } from 'react-redux';
import { logout } from './../../store/actions';
import { Link, useNavigate } from 'react-router-dom';
import ForecastSearch from './../ForecastSearch/ForecastSearch';
import cities from './../../data/russian-cities.json';
import whiteLogo from './../../images/logo/logo-white.svg';
import logoutIcon from './../../images/icons/logout.svg';
import searchIconWhite from './../../images/icons/white-search.svg';
import closeIcon from './../../images/icons/close.svg';

const Header = ({ dataLoaded, searchForecast }) => {
    // флаг - находится ли шапка в состоянии поиска (имеет 2 состояния в моб.версии - см. условие рендреинга в jsx-разметке)
    const [searchState, setSearchState] = useState(false);

    // шапка в состоянии поиска может быть только на мобильных устройствах
    // данная функция отслеживает, что если мы не на мобилках - спрятать мобильный поиск
    const checkScreenWidth = () => {
        const screenW = document.documentElement.clientWidth;

        if (screenW > 576) {
            setSearchState(false);
        }
    };

    // выход из системы
    const handleLogout = () => {
        dispatch(logout());
        navigate('/sign-in');
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('resize', checkScreenWidth);
        return () => window.removeEventListener('resize', checkScreenWidth);
    }, []);

    return (
        <header className="header">
            <div className="header__content">
                {
                    searchState ?
                        <>
                            <button 
                                className="header__search-close" 
                                onClick={() => setSearchState(false)}
                            >
                                <img src={closeIcon} alt="close icon" />
                            </button>

                            <div className="header__search-mobile">
                                <ForecastSearch
                                    cities={cities}
                                    searchForecast={searchForecast}
                                    onSearch={() => setSearchState(false)}
                                    dataLoaded={dataLoaded}
                                />
                            </div>
                        </>
                        :
                        <>
                            <div className="header__logo">
                                <Link to="/">
                                    <img src={whiteLogo} />
                                </Link>
                            </div>

                            <div className="header__search">
                                <ForecastSearch
                                    cities={cities}
                                    searchForecast={searchForecast}
                                    searchDisabled={dataLoaded}
                                    dataLoaded={dataLoaded}
                                />
                            </div>

                            <div className="header__buttons">
                                <button 
                                    className="header__search-button" 
                                    onClick={() => setSearchState(true)}
                                >
                                    <img src={searchIconWhite} alt="search icon" />
                                </button>

                                <button className="header__logout" onClick={handleLogout}>
                                    <img src={logoutIcon} alt="logout icon" />
                                </button>
                            </div>
                        </>
                }
            </div>
        </header>
    );
};

export default Header;