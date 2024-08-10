import React from 'react';
import './styles/CategoriesCard.css';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const CategoriesCard = ({ data }) => {
const navigate = useNavigate()

  return (
    <div className="categories_card row justify-content-center" data-aos="fade-right" onClick={()=>navigate(data.onClick)}>
        <div className="col-5 align-self-center">
            <img src={data.imageURL} alt={data.title} className="categories_card_img" />
        </div>
        <div className="col-7 text-start align-self-center">
            <p className="categories_card_title">{data.title}</p>
            <p className="categories_card_text mb-4">{data.description}</p>
            <Button text={"Discover"} onClick={()=>navigate(data.onClick)} />
            
        </div>
      
    </div>
  );
};

export default CategoriesCard;
