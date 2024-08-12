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
import { HOME_CAROUSEL_SLIDE, HOME_CATEGORIES, HOME_MAP, HOME_RUGS_CAROUSEL } from '../less_use/HomePageComponents';
import ProductCard from '../components/ProductCard';
import { API_GET_RANDOM_PRODUCTS } from '../api/api_product';
import Testimonials from '../less_use/Testimonials';
import FAQ from '../less_use/FAQ';
import ParallaxComponent from '../components/ParallaxComponent';
import home_main_image_bg_1 from '../assets/home1.png'
import home_main_image_bg_2 from '../assets/home3.png'

const Home = () => {
    const navigate = useNavigate();
    const showFirst = Math.random() < 0.5 ? 1 : 2;
    const backgroundClass1 = `home_main_image_bg_${showFirst}`;
    const backgroundClass2 = `home_main_image_bg_${showFirst === 1 ? 2 : 1}`;
    const [bestSellingProducts, setBestSellingProducts] = useState([]);
    const [moreRugs, setmoreRugs] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchBestSellingProducts = async () => {
            try {
                const response = await API_GET_RANDOM_PRODUCTS(4);
                const response2 = await API_GET_RANDOM_PRODUCTS(4);
                setBestSellingProducts(response.data);
                setmoreRugs(response2.data);
            } catch (error) {
                console.error("Failed to fetch best selling products", error);
            }
        };

        fetchBestSellingProducts();
    }, []);

    return (
        <div className='overflow-x-hidden'>
            <Navbar />
            <Carousel arrows infinite={true} draggable fade autoplay autoplaySpeed={3000} speed={1000}>
                <HOME_CAROUSEL_SLIDE backgroundClass={backgroundClass1} backgroundImage={home_main_image_bg_1} navigate={navigate} />
                <HOME_CAROUSEL_SLIDE backgroundClass={backgroundClass1} backgroundImage={home_main_image_bg_2}  navigate={navigate} />
            </Carousel>
            <InfiniteSlider components={SIZES_COMPONENTS} width={'1300px'} duration={40} toRight={false} />
            <HOME_CATEGORIES windowWidth={windowWidth}/>
            {bestSellingProducts && <HOME_RUGS_CAROUSEL bestSellingProducts = {bestSellingProducts} windowWidth={windowWidth} heading={"Best Selling Products"}/>}
            <InfiniteSlider components={TAGS_COMPONENTS} width={'1300px'} duration={40} toRight={false} />
            <ParallaxComponent number={1}/>
            <Testimonials/>
            {moreRugs && <HOME_RUGS_CAROUSEL bestSellingProducts = {moreRugs} windowWidth={windowWidth} heading={"More Rugs"}/>}
            <FAQ/>
            <HOME_MAP/>
            <ParallaxComponent number={2} navigate={navigate}/>
            
            <Footer />
        </div>
    );
};

export default Home;
