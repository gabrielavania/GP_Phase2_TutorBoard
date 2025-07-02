import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../Context/User-Context";

const JoinRoom = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const { userName } = useContext(UserContext);

  const handleJoin = () => {
    if (!code.trim()) return;
    localStorage.setItem("roomCode", code);
    navigate(`/room/${code}`);
  };

  return (
    <div className="bg-[url(/BG2.jpg)] bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="bg-white bg-opacity-90 rounded-xl shadow-xl p-10 w-[90%] max-w-md text-center space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Hallo, {userName}!
        </h2>

        <input
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter the room code"
        />

        <button
          onClick={handleJoin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition duration-200 shadow cursor-pointer"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default JoinRoom;
