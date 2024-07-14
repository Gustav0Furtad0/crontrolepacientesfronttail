import React from 'react';
import { AlertProvider } from './alertContext';

const MainProvider = ({ children }) => {
    return (
        <AlertProvider>
            {children}
        </AlertProvider>
    );
};

export default MainProvider;