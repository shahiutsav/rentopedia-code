import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const OrderDetails = () => {
    const { order, error, loading } = useSelector(
        (state) => state.orderDetails
    );

    const { id } = useParams();

    const dispatch = useDispatch();
    const alert = useAlert();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Order Details" />
                    <div className="order-details-page">
                        <div className="order-details-container">
                            <Typography component="h1">
                                Order #{order && order._id}
                            </Typography>
                            <Typography>Shipping Info</Typography>
                            <div className="order-details-container-box">
                                <div>
                                    <p>Name:</p>
                                    <span>{order.user && order.user.name}</span>
                                </div>
                                <div>
                                    <p>Phone:</p>
                                    <span>
                                        {order.shippingInfo &&
                                            order.shippingInfo.phoneNo}
                                    </span>
                                </div>
                                <div>
                                    <p>Address:</p>
                                    <span>
                                        {order.shippingInfo &&
                                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                    </span>
                                </div>
                            </div>
                            <Typography>Payment</Typography>
                            <div className="order-details-container-box">
                                <div>
                                    <p>Status:</p>
                                    <span
                                        className={
                                            order.paymentInfo &&
                                            order.paymentInfo.status ===
                                                "succeeded"
                                                ? "green-color"
                                                : "red-color"
                                        }
                                    >
                                        {order.paymentInfo &&
                                        order.paymentInfo.status === "succeeded"
                                            ? "PAID"
                                            : "NOT PAID"}
                                    </span>
                                </div>

                                <div>
                                    <p>Amount:</p>
                                    <span>
                                        {order.totalPrice && order.totalPrice}
                                    </span>
                                </div>
                            </div>

                            <Typography>Order Status</Typography>
                            <div className="order-details-container-box">
                                <div>
                                    <p
                                        className={
                                            order.orderStatus &&
                                            order.orderStatus === "Delivered"
                                                ? "green-color"
                                                : "red-color"
                                        }
                                    >
                                        {order.orderStatus && order.orderStatus}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="order-details-cart-items">
                            <Typography>Order Items:</Typography>
                            <div className="order-details-cart-items-container">
                                {order.orderItems &&
                                    order.orderItems.map((item) => (
                                        <div key={item.book}>
                                            <img
                                                src={item.cover}
                                                alt="Product"
                                            />
                                            <Link to={`/book/${item.book}`}>
                                                {item.title}
                                            </Link>{" "}
                                            <span>
                                                {item.quantity} X ${item.price}{" "}
                                                ={" "}
                                                <b>
                                                    $
                                                    {item.price * item.quantity}
                                                </b>
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default OrderDetails;
