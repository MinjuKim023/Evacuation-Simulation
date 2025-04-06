import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "./router/MainLayout";
import Agents from "../pages/Agents";
import Description from "../pages/Description";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:agent",
        element: <Agents />,
        children: [
          {
            path: ":id",
            element: <Agents />,
          },
        ],
      },
      {
        path: "/description",
        element: <Description />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
