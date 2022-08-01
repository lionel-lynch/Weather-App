import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './../components/Header/Header';

const Layout = ({ dataLoaded, searchForecast }) => {
    return (
        <>
            <Header dataLoaded={dataLoaded} searchForecast={searchForecast} />

            <div className="content-wrapper">
                <Outlet />
            </div>
        </>
    );
};

export default Layout;