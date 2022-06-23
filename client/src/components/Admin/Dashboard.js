import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminBooks } from "../../actions/bookAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
    const dispatch = useDispatch();

    const { books } = useSelector((state) => state.books);

    const { orders } = useSelector((state) => state.allOrders);

    const { users } = useSelector((state) => state.allUsers);

    useEffect(() => {
        dispatch(getAdminBooks());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);

    let totalAmount = 0;
    orders &&
        orders.forEach((item) => {
            totalAmount += item.totalPrice;
        });

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "Total Amount",
                backgroundColor: ["#34495e"],
                hoverBackgroundColor: ["#2980b9"],
                data: [0, totalAmount],
            },
        ],
    };
    return (
        <div className="dashboard">
            <MetaData title="Dashboard - Admin Panel" />
            <Sidebar />
            <div className="dashboard-container">
                <Typography component="h1">Dashboard</Typography>
                <div className="dashboard-summary">
                    <div>
                        <p>
                            Total Amount <br />${totalAmount}
                        </p>
                    </div>
                    <div className="dashboard-summary-box-2">
                        <Link to="/admin/books">
                            <p>Book</p>
                            <p>{books && books.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                    <div className="line-chart">
                        <Line data={lineState} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
