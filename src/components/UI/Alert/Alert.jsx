import React from 'react';
import cl from './Alert.module.css';
import warningBlue from './../../../images/icons/warning-blue.svg';
import warningRed from './../../../images/icons/warning-red.svg';
import warningGreen from './../../../images/icons/warning-green.svg';

const Alert = ({ type, text, styles }) => {
    // типы кастомных алертов, в зависимости от типа подставляем стилевой класс и путь к картинке
    const alertTypes = {
        'error': {
            class: cl.alertError,
            icon: warningRed
        },
        'warning': {
            class: cl.alertWarning,
            icon: warningBlue
        },
        'success': {
            class: cl.alertSuccess,
            icon: warningGreen
        }
    };

    return (
        <div
            className={`${cl.alert} ${alertTypes[type].class}`}
            style={{ ...styles }}
        >
            <img 
                className={cl.alertIcon}
                src={alertTypes[type].icon}
                alt="alert icon"
            />

            <p className={cl.alertText}>
                {text}
            </p>
        </div>
    );
};

export default Alert;