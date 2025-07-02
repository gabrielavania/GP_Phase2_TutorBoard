import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import Toolbox from "../components/Toolbox";
import Whiteboard from "../components/Whiteboard";

const socket = io("http://localhost:3000");

const WhiteboardPage = () => {
  const { roomCode } = useParams();
  const userName = localStorage.getItem("userName");
  const [currentTool, setCurrentTool] = useState("brush");
  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentStrokeWidth, setCurrentStrokeWidth] = useState(20);
  const [currentLines, setCurrentLines] = useState([]);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiExplanation, setAiExplanation] = useState("");
  const socketRef = useRef(null);
  const stageRef = useRef(null);

  const clearCanvas = () => {
    setCurrentLines([]);

    if (socketRef.current && roomCode) {
      socketRef.current.emit("clear-canvas", roomCode);
    }
  };

  const handleExplainAI = async () => {
    if (!stageRef.current || !socketRef.current) return;

    const imageBase64 = stageRef.current.toDataURL();
    console.log("Sending image data for AI explanation:", imageBase64);
    try {
      const res = await fetch("http://localhost:3000/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64, roomCode }),
      });

      const data = await res.json();
      console.log("AI Explanation:", data.explanation);
      socketRef.current.emit("ai-result", {
        roomCode,
        explanation: data.explanation,
      });
    } catch (err) {
      console.error("Error explaining whiteboard:", err);
      alert("Failed to explain whiteboard.");
    }
  };

  useEffect(() => {
    socketRef.current = io("http://localhost:3000", {
      withCredentials: true,
    });

    socketRef.current.emit("join-room", { roomCode, userName });

    socketRef.current.on("draw-data", (data) => {
      setCurrentLines((prev) => [...prev, data]);
    });

    socketRef.current.on("clear-canvas", () => {
      setCurrentLines([]);
    });

    socketRef.current.on("ai-result", ({ explanation }) => {
      setAiExplanation(explanation);
      setAiModalOpen(true);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomCode, userName]);

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
        onExplain={handleExplainAI}
      />
      <Whiteboard
        tool={currentTool}
        color={currentColor}
        strokeWidth={currentStrokeWidth}
        lines={currentLines}
        setLines={setCurrentLines}
        stageRef={stageRef}
        socket={socketRef.current}
        roomCode={roomCode}
      />
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              📘 AI Whiteboard Explanation
            </h2>
            <div className="max-h-80 overflow-y-auto text-gray-700 whitespace-pre-line">
              {aiExplanation}
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={() => setAiModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhiteboardPage;
