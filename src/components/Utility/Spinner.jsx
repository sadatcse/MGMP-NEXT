const Spinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="relative w-14 h-14 flex justify-center items-center">
      <div className="absolute inset-0 rounded-full border-4 border-red-600/20"></div>
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-600 border-r-custom-yellow animate-spin"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-custom-yellow animate-ping"></div>
    </div>
  </div>
);

export default Spinner;