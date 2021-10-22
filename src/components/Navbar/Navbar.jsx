import React from 'react'
import { Link } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__mobile">
                <input type="text" placeholder="Busca lo que deseas" />
            </div>
            <div className="navbar__desktop">
                <ul>
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/">Cómo comprar</Link>
                    </li>
                    <li>
                        <Link to="/">Escríbenos por WhatsApp</Link>
                    </li>
                    <li>
                        <Link to="/">Catálogo</Link>
                    </li>
                    <li>
                        <Link to="/">Agendas</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar