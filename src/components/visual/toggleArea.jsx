import React, { useState } from 'react';

function ToggleArea({ label, children }) { 
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="mb-4">
            <label htmlFor="toggle" className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <input
                type="checkbox"
                id="toggle"
                className="toggle toggle-success"
                checked={isVisible}
                onChange={toggleVisibility}
            />
            {isVisible && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}

export default ToggleArea;
