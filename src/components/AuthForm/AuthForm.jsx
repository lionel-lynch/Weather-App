import React, { useState } from 'react';
import logoIcon from './../../images/logo/logo-blue.svg';
import './AuthForm.css';

// форма авторизации
const AuthForm = ({ title, buttonName, action, dataLoading, type }) => {
    const [passwordErrText, setPasswordErrText] = useState('Введите пароль, минимум 6 символов');

    const [formValues, setFormValues] = useState({ // значения инпутов формы
        email: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({ // значения инпутов формы
        email: false,
        password: false,
    });
    const [labelMovedClasses, setLabelMovedClass] = useState({ // сюда будем программно подставлять/убирать стилевой класс для подсказки у полей ввода
        email: '',
        password: '',
    });

    // парсит email регуляркой
    const parseEmail = (value) => {
        const emailCheckRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailCheckRegExp.test(value);
    }

    // проверяет пароль на наличие цифр и букв в нём
    const checkPassword = (password) => {
        let hasLetters = false, hasNums = false;
        const checkIsLetterRegEx = /\p{L}/u;
        const checkIsNumRegEx = /[1-9]/;

        for (let char of password) {
            if (checkIsLetterRegEx.test(char)) {
                hasLetters = true;
            }

            if (checkIsNumRegEx.test(char)) {
                hasNums = true;
            }
        }

        return hasLetters && hasNums;
    }

    // обработка ввода данных в форму - сохраняем вводимое значение и выключаем подсветку ошибок на инпутах
    const formInput = (evt) => {
        setFormValues({ 
            ...formValues, 
            [evt.target.name]: evt.target.value 
        });

        setFormErrors({ 
            ...formErrors, 
            [evt.target.name]: false
        });
    };

    // валидация формы
    const validate = () => {
        let validComplete = true;
        const errors = {...formErrors};

        // если email некорректный (пустой или не соответствует шаблону)
        if (formValues.email.trim() === '' || !parseEmail(formValues.email)) {
            validComplete = false; // валидация не пройдена
            errors.email = true;   // подсвечиваем ошибку
        }

        // если форма для регистрации
        if (type === 'sign-up') {
            if (!checkPassword(formValues.password)) { // и пароль не содержит цифры и буквы
                validComplete = false;  // валидация не пройдена
                errors.password = true; // подсвечиваем ошибку
                setPasswordErrText('Слишком простой пароль');
            }
        }

        // если пароль короче 6 символов
        if (formValues.password.length < 6) {
            validComplete = false;  // валидация не пройдена
            errors.password = true; // подсвечиваем ошибку
            setPasswordErrText('Введите пароль, минимум 6 символов');
        }

        setFormErrors(errors);
        return validComplete;
    };

    // обработчик клика по кнопке действия формы (войти/зарегистрироваться)
    const actionButtonClicked = (evt) => {
        evt.preventDefault();

        // если введены не валидные значения - уходим
        if (!validate()) {
            return;
        }

        action(formValues.email, formValues.password);
    };

    // обработчик фокуса на инпуте, убираем атрибут readonly (нужен для предотвращения автозаполнения браузером - сломает эффект)
    // по фокусу - двигаем лейбл инпута (небольшой UI-эффект для красоты)
    const inputFocused = (evt, whichInput) => {
        evt.target.removeAttribute('readonly');
        const movedClasses = {...labelMovedClasses};
        movedClasses[whichInput] = 'auth-form__field-label--moved';
        setLabelMovedClass(movedClasses);
    };

    // обработчик потери фокуса на инпуте, возвращаем атрибут readonly (нужен для предотвращения автозаполнения браузером - сломает эффект)
    const inputBlured = (evt, whichInput) => {
        evt.target.setAttribute('readonly', true);
        
        // если инпут пустой - возвращаем лейбл на изначальное место внутри инпута
        if (formValues[whichInput].length === 0) {
            const movedClasses = {...labelMovedClasses};
            movedClasses[whichInput] = '';
            setLabelMovedClass(movedClasses);
        }
    };

    return (
        <div className="auth-form">
            <div className="auth-form__logo">
                <img src={logoIcon} alt="logo" />
            </div>

            <div className="auth-form__form-wrap">
                <h1 className="auth-form__title">
                    {title}
                </h1>

                <form className="auth-form__form">
                    <div className="auth-form__form-field">
                        <input 
                            type="text"
                            value={formValues.email}
                            onChange={formInput}
                            readOnly
                            onFocus={(evt) => inputFocused(evt, 'email')}
                            onBlur={(evt) => inputBlured(evt, 'email')}
                            disabled={dataLoading}
                            style={{ border: formErrors.email ? '1px solid #F44336' : '' }}
                            name="email"
                        />
                        <label 
                            className={`auth-form__field-label ${labelMovedClasses.email}`}
                            style={{ color: formErrors.email ? '#F44336' : ''  }}
                        >
                            Email
                        </label>

                        <span className="auth-form__error" style={{ display: formErrors.email ? 'block' : 'none' }}>
                            Введите корректный email
                        </span>
                    </div>

                    <div className="auth-form__form-field">
                        <input 
                            type="password"
                            value={formValues.password}
                            onChange={formInput}
                            readOnly
                            onFocus={(evt) => inputFocused(evt, 'password')}
                            onBlur={(evt) => inputBlured(evt, 'password')}
                            disabled={dataLoading}
                            style={{ border: formErrors.password ? '1px solid #F44336' : '' }}
                            name="password"
                        />
                        <label 
                            className={`auth-form__field-label ${labelMovedClasses.password}`}
                            style={{ color: formErrors.password ? '#F44336' : ''  }}
                        >
                            Пароль
                        </label>

                        <span className="auth-form__error" style={{ display: formErrors.password ? 'block' : 'none' }}>
                            {passwordErrText}
                        </span>
                    </div>

                    <div className="auth-form__form-field">
                        <button 
                            className="auth-form__button" 
                            onClick={actionButtonClicked} 
                            disabled={dataLoading}
                        >
                            {
                                dataLoading ?
                                    <div className="preloader">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    :
                                    buttonName
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;