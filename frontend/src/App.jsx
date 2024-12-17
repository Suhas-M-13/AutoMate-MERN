import './App.css'
import LandingPage from './Components/LandingPage'

import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Navbar from './Components/Navbar'

function App() {
  const router = createBrowserRouter([
    {
      path : "/",
      element : <><LandingPage/></>
    },
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App

