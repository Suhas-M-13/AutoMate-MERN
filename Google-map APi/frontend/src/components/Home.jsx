import React from 'react'

import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    const handleButtons = (e)=>{
        if(e.target.innerText === "Show Shops"){
            navigate("/map")
        }
        else{
            navigate("/addshop")
        }
    }
  return (
    <>
      <div className="relative flex items-center justify-center mt-[5%]">
          <button
            className="bg-slate-700 border-slate-700 border-2 text-white cursor-pointer font-semibold p-[10px] mr-[20px] hover:bg-slate-900 hover:border-slate-900 hover:transition-colors hover:duration-1s hover:ease-out hover:transform hover:p-4"
            onClick={handleButtons}
          >
            Show Shops
          </button>
          <button
            className="bg-slate-700 border-slate-700 border-2 text-white cursor-pointer font-semibold p-[10px] mr-[20px] hover:bg-slate-900 hover:border-slate-900 hover:transition-colors hover:duration-1s hover:ease-out hover:transform hover:p-4"
            onClick={handleButtons}
          >
            Add Shops
          </button>
        </div>
    </>
  )
}

export default Home
