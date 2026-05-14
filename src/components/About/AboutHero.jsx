
import about from "../../assets/img/about/about.png"
import { FaPlay } from "react-icons/fa";
import { useState } from 'react';
import { GrClose } from "react-icons/gr";
import aboutImage from "../../../public/about.png"
function AboutHero() {
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    };
    return (
        <section className="relative bg-slate-50 bg-cover z-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1612090295965-e506249ccecc?q=80&w=1524&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
            <div className="h-full absolute opacity-60 -z-10 w-full bg-black"></div>
            <div className="mx-auto w-[90%] container py-16 md:py-64 text-center">
                <div className="mx-auto w-[90%]">
                    <p className="md:text-xl lg:text-5xl poppins   font-semibold text-white">Welcome to Multigym Premium  where your <span className="text-[#f4cb71]">transformation </span>
                        is our mission.
                    </p>,
                    <div className="flex justify-center">
                        <div className="max-w-md flex flex-col sm:flex-row items-center sm:justify-start sm:space-x-6">
                            <div className=' bg-[#f4cb71] animate-bounce cursor-pointer p-2 md:p-4 flex items-center rounded-full'>
                                <FaPlay className='md:text-2xl text-black' onClick={toggleModal} />
                            </div>
                            <div className="">
                                <div>
                                    <p className="md:text-3xl text-gray-300 font-bold">Know more about us</p>
                                    <span className="text-sm font-medium text-white">Join Us for a Healthier, Stronger You </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            {showModal && (
                <div className="fixed z-50 inset-0 overflow-y-auto flex justify-center items-center bg-black bg-opacity-50">
                    <div className="relative max-w-3xl mx-auto">
                        <div className="relative flex items-start rounded-lg overflow-hidden">
                            {/* You can replace the iframe with the embed code for your video */}
                            <iframe className="w-full aspect-video md:w-[560px]" src="https://www.youtube.com/embed/O9xPyY8LC2M" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            <button className="mb-4 mx-2 rounded-full p-1 bg-white text-black" onClick={toggleModal}>
                                <GrClose className='text-sm' />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default AboutHero