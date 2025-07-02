import React from "react";
import {
  FaPaintBrush,
  FaEraser,
  FaRegSquare,
  FaRegCircle,
  FaHandPaper,
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
    "
    >
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
            p-3 rounded-full
            ${
              tool === "brush"
                ? "bg-blue-300 text-blue-900"
                : "bg-blue-700 text-white hover:bg-blue-600"
            }
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-300
          `}
          title="Brush"
        >
          <FaPaintBrush size={20} />
        </button>

        <button
          onClick={() => setTool("eraser")}
          className={`
            p-3 rounded-full
            ${
              tool === "eraser"
                ? "bg-blue-300 text-blue-900"
                : "bg-blue-700 text-white hover:bg-blue-600"
            }
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-300
          `}
          title="Eraser"
        >
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
          `}
          title="Rectangle"
        >
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
          `}
          title="Circle"
        >
          <FaRegCircle size={20} />
        </button>

        {/* <button
          onClick={() => setTool("pan")}
          className={`
            p-3 rounded-full
            ${
              tool === "pan"
                ? "bg-blue-300 text-blue-900"
                : "bg-blue-700 text-white hover:bg-blue-600"
            }
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-300
          `}
          title="Pan">
          <FaHandPaper size={20} />
        </button> */}
      </div>

      <div className="flex items-center space-x-2">
        <label
          htmlFor="color-select"
          className="
          text-white
          font-semibold
          text-lg
        "
        >
          Color:
        </label>
        <input
          type="color"
          id="color-select"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="
            w-10 h-10
            cursor-pointer
            overflow-hidden 
          "
        />
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onClear}
          className="
        bg-red-500
        hover:bg-red-600
        text-white
        font-bold
        py-2 px-4
        rounded-md
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-red-300
      "
        >
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
          "
        >
          Explain with AI
        </button>
      </div>
    </div>
  );
};

export default Toolbox;
