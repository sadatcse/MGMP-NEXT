"use client";
import React, { useContext, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";
import { FiLock, FiMail, FiArrowRight } from "react-icons/fi";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from "./../providers/AuthProvider";
import { motion } from "framer-motion";

const WebLogin = () => {
  const { signIn } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const MySwal = withReactContent(Swal);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signIn(email, password)
      .then((result) => {
        setIsLoading(false);
        MySwal.fire({
          icon: "success",
          title: "Login successful!",
          showConfirmButton: false,
          timer: 1500,
          background: "#1f2937",
          color: "#fff",
        });
        e.target.reset();
        router.push(pathname?.state?.from || "/dashboard");
      })
      .catch((error) => {
        setIsLoading(false);
        MySwal.fire({
          icon: "error",
          title: "Login failed",
          text: "Please check your Email or Password.",
          background: "#1f2937",
          color: "#fff",
        });
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-custom-yellow/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-custom-yellow/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl w-full max-w-lg mx-4"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-extrabold text-white mb-2 tracking-tight"
          >
            Welcome Back
          </motion.h1>
          <p className="text-gray-400 text-sm">
            Sign in to continue your fitness journey
          </p>
        </div>

        <form onSubmit={handleLogin} className="w-full space-y-5">
          <div className="relative group">
            <label className="text-sm font-semibold text-gray-300 mb-1 block">
              Email Address
            </label>
            <div className="relative flex items-center">
              <FiMail className="absolute left-4 text-gray-400 group-focus-within:text-custom-yellow transition-colors" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-custom-yellow/50 focus:border-transparent transition-all"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="relative group">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-semibold text-gray-300">
                Password
              </label>
            </div>
            <div className="relative flex items-center">
              <FiLock className="absolute left-4 text-gray-400 group-focus-within:text-custom-yellow transition-colors" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-custom-yellow/50 focus:border-transparent transition-all"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-custom-yellow text-custom-black font-bold py-3.5 rounded-xl shadow-lg hover:shadow-custom-yellow/25 hover:brightness-110 transition-all flex items-center justify-center gap-2 group mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
            {!isLoading && <FiArrowRight className="group-hover:translate-x-1 transition-transform" />}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default WebLogin;
