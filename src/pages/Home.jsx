import React, { useEffect, useRef, useState } from "react";
import test_image from "../assets/test-image.png";
import Lottie from "react-lottie";
import loadingLottie from "../assets/loading-lottie.json";

const Home = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const socketRef = useRef(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingLottie,
  };
  useEffect(() => {
    const socket = new WebSocket("ws://10.0.0.2:8080/map");

    socket.binaryType = "arraybuffer";

    socket.onopen = () => {
      console.log("WebSocket connected in liveviewdetail✅");
    };

    socket.onmessage = (event) => {
      const arrayBuffer = event.data;

      const blob = new Blob([arrayBuffer], { type: "image/jpeg" });

      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl);

      setTimeout(() => {
        URL.revokeObjectURL(imageUrl);
      }, 100);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket closed ❌");
    };

    socketRef.current = socket;

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);
  return (
    <div className="home">
      {imageSrc ? (
        <div
          style={{ backgroundImage: `url(${imageSrc})` }}
          alt=""
          className="home-video"
        />
      ) : (
        <Lottie options={defaultOptions} height={200} width={200} />
      )}
    </div>
  );
};

export default Home;
