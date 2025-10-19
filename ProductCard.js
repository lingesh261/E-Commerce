import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useShop } from './ShopContext';
import Button from './Button';

const ProductCard = ({ product }) => {
    const { addToCart } = useShop();

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col h-full">
            <div className="p-4 bg-gray-50 flex-shrink-0">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/1e293b/ffffff?text=Item"; }}
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{product.name}</h3>
                <p className="text-indigo-600 font-extrabold mt-1 text-2xl">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-1 flex-grow">{product.category}</p>
                <div className="mt-4">
                    <Button
                        onClick={() => addToCart(product.id)}
                        className="w-full text-sm flex items-center justify-center disabled:opacity-50"
                        disabled={product.inventory === 0}
                    >
                        {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
                        <ShoppingCart className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;