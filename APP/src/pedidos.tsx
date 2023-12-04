import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import CompPedidos from "./components/compPedido";
import { listarPedido} from "./assets/rotasPedido";
import Pedido from "./models/pedido";
import { Link } from "react-router-dom";

function Pedidos() {
	const [atualizando, setAtualizando] = useState(false);
	const [infospedido, setInfospizza] = useState<Pedido[]>(null);

	async function getPedidos() {
		setAtualizando(true);
		setInfospizza(await listarPedido() || []);
		setAtualizando(false);
	}

	useEffect(() => {
		if (!atualizando && !infospedido)
			getPedidos();
	});

	if (!infospedido) {
		return <> <Navbar /> Carregando...</>;
	}
	let pedidos: JSX.Element[] = infospedido.map((pedido) => <CompPedidos key={pedido.idPedido} pedido={pedido} />)

	return (
		<>
			<Navbar />
			<div className="pedidosTitulo">
				<h2>Pedidos:</h2>
				<button><Link className="noLine" to={"/editPage/create/"}>➕</Link></button>
			</div>
			{pedidos}
		</>
	);
}

export default Pedidos;
