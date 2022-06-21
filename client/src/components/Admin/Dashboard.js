import React from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";

const Dashboard = () => {
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "Total Amount",
                backgroundColor: ["#34495e"],
                hoverBackgroundColor: ["#2980b9"],
                data: [0, 4000],
            },
        ],
    };
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-container">
                <Typography component="h1">Dashboard</Typography>
                <div className="dashboard-summary">
                    <div>
                        <p>
                            Total Amount <br />
                            $2000
                        </p>
                    </div>
                    <div className="dashboard-summary-box-2">
                        <Link to="/admin/books">
                            <p>Book</p>
                            <p>50</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>4</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>2</p>
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
