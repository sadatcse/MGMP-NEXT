"use client";
import React from 'react';
import JoinNowForm from './JoinNowForm';

const Signup = () => {
  return (
    <article
      className="w-full text-white min-h-screen bg-cover bg-center flex items-center justify-center py-12 px-4 relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1526401485004-46910ecc8e51?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/75 z-0" />

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-5xl lg:max-w-6xl bg-zinc-950/90 border border-zinc-800 backdrop-blur-xl rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl my-8">
        <JoinNowForm />
      </div>
    </article>
  );
};

export default Signup;