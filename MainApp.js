import React from 'react';
import { useShop } from './ShopContext';
import Header from './Header';
import ProductList from './ProductList';
import CartPage from './CartPage';
import CheckoutPage from './CheckoutPage';
import AdminDashboard from './AdminDashboard';
import Button from './Button';

const MainApp = () => {
    const { activePage, userRole, setActivePage } = useShop();

    let ContentComponent;
    switch (activePage) {
        case 'home':
            ContentComponent = ProductList;
            break;
        case 'cart':
            ContentComponent = CartPage;
            break;
        case 'checkout':
            ContentComponent = CheckoutPage;
            break;
        case 'admin':
            ContentComponent = AdminDashboard;
            break;
        default:
            ContentComponent = ProductList;
    }

    if (activePage === 'admin' && userRole !== 'admin') {
        ContentComponent = () => (
            <div className="text-center p-12 m-8 bg-red-50 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-red-700">Access Denied</h1>
                <p className="text-red-500 mt-2">You must be logged in as an administrator to view this page.</p>
                <Button onClick={() => setActivePage('home')} className="mt-6">Go to Store</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header />
            <div className="max-w-7xl mx-auto pb-12">
                <ContentComponent />
            </div>
            <footer className="w-full bg-gray-800 text-white p-4 text-center text-sm mt-8">
                &copy; 2024 CommerceOS (Simulated E-Commerce Platform).
            </footer>
        </div>
    );
};

export default MainApp;