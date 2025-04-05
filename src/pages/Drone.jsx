import React, { useEffect, useRef, useState } from "react";
import LiveView from "../components/liveView";

const Drone = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // WebSocket 연결 (친구 노트북의 IP 주소와 포트를 사용)
    const socket = new WebSocket("ws://10.0.0.38:8080/stream"); // ← 이 부분은 너한테 맞게 바꿔줘

    // 바이너리 데이터를 받겠다고 설정
    socket.binaryType = "arraybuffer";

    socket.onopen = () => {
      console.log("WebSocket connected ✅");
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
  }, []);

  return (
    <div className="live-view-parent">
      <LiveView imageSrc={imageSrc} category={"Drone"} />
    </div>
  );
};

export default Drone;
