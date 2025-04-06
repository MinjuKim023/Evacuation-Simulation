import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

const LiveViewDetail = ({ agentMatch, currentLocation, index }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(`/${currentLocation}`); // 또는 navigate(-1) 도 가능
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {agentMatch ? (
        <motion.div
          className="live-view-detail"
          layoutId={`view-${index}`}
          onClick={handleClose}
        >
          <div className="live-view-detail-container">
            <p>{currentLocation + index}</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LiveViewDetail;
