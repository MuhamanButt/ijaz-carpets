import React from 'react'
import logo from '../assets/logo_white.svg'
import { ADDRESS, CATEGORIES_DATA, EMAIL, PHONE_NUMBER, TIMINGS } from "../values/homePageData";
import icon from '../assets/icons/upload.svg'
import './styles/Footer.css'

const Footer = () => {
  return (
    <div className="row m-0 footer_main pt-5">
    <div className="col-12 p-0">
      <div className="row align-items-center">
        <div className="col-12 col-sm-6">
          <img src={logo} className='footer_logo' alt="Logo" />
        </div>
        <div className="col-12 col-sm-6 d-flex flex-column text-start mt-3 mt-sm-0">
          <p className='footer_email_description'>
            Get the latest style updates and special deals directly in your
            inbox
          </p>
          <div className="d-flex footer_email">
            <input
              type="email"
              placeholder="Enter email"
              className="form-control me-2"
            />
            <button className="footer_email_btn">
             <img src={icon} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="col-12 p-0 mt-3">
      <div className="row mt-3">
        <div className="col-6">
        <ul className='footer_list'>
              <li><i className="fa-solid fa-location-dot"></i> {ADDRESS}</li>
              <li><i className="fa-solid fa-phone"></i> {PHONE_NUMBER}</li>
              <li><i className="fa-solid fa-envelope"></i> {EMAIL}</li>
              <li><i className="fa-solid fa-clock"></i> {TIMINGS}</li>
            </ul>
        </div>

        <div className="col-6 col-sm-3">
          <ul className='footer_list'>
            <li>My Account</li>
            <li>Login</li>
            <li>My Cart</li>
            <li>Wishlist</li>
            <li>Checkout</li>
          </ul>
        </div>
        <div className="col-6 col-sm-3">
            <ul className='footer_list'>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact</li>
                <li>Rugs</li>
                <li>Jai Namaz</li>
            </ul>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Footer
