import React from "react";
import Map from "./components/Map"
import Home from "./components/Home";
import AddShop from "./components/AddShop";

import {createBrowserRouter,RouterProvider} from "react-router-dom"

function App() {
  const router = createBrowserRouter([
    {
      path : "/",
      element : <><Home/></>
    },
    {
      path : "/map",
      element : <><Map/></>
    },
    {
      path : "/addshop",
      element : <><AddShop/></>
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>  
  );
}

export default App;
