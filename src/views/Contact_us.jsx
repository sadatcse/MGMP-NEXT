
import emailjs from '@emailjs/browser';
import React, { useState, useRef } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Link from 'next/link';

import Swal from 'sweetalert2';

const Contact_us = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        zip: "",
        comments: ""
    });

    const form = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log(formData);
        emailjs
          .sendForm(import.meta.env.VITE_service, import.meta.env.VITE_tamplet, form.current, {
            publicKey: import.meta.env.VITE_apiKey,
          })
          .then(
            () => {

              console.log('SUCCESS!');
            },
            (error) => {

              console.log('FAILED...', error.text);
            },
          );
        
       setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            zip: '',
            comments: ''
        });
        Swal.fire({
          title: 'Message Sent!',
          text: 'Thank you for reaching out to us. We will get back to you soon.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      };

    const location1 = "https://www.google.com/maps/place/Multi+Gym+Premium,+Shia+Masjid/@23.7627561,90.3565433,17z/data=!3m1!4b1!4m6!3m5!1s0x3755bf2476ff0fd5:0x55d28ddfdbff1096!8m2!3d23.7627561!4d90.3591182!16s%2Fg%2F11vdqj2fhv?entry=ttu";
    const location2 = "https://www.google.com/maps/place/Multi+Gym+Premium,+Lalmatia+Branch/@23.7583751,90.3683927,17z/data=!3m1!4b1!4m6!3m5!1s0x3755bf213d5bc75f:0xf5a881e8d0507a36!8m2!3d23.7583703!4d90.3732636!16s%2Fg%2F11w3d__h9_?entry=ttu";

    return (
        <div className="text-white relative z-0 bg-cover md:bg-contain" style={{backgroundImage:'url("https://i.pinimg.com/736x/4c/c8/b1/4cc8b1f71fc788aa146a33704bed9cc3.jpg")'}}>
            <div className="absolute w-full h-full opacity-70 bg-black -z-10"></div>
            
            <div className="grid container mx-auto px-4 py-9 grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-10">
                <div className="flex flex-col justify-center">
                    <p className="text-lg md:text-3xl text-center md:text-left font-bold poppins">MULTIGYM PREMIUM DHAKA CITY</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <div className="flex items-center mt-8 mb-3 gap-3">
                                <div>
                                    <FaPhoneAlt />
                                </div>
                                <p className="font-bold text-lg">(+880) 1313-197435</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <FaLocationDot className="mt-1 text-3xl text-red-700" />
                                <div className="flex flex-col gap-5">
                                    <p>24/1,24/2(3rd & 4th floor) , Ring Road , Shia Masjid Mor, Mohammadpur , Dhaka 1207</p>
                                    <Link className="font-bold text-red-600 text-xl" href={location1} target="_blank">GET DIRECTION</Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center mt-8 mb-3 gap-3">
                                <div>
                                    <FaPhoneAlt />
                                </div>
                                <p className="font-bold text-lg">(+880) 1313-197427</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <FaLocationDot className="mt-1 text-3xl md:text-4xl text-red-700" />
                                <div className="flex flex-col gap-5">
                                    <p>Lalmatia Shopping Center (2nd floor), Lalmatia New Coloni Beside of Fire Service & Civil Defence , Dhaka </p>
                                    <Link className="font-bold text-red-600 text-xl" href={location2} target="_blank">GET DIRECTION</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10 md:mt-0">
                    <h1 className="text-xl text-center md:text-left md:text-4xl font-bold">GET IN TOUCH</h1>
                    <p className="mt-6 text-center md:text-left md:text-base font-semibold">
                        Have a comment or general question? Fill out the form below and a member of our <br />team will reach out to you shortly.
                    </p>
                    <form ref={form} onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2 md:gap-5 mt-7">
                            <div className="flex justify-between flex-col md:flex-row gap-2 md:gap-7">
                                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="outline-none text-black rounded w-full border-2 focus:border-b-red-800 p-3 border-b-red-600 shadow" />
                                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="outline-none text-black rounded w-full border-2 focus:border-b-red-800 p-3 border-b-red-600 shadow" />
                            </div>
                            <div className="flex justify-between flex-col md:flex-row gap-2 md:gap-7">
                                <input type="text" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="outline-none text-black rounded w-full border-2 focus:border-b-red-800 p-3 border-b-red-600 shadow" />
                                <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="outline-none text-black rounded w-full border-2 focus:border-b-red-800 p-3 border-b-red-600 shadow" />
                            </div>
                            <input type="text" name="zip" placeholder="Zip/Postal Code" value={formData.zip} onChange={handleChange} className="outline-none text-black rounded w-full border-2 focus:border-b-red-800 p-3 border-b-red-600 shadow" />
                            <textarea name="comments" placeholder="Comments/Questions" value={formData.comments} onChange={handleChange} className="outline-none text-black rounded w-full border-2 focus:border-b-red-800 p-3 border-b-red-600 shadow resize-none h-24"></textarea>
                        </div>
                        <p className="mt-3 text-sm">By clicking SUBMIT below, you agree to the <span className="text-red-600">Privacy Policy</span> and authorize Multi Gym Premium.</p>
                        <button type="submit" className="btn border-none rounded-md mt-4 bg-red-600 text-white text-lg hover:text-red-600 hover:bg-white hover:border-red-600 w-1/3">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact_us;
