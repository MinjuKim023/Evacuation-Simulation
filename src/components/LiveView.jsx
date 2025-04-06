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
  const location = useLocation();
  const navigate = useNavigate();
  const currentLocation = location.pathname.split("/")[1];
  const [index, setIndex] = useState();

  const socketsRef = useRef([]);

  const agentMatch = useMatch(`/${currentLocation}/:id`);

  const onViewClicked = (i) => {
    setIndex(i);
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
      <h2>{category} Live Feed</h2>
      {imageSrcs.some(Boolean) ? (
        <div className="live-view-container">
          <motion.div className="live-view-container-images">
            {imageSrcs.map((src, i) => (
              <motion.div
                className="view-box"
                onClick={() => onViewClicked(i)}
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
