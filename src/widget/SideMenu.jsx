import React, { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu, GiDeliveryDrone } from "react-icons/gi";
import { LuCarTaxiFront, LuCarFront } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoIosHelpCircle } from "react-icons/io";

import { AnimatePresence, motion } from "framer-motion";

import { Link } from "react-router-dom";

const SideMenu = () => {
  const [menu, setMenu] = useState(false);
  const [information, setInformation] = useState(false);
  const [timer, setTimer] = useState("");
  const handleMenu = () => {
    setMenu((prev) => !prev);
  };

  const mouseEnter = () => {
    setInformation(true);
  };

  const mouseLeave = () => {
    setInformation(false);
  };

  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket("ws://10.0.0.2:8081/time");

    socket.binaryType = "arraybuffer";

    socket.onopen = () => {
      console.log("WebSocket connected in sideMenu");
    };

    socket.onmessage = (event) => {
      const decoder = new TextDecoder("utf-8");
      const timeStr = decoder.decode(event.data); // ✅ 문자열 변환
      setTimer(timeStr); // React가 문제 없이 렌더링함
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
    <nav className="side">
      <div className="side-left">
        <div className="side-left-container">
          <div>
            <GiHamburgerMenu className="icon" onClick={() => handleMenu()} />
          </div>
          <ul>
            <li>
              <Link to={"/"}>
                <FaHome className="icon" />
              </Link>
            </li>
            <li>
              <Link to={"/drone"}>
                <GiDeliveryDrone className="icon" />
              </Link>
            </li>
            <li>
              <Link to={"/car-ai"}>
                <LuCarTaxiFront className="icon" />
              </Link>
            </li>

            <li>
              <Link to={"/description"}>
                <IoIosHelpCircle className="icon" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {menu && (
          <motion.div
            className="side-right"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="side-right-container">
              <div className="title">
                <h1>EvacSim</h1>
                <IoIosInformationCircleOutline
                  className="info-icon"
                  onMouseEnter={() => mouseEnter()}
                  onMouseLeave={() => mouseLeave()}
                />
              </div>
              <h1 className="timer">{timer === "" ? "Loading..." : timer}</h1>
            </div>
            {information && (
              <div className="information">
                <ul>
                  <li>
                    <span>Main Page:</span> Shows the AI-determined shortest
                    path to the nearest exit based on current conditions.
                  </li>
                  <li>
                    <span>Drone Page:</span> Displays live feeds from 8 drones
                    monitoring major roads from above.
                  </li>
                  <li>
                    <span>Car AI Page:</span> Displays camera footage following
                    the AI-driven car along its route.
                  </li>
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default SideMenu;
