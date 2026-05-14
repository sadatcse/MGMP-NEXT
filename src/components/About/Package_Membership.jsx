import React from 'react';

const Package_Membership = () => {
    const rowClass = "border text-center font-normal py-4";
    const headClass = "border bg-red-600 text-white font-semibold text-center md:text-base poppins";

    return (
        <div className='md:py-16'>
            <div className='container mx-auto px-4'>
                <p className='md:text-6xl font-extrabold text-center text-[#ebc270] text-xl my-7 md:mb-10'>MEMBERSHIP PLAN</p>

                {/* heading */}
                <div className='mb-7 py-3 border'>
                    <p className='text-center font-bold text-red-600 md:text-3xl'>SINGLE MEMBERSHIP</p>
                </div>

                {/* table*/}
                <div className="overflow-x-auto shadow">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className={`${headClass}`}>DURATION</th>
                                <th className={`${headClass}`}>REGULAR PRICE</th>
                                <th className={`${headClass}`}>PROMO/INTRO PRICE</th>
                            </tr>
                        </thead>
                        <tbody className='border'>
                            {/* Admission Fee */}
                            <tr>
                                <th className={`${rowClass}`}>ADMISSION FEE</th>
                                <th className={`${rowClass}`} colSpan="2">BDT. 3500</th>
                            </tr>
                            {/* Regular Monthly Fee */}
                            <tr>
                                <th className={`${rowClass}`}>REGULAR MONTHLY FEE</th>
                                <th className={`${rowClass}`} colSpan="2">BDT. 2500</th>
                            </tr>
                            {/* row 2 */}
                            <tr>
                                <th className={`${rowClass}`}>DAILY (NO ADMISSION FEES)</th>
                                <th className={`${rowClass}`}>BDT. 600</th>
                                <th className={`${rowClass}`}>BDT. 0 OFF 600</th>
                            </tr>
                            <tr>
                                <th className={`${rowClass}`}>WEEKLY (NO ADMISSION FEES)</th>
                                <th className={`${rowClass}`}>BDT. 2500</th>
                                <th className={`${rowClass}`}>BDT. 500 OFF 2000</th>
                            </tr>
                            {/* row 3 */}
                            <tr>
                                <th className={`${rowClass}`}>MONTHLY (NO ADMISSION FEES)</th>
                                <th className={`${rowClass}`}>BDT. 6000</th>
                                <th className={`${rowClass}`}>BDT. 1K OFF 5000</th>
                            </tr>
                            {/* row 4 */}
                            <tr>
                                <th className={`${rowClass}`}>3 MONTH (NO ADMISSION FEES)</th>
                                <th className={`${rowClass}`}>BDT. 9000</th>
                                <th className={`${rowClass}`}>BDT. 0K OFF 9000</th>
                            </tr>
                            {/* row 5 */}
                            <tr>
                                <th className={`${rowClass}`}>6 MONTH (NO ADMISSION FEES)</th>
                                <th className={`${rowClass}`}>BDT. 16000</th>
                                <th className={`${rowClass}`}>BDT. 0K OFF 16000</th>
                            </tr>
                            {/* row 6 */}
                            <tr>
                                <th className={`${rowClass}`}>1 YEAR (NO ADMISSION FEES)</th>
                                <th className={`${rowClass}`}>BDT. 28000</th>
                                <th className={`${rowClass}`}>BDT. 0K OFF 28000</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Package_Membership;
