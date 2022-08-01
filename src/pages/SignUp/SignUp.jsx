import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import Alert from './../../components/UI/Alert/Alert';
import './SignUp.css';

const SignUp = () => {
    const [dataLoading, setDataLoading] = useState(false); // флаг - выполняется ли запрос на регистрацию, во время запроса - интерфейс заморожен
    const [alertOptions, setAlertOptions] = useState({ // опции алерта с информацией об успешной/неуспешной регистрации
        type: 'success',
        text: 'Вы успешно зарегистрировались',
        visible: false
    });

    const navigate = useNavigate();

    // регистрация в системе
    const handleSignUp = (email, password) => {
        const auth = getAuth();
        setDataLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showAlert('success', 'Вы успешно зарегистрировались', () => {
                setDataLoading(false);
                navigate('/sign-in');
            });
        })
        .catch((err) => {
            console.log(err);
            showAlert('error', 'Ошибка регистрации', () => setDataLoading(false));
        });
    };

    // показывает алерт и прячем его через 1,5 секунды, также выполняя действие, переданное параметром
    const showAlert = (type, text, action = () => {}) => {
        setAlertOptions({
            type,
            text,
            visible: true
        });

        setTimeout(() => {
            setAlertOptions({
                ...alertOptions,
                visible: false
            });

            action();
        }, 1500);
    };

    return (
        <div className="sign-up">
            <div className="sign-up__content">

                <AuthForm 
                    title="Регистрация" 
                    buttonName="Зарегистрироваться" 
                    action={handleSignUp}
                    dataLoading={dataLoading}
                    type="sign-up"
                />

                <div className="sign-up__has-account">
                    Уже есть аккаунт? <Link to={dataLoading ? '' : '/sign-in'} className="sign-up__link">Войти</Link>
                </div>

                <div className="sign-up__info" style={{ display: alertOptions.visible ? 'block' : 'none' }}>
                    <Alert type={alertOptions.type} text={alertOptions.text} />
                </div>

            </div>
        </div>
    );
};

export default SignUp;