import { useState } from "react";
import { useNavigate } from "react-router";

const HomePage = () => {
  const [userName, setUserName] = useState("");
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
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-5xl font-bold">Welcome to TutorBoard</h1>
      <h1 className="text-3xl font-semibold">Enter your name</h1>
      <input
        className="border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
      />
      <div className="flex justify-center gap-4 w-6/10">
        <button
          onClick={handleSubmitCreateRoom}
          className="bg-yellow-500 px-4 py-2 rounded text-white w-2/10"
        >
          Create Room
        </button>
        <button
          onClick={handleSubmitJoinRoom}
          className="bg-green-500 px-4 py-2 rounded text-white mr-2 w-2/10"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default HomePage;
