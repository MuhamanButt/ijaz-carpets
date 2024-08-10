// AnimatedText.js
import React from 'react';
import './styles/AnimatedText.css';

const AnimatedText = ({ text, animationClass }) => {
  return (
    <div className={`animated-text ${animationClass}`}>
      {text}
    </div>
  );
};

export default AnimatedText;
