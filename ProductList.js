import React, { useState, useMemo } from 'react';
import { Search, ListFilter } from 'lucide-react';
import { useShop } from './ShopContext';
import ProductCard from './ProductCard';
import Input from './Input';
import { CATEGORIES } from './ShopContext';

const ProductList = () => {
    const { products } = useShop();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('price-desc');

    const filteredAndSortedProducts = useMemo(() => {
        let list = products.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (selectedCategory !== 'All') {
            list = list.filter(p => p.category === selectedCategory);
        }

        list.sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
            return 0; // default
        });

        return list;
    }, [products, searchTerm, selectedCategory, sortBy]);

    return (
        <main className="p-4 md:p-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Our Latest Products</h1>

            <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-md">
                {/* Search */}
                <div className="flex-grow flex items-center border border-gray-300 rounded-lg bg-white p-1">
                    <Search className="w-5 h-5 text-gray-400 ml-2" />
                    <Input
                        id="search"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border-none focus:ring-0 shadow-none"
                        label="Search"
                    />
                </div>
                {/* Filters */}
                <div className="flex flex-wrap gap-2 items-center">
                    <div className="relative">
                        <ListFilter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg appearance-none text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                        >
                            <option value="price-desc">Price: High to Low</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="name-asc">Name: A-Z</option>
                        </select>
                    </div>
                </div>
            </div>

            {filteredAndSortedProducts.length === 0 ? (
                <div className="text-center p-10 bg-white rounded-xl shadow-md">
                    <p className="text-gray-500 text-xl">No products found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAndSortedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </main>
    );
};

export default ProductList;