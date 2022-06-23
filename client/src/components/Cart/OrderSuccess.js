import React from "react";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import "./OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
    return (
        <div className="order-success">
            <DoneAllIcon />
            <Typography>Your Order has been Placed successfully </Typography>
            <Link to="/orders">View Orders</Link>
        </div>
    );
};

export default OrderSuccess;
