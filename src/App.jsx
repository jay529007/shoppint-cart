import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./page/login";
import Mainlayout from "./page/mainlayout";
import Home from "./page/home";
import Register from "./page/register";
import { Notfound } from "./page/error/notfound";
import Nouserfound from "./page/error/no-userfound";
import Products from "./page/fullproductscard";

const router = createBrowserRouter([
  {
    path: "/nouserfound",
    element: <Nouserfound />,
  },
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
        path: ":id",
        element: <Products />,
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
