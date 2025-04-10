// components/Sidebar.js
import React, { useState } from "react";

import {
  FiHome,
  FiMessageSquare,
  FiUsers,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sidebarWidth = isCollapsed ? "w-16" : "w-64";
  const transitionClass = "transition-all duration-300 ease-in-out";

  return (
    <div
      className={`bg-blue-900 text-white flex flex-col h-screen p-4 ${sidebarWidth} ${transitionClass}`}
    >
      <div className="flex items-center justify-between mb-8">
        {!isCollapsed && <h1 className="text-xl font-bold">Conversations</h1>}
        <button
          onClick={toggleCollapse}
          className="text-white hover:text-blue-300 focus:outline-none"
        >
          {isCollapsed ? (
            <FiChevronRight size={20} />
          ) : (
            <FiChevronLeft size={20} />
          )}
        </button>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2 w-fit">
          <li
            className={`hover:bg-blue-800 rounded-md p-2 cursor-pointer ${
              isCollapsed ? "flex justify-center" : "flex items-center"
            }`}
          >
            <FiHome className="inline-block mr-2" size={18} />
            {!isCollapsed && <span>Dashboard</span>}
          </li>
          <li
            className={`hover:bg-blue-800 rounded-md p-2 cursor-pointer ${
              isCollapsed ? "flex justify-center" : "flex items-center"
            }`}
          >
            <FiMessageSquare className="inline-block mr-2" size={18} />
            {!isCollapsed && <span>Conversations</span>}
          </li>
          <li
            className={`hover:bg-blue-800 rounded-md p-2 cursor-pointer ${
              isCollapsed ? "flex justify-center" : "flex items-center"
            }`}
          >
            <FiUsers className="inline-block mr-2" size={18} />
            {!isCollapsed && <span>Customers</span>}
          </li>
          <li
            className={`hover:bg-blue-800 rounded-md p-2 cursor-pointer ${
              isCollapsed ? "flex justify-center" : "flex items-center"
            }`}
          >
            <FiBarChart2 className="inline-block mr-2" size={18} />
            {!isCollapsed && <span>Analytics</span>}
          </li>
        </ul>
      </nav>
      <div
        className={`mt-8 p-2 border-t border-blue-800 ${
          isCollapsed ? "flex justify-center" : "flex items-center"
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full bg-gray-400 mr-2 ${
            isCollapsed ? "mr-0" : ""
          }`}
        ></div>
        {!isCollapsed && <span>Your Name</span>}{" "}
      </div>
    </div>
  );
};

export default Sidebar;
