"use client";
import React from 'react';
import Sidebar from '../../src/views/Dashboard/Sidebar';

export default function DashboardLayout({ children }) {
    return (
        <div className="flex">
            <div className='fixed w-[200px] h-full'>
                <Sidebar />
            </div>
            <div className='ml-[200px] flex-1 p-9'>
                {children}
            </div>
        </div>
    );
}
