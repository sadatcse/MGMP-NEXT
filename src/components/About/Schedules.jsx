import React from 'react';

const Schedules = () => {
    const rowClass = "border text-center font-normal md:py-6"
    const headClass = "border bg-red-600 text-white  font-semibold text-center md:text-base poppins"
    return (
        <div className='py-16 md:py-24 bg-white'>
            <div className='container mx-auto px-4'>
                <p className='text-4xl md:text-6xl font-black text-center text-custom-yellow mb-12 uppercase tracking-tighter'>Our Schedule</p>
                
                {/* For gentelmen */}
                <section className="max-w-6xl mx-auto mb-20">
                    <div className='mb-6 py-4 bg-red-600 rounded-t-2xl shadow-lg'>
                        <p className='text-center font-black text-white md:text-3xl tracking-widest uppercase'>Hours of Operation</p>
                    </div>
                    <div className="overflow-x-auto rounded-b-2xl border-x border-b border-gray-200 shadow-xl">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="p-5 font-bold text-gray-700 uppercase tracking-wider text-sm border-r border-gray-200">Saturday</th>
                                    <th className="p-5 font-bold text-gray-700 uppercase tracking-wider text-sm border-r border-gray-200">Sunday</th>
                                    <th className="p-5 font-bold text-gray-700 uppercase tracking-wider text-sm border-r border-gray-200">Monday</th>
                                    <th className="p-5 font-bold text-gray-700 uppercase tracking-wider text-sm border-r border-gray-200">Tuesday</th>
                                    <th className="p-5 font-bold text-gray-700 uppercase tracking-wider text-sm border-r border-gray-200">Wednesday</th>
                                    <th className="p-5 font-bold text-gray-700 uppercase tracking-wider text-sm border-r border-gray-200">Thursday</th>
                                    <th className="p-5 font-bold text-gray-700 uppercase tracking-wider text-sm">Friday</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="p-8 text-center text-lg font-medium text-gray-600 border-r border-gray-100 italic">7am - 11pm</td>
                                    <td className="p-8 text-center text-lg font-medium text-gray-600 border-r border-gray-100 italic">7am - 11pm</td>
                                    <td className="p-8 text-center text-lg font-medium text-gray-600 border-r border-gray-100 italic">7am - 11pm</td>
                                    <td className="p-8 text-center text-lg font-medium text-gray-600 border-r border-gray-100 italic">7am - 11pm</td>
                                    <td className="p-8 text-center text-lg font-medium text-gray-600 border-r border-gray-100 italic">7am - 11pm</td>
                                    <td className="p-8 text-center text-lg font-medium text-gray-600 border-r border-gray-100 italic">7am - 11pm</td>
                                    <td className="p-8 text-center text-lg font-bold text-red-600 italic tracking-tight">3:30 - 10:30pm</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* For ladies */}
                <section className="max-w-6xl mx-auto">
                    <p className='text-center text-gray-500 font-bold mb-8 uppercase tracking-widest text-sm opacity-80'>
                        (Except “Ladies Only Hours” all other time will be Co-ed/ Mixed)
                    </p>
                    <div className='mb-6 py-4 bg-neutral-800 rounded-t-2xl shadow-lg'>
                        <p className='text-center font-black text-custom-yellow md:text-3xl tracking-widest uppercase'>Ladies Only Hours</p>
                    </div>
                    <div className="overflow-x-auto rounded-b-2xl border-x border-b border-gray-200 shadow-xl">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="p-5 font-bold text-gray-700 uppercase tracking-wider text-sm border-r border-gray-200">Saturday</th>
                                    <th className="p-5 font-bold text-gray-700 uppercase tracking-wider text-sm border-r border-gray-200">Sunday</th>
                                    <th className="p-5 font-bold text-gray-700 uppercase tracking-wider text-sm border-r border-gray-200">Monday</th>
                                    <th className="p-5 font-bold text-gray-700 uppercase tracking-wider text-sm border-r border-gray-200">Tuesday</th>
                                    <th className="p-5 font-bold text-gray-700 uppercase tracking-wider text-sm border-r border-gray-200">Wednesday</th>
                                    <th className="p-5 font-bold text-gray-700 uppercase tracking-wider text-sm border-r border-gray-200">Thursday</th>
                                    <th className="p-5 font-bold text-gray-700 uppercase tracking-wider text-sm">Friday</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="p-8 text-center text-lg font-medium text-gray-600 border-r border-gray-100 italic">10am - 1pm</td>
                                    <td className="p-8 text-center text-lg font-medium text-gray-600 border-r border-gray-100 italic">10am - 1pm</td>
                                    <td className="p-8 text-center text-lg font-medium text-gray-600 border-r border-gray-100 italic">10am - 1pm</td>
                                    <td className="p-8 text-center text-lg font-medium text-gray-600 border-r border-gray-100 italic">10am - 1pm</td>
                                    <td className="p-8 text-center text-lg font-medium text-gray-600 border-r border-gray-100 italic">10am - 1pm</td>
                                    <td className="p-8 text-center text-lg font-medium text-gray-600 border-r border-gray-100 italic">10am - 1pm</td>
                                    <td className="p-8 text-center text-lg font-bold text-red-600 italic tracking-tight">Closed</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Schedules;