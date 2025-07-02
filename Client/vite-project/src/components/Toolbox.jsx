import React from "react";
import {
  FaPaintBrush,
  FaEraser,
  FaRegSquare,
  FaRegCircle,
} from "react-icons/fa";

const Toolbox = ({
  tool,
  setTool,
  color,
  setColor,
  onClear,
  strokeWidth,
  setStrokeWidth,
}) => {
  return (
    <div
      className="
      bg-gradient-to-r from-blue-600 to-blue-800
      p-4
      shadow-lg
      flex
      items-center
      justify-center
      space-x-4
      border-b-2 border-blue-500
      z-20
      flex-wrap
      px-6 py-3
    ">
      <h1 className="text-white font-bold text-2xl absolute left-4">
        TutorBoard
      </h1>
      <div className="flex items-center space-x-2">
        <label className="text-white font-semibold text-lg">Size:</label>
        <input
          type="range"
          min="1"
          max="100"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(Number(e.target.value))}
          className="w-32"
        />
        <button
          onClick={() => setTool("brush")}
          className={`
            cursor-pointer
            p-3 rounded-full
            ${
              tool === "brush"
                ? "bg-blue-300 text-blue-900"
                : "bg-blue-700 text-white hover:bg-blue-600"
            }
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-300
          `}
          title="Brush">
          <FaPaintBrush size={20} />
        </button>

        <button
          onClick={() => setTool("eraser")}
          className={`
            cursor-pointer
            p-3 rounded-full
            ${
              tool === "eraser"
                ? "bg-blue-300 text-blue-900"
                : "bg-blue-700 text-white hover:bg-blue-600"
            }
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-300
          `}
          title="Eraser">
          <FaEraser size={20} />
        </button>

        <button
          onClick={() => setTool("rectangle")}
          className={`
            p-3 rounded-full
            ${
              tool === "rectangle"
                ? "bg-blue-300 text-blue-900"
                : "bg-blue-700 text-white hover:bg-blue-600"
            }
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-300
            cursor-pointer
          `}
          title="Rectangle">
          <FaRegSquare size={20} />
        </button>

        <button
          onClick={() => setTool("circle")}
          className={`
            p-3 rounded-full
            ${
              tool === "circle"
                ? "bg-blue-300 text-blue-900"
                : "bg-blue-700 text-white hover:bg-blue-600"
            }
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-300
            cursor-pointer
          `}
          title="Circle">
          <FaRegCircle size={20} />
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <label
          htmlFor="color-select"
          className="
          text-white
          font-semibold
          text-lg
          cursor-pointer
        ">
          Color:
        </label>
        <input
          type="color"
          id="color-select"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="
            w-10 h-10
            overflow-hidden 
            cursor-pointer
          "
        />
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onClear}
          className="
        bg-amber-500
        hover:bg-amber-600
        text-white
        font-bold
        py-2 px-4
        rounded-md
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-red-300
        cursor-pointer
      ">
          Clear Canvas
        </button>

        <button
          className="
            bg-green-500
            hover:bg-green-600
            text-white
            font-bold
            py-2 px-4
            rounded-md
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-green-300
            cursor-pointer
          ">
          Explain with AI
        </button>

        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem("userName");
            localStorage.removeItem("roomCode");
            window.location.href = "/";
          }}
          className="fa-solid fa-right-from-bracket absolute top-3.5 right-6 bg-red-500 text-white font-semibold px-3 py-3 rounded-md shadow-md hover:bg-red-600 transition-all z-50 cursor-pointer"></button>
      </div>
    </div>
  );
};

export default Toolbox;
