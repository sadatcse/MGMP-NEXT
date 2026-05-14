import React from 'react';

const Schedules = () => {
    const rowClass = "border text-center font-normal md:py-6"
    const headClass = "border bg-red-600 text-white  font-semibold text-center md:text-base poppins"
    return (
        <div className='md:py-16 py-5'>
            <div className='mx-auto w-[90%]'>
                <p className='text-2xl md:text-6xl font-extrabold text-center text-[#ebc270] mb-4 md:mb-10'>SCHEDULE</p>
                {/* For gentelmen */}
                <section>
                    {/* heading */}
                    <div className='mb-7 py-3 border'>
                        <p className='text-center font-bold text-red-600 md:text-3xl'>HOURS OF OPERATION</p>
                    </div>
                    {/* table*/}
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className={`${headClass}`}>Saturday</th>
                                    <th className={`${headClass}`}>Sunday</th>
                                    <th className={`${headClass}`}>Monday</th>
                                    <th className={`${headClass}`}>Tuesday</th>
                                    <th className={`${headClass}`}>Wednesday</th>
                                    <th className={`${headClass}`}>Thursday</th>
                                    <th className={`${headClass}`}>Friday</th>

                                </tr>
                            </thead>
                            <tbody className='border'>
                                {/* row 1 */}
                                <tr>
                                    <th className={`${rowClass}`}>7am - 11pm</th>
                                    <th className={`${rowClass}`}>7am - 11pm</th>
                                    <th className={`${rowClass}`}>7am - 11pm</th>
                                    <th className={`${rowClass}`}>7am - 11pm</th>
                                    <th className={`${rowClass}`}>7am - 11pm</th>
                                    <th className={`${rowClass}`}>7am - 11pm</th>
                                    <th className={`${rowClass}`}>3:30 - 10:30pm</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* For ladies */}
                <section className='mt-16'>
                    <p className='text-center font-semibold mb-9'>(EXCEPT “LADIES ONLY HOURS” ALL OTHER TIME WILL BE CO-ED/ MIXED)</p>
                    {/* heading */}
                    <div className='mb-7 py-3 border'>
                        <p className='text-center font-bold text-red-600 md:text-3xl'>LADIES ONLY HOURS</p>
                    </div>
                    {/* table*/}
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className={`${headClass}`}>Saturday</th>
                                    <th className={`${headClass}`}>Sunday</th>
                                    <th className={`${headClass}`}>Monday</th>
                                    <th className={`${headClass}`}>Tuesday</th>
                                    <th className={`${headClass}`}>Wednesday</th>
                                    <th className={`${headClass}`}>Thursday</th>
                                    <th className={`${headClass}`}>Friday</th>

                                </tr>
                            </thead>
                            <tbody className='border'>
                                {/* row 1 */}
                                <tr>
                                    <th className={`${rowClass}`}>7am - 11pm</th>
                                    <th className={`${rowClass}`}>7am - 11pm</th>
                                    <th className={`${rowClass}`}>7am - 11pm</th>
                                    <th className={`${rowClass}`}>7am - 11pm</th>
                                    <th className={`${rowClass}`}>7am - 11pm</th>
                                    <th className={`${rowClass}`}>7am - 11pm</th>
                                    <th className={`${rowClass}`}>Closed</th>
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