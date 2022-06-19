import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { loading, isAdmin, isAuthenticated, user } = useSelector(
        (state) => state.user
    );

    return (
        <Fragment>
            {loading === false && (
                <Fragment>
                    {!isAuthenticated ||
                    (isAdmin === true && user.role !== "admin") ? (
                        <Navigate to="/login" />
                    ) : (
                        children
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProtectedRoute;
