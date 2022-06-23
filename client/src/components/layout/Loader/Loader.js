import React from "react";
import SquareLoader from "react-spinners/SquareLoader";
import "./Loader.css";

const Loader = () => {
    return (
        <div className="loading-icon">
            <SquareLoader size={50} color={"#493A30"} />;
        </div>
    );
};

export default Loader;
