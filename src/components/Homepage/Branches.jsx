"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaBuilding } from "react-icons/fa";
import { fadeIn } from "../../../lib/variants";
import Title from "./Title";
import { branches } from "../../data/branches";

const Branches = () => {
  return (
    <section className="py-12 bg-[#0a0a0a]" id="branches">
      <div className="container mx-auto px-4">
        <Title title="Find Your Gym" subtitle="Our Branches" />

        <motion.div 
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-3xl mx-auto mt-8"
        >
          {branches.map((branch) => (
            <Link
              key={branch.id}
              href={`/branches/${branch.slug}`}
              className="w-full sm:w-1/2 group relative flex items-center justify-between px-8 py-5 rounded-2xl bg-neutral-900 border border-white/10 hover:border-custom-yellow shadow-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(244,203,113,0.2)] hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-custom-yellow/10 flex items-center justify-center text-custom-yellow group-hover:bg-custom-yellow group-hover:text-black transition-colors duration-300">
                  <FaBuilding className="text-xl" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 block">
                    {branch.tag}
                  </span>
                  <span className="text-lg font-black uppercase tracking-tight text-white group-hover:text-custom-yellow transition-colors">
                    {branch.name}
                  </span>
                </div>
              </div>
              <FaArrowRight className="text-custom-yellow group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0 ml-2" />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Branches;

