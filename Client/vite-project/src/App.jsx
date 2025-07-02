import { RouterProvider } from "react-router";
import routers from "./Routers/Index.jsx";

function App() {
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
