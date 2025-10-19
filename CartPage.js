import React from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { useShop } from './ShopContext';
import Button from './Button';
import IconButton from './IconButton';

const CartItem = ({ item }) => {
    const { updateQuantity } = useShop();

    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex items-center space-x-4">
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/1e293b/ffffff?text=Item"; }}
                />
                <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-indigo-600">${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <input
                    type="number"
                    min="1"
                    max={item.inventory}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    className="w-16 p-2 border border-gray-300 rounded-lg text-center"
                />
                <IconButton onClick={() => updateQuantity(item.id, 0)}>
                    <X className="w-5 h-5 text-gray-500 hover:text-red-600" />
                </IconButton>
            </div>
        </div>
    );
};

const CartPage = () => {
    const { cart, cartTotal, clearCart, setActivePage } = useShop();

    if (cart.length === 0) {
        return (
            <div className="text-center p-12 bg-white rounded-xl shadow-lg m-8">
                <ShoppingCart className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Your cart is empty.</h2>
                <p className="text-gray-500 mt-2">Time to find some great products!</p>
                <Button onClick={() => setActivePage('home')} className="mt-6">Start Shopping</Button>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
                    {cart.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))}
                    <div className="flex justify-end pt-4">
                        <Button variant="secondary" onClick={clearCart} className="text-sm">
                            Clear Cart
                        </Button>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>
                    <div className="space-y-3 border-b pb-4">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal ({cart.length} items)</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>$10.00</span>
                        </div>
                    </div>
                    <div className="flex justify-between font-extrabold text-xl mt-4 pt-2">
                        <span>Order Total</span>
                        <span className="text-indigo-600">${(cartTotal + 10).toFixed(2)}</span>
                    </div>
                    <Button
                        onClick={() => setActivePage('checkout')}
                        className="w-full mt-6 text-lg"
                    >
                        Proceed to Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;