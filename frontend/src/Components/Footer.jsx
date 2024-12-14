import React from 'react'
import logo from "../images/Banner.png"


const Footer = () => {
  return (
    <>
      <div class="footer">
		<div class="logo-container">
			<img src={logo} alt=""/>
			<span><b>AutoMate</b></span>
		</div>
		<div class="centered-content">
			<div class="copyright">
				&copy;2024 AutoMate Private Limited
			</div>
		</div>
	</div>
    </>
  )
}

export default Footer
