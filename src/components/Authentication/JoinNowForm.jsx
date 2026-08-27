"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import axios from 'axios';
import {
  FaUser,
  FaRulerVertical,
  FaWeight,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaDumbbell,
  FaCheckCircle
} from 'react-icons/fa';

// Validation Schema using Yup matching exact prompt requirements
const validationSchema = yup.object().shape({
  full_name: yup
    .string()
    .required('Full Name is required')
    .min(3, 'Full Name must be at least 3 characters'),
  feet: yup
    .string()
    .required('Height (feet) is required'),
  inch: yup
    .string()
    .required('Height (inch) is required'),
  weight: yup
    .string()
    .required('Weight is required'),
  age: yup
    .string()
    .required('Age is required'),
  address: yup
    .string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  telephone_number: yup
    .string()
    .required('Mobile Number is required')
    .matches(/^[0-9+\-\s()]{7,15}$/, 'Enter a valid mobile number (7-15 digits)'),
  selected_package: yup
    .string()
    .required('Please select a Single Membership Plan'),
});

const feetOptions = ['3 feet', '4 feet', '5 feet', '6 feet', '7 feet'];
const inchOptions = Array.from({ length: 12 }, (_, i) => `${i} inch`);
const ageOptions = Array.from({ length: 70 }, (_, i) => i + 12); // 12 to 81

// Single Membership Plans ONLY
const singleMembershipPlans = [
  { id: 'adm_reg', name: 'Admission Fee + Regular Monthly Fee', price: 'BDT 6,000', note: 'Admission Fee (BDT 3,500) + Regular Monthly Fee (BDT 2,500)', tag: 'STANDARD' },
  { id: 'day', name: 'Daily (No Admission)', price: 'BDT 600', note: 'Single Day Pass' },
  { id: 'week', name: 'Weekly (No Admission)', price: 'BDT 2,000', note: 'Save BDT 500', tag: 'PROMO' },
  { id: 'month', name: 'Monthly (No Admission)', price: 'BDT 5,000', note: 'Save BDT 1,000', tag: 'POPULAR' },
  { id: '3month', name: '3 Months (No Admission)', price: 'BDT 9,000', note: 'Quarterly Package' },
  { id: '6month', name: '6 Months (No Admission)', price: 'BDT 16,000', note: 'Half-Yearly Package' },
  { id: '1year', name: '1 Year (No Admission)', price: 'BDT 28,000', note: 'Annual Best Value', tag: 'BEST VALUE' },
];

