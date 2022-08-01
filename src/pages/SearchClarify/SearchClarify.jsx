import React from 'react';
import arrowIcon from './../../images/icons/arrow.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchClarify.css';

const SearchClarify = ({ searchForecast }) => {
    const searchCities = useLocation().state.searchedResults;
    const navigate = useNavigate();

    const citySelected = (city, coords) => {
        searchForecast(city, coords);
        navigate('/');
    };

    return (
        <div className="search-clarify">
            <div className="search-clarify__header">
                <div className="search-clarify__back" onClick={() => navigate('/')}>
                    <img
                        src={arrowIcon}
                        alt="arrow back"
                    />
                </div>

                <h3 className="search-clarify__title">
                    Пожалуйста, уточните населённый пункт
                </h3>
            </div>

            <div className="search-clarify__body">
                <ul className="search-clarify__list">
                    {
                        searchCities.map((item, ind) => {
                            return <li 
                                        key={ind} 
                                        className="search-clarify__item"
                                        onClick={() => citySelected(item.name, { lat: item.coords.lat, lon: item.coords.lon })}
                                    >
                                        {item.name}, {item.subject}
                                    </li>
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default SearchClarify;