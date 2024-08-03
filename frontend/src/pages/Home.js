import React from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import './styles/Home.css'
import { ADDRESS, CATEGORIES_DATA, EMAIL, PHONE_NUMBER, TIMINGS } from "../values/homePageData";
import CategoriesCard from "../components/CategoriesCard";
import image2 from '../assets/home2.png'
import tags from '../assets/tags.png'
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Animated_btn from "../less_use/Animated_btn";

const Home = () => {
const navigate = useNavigate()
  return (
    <div>
      {/* //!-----------------------------------    NAVBAR      ----------------------------------- */}
      <Navbar />

      {/* //!-----------------------------------    MAIN      ----------------------------------- */}
      <div className="row m-0 home_main_background">
        <div className="col p-0 align-self-center text-center">
          <h4 data-aos="fade-up">
            Timeless Elegance, <br />
            Quality Craftsmanship
          </h4>
          <p data-aos="fade-up">
            Transforming spaces for over 45 years, our carpet shop offers <br />
            expertise and quality that stand the test of time.
          </p>
          <Animated_btn text={"Shop Now"}
          />
        </div>
      </div>
      {/* //!-----------------------------------    CATEGORIES      ----------------------------------- */}
      <div className="row m-0 justify-content-center">
        <div className="col-11 p-0 text-center home_component_heading">
          <h2>Categories</h2>
          <div className="row m-0">
            {CATEGORIES_DATA.map((item, index) => (
              <div className="col-10 col-md-6 col-lg-4" key={index} >
                <CategoriesCard data={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      
{/* //!-----------------------------------    TAGS      ----------------------------------- */}
<div className="row m-0">
    <div className="col p-0">
        <img src={tags} alt="" className="home_tags"/>
    </div>
</div>
{/* //!-----------------------------------    IMAGE 2      ----------------------------------- */}

      <div className="row m-0 home_image2_background justify-content-end">
        <div className="col-7 col-lg-5 p-0 home_image2_background_col">
          <p className="home_image2_description_main">
            Undeniably the best rug choices online
          </p>
          <p className="home_image2_description">
            Your ultimate destination for high quality carpets and rugs. We
            offer an extensive collection of exquisite carpets and rugs in a
            variety of styles, size and colors to meet your unique preferences.
          </p>
          <Button
            text={"Shop Now"}
            className={"letter_spacing_true button_medium light"}
            onClick={()=>navigate('/rugs')}
          />
        </div>
      </div>

{/* //!-----------------------------------    FOOTER      ----------------------------------- */}
<Footer/>
     
    </div>
  );
};

export default Home;
