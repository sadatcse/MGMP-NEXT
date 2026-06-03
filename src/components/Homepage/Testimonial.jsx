"use client";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Title from "./Title";
import Spinner from "../Utility/Spinner"; 
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const Testimonial = () => {
  const [testimonialData, setTestimonialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const maxLength = 260;
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get('/testimonial/get-all');
        setTestimonialData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [axiosPublic]);

  return (
    <section className="py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <Title title="Success Stories" subtitle="What Our Members Say" />
        </div>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        ) : (
          <div className="relative">
            {/* Edge Gradients for smooth fade */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

            <Marquee speed={40} pauseOnHover={true} gradient={false}>
              <div className="flex py-10">
                {testimonialData && testimonialData.map((item, ind) => (
                  <div
                    key={ind}
                    className="flex flex-col justify-center px-10 mx-6 my-10 rounded-[3rem] w-[450px] bg-white/5 border border-white/5 transition-all duration-500 hover:border-custom-yellow/50 hover:bg-white/10 group shadow-2xl relative"
                  >
                    {/* Profile Image with Ring */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 p-1 bg-[#0a0a0a] rounded-full">
                      <img
                        className="w-20 h-20 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-white/10 group-hover:border-custom-yellow"
                        src={item?.image}
                        alt={item?.name}
                      />
                    </div>

                    <div className="pt-12 pb-8 text-center">
                      <div className="mb-6 flex justify-center">
                        <FaQuoteLeft className="text-red-600/30 text-3xl group-hover:text-red-600 transition-colors duration-500" />
                      </div>
                      
                      <p className="text-gray-300 text-lg font-medium leading-relaxed italic mb-8 px-4">
                        {item?.comment.length > maxLength
                          ? `${item?.comment.slice(0, maxLength)}...`
                          : item?.comment}
                      </p>

                      <div className="space-y-1">
                        <h4 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-custom-yellow transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-red-600 font-bold uppercase text-[10px] tracking-[0.2em]">
                          {item?.title || "Member"}
                        </p>
                      </div>
                    </div>

                    {/* Decorative Background Icon */}
                    <div className="absolute bottom-6 right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                        <FaQuoteRight className="text-8xl text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </Marquee>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