const JoinNowForm = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      full_name: '',
      feet: '',
      inch: '',
      weight: '',
      age: '',
      address: '',
      email: '',
      telephone_number: '',
      selected_package: 'Admission Fee + Regular Monthly Fee',
    }
  });

  useEffect(() => {
    const pkg = searchParams?.get('package');
    const plan = searchParams?.get('plan');

    if (pkg) {
      const matched = singleMembershipPlans.find(
        (p) => p.id === pkg || p.name.toLowerCase().includes(pkg.toLowerCase())
      );
      if (matched) {
        setValue('selected_package', matched.name, { shouldValidate: true });
        const el = document.getElementById('package-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (plan) {
      const matched = singleMembershipPlans.find(
        (p) => p.name.toLowerCase() === plan.toLowerCase() || p.name.toLowerCase().includes(plan.toLowerCase())
      );
      if (matched) {
        setValue('selected_package', matched.name, { shouldValidate: true });
      }
    }
  }, [searchParams, setValue]);

  const selectedPackageName = watch('selected_package');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const selectedPlanObj = singleMembershipPlans.find(p => p.name === data.selected_package) || singleMembershipPlans[4];
    const combinedHeight = `${data.feet} ${data.inch}`;

    const payload = {
      full_name: data.full_name,
      feet: data.feet,
      inch: data.inch,
      height: combinedHeight,
      weight: data.weight,
      age: data.age,
      address: data.address,
      email: data.email,
      telephone_number: data.telephone_number,
      package_name: selectedPlanObj.name,
      package_price: selectedPlanObj.price,
      package_note: selectedPlanObj.note || selectedPlanObj.tag || '',
    };

    try {
      // 1. Post to MongoDB API route
      const res = await axios.post('/api/join', payload);

      // 2. Also send to fallback endpoint if online
      try {
        await axios.post('https://multigym-management-server-dmmji.ondigitalocean.app/api/users/signup', {
          ...payload,
          contact_no: data.telephone_number,
        });
      } catch (err) {
        console.warn("Secondary server sync note:", err?.message || err);
      }

      await Swal.fire({
        icon: 'success',
        title: 'Application Submitted!',
        html: `Thank you <b>${data.full_name}</b>!<br><br>Your application for <b>${selectedPlanObj.name} (${selectedPlanObj.price})</b> has been submitted successfully.<br><br><div style="margin-top: 10px; padding: 12px; background: rgba(244, 203, 113, 0.1); border: 1px solid #f4cb71; border-radius: 12px; color: #f4cb71; font-weight: bold; font-size: 14px;">Please contact our branch, pay your fees, and collect your gym membership card.</div>`,
        confirmButtonText: 'OK',
        confirmButtonColor: '#dc2626',
        background: '#111111',
        color: '#ffffff',
      });

      reset();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Submission error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Error',
        text: error.response?.data?.message || 'Something went wrong while saving to database. Please try again.',
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
        <FaDumbbell className="text-red-500 text-3xl animate-pulse" />
        <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
          JOIN <span className="text-custom-yellow">MULTIGYM</span> PREMIUM
        </h2>
      </div>
      <p className="text-xs sm:text-sm text-gray-400 text-center -mt-4 mb-8">
        Step 1: Fill out your details &nbsp;|&nbsp; Step 2: Select your Single Membership Package
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* STEP 1: PERSONAL INFORMATION */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-7 md:p-8 space-y-6">
          <h3 className="text-sm sm:text-base font-black uppercase tracking-widest text-custom-yellow border-b border-white/10 pb-3 flex items-center gap-2">
            <span>1. Personal Details</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Full Name */}
            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaUser />
                </div>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  {...register('full_name')}
                  className={`w-full pl-10 pr-4 py-3 bg-zinc-900/90 border ${errors.full_name ? 'border-red-500' : 'border-zinc-700 focus:border-custom-yellow'
                    } rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-custom-yellow transition-all`}
                />
              </div>
              {errors.full_name && (
                <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register('email')}
                  className={`w-full pl-10 pr-4 py-3 bg-zinc-900/90 border ${errors.email ? 'border-red-500' : 'border-zinc-700 focus:border-custom-yellow'
                    } rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-custom-yellow transition-all`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaPhoneAlt />
                </div>
                <input
                  type="tel"
                  placeholder="e.g. 01700000000"
                  {...register('telephone_number')}
                  className={`w-full pl-10 pr-4 py-3 bg-zinc-900/90 border ${errors.telephone_number ? 'border-red-500' : 'border-zinc-700 focus:border-custom-yellow'
                    } rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-custom-yellow transition-all`}
                />
              </div>
              {errors.telephone_number && (
                <p className="text-red-500 text-xs mt-1">{errors.telephone_number.message}</p>
              )}
            </div>

            {/* Height (Feet & Inch Dropdowns) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                Height <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Feet Dropdown */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaRulerVertical />
                  </div>
                  <select
                    {...register('feet')}
                    className={`w-full pl-10 pr-4 py-3 bg-zinc-900/90 border ${errors.feet ? 'border-red-500' : 'border-zinc-700 focus:border-custom-yellow'
                      } rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-custom-yellow transition-all appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>Select Feet</option>
                    {feetOptions.map((option) => (
                      <option key={option} value={option} className="bg-zinc-900 text-white">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Inch Dropdown */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaRulerVertical />
                  </div>
                  <select
                    {...register('inch')}
                    className={`w-full pl-10 pr-4 py-3 bg-zinc-900/90 border ${errors.inch ? 'border-red-500' : 'border-zinc-700 focus:border-custom-yellow'
                      } rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-custom-yellow transition-all appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>Select Inch</option>
                    {inchOptions.map((option) => (
                      <option key={option} value={option} className="bg-zinc-900 text-white">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {(errors.feet || errors.inch) && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.feet?.message || errors.inch?.message}
                </p>
              )}
            </div>

            {/* Weight */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                Weight <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaWeight />
                </div>
                <input
                  type="text"
                  placeholder="e.g. 70 kg"
                  {...register('weight')}
                  className={`w-full pl-10 pr-4 py-3 bg-zinc-900/90 border ${errors.weight ? 'border-red-500' : 'border-zinc-700 focus:border-custom-yellow'
                    } rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-custom-yellow transition-all`}
                />
              </div>
              {errors.weight && (
                <p className="text-red-500 text-xs mt-1">{errors.weight.message}</p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                Age <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaCalendarAlt />
                </div>
                <select
                  {...register('age')}
                  className={`w-full pl-10 pr-4 py-3 bg-zinc-900/90 border ${errors.age ? 'border-red-500' : 'border-zinc-700 focus:border-custom-yellow'
                    } rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-custom-yellow transition-all appearance-none cursor-pointer`}
                >
                  <option value="" disabled>Select Age</option>
                  {ageOptions.map((ageVal) => (
                    <option key={ageVal} value={`${ageVal} years`} className="bg-zinc-900 text-white">
                      {ageVal} years old
                    </option>
                  ))}
                </select>
              </div>
              {errors.age && (
                <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>
              )}
            </div>

            {/* Address */}
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 flex items-center pointer-events-none text-gray-400">
                  <FaMapMarkerAlt />
                </div>
                <textarea
                  rows={2}
                  placeholder="e.g. House #12, Road #4, Dhanmondi, Dhaka"
                  {...register('address')}
                  className={`w-full pl-10 pr-4 py-3 bg-zinc-900/90 border ${errors.address ? 'border-red-500' : 'border-zinc-700 focus:border-custom-yellow'
                    } rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-custom-yellow transition-all resize-none`}
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* STEP 2: SINGLE MEMBERSHIP PLANS SELECTION */}
        <div id="package-section" className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-7 md:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-3 gap-2">
            <h3 className="text-sm sm:text-base font-black uppercase tracking-widest text-custom-yellow flex items-center gap-2">
              <span>2. Select Single Membership Plan</span>
            </h3>
            <span className="text-xs text-red-500 font-bold uppercase tracking-wider">
              Single Membership Only
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {singleMembershipPlans.map((plan) => {
              const isSelected = selectedPackageName === plan.name;
              return (
                <div
                  key={plan.id}
                  onClick={() => setValue('selected_package', plan.name, { shouldValidate: true })}
                  className={`relative cursor-pointer p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between ${isSelected
                      ? 'bg-red-950/40 border-custom-yellow shadow-[0_0_25px_rgba(244,203,113,0.35)] scale-[1.02]'
                      : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/60'
                    }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-extrabold text-white text-sm sm:text-base">
                          {plan.name}
                        </h4>
                        {plan.tag && (
                          <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                            {plan.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{plan.note}</p>
                    </div>

                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${isSelected ? 'border-custom-yellow bg-custom-yellow text-black' : 'border-gray-500'
                      }`}>
                      {isSelected && <FaCheckCircle className="text-sm" />}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Price:</span>
                    <span className="text-base sm:text-lg lg:text-xl font-black text-custom-yellow">{plan.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {errors.selected_package && (
            <p className="text-red-500 text-xs mt-1">{errors.selected_package.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 text-white font-black uppercase tracking-widest bg-gradient-to-r from-red-600 via-red-700 to-red-600 hover:from-red-500 hover:to-red-600 rounded-xl shadow-xl shadow-red-900/40 hover:shadow-red-600/50 transition-all duration-300 focus:outline-none active:scale-[0.99] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-3 text-base sm:text-lg"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'CONFIRM & SUBMIT MEMBERSHIP'
          )}
        </button>
      </form>
    </div>
  );
};

export default JoinNowForm;
