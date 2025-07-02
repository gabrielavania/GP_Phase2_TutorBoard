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
  const socketRef = useRef(null);

  const clearCanvas = () => {
    setCurrentLines([]);

    if (socketRef.current && roomCode) {
      socketRef.current.emit("clear-canvas", roomCode);
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
        roomCode={localStorage.getItem("roomCode")}
      />
      <Whiteboard
        tool={currentTool}
        color={currentColor}
        strokeWidth={currentStrokeWidth}
        lines={currentLines}
        setLines={setCurrentLines}
        socket={socketRef.current}
        roomCode={roomCode}
      />
    </div>
  );
};

export default WhiteboardPage;
