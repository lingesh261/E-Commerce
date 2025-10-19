import React from 'react';

const IconButton = ({ children, onClick, className = '' }) => (
    <button
        onClick={onClick}
        className={`p-2 rounded-full hover:bg-gray-100 transition duration-150 ${className}`}
    >
        {children}
    </button>
);

export default IconButton;