import React from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-container"></div>
        </div>
    );
};

export default Dashboard;
