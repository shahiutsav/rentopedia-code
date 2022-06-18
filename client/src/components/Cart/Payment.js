import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import DoneAllIcon from "@material-ui/icons/DoneAll";

const Payment = () => {
    return (
        <div className="empty-cart">
            <DoneAllIcon />

            <Typography>Card Screen Here</Typography>
            <Link to="/">Browse More Book</Link>
        </div>
    );
};

export default Payment;
