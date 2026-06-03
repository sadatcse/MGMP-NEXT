import React from 'react';

function VisionCard({ icon, title, description }) {
    return (
        <div className="flex group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-neutral-900 border border-gray-100 overflow-hidden">
            <div className="flex-shrink-0 w-24 h-24 bg-blue-50 rounded-br-full rounded-t-2xl absolute top-0 left-0 flex justify-center items-center z-[2]">
                <div className="flex items-center justify-center w-12 h-12 rounded-full transition-transform duration-500 group-hover:scale-110">
                    {icon}
                </div>
            </div>
            <div className="pl-20 pt-16 p-8 relative z-[1]">
                <div className="w-0 h-0 bg-custom-yellow/5 rounded-2xl absolute top-0 left-0 group-hover:h-full group-hover:w-full transition-all duration-500 z-[-1]"></div>
                <h4 className="text-xl font-bold mb-2 group-hover:text-black transition-colors tracking-tight">{title}</h4>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{description}</p>
            </div>
        </div>
    );
}

export default VisionCard;
