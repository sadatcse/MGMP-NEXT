import { useState } from "react";
import axios from "axios";
import { FaFacebook, FaInstagram, FaPhone } from "react-icons/fa";
import TeamCard from "./TeamCard";
import Spinner from "../Utility/Spinner"; 
import useAxiosPublic from "../../Hook/useAxiosPublic";

const Team = () => {
  const [currentTeam, setCurrentTeam] = useState(0);
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const axiosPublic = useAxiosPublic();

  const fetchData = async () => {
    try {
      const res = await axiosPublic.get("/trainer/get-all");
      setTeamData(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false); 
    }
  };


  if (loading) {
    fetchData();
  }

  if (loading) {
    return <Spinner />; 
  }

  return (
    <div className="container mx-auto px-4 mb-24">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">Experts</p>
        <h2 className="text-4xl md:text-5xl font-black dark:text-white uppercase tracking-tight">Meet the <span className="text-custom-yellow">Team</span></h2>
        <div className="w-20 h-1.5 bg-red-600 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Detailed Info Card */}
          <div className="w-full relative z-[1] group overflow-hidden p-10 rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-xl transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-white/5 z-[-2]"></div>
            <div className="h-0 group-hover:h-full w-full duration-500 transition-all absolute top-0 left-0 rounded-full scale-[2] bg-custom-yellow/5 z-[-1]"></div>
            
            <div className="space-y-4 pr-12">
              <div className="space-y-1">
                <p className="text-custom-yellow font-black uppercase tracking-[0.2em] text-sm">Professional Trainer</p>
                <h3 className="text-3xl md:text-4xl font-black dark:text-white tracking-tight uppercase">{teamData[currentTeam]?.full_name}</h3>
              </div>
              
              <div className="w-12 h-1 bg-red-600 rounded-full"></div>
              
              <div className="space-y-3 pt-2">
                <p className="text-lg font-bold dark:text-gray-200 uppercase tracking-wide">{teamData[currentTeam]?.position_title}</p>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium italic">"{teamData[currentTeam]?.bio}"</p>
              </div>
            </div>

            <div className="absolute top-10 right-10 flex flex-col gap-4">
              <a href={`https://instagram.com/${teamData[currentTeam]?.Instagram}`} className="w-10 h-10 flex justify-center items-center rounded-xl bg-white dark:bg-white/10 shadow-lg text-black dark:text-white hover:bg-custom-yellow hover:text-black transition-all duration-300">
                <FaInstagram />
              </a>
              <a href={`tel:${teamData[currentTeam]?.mobile}`} className="w-10 h-10 flex justify-center items-center rounded-xl bg-white dark:bg-white/10 shadow-lg text-black dark:text-white hover:bg-custom-yellow hover:text-black transition-all duration-300">
                <FaPhone />
              </a>
              <a href={`https://facebook.com/${teamData[currentTeam]?.facebook}`} className="w-10 h-10 flex justify-center items-center rounded-xl bg-white dark:bg-white/10 shadow-lg text-black dark:text-white hover:bg-custom-yellow hover:text-black transition-all duration-300">
                <FaFacebook />
              </a>
            </div>
          </div>

          {/* Grid of Team Members */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-2 max-h-[500px] overflow-y-auto custom-scrollbar">
            {teamData && teamData.map((member, idx) => (
              <TeamCard key={idx} position={idx} member={member} setCurrentTeam={setCurrentTeam} currentTeam={currentTeam} />
            ))}
          </div>
        </div>

        {/* Highlight Image */}
        <div className="lg:col-span-2 hidden md:flex flex-col items-center justify-center p-6 bg-neutral-900 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <img 
            src={teamData[currentTeam]?.image_url} 
            alt="team member image" 
            className="w-full h-full object-cover object-top rounded-[2rem] transition-transform duration-700 group-hover:scale-105" 
          />
        </div>
      </div>
    </div>
  );
};

export default Team;
