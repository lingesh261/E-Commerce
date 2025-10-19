import React, { useState } from 'react';
import { ShoppingCart, User, LogOut, Package } from 'lucide-react';
import { useShop } from './ShopContext';
import Button from './Button';
import AuthModal from './AuthModal';

const Header = () => {
    const { cart, isAuthenticated, userRole, logout, setActivePage, activePage } = useShop();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    const navItems = [
        { name: 'Store', page: 'home' },
        { name: 'Cart', page: 'cart', icon: <ShoppingCart className="w-5 h-5" /> },
    ];

    if (userRole === 'admin') {
        navItems.splice(1, 0, { name: 'Admin', page: 'admin' });
    }

    const NavButton = ({ item }) => (
        <button
            onClick={() => setActivePage(item.page)}
            className={`p-2 transition duration-150 rounded-lg flex items-center text-sm font-medium ${activePage === item.page ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100'}`}
        >
            {item.name === 'Cart' && (
                <span className="relative mr-2">
                    {item.icon}
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </span>
            )}
            {item.name === 'Admin' && <Package className="w-5 h-5 mr-1" />}
            {item.name !== 'Cart' && item.name !== 'Admin' && item.name}
            {item.name === 'Cart' && 'Cart'}
        </button>
    );

    return (
        <header className="sticky top-0 bg-white shadow-md z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <button onClick={() => setActivePage('home')} className="flex items-center space-x-2 text-2xl font-extrabold text-indigo-600">
                        <ShoppingCart className="w-7 h-7" />
                        <span>CommerceOS</span>
                    </button>
                    <nav className="hidden md:flex space-x-1">
                        {navItems.map(item => <NavButton key={item.page} item={item} />)}
                    </nav>
                    <div className="flex items-center space-x-2">
                        {isAuthenticated ? (
                            <>
                                <span className="text-sm font-medium text-gray-600 hidden sm:block">
                                    {userRole === 'admin' ? 'Admin User' : 'Standard User'}
                                </span>
                                <Button variant="secondary" onClick={logout} className="p-2 text-sm md:p-2.5 flex items-center">
                                    <LogOut className="w-5 h-5" />
                                    <span className="hidden sm:inline ml-2">Logout</span>
                                </Button>
                            </>
                        ) : (
                            <Button onClick={() => setIsAuthModalOpen(true)} className="flex items-center">
                                <User className="w-5 h-5 mr-2" />
                                Sign In
                            </Button>
                        )}
                        <button
                            onClick={() => setActivePage('cart')}
                            className="relative p-2 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-gray-100 md:hidden"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
        </header>
    );
};

export default Header;