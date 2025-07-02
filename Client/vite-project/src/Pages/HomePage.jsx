import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../Context/User-Context";

const HomePage = () => {
  const { userName, setUserName } = useContext(UserContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  console.log("userName", userName);
  console.log("name", name);

  const handleSubmitCreateRoom = () => {
    if (!name.trim()) return;
    setUserName(name);
    localStorage.setItem("userName", name);
    navigate("/room/create");
  };
  const handleSubmitJoinRoom = () => {
    if (!name.trim()) return;
    setUserName(name);
    localStorage.setItem("userName", name);
    navigate("/room/join");
  };

  return (
    <div className="bg-[url(/BG2.jpg)] bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="bg-white bg-opacity-90 rounded-xl shadow-xl p-10 w-[90%] max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to TutorBoard
        </h1>
        <h2 className="text-xl mb-6 text-gray-600">
          Enter your name to get started
        </h2>

        <input
          className="w-full border border-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />

        <div className="flex justify-center gap-4">
          <button
            onClick={handleSubmitCreateRoom}
            className="bg-amber-300 hover:bg-amber-400 px-4 py-2 rounded-md text-white font-semibold transition cursor-pointer"
          >
            Create Room
          </button>
          <button
            onClick={handleSubmitJoinRoom}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white font-semibold transition cursor-pointer"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
