import React, { useState } from 'react';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import { useShop } from './ShopContext';
import Button from './Button';
import Input from './Input';

const CheckoutPage = () => {
    const { cartTotal, clearCart, setActivePage } = useShop();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
    const [shippingInfo, setShippingInfo] = useState({
        name: '', address: '', city: '', zip: ''
    });
    const [paymentInfo, setPaymentInfo] = useState({
        card: '', expiry: '', cvv: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const isShippingValid = Object.values(shippingInfo).every(v => v.length > 0);
    const isPaymentValid = Object.values(paymentInfo).every(v => v.length > 0);

    const handlePayment = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
        clearCart();
        setStep(3); // Move to success page
        setIsLoading(false);
    };

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const totalWithShipping = cartTotal + 10; // $10 shipping fee

    if (step === 3) {
        return (
            <div className="text-center p-12 bg-white rounded-xl shadow-lg m-8 max-w-lg mx-auto">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-800">Order Placed Successfully!</h2>
                <p className="text-gray-600 mt-3">
                    Your order totaling **${totalWithShipping.toFixed(2)}** has been confirmed. A confirmation email has been sent to your inbox.
                </p>
                <div className="flex justify-center gap-4 mt-8">
                    <Button onClick={() => setActivePage('home')}>Continue Shopping</Button>
                    <Button variant="outline" onClick={() => console.log("View Order History")}>View Order</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>

            <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between mb-6">
                    <div className={`font-semibold ${step === 1 ? 'text-indigo-600' : 'text-gray-400'}`}>1. Shipping</div>
                    <div className={`font-semibold ${step === 2 ? 'text-indigo-600' : 'text-gray-400'}`}>2. Payment</div>
                </div>

                {/* Shipping Step */}
                {step === 1 && (
                    <form onSubmit={handleShippingSubmit} className="space-y-6">
                        <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                        <Input label="Full Name" id="name" value={shippingInfo.name} onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })} required />
                        <Input label="Address" id="address" value={shippingInfo.address} onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })} required />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input label="City" id="city" value={shippingInfo.city} onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })} required />
                            <Input label="ZIP Code" id="zip" value={shippingInfo.zip} onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })} required />
                        </div>
                        <Button type="submit" className="w-full" disabled={!isShippingValid}>
                            Continue to Payment
                        </Button>
                    </form>
                )}

                {/* Payment Step */}
                {step === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold mb-4">Payment Details</h2>
                        <Input
                            label="Card Number"
                            id="card"
                            type="text"
                            value={paymentInfo.card}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, card: e.target.value })}
                            placeholder="**** **** **** ****"
                            maxLength="19"
                            required
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Expiry Date (MM/YY)"
                                id="expiry"
                                type="text"
                                value={paymentInfo.expiry}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                                placeholder="MM/YY"
                                maxLength="5"
                                required
                            />
                            <Input
                                label="CVV"
                                id="cvv"
                                type="password"
                                value={paymentInfo.cvv}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                                placeholder="***"
                                maxLength="4"
                                required
                            />
                        </div>

                        <div className="border-t pt-4 mt-6">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total Payable</span>
                                <span className="text-indigo-600">${totalWithShipping.toFixed(2)}</span>
                            </div>
                        </div>

                        <Button onClick={handlePayment} className="w-full text-lg" disabled={!isPaymentValid || isLoading}>
                            {isLoading ? 'Processing...' : `Pay $${totalWithShipping.toFixed(2)}`}
                        </Button>
                        <Button variant="secondary" onClick={() => setStep(1)} className="w-full flex items-center justify-center">
                            <ChevronLeft className="w-4 h-4 mr-2" /> Back to Shipping
                        </Button>
                        <p className="text-center text-sm text-gray-500">
                            *This is a simulation. No real payment will be processed.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;