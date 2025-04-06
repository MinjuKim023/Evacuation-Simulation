import React from "react";
import LiveView from "../components/liveView";
import { useParams } from "react-router-dom";
import test_image from "../assets/test-image.png";

const Agents = () => {
  const { agent } = useParams();

  const droneStreams = [
    { id: 1, url: "ws://10.0.0.2:8081/drone1" },
    { id: 2, url: "ws://10.0.0.2:8082/drone2" },
    { id: 3, url: "ws://10.0.0.2:8083/drone3" },
    { id: 4, url: "ws://10.0.0.2:8084/drone4" },
    { id: 5, url: "ws://10.0.0.2:8085/drone5" },
    { id: 6, url: "ws://10.0.0.2:8086/drone6" },
    { id: 7, url: "ws://10.0.0.2:8087/drone7" },
    { id: 8, url: "ws://10.0.0.2:8088/drone8" },
  ];

  return (
    <div className="live-view-parent">
      <LiveView streamList={droneStreams} category={agent} />
    </div>
  );
};

export default Agents;
