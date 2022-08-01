import React, { useState, useEffect } from 'react';
import weekDays from './../../data/weekDays';
import monthes from './../../data/monthes'
import styleClasses from './DateTime.module.css';

const DateTime = () => {
    // данные для вывода даты
    const [hours, setHours] = useState(0);      // часы
    const [minutes, setMinutes] = useState(0);  // минуты
    const [date, setDate] = useState('');       // дата

    let timerId;    // id таймера setInterval
    let isMounted;  // флаг - монтирован ли компонент

    // формирует дату для вывода
    const setDateTime = () => {
        const now = new Date();

        const day = now.getDate();
        const weekDay = weekDays[now.getDay()];
        const month = monthes[now.getMonth()].full;
        const year = now.getFullYear();

        setHours(appendWithZero(now.getHours()));
        setMinutes(appendWithZero(now.getMinutes()));

        setDate(`${weekDay} ${day} ${month} ${year}, `);
    }

    const appendWithZero = (value) => {
        return value < 10 ? `0${value}` : value;
    }

    const startTimer = () => {
        // таймер будем обновлять каждую минуту =>
        // вычисляем сколько секунд осталось до следующей минуты
        let diff = 60 - (new Date()).getSeconds();

        setTimeout(() => {
            if (isMounted) {
                setDateTime();

                let id = setInterval(() => {
                    setDateTime();
                }, 60000);
    
                timerId = id;
            }
        }, diff * 1000);
    }

    useEffect(() => {
        isMounted = true;
        setDateTime();
        startTimer();
        
        return () => {
            isMounted = false;
            clearInterval(timerId);
        };
    }, []);

    return (
        <div className={styleClasses.dateTime}>
            <span>{date}</span>

            <span>
                {hours}
                <span className={styleClasses.dateTimeDots}>:</span>
                {minutes}
            </span>
        </div>
    );
};

export default DateTime;