const CouplesMem = () => {
    const rowClass = "border text-center font-normal py-4"
    const headClass = "border bg-gray-600 text-white font-semibold text-center md:text-base poppins"
    return (
        <div className="md:py-16 py-9">
            <div className="container mx-auto px-4">
                {/* heading */}
                <div className='mb-7 py-3 border border-gray-300'>
                    <p className='text-center font-bold text-[#ebc270] md:text-3xl'>COUPLES MEMBERSHIP</p>
                </div>

                {/* table*/}
                <div className="overflow-x-auto shadow">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className={`${headClass}`}>DURATION</th>
                                <th className={`${headClass}`}>PRICE</th>
                                <th className={`${headClass}`}>PERSON</th>
                            </tr>
                        </thead>
                        <tbody className='border'>
                            {/* row 2 */}
                            <tr>
                                <th className={`${rowClass}`}>6 MONTH</th>
                                <th className={`${rowClass}`}>BDT. 30,000</th>
                                <th className={`${rowClass}`}>2 PERSON</th>
                            </tr>
                            {/* row 3 */}
                            <tr>
                            <th className={`${rowClass}`}>6 MONTH</th>
                                <th className={`${rowClass}`}>BDT. 70,000</th>
                                <th className={`${rowClass}`}>5 PERSON</th>
                            </tr>
                            {/* row 4 */}
                            <tr>
                            <th className={`${rowClass}`}>12 MONTH</th>
                                <th className={`${rowClass}`}>BDT. 1,80,000</th>
                                <th className={`${rowClass}`}>7 PERSON</th>
                            </tr>
                            <tr>
                            <th className={`${rowClass}`}>12 MONTH</th>
                                <th className={`${rowClass}`}>BDT. 2,00,000</th>
                                <th className={`${rowClass}`}>9 PERSON</th>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>

                <p className="text-center font-semibold text-lg mt-5 text-gray-600">Note: Prices include VAT</p>
            </div>
        </div>
    );
};

export default CouplesMem;