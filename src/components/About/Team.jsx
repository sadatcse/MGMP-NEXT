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
    <div className="container mx-auto grid grid-cols-6 mb-12">
      <h1 className="text-4xl font-semibold text-center mb-3 py-4 col-span-full dark:text-white">Meet the team</h1>
      <div className="col-span-full md:col-span-4">
        <div className="w-full text-lg relative z-[1] group overflow-hidden p-8 hidden md:block dark:text-white dark:border text-neutral-800">
          <div className="h-0 group-hover:h-full w-full duration-200 transition-all absolute top-0 left-0 rounded-full scale-150 dark:bg-neutral-800 bg-[#E9F1FA] z-[-1] text-lg showBg"></div>
          <p><b className="text-xl">Name: </b> {teamData[currentTeam]?.full_name}</p>
          <p><b className="text-xl">Title: </b> {teamData[currentTeam]?.position_title}</p>
          <p><b className="text-xl">Description: </b> {teamData[currentTeam]?.bio} </p>
          <div className="absolute top-1/2 right-8 text-xl space-y-3 -translate-y-1/2">
            <a href={`https://instagram.com/${teamData[currentTeam]?.Instagram}`} className="w-8 h-8 flex justify-center items-center rounded-full dark:text-black bg-white"><FaInstagram /></a>
            <a href={`tel:${teamData[currentTeam]?.mobile}`} className="w-8 h-8 flex justify-center items-center rounded-full dark:text-black bg-white"><FaPhone /></a>
            <a href={`https://facebook.com/${teamData[currentTeam]?.facebook}`} className="w-8 h-8 flex justify-center items-center rounded-full dark:text-black bg-white"><FaFacebook /></a>
          </div>
        </div>
        <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 justify-center lg:grid-cols-4 md:max-h-[400px] md:overflow-auto gap-6 bg-white border-b">
          {teamData && teamData.map((member, idx) => (
            <TeamCard key={idx} position={idx} member={member} setCurrentTeam={setCurrentTeam} currentTeam={currentTeam} />
          ))}
        </div>
      </div>
      <div className="col-span-2 hidden md:flex justify-center items-center bg-neutral-800 dark:bg-neutral-800 dark:border dark:border-l-0">
        <img src={teamData[currentTeam]?.image_url} alt="team member image" className="max-h-[500px]" />
      </div>
    </div>
  );
};

export default Team;
