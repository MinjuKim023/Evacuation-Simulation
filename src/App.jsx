import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./app/router/MainLayout";
import Drone from "./pages/Drone";
import CarAI from "./pages/CarAI";
import CarPerson from "./pages/CarPerson";

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
        path: "/drone",
        element: <Drone />,
      },
      {
        path: "/car-ai",
        element: <CarAI />,
      },
      {
        path: "/car-person",
        element: <CarPerson />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
