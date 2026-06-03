
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
        <section className="relative bg-black overflow-hidden z-0">
            {/* Background Image with subtle zoom effect */}
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-60 z-[-1] transition-transform duration-[10000ms] hover:scale-110" 
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1612090295965-e506249ccecc?q=80&w=1524&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}
            ></div>
            
            {/* Refined Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 z-[-1]"></div>

            <div className="mx-auto w-[90%] container py-24 md:py-64 text-center relative z-10">
                <div className="max-w-5xl mx-auto">
                    <p className="text-2xl md:text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-12 uppercase tracking-tight">
                        Welcome to Multigym Premium where your <span className="text-custom-yellow">transformation</span> is our mission.
                    </p>
                    
                    <div className="flex justify-center">
                        <div className="flex flex-col sm:flex-row items-center gap-6 group cursor-pointer" onClick={toggleModal}>
                            <div className='bg-custom-yellow p-5 md:p-7 rounded-full shadow-[0_0_50px_rgba(244,203,113,0.3)] transition-all duration-500 group-hover:scale-110 relative'>
                                <div className="absolute inset-0 rounded-full bg-custom-yellow animate-ping opacity-20"></div>
                                <FaPlay className='text-2xl text-black relative z-10' />
                            </div>
                            <div className="text-left">
                                <p className="text-2xl md:text-3xl text-white font-bold tracking-tight group-hover:text-custom-yellow transition-colors">Know more about us</p>
                                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Join Us for a Healthier, Stronger You</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed z-[100] inset-0 overflow-y-auto flex justify-center items-center bg-black/90 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                        <div className="aspect-video">
                            <iframe className="w-full h-full" src="https://www.youtube.com/embed/O9xPyY8LC2M?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                        <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-custom-yellow transition-colors" onClick={toggleModal}>
                            <GrClose className='text-lg' />
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}

export default AboutHero