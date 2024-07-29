import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import './CSS/Filter.css';

const Filter = ({ onFilterChange, onClearFilters, filteredBrands, filteredCategories }) => {
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [conditions, setConditions] = useState({
        brands: [],
        categories: [],
    });
    const [rating, setRating] = useState([false, false, false, false, false]);
    const [sectionsVisible, setSectionsVisible] = useState({
        priceRange: true,
        conditions: true,
        categories: true,
        rating: true,
    });

    const handleSliderChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleCheckboxChange = (category, value) => {
        let updatedConditions;
        if (conditions[category].includes(value)) {
            updatedConditions = {
                ...conditions,
                [category]: conditions[category].filter((item) => item !== value),
            };
        } else {
            updatedConditions = {
                ...conditions,
                [category]: [...conditions[category], value],
            };
        }
        setConditions(updatedConditions);
    };

    const handleRatingChange = (index) => {
        const updatedRating = rating.map((item, idx) => 
            idx === index ? !item : item
        );
        setRating(updatedRating);
    };

    const toggleSectionVisibility = (section) => {
        setSectionsVisible(prevState => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    const clearAllFilters = () => {
        setPriceRange([0, 1000]);
        setConditions({
            brands: [],
            categories: [],
        });
        setRating([false, false, false, false, false]);
        onClearFilters();
    };

    useEffect(() => {
        const filters = {
            priceRange,
            conditions,
            rating: rating
                .map((checked, index) => checked ? index + 1 : null)
                .filter((item) => item !== null),
        };

        onFilterChange(filters);
    }, [priceRange, conditions, rating]);

    return (
        <div className="filter-container">
            <div className="filter-header">
                <h2>Filters</h2>
                <button className="filter-clear-all" onClick={clearAllFilters}>Clear all</button>
            </div>
            <div className="filter-section">
                <h3 className="filter-title" onClick={() => toggleSectionVisibility('priceRange')}>
                    Price range
                    <span className={`dropdown-icon ${sectionsVisible.priceRange ? 'open' : ''}`}>▼</span>
                </h3>
                {sectionsVisible.priceRange && (
                    <div className="filter-salary">
                        <input
                            type="text"
                            className="filter-salary-input1"
                            value={`$${priceRange[0]}`}
                            readOnly
                        />
                        <span className='filter-text1'>to</span>
                        <input
                            type="text"
                            className="filter-salary-input2"
                            value={`$${priceRange[1]}`}
                            readOnly
                        />
                        <div className="filter-slider">
                            <Slider
                                value={priceRange}
                                min={0}
                                max={1000}
                                onChange={handleSliderChange}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="filter-section">
                <h3 className="filter-title" onClick={() => toggleSectionVisibility('conditions')}>
                    Brand Name
                    <span className={`dropdown-icon ${sectionsVisible.conditions ? 'open' : ''}`}>▼</span>
                </h3>
                {sectionsVisible.conditions && (
                    <div className="filter-dropdown open">
                        {filteredBrands.map((brand, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    checked={conditions.brands.includes(brand)}
                                    onChange={() => handleCheckboxChange('brands', brand)}
                                /> 
                                {brand}
                            </label>
                        ))}
                    </div>
                )}
            </div>
            <div className="filter-section">
                <h3 className="filter-title" onClick={() => toggleSectionVisibility('categories')}>
                    Categories
                    <span className={`dropdown-icon ${sectionsVisible.categories ? 'open' : ''}`}>▼</span>
                </h3>
                {sectionsVisible.categories && (
                    <div className="filter-dropdown open">
                        {filteredCategories.map((category, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    checked={conditions.categories.includes(category)}
                                    onChange={() => handleCheckboxChange('categories', category)}
                                /> 
                                {category}
                            </label>
                        ))}
                    </div>
                )}
            </div>
            <div className="filter-section">
                <h3 className="filter-title" onClick={() => toggleSectionVisibility('rating')}>
                    Rating
                    <span className={`dropdown-icon ${sectionsVisible.rating ? 'open' : ''}`}>▼</span>
                </h3>
                {sectionsVisible.rating && (
                    <div className="filter-dropdown open">
                        {rating.map((checked, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => handleRatingChange(index)}
                                /> 
                                <span className="filter-stars">{'★'.repeat(index + 1)}{'☆'.repeat(5 - (index + 1))}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Filter;
