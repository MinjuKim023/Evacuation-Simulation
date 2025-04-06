import React from "react";
import LiveView from "../components/liveView";
import { useParams } from "react-router-dom";
import test_image from "../assets/test-image.png";

const Agents = () => {
  const { agent } = useParams();

  return (
    <div className="live-view-parent">
      <LiveView imageSrc={test_image} category={agent} />
    </div>
  );
};

export default Agents;
