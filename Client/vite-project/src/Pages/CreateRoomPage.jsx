import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

const CreateRoom = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const roomCode = Math.random().toString(36).substring(2, 8);
  localStorage.setItem("roomCode", roomCode);

  const handleEnter = () => {
    navigate(`/room/${roomCode}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-2xl">Hallo, {userName}!</h2>
      <p className="text-lg">Your Room Code:</p>
      <div className="font-bold text-xl">{roomCode}</div>
      <button
        onClick={handleEnter}
        className="bg-green-500 px-4 py-2 text-white rounded"
      >
        Enter the room
      </button>
    </div>
  );
};

export default CreateRoom;
