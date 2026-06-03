
function TeamCard({ position, member, setCurrentTeam, currentTeam }) {
    const isActive = currentTeam === position;

    return (
        <div 
            onClick={() => setCurrentTeam(position)}
            className={`group relative p-3 rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden border-2
                ${isActive 
                    ? "bg-neutral-900 border-custom-yellow shadow-xl shadow-custom-yellow/10" 
                    : "bg-white dark:bg-neutral-800 border-transparent hover:border-gray-200 dark:hover:border-white/10"
                }`}
        >
            <div className="relative h-24 md:h-28 overflow-hidden rounded-xl">
                <img 
                    src={member.image_url} 
                    alt={member.full_name}
                    className={`w-full h-full object-cover object-top transition-transform duration-700 
                        ${isActive ? "scale-110" : "group-hover:scale-110"}`} 
                />
                {isActive && (
                    <div className="absolute inset-0 bg-custom-yellow/20 backdrop-blur-[2px] transition-opacity duration-500"></div>
                )}
            </div>

            <div className="mt-3 text-center">
                <p className={`text-xs font-black uppercase tracking-widest truncate 
                    ${isActive ? "text-custom-yellow" : "text-gray-900 dark:text-white"}`}>
                    {member.full_name}
                </p>
            </div>

            {/* Mobile View Extra Info (Hidden on desktop as per original design polish) */}
            <div className="md:hidden mt-2 border-t border-gray-100 pt-2 opacity-60">
                 <p className="text-[10px] font-bold uppercase truncate">{member?.position_title}</p>
            </div>
        </div>
    )
}

export default TeamCard