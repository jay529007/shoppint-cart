import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./page/login";
import Mainlayout from "./page/mainlayout";
import Home from "./page/home";
import Register from "./page/register";
import { Notfound } from "./page/error/notfound";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
