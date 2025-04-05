import React from "react";
import Lottie from "react-lottie";
import loadingLottie from "../assets/loading-lottie.json";

const LiveView = ({ imageSrc, category }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingLottie,
  };

  return (
    <div className="live-view">
      <h2>{category} Live Feed</h2>
      {imageSrc ? (
        <img src={imageSrc} alt="Drone View" />
      ) : (
        <Lottie options={defaultOptions} height={200} width={200} />
      )}
    </div>
  );
};

export default LiveView;
