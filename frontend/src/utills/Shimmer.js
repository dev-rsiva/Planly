import React from "react";

const Shimmer = () => {
  return (
    // <div>
    //   <div className="h-16 flex justify-evenly">
    //     <div className="w-24 h-6 bg-gray-100 rounded" />
    //     <div className="w-28 h-6 bg-gray-100 rounded" />
    //     <div className="w-20 h-6 bg-gray-100 rounded" />
    //     <div className="w-240 h-6 bg-gray-100 rounded" />
    //   </div>
    // </div>
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="w-full h-16 bg-gray-200 rounded-b-md py-4 mb-4 flex justify-between items-center">
        <div className="flex justify-start items-center px-4">
          <div className="h-8 w-48 mr-16 bg-gray-300 rounded-md"></div>
          <div className="flex justify-between items-center">
            <div className="h-6 w-32 mr-4 bg-gray-300 rounded-md"></div>
            <div className="h-6 w-32 mr-4 bg-gray-300 rounded-md"></div>
            <div className="h-6 w-32 mr-4 bg-gray-300 rounded-md"></div>
            <div className="h-6 w-32 mr-4 bg-gray-300 rounded-md"></div>
          </div>
        </div>
        <div className="w-10 h-10 bg-gray-300 rounded-full py-4 mr-8"></div>
      </div>
      <div className="flex flex-row h-full mb-6 mx-4">
        <div className="w-64 h-full bg-gray-200 rounded-r-md mr-4">
          <div className="flex flex-col space-y-2 p-4">
            <div className="h-6 bg-gray-300 rounded-md"></div>
            <div className="h-6 bg-gray-300 rounded-md"></div>
            <div className="h-6 bg-gray-300 rounded-md"></div>
            <div className="w-[60%] h-6 bg-gray-300 rounded-md"></div>
            <div className="w-[60%] h-6 bg-gray-300 rounded-md"></div>
          </div>
        </div>
        <div className="flex-grow bg-gray-200 rounded-md">
          <div className="grid grid-cols-1 gap-4 p-4">
            <div className="h-6 w-[75%] bg-gray-300 rounded-md"></div>
            <div className="h-6 w-[75%] bg-gray-300 rounded-md"></div>
            <div className="h-6 w-[75%] bg-gray-300 rounded-md"></div>
            <div className="w-[60%] h-6 bg-gray-300 rounded-md"></div>
            <div className="w-[60%] h-6 bg-gray-300 rounded-md"></div>
            <div className="w-[40%] h-6 bg-gray-300 rounded-md"></div>
            <div className="w-[40%] h-6 bg-gray-300 rounded-md"></div>
            <div className="w-[20%] h-6 bg-gray-300 rounded-md"></div>
            <div className="w-[20%] h-6 bg-gray-300 rounded-md"></div>
            {/* <div className="h-20 bg-gray-300 rounded-md"></div>
            <div className="h-20 bg-gray-300 rounded-md"></div>
            <div className="h-20 bg-gray-300 rounded-md"></div>
            <div className="h-20 bg-gray-300 rounded-md"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
