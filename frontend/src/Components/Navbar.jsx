import React from 'react'
// import "./LandingPage.css"
import logo from "../images/Banner.png"


const Navbar = () => {
  return (
    <>
        <div class="nav">
            <div class="logo">
                <img src={logo} alt="" />
                <h2>AUTOMATE</h2>
            </div>
            <div class="navigation">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Mechanic</a></li>
                    <li><a href="#">Customer</a></li>

                    <li><a href="#"><span class="aboutbtn">About US</span></a></li>
                </ul>
            </div>
	    </div>
    </>
  )
}

export default Navbar
