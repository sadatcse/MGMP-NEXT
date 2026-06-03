import React from 'react';
import abulkalamazad from "./../../assets/img/about/abul-kalam-azad.png";
import sign from "./../../assets/img/about/sign.png";

const MessageFromChairman = () => {
  return (
    <div className="bg-[#0a0a0a] py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="w-full lg:w-[45%] relative group">
          <div className="absolute -inset-2 bg-custom-yellow/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <img 
            src={abulkalamazad.src} 
            alt="Chairman" 
            className="w-full h-auto object-cover rounded-[2rem] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]" 
          />
        </div>
        
        <div className="w-full lg:w-[50%] flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight uppercase">Message from the <span className="text-custom-yellow">Chairman</span></h2>
            <div className="w-20 h-1.5 bg-red-600 rounded-full"></div>
          </div>
          
          <p className="text-2xl font-bold text-gray-200 mb-6 italic tracking-tight">"Dear Members and Visitors,"</p>
          
          <div className="space-y-5 text-gray-400 text-lg leading-relaxed font-medium">
            <p>
              Welcome to Multigym Premium! As the chairman, I am delighted to see our gym thriving and making a positive impact on so many lives. Our goal has always been to create a space where individuals can come together to improve their health, push their limits, and build a sense of community.
            </p>
            <p>
              We understand that each member has unique fitness goals, and our team is dedicated to providing the support and resources needed to achieve them. From our state-of-the-art equipment to our diverse class offerings, we strive to offer the best possible fitness experience.
            </p>
            <p>
              Our commitment to excellence extends beyond just fitness. We aim to foster a welcoming and inclusive environment where everyone feels valued and motivated.
            </p>
          </div>

          <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/5 inline-block self-start shadow-xl">
            <p className="text-gray-300 font-semibold mb-2">Warm regards,</p>
            <img className="h-14 w-auto mb-3 invert brightness-200" src={sign.src} alt="Signature" />
            <div>
              <p className="text-xl font-bold text-white tracking-tight">Abul Kalam Azad</p>
              <p className="text-custom-yellow font-bold text-xs uppercase tracking-[0.2em]">Chairman, Multigym Premium</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageFromChairman;
