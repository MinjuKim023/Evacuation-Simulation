import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const LiveViewDetail = ({
  agentMatch,
  currentLocation,
  index,
  currentStreamUrl,
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(`/${currentLocation}`);
  };

  const socketRef = useRef(null);
  useEffect(() => {
    // WebSocket 연결 (친구 노트북의 IP 주소와 포트를 사용)
    const socket = new WebSocket(currentStreamUrl);

    // 바이너리 데이터를 받겠다고 설정
    socket.binaryType = "arraybuffer";

    socket.onopen = () => {
      // console.log("WebSocket connected in liveviewdetail✅");
    };

    socket.onmessage = (event) => {
      const arrayBuffer = event.data;

      // 이미지로 변환 (예: image/jpeg)
      const blob = new Blob([arrayBuffer], { type: "image/jpeg" });

      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl);

      // 이전 blob URL 해제 (메모리 누수 방지)
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

    // 컴포넌트 언마운트 시 WebSocket 닫기
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [currentStreamUrl]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {agentMatch ? (
        <motion.div
          className="live-view-detail"
          layoutId={`view-${index}`}
          onClick={handleClose}
        >
          <div className="live-view-detail-container">
            <img src={imageSrc} alt="" />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LiveViewDetail;
