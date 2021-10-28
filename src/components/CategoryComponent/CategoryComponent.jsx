import React from 'react'

import './CategoryComponent.css';

function CategoryComponent({ name, image }) {
    return (
        <div className="category-container">
            <h2 className="category-name">{name}</h2>
            <img className="category-image" src={image} alt="category"/>
        </div>
    )
}

export default CategoryComponent
