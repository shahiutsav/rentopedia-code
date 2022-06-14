import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Profile from "../User/Profile";

const ProtectedRoute = ({ children }) => {
    const { loading, isAuthenticated, user } = useSelector(
        (state) => state.user
    );

    return (
        <Fragment>
            {loading === false && (
                <Fragment>
                    ({isAuthenticated ? children : <Navigate to="/login" />})
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProtectedRoute;
