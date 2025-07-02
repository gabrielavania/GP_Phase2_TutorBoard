import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

const JoinRoom = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const handleJoin = () => {
    if (!code.trim()) return;
    navigate(`/room/${code}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-2xl">Hallo, {userName}!</h2>
      <input
        className="border p-2 rounded"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter the room code"
      />
      <button
        onClick={handleJoin}
        className="bg-blue-500 px-4 py-2 text-white rounded"
      >
        Join
      </button>
    </div>
  );
};

export default JoinRoom;
