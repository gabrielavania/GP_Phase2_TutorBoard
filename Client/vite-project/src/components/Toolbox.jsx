import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
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
  onExplain,
  strokeWidth,
  setStrokeWidth,
  roomCode,
}) => {
  const DEFAULT_INVALID_COLOR = "#000000";

  useEffect(() => {
    if (color === DEFAULT_INVALID_COLOR) {
      toast.warn(
        "AI can’t explain drawings in black. Please use another color!",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    }
  }, [color]);

  return (
    <div className="w-full z-20">
      {/* NAVBAR */}
      <div className="bg-blue-800 px-6 py-6 flex justify-between items-center shadow-md">
        <div className="text-white text-2xl font-bold">TutorBoard</div>

        {/* User and Room Info */}
        <div className="flex items-center gap-6">
          {/* User Info */}
          <div className="flex items-center gap-1 text-white">
            <span className="text-sm bg-blue-600 px-2 py-1 rounded-md font-semibold">
              User:
            </span>
            <span className="px-0.5 font-semibold text-md">
              {localStorage.getItem("userName") || "Guest"}
            </span>
          </div>

          {/* Room Code */}
          <div className="flex items-center gap-1 text-white">
            <span className="text-sm bg-blue-600 px-2 py-1 rounded-md font-semibold">
              Room:
            </span>
            <span className="font-semibold text-md">{roomCode}</span>
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              localStorage.removeItem("userName");
              localStorage.removeItem("roomCode");
              window.location.href = "/";
            }}
            className="fa-solid fa-right-from-bracket bg-amber-500 text-white font-semibold px-3 py-2 rounded-md shadow-md hover:bg-amber-600 transition-all cursor-pointer"
            title="Logout"></button>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="w-full flex justify-center py-6 px-2 mb-2 mt-4">
        <div className="w-full max-w-4xl bg-blue-700 rounded-xl shadow-md px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Size */}
          <div className="flex items-center gap-2">
            <label className="text-white font-semibold text-lg">Size:</label>
            <input
              type="range"
              min="1"
              max="100"
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
              className="w-32"
            />
          </div>

          {/* Tools */}
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { name: "brush", icon: <FaPaintBrush size={20} /> },
              { name: "eraser", icon: <FaEraser size={20} /> },
              { name: "rectangle", icon: <FaRegSquare size={20} /> },
              { name: "circle", icon: <FaRegCircle size={20} /> },
            ].map(({ name, icon }) => (
              <button
                key={name}
                onClick={() => setTool(name)}
                className={`p-3 rounded-full ${
                  tool === name
                    ? "bg-blue-300 text-blue-900"
                    : "bg-blue-600 text-white hover:bg-blue-500"
                } transition-colors duration-200`}
                title={name.charAt(0).toUpperCase() + name.slice(1)}>
                {icon}
              </button>
            ))}
          </div>

          {/* Color Picker */}
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 cursor-pointer"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onClear}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200">
              Clear Canvas
            </button>

            <button
              onClick={onExplain}
              disabled={color === DEFAULT_INVALID_COLOR}
              className={`${
                color === DEFAULT_INVALID_COLOR
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              } text-white font-bold py-2 px-4 rounded-md transition-colors duration-200`}>
              Explain with AI
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Toolbox;
