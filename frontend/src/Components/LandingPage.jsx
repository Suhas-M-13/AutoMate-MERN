import React from 'react'
import "./LandingPage.css"
import Navbar from './Navbar'
import BannerBG from "../images/BannerBG.png"
import Footer from './Footer'

const LandingPage = () => {
  return (
    <>
      <Navbar/>
	<div class="frontPic">
		<img src={BannerBG} alt="mustang"/>
	</div>

	<div class="text">
		<h1>WELCOME TO AUTOMATE</h1>
		<br/>
		<h2>Where Service Meets Simplicity </h2>
		<br/>
		<p>A WEB-APPLICATION DESIGNED FOR SIMPLIFIED AND EASILY ACCESSIBLE SERVICE BOOKINGS</p>
	</div>
    <Footer/>

    </>
  )
}

export default LandingPage
