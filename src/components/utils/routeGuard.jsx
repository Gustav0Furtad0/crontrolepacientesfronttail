import React from "react";
import { Navigate } from "react-router-dom";

import User from "../../scripts/auth/user";

const RouteGuard = ({ component: Component, ...rest }) => {
    //const hasJWT = () => !!sessionStorage.getItem("token");
    const hasJWT = () => User.isLoggedIn();

    return hasJWT() ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

export default RouteGuard;
