import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './MainSkeleton.css';

const SkeletonScreen = () => {
    const highlightColor = '#f8f8f8';
    const baseColor = '#fff';

    return (
        <div>
            <div className="main-skeleton__header">
                <Skeleton height="100%" baseColor={baseColor} highlightColor={highlightColor} />
            </div>

            <div className="main-skeleton__details">
                <div className="main-skeleton__detail-card">
                    <Skeleton height="100%" baseColor={baseColor} highlightColor={highlightColor} />
                </div>

                <div className="main-skeleton__detail-card">
                    <Skeleton height="100%" baseColor={baseColor} highlightColor={highlightColor} />
                </div>
            </div>

            <div className="main-skeleton__slider">
                <Skeleton height={42} width={42} circle={true} baseColor={baseColor} highlightColor={highlightColor} />

                <div className="main-skeleton__slider-strip">
                    <div className="main-skeleton__slider-item">
                        <Skeleton
                            height="100%"
                            baseColor={baseColor}
                            highlightColor={highlightColor}
                        />
                    </div>

                    <div className="main-skeleton__slider-item">
                        <Skeleton
                            height="100%"
                            baseColor={baseColor}
                            highlightColor={highlightColor}
                        />
                    </div>

                    <div className="main-skeleton__slider-item">
                        <Skeleton
                            height="100%"
                            baseColor={baseColor}
                            highlightColor={highlightColor}
                        />
                    </div>

                    <div className="main-skeleton__slider-item">
                        <Skeleton
                            height="100%"
                            baseColor={baseColor}
                            highlightColor={highlightColor}
                        />
                    </div>

                    <div className="main-skeleton__slider-item">
                        <Skeleton
                            height="100%"
                            baseColor={baseColor}
                            highlightColor={highlightColor}
                        />
                    </div>

                    <div className="main-skeleton__slider-item">
                        <Skeleton
                            height="100%"
                            baseColor={baseColor}
                            highlightColor={highlightColor}
                        />
                    </div>

                    <div className="main-skeleton__slider-item">
                        <Skeleton
                            height="100%"
                            baseColor={baseColor}
                            highlightColor={highlightColor}
                        />
                    </div>
                </div>

                <Skeleton height={40} width={40} circle={true} baseColor={baseColor} highlightColor={highlightColor} />
            </div>
        </div>
    );
};

export default SkeletonScreen;