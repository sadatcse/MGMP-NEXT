import React from 'react';
import abulkalamazad from "./../../assets/img/about/abul-kalam-azad.png";
import sign from "./../../assets/img/about/sign.png";

const MessageFromChairman = () => {
  return (
    <div>
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between pt-9">
        <img src={abulkalamazad.src} alt="Chairman" className="lg:h-[700px] w-auto" />
        <div className="flex flex-col md:mr-6 justify-center my-7">
          <p className="text-4xl font-bold mb-2 text-white">Message from the Chairman</p>
          <p className="text-3xl font-semibold">Dear Members and Visitors,</p>
          <br />
          <p>
            Welcome to Multigym Premium! As the chairman, I am delighted to see our gym thriving and making a positive impact on so many lives. Our goal has always been to create a space where individuals can come together to improve their health, push their limits, and build a sense of community.
          </p>
          <p>
            We understand that each member has unique fitness goals, and our team is dedicated to providing the support and resources needed to achieve them. From our state-of-the-art equipment to our diverse class offerings, we strive to offer the best possible fitness experience.
          </p>
          <p>
            Our commitment to excellence extends beyond just fitness. We aim to foster a welcoming and inclusive environment where everyone feels valued and motivated. We are continually working to enhance our facilities and services to ensure that Multigym Premium remains your preferred fitness destination.
          </p>
          <p>
            Thank you for being a part of our community. Together, we can achieve great things and lead healthier, happier lives.
          </p>
          <p className="text-2xl mt-4">
            Warm regards,<br />
            <img className="h-16 w-32 my-2" src={sign.src} alt="Signature" />
            <strong>Abul Kalam Azad</strong><br />
            <span className="font-semibold">Chairman, Multigym Premium</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageFromChairman;
