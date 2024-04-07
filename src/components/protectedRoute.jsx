import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedUserTypes }) => {
    const isAuthenticated = sessionStorage.getItem('userToken');
    // const userType = sessionStorage.getItem('userType');

    console.log('Authenticated:', isAuthenticated); // 'UserType:', userType);

    if (!isAuthenticated) {
        // Usuário não autenticado
        return <Navigate to="/login" replace />;
    } // else if (allowedUserTypes && !allowedUserTypes.includes(userType)) {
    //     return <Navigate to="/unauthorized" replace />;
    // }

    return children;
};

export default ProtectedRoute;