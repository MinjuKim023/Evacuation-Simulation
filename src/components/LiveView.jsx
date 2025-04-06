import React, { useEffect, useState, useRef } from "react";
import Lottie from "react-lottie";
import loadingLottie from "../assets/loading-lottie.json";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LiveViewDetail from "./LiveViewDetail";

const LiveView = ({ streamList, category }) => {
  const [imageSrcs, setImageSrcs] = useState(
    Array(streamList.length).fill(null)
  );

  const [index, setIndex] = useState();
  const [currentStreamUrl, setCurrentStreamUrl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const currentLocation = location.pathname.split("/")[1];

  const isCarAi = streamList.length === 1;

  const socketsRef = useRef([]);

  const agentMatch = useMatch(`/${currentLocation}/:id`);

  const onViewClicked = (i, src) => {
    setIndex(i);
    setCurrentStreamUrl(streamList[i].url);
    navigate(`/${currentLocation}/${i}`);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingLottie,
  };

  useEffect(() => {
    const newSockets = streamList.map((stream, i) => {
      const socket = new WebSocket(stream.url);

      socket.binaryType = "arraybuffer";

      socket.onmessage = (event) => {
        const blob = new Blob([event.data], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);

        setImageSrcs((prev) => {
          if (prev[i]) URL.revokeObjectURL(prev[i]); // 메모리 해제
          const updated = [...prev];
          updated[i] = imageUrl;
          return updated;
        });
      };

      socket.onerror = (err) => {
        console.error(`WebSocket error on ${stream.url}`, err);
      };

      socket.onclose = () => {
        console.log(`WebSocket closed for ${stream.url}`);
      };

      return socket;
    });

    socketsRef.current = newSockets;

    return () => {
      socketsRef.current.forEach((sock) => sock.close());
      imageSrcs.forEach((url) => url && URL.revokeObjectURL(url));
    };
  }, [streamList]);

  return (
    <div className="live-view">
      <h2>
        {category} Live Feed{" "}
        {imageSrcs.some(Boolean) ? <span className="record-dot"></span> : null}
      </h2>
      {imageSrcs.some(Boolean) ? (
        <div className="live-view-container">
          <motion.div
            className={` ${
              isCarAi
                ? "live-view-container-car-images"
                : "live-view-container-images"
            }`}
          >
            {imageSrcs.map((src, i) => (
              <motion.div
                className="view-box"
                onClick={() => onViewClicked(i, src)}
                layoutId={`view-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                key={i}
              >
                {src ? (
                  <img src={src} alt={`Drone View ${i + 1}`} />
                ) : (
                  <Lottie options={defaultOptions} height={100} width={100} />
                )}
              </motion.div>
            ))}
          </motion.div>

          {!isCarAi ? (
            <LiveViewDetail
              agentMatch={agentMatch}
              currentLocation={currentLocation}
              currentStreamUrl={currentStreamUrl}
              index={index}
            />
          ) : null}
        </div>
      ) : (
        <Lottie options={defaultOptions} height={200} width={200} />
      )}
    </div>
  );
};

export default LiveView;
