import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// данный HOC используется для обёртки страниц авторизации (регистрация, вход)
// и проверяет, если юзер уже авторизован - бросает на главную
const AuthPageWrap = ({ children }) => {
    const isAuth = useAuth();

    if (isAuth) {
        return <Navigate to="/" />
    }

    return children;
};

export default AuthPageWrap;