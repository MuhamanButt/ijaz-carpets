import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import './styles/Home.css';
import { CATEGORIES_DATA, SIZES_COMPONENTS, TAGS_COMPONENTS } from "../values/homePageData";
import CategoriesCard from "../components/CategoriesCard";
import { Carousel } from "antd";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Animated_btn from "../less_use/Animated_btn";
import InfiniteSlider from '../components/InfiniteSlider';
import { HOME_CAROUSEL_SLIDE, HOME_CATEGORIES, HOME_DECORATION_COMPONENT_1 } from '../less_use/HomePageComponents';

const Home = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    const showFirst = Math.random() < 0.5 ? 1 : 2;
    const backgroundClass1 = `home_main_image_bg_${showFirst}`;
    const backgroundClass2 = `home_main_image_bg_${showFirst === 1 ? 2 : 1}`;

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <Navbar />
            <Carousel arrows infinite={true} draggable fade autoplay autoplaySpeed={3000} speed={1000}>
                <HOME_CAROUSEL_SLIDE backgroundClass={backgroundClass1} navigate={navigate} />
                <HOME_CAROUSEL_SLIDE backgroundClass={backgroundClass2} navigate={navigate} />
            </Carousel>
            <InfiniteSlider components={SIZES_COMPONENTS} width={'1300px'} duration={40} toRight={false} />
            <HOME_CATEGORIES windowWidth={windowWidth}/>
            <InfiniteSlider components={TAGS_COMPONENTS} width={'1300px'} duration={40} toRight={false} />
            <HOME_DECORATION_COMPONENT_1 navigate={navigate} />
            <Footer />
        </div>
    );
};

export default Home;
