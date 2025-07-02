import React, { useState } from "react";
import Whiteboard from "./components/Whiteboard";
import Toolbox from "./components/Toolbox";

function App() {
  const [currentTool, setCurrentTool] = useState("brush");
  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentStrokeWidth, setCurrentStrokeWidth] = useState(20);
  const [currentLines, setCurrentLines] = useState([]);
  const clearCanvas = () => {
    setCurrentLines([]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Toolbox
        tool={currentTool}
        setTool={setCurrentTool}
        color={currentColor}
        setColor={setCurrentColor}
        strokeWidth={currentStrokeWidth}
        setStrokeWidth={setCurrentStrokeWidth}
        onClear={clearCanvas}
      />
      <Whiteboard
        tool={currentTool}
        color={currentColor}
        strokeWidth={currentStrokeWidth}
        lines={currentLines}
        setLines={setCurrentLines}
      />
    </div>
  );
}

export default App;
