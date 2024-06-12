import React from "react";
import { ColorRing } from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="mt-8 mb-16">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#FF4500", "#FF6347", "#FF7F50", "#FF8C00", "#FFA07A"]}
        />
        Loading...
      </div>
    </div>
  );
};

export default Loading;
