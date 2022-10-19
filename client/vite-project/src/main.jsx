import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Login from './routes/login';
import SignUp from './routes/signUp';
import Feed from './routes/feed';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },{
    path: "/logIn",
    element: <Login />,
  },
  ,{
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/feed",
    element: <Feed />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);