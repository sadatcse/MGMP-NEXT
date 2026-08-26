"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FaUser, FaPhoneAlt, FaEnvelope, FaAppleAlt, FaLeaf } from 'react-icons/fa';

const validationSchema = yup.object().shape({
  full_name: yup
    .string()
    .required('Full Name is required')
    .min(2, 'Name must be at least 2 characters'),
  mobile_number: yup
    .string()
    .required('Mobile Number is required')
    .matches(/^[0-9+\-\s()]{7,15}$/, 'Enter a valid mobile number'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
});

const NutritionNowForm = ({ onSuccess, isModal = false, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      full_name: '',
      mobile_number: '',
      email: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post('/api/nutrition', data);

      if (response.data.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Nutrition Request Submitted!',
          html: `Thank you <b>${data.full_name}</b>!<br><br>Our certified nutritionist will contact you at <b>${data.mobile_number}</b> shortly for your personalized meal consultation.`,
          confirmButtonText: 'Great!',
          confirmButtonColor: '#e30613',
          background: '#111111',
          color: '#ffffff',
        });

        reset();
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      }
    } catch (error) {
      console.error('Nutrition request error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: error.response?.data?.message || 'Something went wrong. Please try again.',
        confirmButtonColor: '#dc2626',
        background: '#111111',
        color: '#ffffff',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full text-white">
      <div className="flex items-center justify-center gap-3 mb-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 border border-red-600/30 flex items-center justify-center text-2xl">
          <FaAppleAlt className="animate-bounce" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            NUTRITION <span className="text-custom-yellow">NOW</span>
          </h2>
          <p className="text-xs text-gray-400 font-medium">Personalized Diet & Fitness Meal Consultation</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <FaUser />
            </div>
            <input
              type="text"
              placeholder="e.g. John Doe"
              {...register('full_name')}
              className={`w-full pl-10 pr-4 py-3 bg-zinc-900/90 border ${
                errors.full_name ? 'border-red-500' : 'border-zinc-700 focus:border-custom-yellow'
              } rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-custom-yellow transition-all`}
            />
          </div>
          {errors.full_name && (
            <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <FaPhoneAlt />
            </div>
            <input
              type="tel"
              placeholder="e.g. 01700000000"
              {...register('mobile_number')}
              className={`w-full pl-10 pr-4 py-3 bg-zinc-900/90 border ${
                errors.mobile_number ? 'border-red-500' : 'border-zinc-700 focus:border-custom-yellow'
              } rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-custom-yellow transition-all`}
            />
          </div>
          {errors.mobile_number && (
            <p className="text-red-500 text-xs mt-1">{errors.mobile_number.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <FaEnvelope />
            </div>
            <input
              type="email"
              placeholder="name@example.com"
              {...register('email')}
              className={`w-full pl-10 pr-4 py-3 bg-zinc-900/90 border ${
                errors.email ? 'border-red-500' : 'border-zinc-700 focus:border-custom-yellow'
              } rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-custom-yellow transition-all`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 text-white font-black uppercase tracking-widest bg-gradient-to-r from-red-600 via-red-700 to-red-600 hover:from-red-500 hover:to-red-600 rounded-xl shadow-xl shadow-red-900/40 hover:shadow-red-600/50 transition-all duration-300 focus:outline-none active:scale-[0.99] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base mt-2"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <FaLeaf /> SUBMIT NUTRITION CONSULTATION
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default NutritionNowForm;
