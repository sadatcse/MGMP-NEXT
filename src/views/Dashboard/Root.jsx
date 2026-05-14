import React from 'react';

import Sidebar from './Sidebar';

const Root_Dashboard = () => {
    return (
        <div className="flex">
            <div className='fixed w-[200px] h-full'>
                <Sidebar />
            </div>
            <div className='ml-[200px] flex-1 p-9'>
                <Outlet />
            </div>
        </div>
    );
};

export default Root_Dashboard;

