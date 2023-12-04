import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/navbar";

function NotFound() {

	return (
		<>
			<Navbar />
			<h1 className="erro">Página não encontrada</h1>
		</>

	);
}

export default NotFound;
