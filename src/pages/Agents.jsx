import React from "react";
import LiveView from "../components/liveView";
import { useParams } from "react-router-dom";
import test_image from "../assets/test-image.png";

const Agents = () => {
  const { agent } = useParams();

  const droneStreams = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    url: `ws://10.0.0.2:8080/drone${i + 1}`,
  }));

  const carAIStreams = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    url: `ws://10.0.0.2:8080/ai${i + 1}`,
  }));

  const selectedStreams =
    agent === "drone" ? droneStreams : agent === "car-ai" ? carAIStreams : [];

  return (
    <div className="live-view-parent">
      <LiveView streamList={selectedStreams} category={agent} />
    </div>
  );
};

export default Agents;
