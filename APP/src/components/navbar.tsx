import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h1>Zipparia</h1>
            <ul>
                <Link className="linkNav" to="/home">Zippas</Link>
                <Link className="linkNav" to="/pedidos">Pedidos</Link>
            </ul>
        </nav>
    );
}

export default Navbar;
