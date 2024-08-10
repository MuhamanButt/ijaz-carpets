import React from 'react'
import Slider from 'react-infinite-logo-slider'
const InfiniteSlider = ({components,width,duration,toRight}) => {
  return (
    
    <div className="row justify-content-center">
    <div className="col-11">
    <Slider
            width={width}
            duration={duration}
            pauseOnHover={false}
            blurBorders={false}
            blurBoderColor={'#fff'}
            toRight={toRight}
        >
        {components.map((item)=> <Slider.Slide>
            {item}
        </Slider.Slide>)}
       
        </Slider>
        </div></div>
  )
}

export default InfiniteSlider
