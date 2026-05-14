"use client";
import React, { useState, useEffect } from "react";
import membershipCardFront from "./../../assets/card/1.png";
import membershipCardBack from "./../../assets/card/2.png";
import "./JoinOurGym.css";
import Link from "next/link";

const JoinOurGym = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showFront, setShowFront] = useState(true);

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setShowPopup(true);
    }, 10000);

    const hideTimeout = setTimeout(() => {
      setShowPopup(false);
    }, 200000);

    const animationDuration = 2500;
    const imageToggleInterval = setInterval(() => {
      setShowFront((prev) => !prev);
    }, animationDuration);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
      clearInterval(imageToggleInterval);
    };
  }, []);

  return (
    <>
      {showPopup && (
        <div
          className="fixed bottom-0 right-0 sm:mb-1 md:mb-5 lg:mb-8 ml-4 z-50 mx-5"
          aria-live="polite"
        >
          <div className="flex items-center justify-center mb-6">
            <Link
              href="/signup"
              className="relative sm:w-20 h-16 mb-5 md:w-32 md:h-32 lg:w-64 lg:h-40"
              style={{ perspective: "700px" }}
            >
              <img
                src={membershipCardBack.src}
                alt="Gym Membership Card"
                className="w-full h-full absolute top-0 left-0 z-[2] animate-rotate-slow-back"
                style={{ backfaceVisibility: "hidden" }}
              />
              <img
                src={membershipCardFront.src}
                alt="Gym Membership Card"
                className="w-full h-full absolute top-0 left-0 z-[1] animate-rotate-slow"
                style={{ backfaceVisibility: "hidden" }}
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default JoinOurGym;
