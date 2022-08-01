import weatherCodes from './../data/weatherCodes.json';
import monthes from './../data/monthes.json';
import weekDays from "./../data/weekDays";

// статический класс, который инкапсулирует функционал по преобразованию данных о погоде
// методы данного класса преобразуют данные из того вида, в каком они приходят по API, в человекочитаемый текст/картинки
export default class ForecastDescriber {
    // возвращает иконку, соответствующую погоде по коду из API
    static getForecastIcon(forecastCode) {
        return `${weatherCodes[forecastCode].iconName}.svg`;
    }

    // возвращает строку-описание, соответствующую погоде по коду из API
    static getForecastDescription(forecastCode) {
        return weatherCodes[forecastCode].description;
    }

    // возвращает название файла-гифки с анимированной погодой
    static getForecastAnimation(forecastCode) {
        return weatherCodes[forecastCode].animationName;
    }

    // возвращает дату в формате "число месяц"
    static getForecastDate(dateToParse) {
        let forecastDate = new Date(dateToParse);
        let forecastMonth = forecastDate.getMonth();
        return `${forecastDate.getDate()} ${monthes[forecastMonth].short}`;
    }

    // преобразует данные о направлении ветра из API и возвращает человекочитаемый вариант
    static getWindDirection(descriptString) {
        let directions = descriptString.split('');
        let windDirection;
 
        switch (directions.length) {
            case 2:
                windDirection = `${directions[0]}-${directions[1]}`;
                break;
            case 3:
                windDirection = `${directions[1]}-${directions[2]}`;
                break;
            default:
                windDirection = directions[0];
                break;
        }

        return windDirection;
    }

    // возвращает относительное описание дня
    // получает дату, и по отношению к сегодняшнему дню возвращает строку "Сегодня", "Завтра" или "Послезавтра"
    // (облегчит человеку понимание, на какой день прогноз погоды он сейчас смотрит)
    static getRelativeWeekDay(dateToParse) {
        const forecastDate = new Date(dateToParse);
        const nowDate = new Date();

        // данные о дате, которую прислали в параметре
        const forecast = {
            year: forecastDate.getFullYear(),
            month: forecastDate.getMonth(),
            day: forecastDate.getDate(),
        };

        // данные о текущей дате (затем данный объект будем модифицировать)
        const current = {
            year: nowDate.getFullYear(),
            month: nowDate.getMonth(),
            day: nowDate.getDate(),
        };

        const isLeapYear = (year) => ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0); // функция, отвечающая является ли год високосным
        const relativeNames = ['Сегодня', 'Завтра', 'Послезавтра'];                               // массив относительных названий дней
        const daysInMonthes = [31, isLeapYear(current.year) ? 28 : 27, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // массив с количеством дней в каждом месяце
        let relativeWeekDay = weekDays[forecastDate.getDay()]; // в эту переменную записываем результат работы функции

        // проверяет, равны ли даты
        const equalDates = (fDate, sDate) => {
            return fDate.year === sDate.year
                &&
                fDate.month === sDate.month
                &&
                fDate.day === sDate.day;
        }

        // добавляет один день к дате date
        const addDay = (date) => {
            if (date.day === daysInMonthes[current.month]) {
                date.day = 1;

                if (date.month === 11) {
                    date.month = 1;
                    date.year++;
                }
            } else {
                date.day++;
            }
        };

        // алгоритм таков: проверяем переменную с текущей дату и дату, которую прислали в параметре на равенство
        // если они равны - то забираем соответствующее итерации название
        // если не равны - увеличиваем день в переменной с текущей датой и сравниваем снова
        // таким образом, мы или получим одно из трёх относительных описаний
        // или просто вернем название дня недели
        for (let i = 0; i < 3; i++) {
            if (equalDates(forecast, current)) {    // если даты равны
                relativeWeekDay = relativeNames[i]; // то сохраняем относительное название дня, соответствующее итерации цикла
                break;
            } else {             // в противном случае
                addDay(current); // добавляем к текущей дате один день
            }
        }

        return relativeWeekDay;
    }
}