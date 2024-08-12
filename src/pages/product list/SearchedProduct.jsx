import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductBanner from './ProductBanner';
import Navbar from '../Navbar';
import Filter from './Filter';
import Footer from '../Footer';
import ProductGrid from './ProductGrid';
import loadings from '../../assets/loading.jpg'
import './CSS/SearchedProduct.css';

const SearchedProduct = () => {
    const [originalProducts, setOriginalProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://wayuapi.wayumart.com/products?search=${searchQuery}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
                setOriginalProducts(data);
                setFilteredBrands(getUniqueBrands(data));
                setFilteredCategories(getUniqueCategories(data));
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchQuery]);

    const applyFilters = (filters) => {
        let updatedProducts = [...originalProducts];

        updatedProducts = updatedProducts.filter(
            (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
        );

        if (filters.conditions.brands.length > 0) {
            updatedProducts = updatedProducts.filter((product) =>
                filters.conditions.brands.includes(product.brand)
            );
        }

        if (filters.conditions.categories.length > 0) {
            updatedProducts = updatedProducts.filter((product) =>
                filters.conditions.categories.includes(product.category)
            );
        }

        if (filters.rating.length > 0) {
            updatedProducts = updatedProducts.filter((product) =>
                filters.rating.some((rating) => product.ratings <= rating)
            );
        }

        setProducts(updatedProducts);
    };

    const clearAllFilters = () => {
        setProducts(originalProducts);
    };

    const getUniqueBrands = (products) => {
        const brands = products.map(product => product.brand);
        return [...new Set(brands)];
    };

    const getUniqueCategories = (products) => {
        const categories = products.map(product => product.category);
        return [...new Set(categories)];
    };

    if (loading) {
        return <div><img src={loading} alt="" /></div>;
    }

    if (error) {
       return <div><img src={loadings} alt="" className='sp-load'/></div>;
    }

    return (
        <div>
            <Navbar />
            <ProductBanner />
            <div className="app-container">
                <Filter 
                    onFilterChange={applyFilters} 
                    onClearFilters={clearAllFilters} 
                    filteredBrands={filteredBrands} 
                    filteredCategories={filteredCategories}
                />
                <ProductGrid products={products} />
            </div>
            <Footer />
        </div>
    );
};

export default SearchedProduct;
