import React, { useEffect } from 'react';

export default function Alert (props) {
    let { message, type, bgcolor, timeout, onClose } = props;

    let svg = '';

    if (type === 'info') {
        svg = (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 stroke-current">
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        )
        if (!bgcolor) {
            bgcolor = '#0EA5E9';
        }
    } else if (type === 'warning') {
        svg = (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        )
        if (!bgcolor) {
            bgcolor = '#FCD34D';
        }
    } else if (type === 'error') {
        svg = (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
        if (!bgcolor) bgcolor = '#EF4444';
    } else if (type === 'success') {
        svg = (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
        if (!bgcolor) bgcolor = '#14B8A6';
    } else {
        svg = (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 stroke-current">
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        )
        if (!bgcolor) {
            bgcolor = '#4B5563';
        }
    }

    useEffect(() => {
        if (timeout) {
            const timer = setTimeout(() => {
                if (onClose) {
                    onClose();
                }
            }, timeout);
            return () => clearTimeout(timer);
        }
    }, [timeout, onClose]);

    return (
        <div className="toast toast-top toast-end" style={{
            zIndex: 9999,
        }}>
            <div className="alert" style={{ backgroundColor: bgcolor, border: 'none'}}>
                {svg}
                <span>{message}</span>
            </div>
        </div>
    );
}
