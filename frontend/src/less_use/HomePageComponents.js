import { Button } from "antd";
import { CATEGORIES_DATA, HOME_IMAGE2_DESCRIPTION } from "../values/homePageData";
import Animated_btn from "./Animated_btn";
import CategoriesCard from "../components/CategoriesCard";
import '../pages/styles/Home.css';


export const HOME_CAROUSEL_SLIDE = ({ backgroundClass,navigate }) => (
    <div className={`row m-0 home_main_background ${backgroundClass}`}>
      <div className="col p-0 align-self-center text-center">
        <h4 data-aos="fade-up"> Timeless Elegance, <br /> Quality Craftsmanship </h4>
        <p data-aos="fade-up"> Transforming spaces for over 45 years, our carpet shop offers <br /> expertise and quality that stand the test of time. </p>
        <Animated_btn text={"Shop Now"} onClick={() => navigate('/rugs')} />
      </div>
    </div>
);

export const HOME_DECORATION_COMPONENT_1 = ({ navigate }) => (
    <div className="row m-0 home_image2_background justify-content-end">
        <div className="col-7 col-lg-5 p-0 home_image2_background_col">
            <p className="home_image2_description_main" data-aos="fade-left"> Undeniably the best rug choices online </p>
            <p className="home_image2_des" data-aos="fade-left">{HOME_IMAGE2_DESCRIPTION}</p>
            <Button type="primary" className="letter_spacing_true button_medium light" onClick={() => navigate('/rugs')} data-aos="fade-left">
                Shop Now
            </Button>
        </div>
    </div>
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