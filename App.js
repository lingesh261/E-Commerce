import React from 'react';
import { ShopProvider } from './ShopContext';
import MainApp from './MainApp';

export default function App() {
    return (
        <ShopProvider>
            <MainApp />
        </ShopProvider>
    );
}