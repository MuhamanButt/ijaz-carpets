// components/CheckoutSummary.js
import React, { useEffect } from "react";
import { Button } from "antd";
import { formatNumber } from "../utils/Important_functions";
import "./styles/CheckoutSummary.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CheckoutSummary = ({ totalPrice, totalQuantity }) => {
  const navigate = useNavigate();
  const CART_ITEMS = useSelector((state) => state.cart.items);

  useEffect(() => {
    console.log(CART_ITEMS);
  });
  return (
    <div className="row">
      <div className="col text-end total-summary">
        <p>Estimated Total: Rs. {formatNumber(totalPrice)}.00</p>
        <p>Total Quantity: {totalQuantity}</p>
        <Button
          onClick={ CART_ITEMS.length > 0 ? () => navigate("/checkout") : () => {} }
          className="dark-btn mb-4"
          style={{ width: "200px" }}
          disabled={CART_ITEMS.length <= 0}
        >
          <i className="fa-solid fa-check"></i> Check Out{" "}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
