
import React from 'react';

const Headerpage = ({ imageUrl, title, subtitle }) => {
    return (
        <div className="relative h-64">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="relative flex items-center justify-center h-full">
                <div className='flex flex-col items-center gap-4'>
                    <h1 className="text-custom-yellow text-4xl font-bold">{title}</h1>
                    <p className="text-center text-accent font-semibold text-xl">{subtitle}</p>
                </div>
            </div>
        </div>
    );
};

export default Headerpage;
