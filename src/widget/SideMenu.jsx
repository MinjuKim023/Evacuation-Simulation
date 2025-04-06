import React, { useState } from "react";
import { GiHamburgerMenu, GiDeliveryDrone } from "react-icons/gi";
import { LuCarTaxiFront, LuCarFront } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoIosHelpCircle } from "react-icons/io";

import { AnimatePresence, motion } from "framer-motion";

import { Link } from "react-router-dom";

const SideMenu = () => {
  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    setMenu((prev) => !prev);
  };
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
              <Link to={"/car-person"}>
                <LuCarFront className="icon" />
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
                <h1>MAS</h1>
                <IoIosInformationCircleOutline className="info-icon" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default SideMenu;
