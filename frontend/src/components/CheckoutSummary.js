// components/CheckoutSummary.js
import React from "react";
import { Button } from "antd";
import { formatNumber } from "../utils/Important_functions";
import './styles/CheckoutSummary.css';

const CheckoutSummary = ({ totalPrice, totalQuantity, onClearCart }) => {
  return (
    <div className="row">
      <div className="col text-end total-summary">
        <p>Estimated Total: Rs. {formatNumber(totalPrice)}.00</p>
        <p>Total Quantity: {totalQuantity}</p>
        <Button onClick={onClearCart} className="dark-btn mb-4" style={{ width: "200px" }}>
          <i className="fa-solid fa-check"></i> Check Out
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
