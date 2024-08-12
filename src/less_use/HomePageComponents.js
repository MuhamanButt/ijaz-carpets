import { Button } from "antd";
import { CATEGORIES_DATA, HOME_IMAGE2_DESCRIPTION } from "../values/homePageData";
import Animated_btn from "./Animated_btn";
import { Parallax } from "react-parallax";
import CategoriesCard from "../components/CategoriesCard";
import '../pages/styles/Home.css';
import { API_GET_RANDOM_PRODUCTS } from "../api/api_product";
import ProductCard from "../components/ProductCard";



export const HOME_CAROUSEL_SLIDE = ({ backgroundClass,navigate,backgroundImage }) => (
    <Parallax blur={2} bgImage={backgroundImage} bgImageAlt="the cat" strength={300}>
    <div className={`row m-0 home_main_background ${backgroundClass}`}>
  <div className="col p-0 align-self-center text-center justify-content-center">
    <h4 data-aos="fade-up"> Timeless Elegance, <br /> Quality Craftsmanship </h4>
    <p data-aos="fade-up" className="text-center home-page-main-description" style={{ whiteSpace: "pre-wrap",  margin: "0 auto", marginBottom:"15px" }}>
      Transforming spaces for over 45 years, our carpet shop offers expertise and quality that stand the test of time.
    </p>
    <Animated_btn text={"Shop Now"} onClick={() => navigate('/rugs')} />
  </div>
</div>
</Parallax>
);



export const HOME_CATEGORIES = ({windowWidth})=>(
    <div className="row m-0 justify-content-center">
        <div className="col-11 p-0 text-center home_component_heading">
            <h2>Categories</h2>
            <div className={`row m-0 ${windowWidth < 768 ? 'justify-content-center' : 'justify-content-start'}`}>
                {CATEGORIES_DATA.map((item, index) => (
                    <div className="col-12 col-sm-10 col-md-6 col-lg-4" key={index}>
                        <CategoriesCard data={item} />
                    </div>
                ))}
            </div>
        </div>
    </div>)


export const HOME_RUGS_CAROUSEL = ({ bestSellingProducts, windowWidth,heading }) => {
    const productsToShow = windowWidth < 992 && windowWidth >=768 ? 3 : 4;

    return (
        <div className="row m-0 justify-content-center">
            <div className="col-11 p-0 home_component_heading">
                <h2 className="text-center">{heading}</h2>
                <div className="row">
                    {bestSellingProducts.slice(0, productsToShow).map((product, index) => (
                        <div className="col-6 col-md-4 col-lg-3" key={index}>
                            <ProductCard productDetails={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export const HOME_MAP = ()=>(

    <div className="row m-0 justify-content-center">
        <div className="col-11 col-sm-8 col-lg-6 p-0 home_component_heading">
            <h2 className="text-center">Our Location</h2>
            <iframe src="https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d108799.21609627479!2d74.3470055!3d31.5522869!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x39191b697dca87b3%3A0x9d6e6aa79d98460a!2sShop%20%23%20318%20Landa%20Bazaar%2C%20near%20Babu%20Hotel%2C%20Naulakha%2C%20Lahore%2C%20Punjab%2054000!3m2!1d31.5801685!2d74.3301802!5e0!3m2!1sen!2s!4v1722965627165!5m2!1sen!2s" 
                style={{height:"300px",width:"100%"}} allowfullscreen=""  loading="lazy"  referrerpolicy="no-referrer-when-downgrade"/>
        </div>
    </div>
)