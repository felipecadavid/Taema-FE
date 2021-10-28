import React from 'react'

import CategoryList from '../../components/CategoryList/CategoryList'

import './CategoriesPage.css';

function CategoriesPage() {
    return (
        <>
            <h1 className="categoriespage__title">Categorías</h1>
            <CategoryList />
        </>
    )
}

export default CategoriesPage
