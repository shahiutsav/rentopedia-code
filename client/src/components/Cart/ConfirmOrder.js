import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = () => {
    const navigate = useNavigate();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 500 ? 0 : 50;

    const tax = Number((subtotal * 0.13).toFixed(2));

    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        navigate("/process/payment");
    };

    return (
        <Fragment>
            <MetaData title="Confirm Order" />
            <CheckoutSteps activeStep={1} />
            <div className="confirm-order-page">
                <div>
                    <div className="confirm-shipping-area">
                        <Typography>Shipping Info</Typography>
                        <div className="confirm-shipping-area-box">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirm-cart-items">
                        <Typography>Your Cart Items:</Typography>
                        <div className="confirm-cart-items-container">
                            {cartItems &&
                                cartItems.map((item) => (
                                    <div key={item.book}>
                                        <img
                                            src={item.cover}
                                            alt="Book cover"
                                        />
                                        <Link to={`/book/${item.book}`}>
                                            {item.title}
                                        </Link>{" "}
                                        <span>
                                            {item.quantity} X ${item.price} ={" "}
                                            <b>${item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                {/*  */}
                <div>
                    <div className="order-summary">
                        <Typography>Order Summary</Typography>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>${subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>${shippingCharges}</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>${tax}</span>
                            </div>
                        </div>

                        <div className="order-summary-total">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>${totalPrice}</span>
                        </div>

                        <button onClick={proceedToPayment}>
                            Proceed To Payment
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ConfirmOrder;
