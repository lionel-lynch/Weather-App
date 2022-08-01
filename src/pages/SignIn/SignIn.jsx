import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import Alert from './../../components/UI/Alert/Alert';
import { useDispatch } from 'react-redux/es/exports';
import { setUser } from '../../store/actions';
import './SignIn.css';

const SignIn = ({ appStart }) => {
    const [dataLoading, setDataLoading] = useState(false);   // флаг - выполняется ли запрос на регистрацию, во время запроса - интерфейс заморожен
    const [alertVisible, setAlertVisible] = useState(false); // флаг - видим ли алерт с информацией об ошибке
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // вход в систему
    const handleSignIn = (email, password) => {
        setDataLoading(true);
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            dispatch(setUser({
                accessToken: userCredential.user.accessToken,
                refreshToken: userCredential._tokenResponse.refreshToken
            }));

            appStart(); // стартуем приложение
            navigate('/');
        })
        .catch((err) => {
            console.log(err);
            showAlert(() => setDataLoading(false));
        });
    };

    // показывает алерт и прячем его через 1,5 секунды, также выполняя действие, переданное параметром
    const showAlert = (action = () => {}) => {
        setAlertVisible(true);

        setTimeout(() => {
            setAlertVisible(false);

            action();
        }, 1500);
    };

    return (
        <div className="sign-in">
            <div className="sign-in__content">

                <AuthForm
                    title="Вход"
                    buttonName="Войти"
                    action={handleSignIn}
                    dataLoading={dataLoading}
                    type="sign-in"
                />

                <div className="sign-in__no-account">
                    Нет аккаунта? <Link to={dataLoading ? '' : '/sign-up'} className="sign-in__link">Зарегистрироваться</Link>
                </div>

                <div className="sign-in__info" style={{ display: alertVisible ? 'block' : 'none' }}>
                    <Alert type="error" text="Ошибка входа" />
                </div>

            </div>
        </div>
    );
};

export default SignIn;