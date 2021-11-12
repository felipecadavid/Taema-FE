import React from 'react';

import AdminOrders from '../../../components/Admin/AdminOrders/AdminOrders';

import './DashboardPage.css';

function DasboardPage() {
    const [currentPage, setCurrentPage] = React.useState("orders");

    const pages = {
        orders: <AdminOrders />,
        products: <div>products</div>,
    }

    const handleClick = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className="dashboard-container">
         <nav className="dashboard-nav">
             <ul className="dashboard-nav__ul">
                 <li onClick={() => handleClick("orders")} className={`dashboard-nav__li ${currentPage === "orders" && "selected"}`}>Ordenes</li>
                 <li onClick={() => handleClick("products")} className={`dashboard-nav__li ${currentPage === "products" && "selected"}`}>Productos</li>
             </ul>
         </nav>
            <div className="dashboard-content">
                {pages[currentPage]}    
            </div>
         </div>
    );
}

export default DasboardPage;