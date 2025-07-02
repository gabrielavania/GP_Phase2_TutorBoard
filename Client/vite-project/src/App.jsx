import { RouterProvider } from "react-router";
import routers from "./Routers/Index.jsx";
import { UserProvider } from "./Context/User-Context.jsx";

function App() {
  return (
    <>
      <UserProvider>
        <RouterProvider router={routers} />
      </UserProvider>
    </>
  );
}

export default App;
