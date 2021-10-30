import React from 'react'
import { Link } from 'react-router-dom';

import './CategoryComponent.css';

function CategoryComponent({ name, image, id }) {
    return (
        <Link to={`/categorias/${id}`} className="category-container">
            <h2 className="category-name">{name}</h2>
            <img className="category-image" src={image} alt="category"/>
        </Link>
    )
}

export default CategoryComponent
