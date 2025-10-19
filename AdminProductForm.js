import React, { useState } from 'react';
import { useShop, CATEGORIES } from './ShopContext';
import Button from './Button';
import Input from './Input';
import IconButton from './IconButton';
import { X } from 'lucide-react';

const AdminProductForm = ({ product = null, onClose }) => {
    const { addProduct, updateProduct } = useShop();
    const [formData, setFormData] = useState({
        name: product?.name || '',
        category: product?.category || CATEGORIES[1],
        price: product?.price || 0,
        inventory: product?.inventory || 0,
        imageUrl: product?.imageUrl || 'https://placehold.co/100x100/1e293b/ffffff?text=Item',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (product) {
            updateProduct({ ...product, ...formData });
        } else {
            addProduct(formData);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 shadow-2xl max-w-lg w-full">
                <div className="flex justify-between items-center mb-6 border-b pb-3">
                    <h2 className="text-2xl font-bold">{product ? 'Edit Product' : 'Add New Product'}</h2>
                    <IconButton onClick={onClose} className="hover:bg-red-100">
                        <X className="w-6 h-6 text-gray-600" />
                    </IconButton>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Product Name" id="name" value={formData.name} onChange={handleChange} required />
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Price ($)" id="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
                        <Input label="Inventory Count" id="inventory" type="number" min="0" value={formData.inventory} onChange={handleChange} required />
                    </div>
                    <Input label="Image URL (Placeholder)" id="imageUrl" value={formData.imageUrl} onChange={handleChange} />

                    <div className="flex flex-col space-y-1">
                        <label htmlFor="category" className="text-sm font-medium text-gray-700">Category</label>
                        <select
                            id="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                            required
                        >
                            {CATEGORIES.slice(1).map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <Button type="submit" className="w-full mt-6">
                        {product ? 'Save Changes' : 'Create Product'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AdminProductForm;