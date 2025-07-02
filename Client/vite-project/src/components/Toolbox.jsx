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
        <div className="absolute top-5 left-4 text-white text-2xl font-semibold">
          TutorBoard
        </div>
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
            cursor-pointer
          `}
          title="Brush"
        >
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
          title="Eraser"
        >
          <FaEraser size={20} />
        </button>

        <button
          onClick={() => setTool("rectangle")}
          className={`
            cursor-pointer
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
            cursor-pointer
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
          cursor-pointer
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
          onClick={onExplain}
          className="
          cursor-pointer
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
        <div className="absolute top-2 right-20 text-white text-md font-semibold">
          <div className="flex gap-4">
            <h4 className="text-gray-300">User: </h4>
            <span>{localStorage.getItem("userName") || "Guest"}</span>
          </div>
          <div className="flex gap-2">
            <h4 className="text-gray-300">Room: </h4>
            <span>{roomCode}</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem("userName");
            localStorage.removeItem("roomCode");
            window.location.href = "/";
          }}
          className="fa-solid fa-right-from-bracket absolute top-3.5 right-6 bg-amber-500 text-white font-semibold px-3 py-3 rounded-md shadow-md hover:bg-amber-600 transition-all z-50 cursor-pointer"
        ></button>
      </div>
    </div>
  );
};

export default Toolbox;
