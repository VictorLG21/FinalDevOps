import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
	return (
		<>
			<h1>Zipparia</h1>
			<div className="formLogin">
				<label htmlFor="">Login</label>
				<input type="text"/>
				<label htmlFor="" className="senha">Senha</label>
				<input type="text"/>
				<button><Link to="/home">Entrar</Link></button>
			</div>
		</>
	);
}

export default Login;
