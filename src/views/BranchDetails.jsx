"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaDirections, FaArrowLeft, FaEnvelope } from "react-icons/fa";
import { fadeIn } from "../../lib/variants";
import { branches } from "../data/branches";

const BranchDetails = ({ branch, image }) => {
  const otherBranch = branches.find((b) => b.slug !== branch.slug);
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    branch.mapEmbedQuery
  )}&output=embed`;

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <Image
          src={image}
          alt={branch.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/60 to-black/30" />

        <div className="relative z-10 h-full container mx-auto px-4 flex flex-col justify-end pb-12">
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
          >
            <span className="inline-block bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-4">
              {branch.tag}
            </span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              {branch.name}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Details */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <Link
          href="/contactus"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-custom-yellow transition-colors mb-10"
        >
          <FaArrowLeft /> Contact Us Page & All Branches
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/20 flex items-center justify-center text-2xl flex-shrink-0">
                <FaMapMarkerAlt />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Branch Details
              </h2>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-custom-yellow font-black uppercase tracking-widest text-xs mb-2">
                  Address
                </p>
                <p className="text-gray-300 text-lg font-medium leading-relaxed">
                  {branch.address}
                </p>
              </div>

              <div>
                <p className="text-custom-yellow font-black uppercase tracking-widest text-xs mb-2">
                  Phone
                </p>
                <a
                  href={`tel:${branch.tel}`}
                  className="text-white text-lg font-black flex items-center gap-3 hover:text-red-500 transition-colors"
                >
                  <FaPhoneAlt className="text-red-600" /> {branch.phone}
                </a>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={branch.mapUrl}
                  target="_blank"
                  className="group relative cursor-pointer overflow-hidden bg-red-600 uppercase px-6 py-3.5 rounded-2xl inline-flex items-center gap-2.5 text-xs sm:text-sm font-black tracking-widest shadow-xl shadow-red-600/20 hover:bg-white hover:text-red-600 transition-all duration-300"
                >
                  <FaDirections /> Get Directions
                </Link>
                <a
                  href={`tel:${branch.tel}`}
                  className="px-6 py-3.5 rounded-2xl inline-flex items-center gap-2.5 text-xs sm:text-sm font-black tracking-widest border-2 border-white/10 hover:border-custom-yellow hover:text-custom-yellow transition-all duration-300"
                >
                  <FaPhoneAlt /> Call Branch
                </a>
                <Link
                  href="/contactus"
                  className="px-6 py-3.5 rounded-2xl inline-flex items-center gap-2.5 text-xs sm:text-sm font-black tracking-widest bg-custom-yellow text-black hover:bg-white hover:text-black transition-all duration-300 shadow-xl shadow-custom-yellow/20"
                >
                  <FaEnvelope /> Contact Us
                </Link>
              </div>

              {otherBranch && (
                <div className="pt-6 border-t border-white/10">
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">
                    Looking for our other location?
                  </p>
                  <Link
                    href={`/branches/${otherBranch.slug}`}
                    className="text-custom-yellow font-black uppercase tracking-wide text-sm hover:text-white transition-colors"
                  >
                    Visit {otherBranch.name} →
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl h-[420px] lg:h-full lg:min-h-[480px]"
          >
            <iframe
              src={embedSrc}
              title={`${branch.name} — Google Map`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BranchDetails;
