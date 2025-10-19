import React from 'react';

const Input = ({ label, id, type = 'text', value, onChange, className = '', required = false, ...props }) => (
    <div className="flex flex-col space-y-1">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            className={`px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm ${className}`}
            required={required}
            {...props}
        />
    </div>
);

export default Input;