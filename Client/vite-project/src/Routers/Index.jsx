import { createBrowserRouter, redirect } from "react-router";
import HomePage from "../Pages/HomePage";
import CreateRoom from "../Pages/CreateRoomPage";
import JoinRoom from "../Pages/JoinRoomPage";

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
      }
      return null;
    },
  },
]);

export default routers;
