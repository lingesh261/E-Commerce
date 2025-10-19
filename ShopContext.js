import React, { useState, useMemo, createContext, useContext } from 'react';

// --- Global Constants and Mock Data ---
export const MOCK_PRODUCTS_DB = [
    { id: 'p1', name: 'Ceramic Coffee Mug', category: 'Home Goods', price: 24.99, inventory: 15, imageUrl: 'https://placehold.co/100x100/1e293b/ffffff?text=Mug' },
    { id: 'p2', name: 'Wireless Mechanical Keyboard', category: 'Electronics', price: 129.99, inventory: 5, imageUrl: 'https://placehold.co/100x100/1e293b/ffffff?text=Keyboard' },
    { id: 'p3', name: 'Premium Leather Wallet', category: 'Accessories', price: 49.50, inventory: 22, imageUrl: 'https://placehold.co/100x100/1e293b/ffffff?text=Wallet' },
    { id: 'p4', name: 'Noise-Cancelling Headphones', category: 'Electronics', price: 299.00, inventory: 8, imageUrl: 'https://placehold.co/100x100/1e293b/ffffff?text=Headphones' },
    { id: 'p5', name: 'Organic Cotton T-Shirt', category: 'Apparel', price: 35.00, inventory: 40, imageUrl: 'https://placehold.co/100x100/1e293b/ffffff?text=Tshirt' },
    { id: 'p6', name: 'Cast Iron Skillet Set', category: 'Home Goods', price: 89.99, inventory: 12, imageUrl: 'https://placehold.co/100x100/1e293b/ffffff?text=Skillet' },
];
export const CATEGORIES = ['All', 'Electronics', 'Apparel', 'Home Goods', 'Accessories'];

const ShopContext = createContext();
export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const [products, setProducts] = useState(MOCK_PRODUCTS_DB);
    const [cart, setCart] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('guest'); // 'guest', 'user', 'admin'
    const [activePage, setActivePage] = useState('home');

    // MOCK AUTHENTICATION
    const login = (username, password) => {
        if (username === 'admin@shop.com' && password === 'admin') {
            setIsAuthenticated(true);
            setUserRole('admin');
            return true;
        } else if (username === 'user@shop.com' && password === 'user') {
            setIsAuthenticated(true);
            setUserRole('user');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole('guest');
        setActivePage('home');
    };

    // CART LOGIC
    const addToCart = (productId) => {
        const existingItemIndex = cart.findIndex(item => item.id === productId);
        if (existingItemIndex > -1) {
            setCart(prevCart => prevCart.map((item, index) =>
                index === existingItemIndex
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            const product = products.find(p => p.id === productId);
            if (product) {
                setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
            }
        }
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            setCart(prevCart => prevCart.filter(item => item.id !== productId));
        } else {
            setCart(prevCart => prevCart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            ));
        }
    };

    const clearCart = () => setCart([]);

    const cartTotal = useMemo(() => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cart]);

    // ADMIN INVENTORY MANAGEMENT (MOCK CRUD)
    const addProduct = (newProduct) => {
        const id = `p${products.length + 1}-${Date.now()}`;
        setProducts(prevProducts => [...prevProducts, { ...newProduct, id, inventory: Number(newProduct.inventory) }]);
    };

    const updateProduct = (updatedProduct) => {
        setProducts(prevProducts => prevProducts.map(p =>
            p.id === updatedProduct.id ? { ...updatedProduct, inventory: Number(updatedProduct.inventory) } : p
        ));
    };

    const deleteProduct = (productId) => {
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    };

    const contextValue = {
        products, cart, cartTotal, isAuthenticated, userRole, setActivePage,
        login, logout, addToCart, updateQuantity, clearCart,
        addProduct, updateProduct, deleteProduct, activePage
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};