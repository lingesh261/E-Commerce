import React, { useState } from 'react';
import { useShop } from './ShopContext';
import Input from './Input';
import Button from './Button';
import IconButton from './IconButton';
import { X } from 'lucide-react';

const AuthModal = ({ onClose }) => {
    const { login } = useShop();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        const success = login(username, password);
        if (success) {
            onClose();
        } else {
            setError('Invalid credentials. Try user@shop.com/user or admin@shop.com/admin');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 shadow-2xl max-w-sm w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
                    <IconButton onClick={onClose} className="hover:bg-red-100">
                        <X className="w-6 h-6 text-gray-600" />
                    </IconButton>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                        label="Email"
                        id="email"
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && (
                        <p className="text-red-600 text-sm">{error}</p>
                    )}
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                    <p className="text-center text-sm text-gray-500">
                        Use <b>user@shop.com</b> / <b>user</b> or <b>admin@shop.com</b> / <b>admin</b>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;