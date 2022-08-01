import React from 'react';
import ForecastCard from './../ForecastCard/ForecastCard';
import './ForecastSlider.css';
import sliderArrow from './../../images/icons/slider-arrow.svg';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

const ForecastSlider = ({ weatherData }) => {
    const swiperBreakpoints = {
        401: {
            slidesPerView: 2,
            slidesPerGroup: 1,
        },
        577: {
            slidesPerView: 3,
            slidesPerGroup: 2,
        },
        769: {
            slidesPerView: 4,
            slidesPerGroup: 2,
        },
        993: {
            slidesPerView: 5,
            slidesPerGroup: 2,
        },
        1120: {
            slidesPerView: 6,
            slidesPerGroup: 2,
        },
        1330: {
            slidesPerView: 7,
            slidesPerGroup: 2,
        }
    };

    let swiperSlider;

    return (
        <div className="forecast-slider">
            <button className="forecast-slider__button" onClick={() => swiperSlider.slidePrev()}>
                <img 
                    src={sliderArrow} 
                    alt="slider button" 
                />
            </button>

            <div className="forecast-slider__swiper-wrap">
                <Swiper
                    spaceBetween={10}
                    breakpoints={swiperBreakpoints}
                    onSwiper={(swiper) => swiperSlider = swiper}
                >
                    {
                        weatherData.map((dataItem, ind) => (
                            <SwiperSlide 
                                key={ind} 
                                style={{ height: 'auto', minHeight: '100%' }}
                            >
                                <ForecastCard key={ind} forecastData={dataItem} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>

            <button className="forecast-slider__button" onClick={() => swiperSlider.slideNext()}>
                <img
                    style={{ transform: 'rotate(180deg)' }}
                    src={sliderArrow} 
                    alt="slider button" 
                />
            </button>
        </div>
    );
};

export default ForecastSlider;