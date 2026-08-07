import React from 'react';
import Spinner from '../src/components/Utility/Spinner';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505]">
      <div className="text-center space-y-4">
        <Spinner />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Loading Multigym...</p>
      </div>
    </div>
  );
}
