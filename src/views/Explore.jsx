import React, { useState } from "react";
import Headerpage from "../components/Utility/Headerpage";
import Header from "../assets/img/headerimage/headerimage4.jpg";
import "./explore.css";
import Data from "./../../public/Data.json";

const Explore = () => {
    const [count, setCount] = useState(Data.length);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(0);
    const [exploreContainerVariant, setExploreContainerVariant] = useState(Data);
    
    const handleFilterChange = (category) => {
        setSelectedCategory(category === selectedCategory ? "" : category);
        
      };
    const updateuserData = () => {
        let filteredData = exploreContainerVariant;
        if (selectedCategory !== "") {
          filteredData = exploreContainerVariant.filter(
            (item) => item.category === selectedCategory
          );
        }
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pagedMenus = filteredData.slice(startIndex, endIndex);
        return pagedMenus;
      };
      const numberOfPages = Math.ceil(count / itemsPerPage);


  

  const [selectedCategory, setSelectedCategory] = useState("");


  const filterButtons = [
    { label: "All", category: "" },
    { label: "Cardio Equipment", category: "Cardio Machines" },
    { label: "Strength Training", category: "Strength Training Machines" },
    { label: "Leg Equipment", category: "Leg Machines" },
    { label: "Chest Equipment", category: "Chest Machines" },
    { label: "Biceps and Triceps", category: "Biceps and Triceps Machines" },
    { label: "Back Equipment", category: "Back Machines" },
    { label: "Core Training", category: "Core Training Equipment" },
    
  ];

  return (
    <div>
      
      <Headerpage
        imageUrl={Header}
        title="Explore"
        subtitle="Discover more here. You can find all the tools and resources you need to elevate your fitness journey."
      />
      <div className="container mx-auto px-4">
        <div className="join flex flex-wrap justify-center mb-4 mt-10">
          {filterButtons.map((button, index) => (
            <label key={index} className="mx-2 mb-2">
              <input
                className="join-item btn"
                type="radio"
                name="options"
                aria-label={button.label}
                checked={selectedCategory === button.category}
                onChange={() => handleFilterChange(button.category)}
              />
            </label>
          ))}
        </div>

        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {updateuserData().map((item, index) => (
            <div
              key={index}
              className="card card-compact bg-base-100 shadow-xl relative overflow-hidden "
              style={{ transition: "border-width 0.3s" }}
            >
              <figure>
                <img className="h-96 w-full object-cover" src={item.image} alt={item.name} />
              </figure>
              <div className="card-body box ">
                <h2 className="card-title">{item.name}</h2>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
          ))}
        </div>

        {updateuserData().length >= 12 && (
          <div className='pagination flex flex-wrap items-center justify-center mt-4 space-x-2 sm:space-x-4 p-5'>
            <p className='text-gray-600 mb-2 sm:mb-0 w-full text-center sm:w-auto'>Current Page: {currentPage + 1}</p>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-2 py-1 rounded ${currentPage === 0 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              disabled={currentPage === 0}
            >
              Prev
            </button>
            {[...Array(numberOfPages)].map((_, index) => (
              <button
                onClick={() => setCurrentPage(index)}
                key={index}
                className={`px-2 py-1 rounded ${currentPage === index ? 'bg-yellow-500' : 'bg-gray-300 hover:bg-gray-400'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-2 py-1 rounded ${currentPage === numberOfPages - 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              disabled={currentPage === numberOfPages - 1}
            >
              Next
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Explore;
