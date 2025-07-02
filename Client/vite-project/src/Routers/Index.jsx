import { createBrowserRouter, redirect } from "react-router";
import HomePage from "../Pages/HomePage";
import CreateRoom from "../Pages/CreateRoomPage";
import JoinRoom from "../Pages/JoinRoomPage";
import WhiteboardPage from "../Pages/WhiteboardPage";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/room/create",
    element: <CreateRoom />,
    loader: () => {
      if (!localStorage.userName) {
        return redirect("/");
      } else if (localStorage.roomCode) {
        return redirect(`/room/${localStorage.roomCode}`);
      }
      return null;
    },
  },
  {
    path: "/room/join",
    element: <JoinRoom />,
    loader: () => {
      if (!localStorage.userName) {
        return redirect("/");
      } else if (localStorage.roomCode) {
        return redirect(`/room/${localStorage.roomCode}`);
      }
      return null;
    },
  },
  {
    path: "/room/:roomCode",
    element: <WhiteboardPage />,
    loader: () => {
      if (!localStorage.userName) {
        return redirect("/");
      }
      return null;
    },
  },
]);

export default routers;
