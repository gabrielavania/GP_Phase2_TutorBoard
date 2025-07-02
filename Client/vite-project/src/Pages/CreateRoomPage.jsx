import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../Context/User-Context";

const CreateRoom = () => {
  const navigate = useNavigate();
  const { userName } = useContext(UserContext);

  const roomCode = Math.random().toString(36).substring(2, 8);
  localStorage.setItem("roomCode", roomCode);

  const handleEnter = () => {
    navigate(`/room/${roomCode}`);
  };

  return (
    <div className="bg-[url(/BG2.jpg)] bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="bg-white bg-opacity-90 rounded-xl shadow-xl p-10 w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Hallo, {userName}!</h2>
        <p className="text-lg">Your Room Code:</p>
        <div className="font-bold text-xl mb-4">{roomCode}</div>
        <button
          onClick={handleEnter}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white rounded cursor-pointer"
        >
          Enter the room
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
