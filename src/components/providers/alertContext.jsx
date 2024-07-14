import React, { createContext, useContext, useState } from 'react';
import Alert from '../visual/alert'

const AlertContext = createContext();

export const useAlert = () => {
    return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ message: '', type: '', bgcolor: '', timeout: 5000 });

    const showAlert = (message, type, bgcolor = false, timeout = 5000) => {
        setAlert({ message, type, bgcolor, timeout });
        setTimeout(() => setAlert({ message: '', type: '', bgcolor: '' }), timeout);
    };

    return (
        <AlertContext.Provider value={showAlert}>
            {children}
            {alert.message && <Alert message={alert.message} type={alert.type} bgcolor={alert.bgcolor} timeout={alert.timeout} />}
        </AlertContext.Provider>
    );
};