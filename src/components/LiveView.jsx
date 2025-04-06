import React, { useState } from "react";
import Lottie from "react-lottie";
import loadingLottie from "../assets/loading-lottie.json";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LiveViewDetail from "./LiveViewDetail";

const LiveView = ({ imageSrc, category }) => {
  const [index, setIndex] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const currentLocation = location.pathname.split("/")[1]; // useState ❌

  const agentMatch = useMatch(`/${currentLocation}/:id`);

  const onViewClicked = (index) => {
    setIndex(index);
    navigate(`/${currentLocation}/${index}`);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingLottie,
  };

  return (
    <div className="live-view">
      <h2>{category} Live Feed</h2>
      {imageSrc ? (
        <div className="live-view-container">
          <motion.div className="live-view-container-images">
            {[...Array(8)].map((_, index) => (
              <motion.div
                className="view-box"
                onClick={() => onViewClicked(index)}
                layoutId={`view-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0 }}
                key={index}
              >
                <img
                  key={index}
                  src={imageSrc}
                  alt={`Drone View ${index + 1}`}
                />
              </motion.div>
            ))}
          </motion.div>
          <LiveViewDetail
            agentMatch={agentMatch}
            currentLocation={currentLocation}
            index={index}
          />
        </div>
      ) : (
        <Lottie options={defaultOptions} height={200} width={200} />
      )}
    </div>
  );
};

export default LiveView;
