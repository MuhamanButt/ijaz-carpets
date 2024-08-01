import React, { useState } from 'react';
import './styles/Quantity.css'; // Import CSS for custom styles

const Quantity = ({ min = 1, max = 10, defaultValue = 1, onChange }) => {
    const [quantity, setQuantity] = useState(defaultValue);

    const handleIncrement = () => {
        if (quantity < max) {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            onChange(newQuantity);
        }
    };

    const handleDecrement = () => {
        if (quantity > min) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onChange(newQuantity);
        }
    };

    return (
        <div className="quantity-container">
            <button  className="quantity-button"  onClick={handleDecrement} disabled={quantity <= min} > - </button>
            <input  type="text"  value={quantity}  readOnly  className="quantity-display" />
            <button  className="quantity-button"  onClick={handleIncrement} disabled={quantity >= max} > + </button>
        </div>
    );
};

export default Quantity;
