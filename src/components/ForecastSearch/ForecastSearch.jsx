import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './../UI/Alert/Alert';
import searchIcon from './../../images/icons/search.svg';
import './ForecastSearch.css';

const ForecastSearch = ({ cities, searchForecast, onSearch, dataLoaded }) => {
    // список городов (сразу сортируем по убыванию населения)
    const [citiesList] = useState(cities.sort((x, y) => {
        let xPop = x.population;
        let yPop = y.population;

        return xPop > yPop ? -1 : xPop < yPop ? 1 : 0;
    }));

    const [inputValue, setInputValue] = useState('');          // текущая введенная в инпут строка
    const [inputDisabled, setInputDisabled] = useState(false); // флаг с помощью которого управляем состоянием disabled у инпута
    const [searchResults, setSearchResults] = useState([]);    // массив совпадающих с вводом результатов по городам
    const [selectedDropdownItem, setSelectedDropdownItem] = useState(-1); // массив совпадающих с вводом результатов по городам

    // стили для алерта с инфой об ошибочном вводе
    const [alertStyles, setAlertStyles] = useState({
        position: 'fixed',
        top: '-200%',
        fontSize: '18px',
        left: '0',
        right: '0',
        margin: 'auto',
        maxWidth: '450px',
        minWidth: '240px',
        width: '80%',
        justifyContent: 'center',
    });

    // кэш совпадающих с вводом результатов по городам (нужен чтоб при блюре и фокусе на поле ввода заново не прочесывать массив городов)
    const [searchResultsCache, setSearchResultsCache] = useState([]); 

    const navigate = useNavigate();
    const cityRegExp = /([а-я]+([-—]?[а-я]*)*)(\s[а-я]+[-—]?[а-я]*)*/gi; // регулярка для парсинга ввода города
    const itemsToPrintInDropdown = 12;  // сколько названий населённых пунктов будем выводить в автоподборе

    // обработчик ввода названия населенного пункта
    const cityInput = (evt) => {
        let curInp = evt.target.value;
        setInputValue(curInp);

        // если строка ввода пустая - прячем автоподбор
        if (curInp.trim().length === 0) {
            setSearchResults([]);
            return;
        }

        searchCitiesByQuery(curInp.trim());
    }

    // поиск городов, совпадающих с поисковым запросом
    const searchCitiesByQuery = (query) => {
        const typedWords = query.match(cityRegExp); // парсим ввод через регулярку

        // если из строки ввода распарсили одно подходящее слово
        if (typedWords?.length === 1) {
            const filtered = citiesList.filter((item) => {
                return item.name.toLowerCase().startsWith(typedWords[0].toLowerCase());
            });

            if (filtered.length > 0) {
                setSearchResults(filtered);
            } else {
                setSearchResults([]);
            }
        } else { // если распарсили более одного слова
            setSearchResults([]);
        }
    };

    // выбора города из списка автоподбора
    const citySelected = (evt) => {
        if (evt.button == 0) { // реагируем только на клик левой кнопкой мыши
            let city = evt.target.closest('li');

            if (!city) {
                return;
            }

            // считываем атрибут, в котором хранятся координаты населённого пункта
            let coords = city.getAttribute('data-coords').split('&');
            let cityName = city.textContent.split(',')[0];

            setInputValue('');
            setSearchResults([]);
            searchForecast(cityName, { 
                lat: coords[0], 
                lon: coords[1] 
            });

            if (onSearch) {
                onSearch(); // функция, проброшенная из вышестоящего компонента, кусочек логики оттуда
            }

            navigate('/');
        }
    }

    // обработка нажатия клавишы действия от юзера (enter/кнопка поиска), которая запускает процедуру поиска погоды по заданной строке
    const searchCommand = () => {
        let preparedValue = inputValue.trim().match(cityRegExp)[0].toLowerCase();

        // поиск городов, точно подходящих по поисковому запросу
        let fullSearchResults = searchResults.filter((item) => {
            return item.name.toLowerCase() === preparedValue;
        });

        // если введено полное название конкретного города
        if (fullSearchResults.length === 1) {
            let data = fullSearchResults[0];
            setSearchResults([]);
            setInputValue('');
            searchForecast(data.name, {
                lat: data.coords.lat,
                lon: data.coords.lon,
            });

            if (onSearch) {
                onSearch(); // функция, проброшенная из вышестоящего компонента, кусочек логики оттуда
            }

            navigate('/');
        } else {
            // если результатов поиска больше одного
            setInputValue('');
            setSearchResults([]);

            if (onSearch) {
                onSearch(); // функция, проброшенная из вышестоящего компонента, кусочек логики оттуда
            }

            navigate('/search-clarify', { state: {
                searchedResults: searchResults
            }});
        } // if
    };

    // проверяет, валидно ли введённая поисковая строка, для того, чтоб осуществить по ней поиск
    const isInputValueValid = () => {
        let isValid = true;

        if (inputValue.trim() == '') {
            isValid = false;
        } else if (searchResults.length <= 0) {
            isValid = false;
        }

        return isValid;
    };

    // обработка нажатия клавишы при вводе данных в поле
    const keyPressedOnInput = (evt) => {
        if (evt.code == 'Enter' || evt.keyCode === 13) {

            if (isInputValueValid()) {
                searchCommand();
            } else {
                showErrAlert();
            }
            
        } else if (evt.code == 'ArrowDown') {
            if (isInputValueValid()) {
                selectNextDropdownItem();
            }
        } else if (evt.code === 'ArrowUp') {
            if (isInputValueValid()) {
                selectPrevDropdownItem();
            }
        } else {
            setSelectedDropdownItem(-1);
        }
    }

    // обрабатывает нажатие стрелочки вниз на инпуте, выбирает следующий за текущим пункт из автоподбора
    const selectNextDropdownItem = () => {
        let items = searchResults.slice(0, itemsToPrintInDropdown); // обрезаем все результаты поиса до тех, что выведены в автоподбор

        if (selectedDropdownItem === items.length - 1) { // если у нас выбран последний элемент автоподбора - прячем всё и уходим
            setSelectedDropdownItem(-1);
            setInputValue('');
            setSearchResults([]);
        } else {
            setSelectedDropdownItem(selectedDropdownItem + 1);    // подсвечиваем следующий пункт автоподбора
            setInputValue(items[selectedDropdownItem + 1].name);  // загружаем его значение в инпут
        }
    };

    // обрабатывает нажатие стрелочки вниз на инпуте, выбирает следующий за текущим пункт из автоподбора
    const selectPrevDropdownItem = () => {
        if (selectedDropdownItem === -1) {
            return;
        }

        let items = searchResults.slice(0, itemsToPrintInDropdown); // обрезаем все результаты поиса до тех, что выведены в автоподбор

        if (selectedDropdownItem === 0) { // если у нас выбран первый элемент автоподбора - прячем всё и уходим
            setSelectedDropdownItem(-1);
            setInputValue('');
            setSearchResults([]);
        } else {
            setSelectedDropdownItem(selectedDropdownItem - 1);
            setInputValue(items[selectedDropdownItem - 1].name);
        }
    };

    // обработчик события движения мыши над списком автоподбора
    const dropdownItemsHover = (evt) => {
        // если на момент ховера никто не был выбран - выбираем первый элемент, на который навели
        if (selectedDropdownItem === -1) {
            setSelectedDropdownItem(+evt.target.dataset.ind);
            return;
        }

        // координаты текущего выбранного пункта
        const curItemCoords = searchResults[selectedDropdownItem].coords;

        // если навели курсор на новый элемент - выбираем его (сравниваем элементы по координатам)
        if (evt.target.dataset.coords !== `${curItemCoords.lat}&${curItemCoords.lon}`) {
            setSelectedDropdownItem(+evt.target.dataset.ind);
        }
    };

    // этот обработчик вызываем при потере инпутом фокуса
    const cityInputBlured = () => {
        setSearchResultsCache(searchResults);
        setSearchResults([]);
        setSelectedDropdownItem(-1);
    };

    // этот обработчик вызываем при фокусе на инпуте
    const cityInputFocused = () => {
        const trimmedInput = inputValue.trim();

        // если в инпуте что-то есть - достаем из кэша данные об автоподборе и выводим их
        if (trimmedInput.length > 0) {
            setSearchResults(searchResultsCache);
            setSearchResultsCache([]);
        }
    }

    // показывает сообщение об ошибочном вводе
    const showErrAlert = () => {
        setAlertStyles({
            ...alertStyles,
            top: '100px'
        });

        setInputDisabled(true); // отключаем инпут на время показа алерта

        setTimeout(() => {
            setAlertStyles({
                ...alertStyles,
                top: '-200%'
            });
            
            setInputDisabled(false);
        }, 2000);
    }

    return (
        <div className="forecast-search__wrap">
            <div className="forecast-search">
                <div className="forecast-search__search">
                    <img src={searchIcon} alt="search icon" className="forecast-search__icon" />

                    <input 
                        type="text"
                        className="foreacst-search__input" 
                        value={inputValue}
                        placeholder="Населённый пункт"
                        autoComplete="off"
                        onChange={cityInput}
                        onBlur={cityInputBlured}
                        onFocus={cityInputFocused}
                        onKeyDown={keyPressedOnInput}
                        disabled={inputDisabled || !dataLoaded}
                    />
                </div>

                <div className="forecast-search__autocomplete" style={{ display: searchResults.length > 0 ? 'block' : 'none' }}>
                    <ul 
                        className="forecast-search__cities" 
                        onMouseDown={citySelected}
                        onMouseMove={dropdownItemsHover}
                        onMouseLeave={() => setSelectedDropdownItem(-1)}
                    >
                        {
                            searchResults.slice(0, itemsToPrintInDropdown).map((item, ind) => (
                                <li 
                                    data-coords={`${item.coords.lat}&${item.coords.lon}`}
                                    data-ind={ind}
                                    key={`${item.coords.lat}&${item.coords.lon}`}
                                    style={selectedDropdownItem === ind ? { backgroundColor: '#1560BD', color: '#fff' } : {}}
                                >
                                    {item.name}, {item.subject}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            <Alert 
                type="error" 
                text="Ошибка: запрос не дал результатов" 
                styles={alertStyles} 
                isCentered={true}
            />
        </div>
    );
};

export default ForecastSearch;