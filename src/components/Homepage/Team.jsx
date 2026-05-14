"use client";
import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaMobileAlt } from 'react-icons/fa';
import Link from 'next/link';
import Title from './Title';
import CustomButton from './CustomButton';
import Spinner from "../Utility/Spinner";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const Team = () => {
  const [trainerData, setTrainerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    let timeoutId;

    const fetchTrainerData = async () => {
      try {
        const response = await axiosPublic.get('/trainer/get-all');
        setTrainerData(response.data);
        setLoading(false);
        clearTimeout(timeoutId); // Clear the timeout if data loads successfully
      } catch (error) {
        console.error('Error fetching trainer data:', error);
        setLoading(false);
      }
    };

    fetchTrainerData();

    // Set a timeout to refetch the data if it doesn't load within 3 seconds
    timeoutId = setTimeout(() => {
      if (loading) {
        fetchTrainerData();
      }
    }, 3000);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [axiosPublic, loading]);

  const sliceText = (text, count) => {
    const words = text.split(' ');
    if (words.length > count) {
      return words.slice(0, count).join(' ') + '...';
    }
    return text;
  };

  const selectedTrainers = trainerData.slice(0, 4);

  return (
    <div className='container mx-auto px-4 py-10 h-full flex flex-col items-center justify-center'>
      <Title title="TEAM MEMBERS" subtitle="TEAM OF EXPERT COACHES" />
      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* trainers grid */}
          <div className='w-full grid gap-14 md:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
            {selectedTrainers.map((trainer) => (
              <div className='flex flex-col items-center text-center' key={trainer._id}>
                {/* image */}
                <div className='relative mx-auto'>
                  <Link href={`/trainers/${trainer.short_name}`}>
                    <img 
                      src={trainer.image_url} 
                      alt={trainer.full_name} 
                      className='rounded-lg bg-gray-50 w-full border h-96' 
                    />
                  </Link>
                </div>
                {/* name */}
                <Link href={`/trainers/${trainer.short_name}`}>
                  <h4 className='h4 mt-1 mb-2'>{trainer.full_name}</h4>
                </Link>
                {/* role */}
                <p className='uppercase text-xs tracking-[3px] mb-2'>Fitness Trainer</p>
                {/* certifications */}
                <p className='mb-5 px-3 mx-auto text-base'>{trainer.certification}</p>
                {/* socials */}
                <div className='flex justify-center gap-5'>
                  {trainer.Instagram && (
                    <a 
                      href={`https://www.instagram.com/${trainer.Instagram}`} 
                      target='_blank' 
                      rel='noopener noreferrer' 
                      className='hover:text-accent transition-all'
                    >
                      <FaInstagram className='text-2xl' />
                    </a>
                  )}
                  {trainer.facebook && (
                    <a 
                      href={`https://www.facebook.com/${trainer.facebook}`} 
                      target='_blank' 
                      rel='noopener noreferrer' 
                      className='hover:text-accent transition-all'
                    >
                      <FaFacebook className='text-2xl' />
                    </a>
                  )}
                  {trainer.mobile && (
                    <a 
                      href={`tel:${trainer.mobile}`} 
                      className='hover:text-accent transition-all'
                    >
                      <FaMobileAlt className='text-2xl' />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* btn */}
          <div className='mt-9'>
            <Link href="/trainers"><CustomButton containerStyles='btn' text='See all trainers' /></Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Team;
