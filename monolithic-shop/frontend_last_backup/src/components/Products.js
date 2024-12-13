import React, { useState, useEffect } from 'react';
import { fetchProducts, addProduct } from '../api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', stock: '' });

    useEffect(() => {
        fetchProducts().then(setProducts);
    }, []);

    const handleAddProduct = async () => {
        const product = await addProduct(newProduct);
        setProducts([...products, product]);
        setNewProduct({ name: '', description: '', price: '', stock: '' });
    };

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.description} (${product.price}, Stock: {product.stock})
                    </li>
                ))}
            </ul>
            <h3>Add Product</h3>
            <input
                type="text"
                placeholder="Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            />
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default Products;
