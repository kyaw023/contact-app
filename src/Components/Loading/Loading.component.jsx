import Lottie from "lottie-react";
import React from "react";

const LoadingComponent = ({ data }) => {
  return (
    <div className=" h-screen flex items-center justify-center">
      <div className=" w-[400px] h-[400px] mx-auto">
        <Lottie className="" animationData={data} loop={true} />
      </div>
    </div>
  );
};

export default LoadingComponent;
