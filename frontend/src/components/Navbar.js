import React from 'react'
import navbar_logo_black from '../assets/logo_black.svg'
import './styles/Navbar.css'
import { PHONE_NUMBER } from '../values/homePageData'

const Navbar = () => {
  return (
    <di>
    <div className="row m-0 navbar_tagline">
        <div className="col-auto p-0">
            <i className="fa-solid fa-phone"></i>
            {PHONE_NUMBER}
        </div>
        <div className="col text-center">
            Headline lorem ipsum Headline lorem ipsum
        </div>
    </div>

    <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <a className={`navbar_logo navbar-brand`} href="#">
                <img src={navbar_logo_black} alt="" />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
                </li>
            </ul>
            <span className="navbar-text">
                Navbar text with an inline element
            </span>
            </div>
        </div>
    </nav></di>
  )
}

export default Navbar
