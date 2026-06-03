import React from 'react';

const Headerpage = ({ imageUrl, title, subtitle }) => {
    return (
        <div className="relative h-80 md:h-[400px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Zoom */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] hover:scale-110"
                style={{ backgroundImage: `url(${imageUrl.src || imageUrl})` }}
            ></div>
            
            {/* Deep Atmospheric Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0a0a0a]"></div>
            
            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className='max-w-4xl mx-auto'>
                    <h1 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6">
                        {title}
                    </h1>
                    <div className="w-24 h-1.5 bg-red-600 mx-auto rounded-full mb-8"></div>
                    <p className="text-gray-300 font-medium text-lg md:text-xl leading-relaxed max-w-2xl mx-auto italic">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Headerpage;
