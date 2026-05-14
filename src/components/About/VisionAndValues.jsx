import React from 'react';
import { FaCar, FaTrophy, FaRegSmile, FaWeight, FaHeart, FaHotTub } from "react-icons/fa";
import VisionCard from "./VisionCard";


function VisionAndValues() {
    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto">
                <h2 className="text-2xl md:text-6xl font-extrabold text-center text-[#ebc270] mb-4 md:mb-10">More Than A gym</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <VisionCard
                        icon={<FaCar className="text-6xl text-yellow-500  mx-auto" />}
                        title="Personal Parking"
                        description="We provide convenient personal parking facilities to ensure a hassle-free experience for our members."
                    />
                    <VisionCard
                        icon={<FaTrophy className="text-6xl text-yellow-500  mx-auto" />}
                        title="Best Gym in Mohammadpur"
                        description="Our commitment to excellence and community support has earned us the reputation of being the best gym in Mohammadpur."
                    />
                    <VisionCard
                        icon={<FaRegSmile className="text-6xl text-yellow-500  mx-auto" />}
                        title="Member Satisfaction"
                        description="We prioritize member satisfaction by offering exceptional service, personalized attention, and a welcoming atmosphere."
                    />
                    <VisionCard
                        icon={<FaWeight className="text-6xl text-yellow-500 mx-auto" />}
                        title="Weight Management"
                        description="We focus on customized weight management programs tailored to individual needs, combining fitness, nutrition, and lifestyle guidance."
                    />
                    <VisionCard
                        icon={<FaHeart className="text-6xl text-yellow-500  mx-auto" />}
                        title="Health and Wellness"
                        description="We promote holistic health and wellness through comprehensive fitness programs, encouraging a balanced lifestyle."
                    />
                    <VisionCard
                        icon={<FaHotTub className="text-6xl text-yellow-500  mx-auto" />}
                        title="Steam and Sauna"
                        description="Enjoy the benefits of relaxation and detoxification with our state-of-the-art steam and sauna facilities."
                    />
                </div>
            </div>
        </section>
    );
}

export default VisionAndValues;
