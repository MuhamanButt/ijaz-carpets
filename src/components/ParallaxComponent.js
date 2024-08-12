import React from "react";
import { useState,useEffect } from "react";
import { Parallax } from "react-parallax";
import parallax from "../assets/home_parallax.jpg";
import parallax_2 from "../assets/home2.png";
import { HomeOutlined, StarOutlined, HeartOutlined } from "@ant-design/icons";
import "./styles/ParallaxComponent.css";
import decoration_1 from "../assets/decoration-1.svg";
import decoration_2 from "../assets/decoration-2.svg";
import { Button } from "antd";
const ParallaxComponent = ({ number, navigate }) => {
    
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return(
  <>
    {number == 1 && (
      <Parallax blur={2} bgImage={parallax} bgImageAlt="the cat" strength={300}>
        <div className="row " style={{height: `${windowWidth >768 ? 500 : 600 }px` }} data-aos="fade-left">
          <div className="col-12 col-md-4 parallax-component-1">
            <img src={decoration_1} alt="" />
            <h2>Unveil the Art of Beautiful Living</h2>
            <p className="parallax-subtitle">
              Redefining home elegance since 1979
            </p>
            <p>
              Elevate your home with the finest craftsmanship and transform your
              space into a haven of luxury and comfort. Experience the
              best—experience Ijaz Carpets.
            </p>
            <img src={decoration_2} alt="" />
          </div>
        </div>
      </Parallax>
    )}
    {number == 2 && (
      <Parallax
        blur={2}
        bgImage={parallax_2}
        bgImageAlt="the cat"
        strength={300}
      >
        <div className="row " style={{ height: `400px` }}>
          <div className="col-11 col-md-4 d-flex flex-column justify-content-center text-center parallax-component-2">
            <img src={decoration_1} alt="" data-aos="fade-right"/>
            <h2 data-aos="fade-right">Undeniably the best rug choices online</h2>
            <p data-aos="fade-right">
              Your ultimate destination for high quality carpets and rugs. We
              offer an extensive collection of exquisite carpets and rugs in a
              variety of styles, sizes, and colors to meet your unique
              preferences.
            </p>
            <Button type="primary" className="letter_spacing_true button_medium light" onClick={() => navigate("/rugs")} data-aos="fade-right" > Shop Now </Button>
          </div>
        </div>
      </Parallax>
    )}
  </>
)};

export default ParallaxComponent;
