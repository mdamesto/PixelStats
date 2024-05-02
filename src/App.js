
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import * as React from "react";
import * as ReactDOM from "react-dom/client";

import Statistics from './Pages/Statistics';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Statistics />,
  },
]);



function App() {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;


