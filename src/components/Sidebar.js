import React, { useState } from "react";
import { navigation } from "./navigation";
import { FaAlignJustify, FaAlignRight, FaShirt } from "react-icons/fa";
import logo from "../assets/logo1.png";
export function Sidebar() {
  const [colapsed, setColapsed] = useState(false);
  return (
    <div
      className={`bg-white shadow-xl border-r h-screen border-gray-200 flex flex-col transition-all duration-300 overflow-hidden ${
        colapsed ? "w-24" : "w-72"
      }`}
    >
      {/* Logo + Title */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#8D6E63] rounded-2xl flex items-center justify-center shadow-md">
            <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
          </div>

          {!colapsed && (
            <div className="transition-opacity duration-300">
              <h1 className="text-xl font-bold text-gray-900">Yene Laundry</h1>
              <p className="text-sm text-gray-500 -mt-1">Admin Portal</p>
            </div>
          )}
        </div>

        <button
          onClick={() => setColapsed(!colapsed)}
          className="text-gray-700 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {colapsed ? <FaAlignRight /> : <FaAlignJustify />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-6 pb-6">
        <ul className="space-y-4 text-gray-700">
          {navigation.map((item) => (
            <li
              key={item.key}
              className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 cursor-pointer transition"
            >
              <span className="text-xl">{item.icon}</span>

              {!colapsed && (
                <a
                  href={item.path || "#"}
                  className="font-medium text-gray-800 hover:text-gray-900"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
