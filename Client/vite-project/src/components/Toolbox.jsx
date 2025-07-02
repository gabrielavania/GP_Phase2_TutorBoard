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
  return (
    <div className="w-full z-20">
      {/* 🔵 NAVBAR */}
      <div className="bg-blue-800 px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-white text-2xl font-bold">TutorBoard</div>
        <div className="flex items-center gap-4">
          <span className="text-white text-lg font-semibold">
            Room: {roomCode}
          </span>
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

      {/* 🎨 TOOLBAR */}
      <div className="w-full flex justify-center py-6 px-2 mb-4">
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
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200">
              Explain with AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbox;
