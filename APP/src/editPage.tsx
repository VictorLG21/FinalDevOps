import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CompPizza from "./components/compPizza";
import Navbar from "./components/navbar";
import listarPizza from "./assets/rotasPizza";
import { criar, alterar, obterPedido } from "./assets/rotasPedido";
import Pedido from "./models/Pedido";
import Pizza from "./models/pizza";

function EditPage() {
	const params = useParams();
	const criacao = (params.idPedido == 'create')

	const [atualizando, setAtualizando] = useState(false)
	const [infospizza, setInfospizza] = useState<Pizza[]>(null)
	const [pedido, setPedido] = useState<Pedido>(null)

	if (criacao) {
		return (<>
			<Navbar />
			<section className="formPedidoC">
				<h3>Informe o nome que será registrado no pedido:</h3>
				<input id='nomeCliente' type="text" />
				<button onClick={updateCliente}>➕</button>
			</section>
		</>)
	}


	async function getPedidoPizza() {
		setAtualizando(true);
		setInfospizza(await listarPizza() || []);
		setPedido(await obterPedido(parseInt(params.idPedido)));
		setAtualizando(false);
	}

	async function getPedidoPizzaZuada(id: number) {
		setAtualizando(true);
		setInfospizza(await listarPizza() || []);
		setPedido(await obterPedido(id))
		setAtualizando(false);
	}

	useEffect(() => {
		if (!atualizando && (!pedido || !infospizza)) {
			getPedidoPizza();
		}
	});

	if (!pedido || !infospizza) {
		return <> <Navbar /> Carregando...</>;
	}


	let pizzas: JSX.Element[] = []
	let pizzascarrinho: Pizza[] = []
	let carrinho: JSX.Element[] = []

	pizzas = infospizza.map((pizza) => <CompPizza pedido={pedido} key={pizza.idPizza} pizza={pizza} adicionavel={true} removivel={false} />)

	if (pedido.carrinho.length) {
		for (let p = 0; p < pedido.carrinho.length; p++) {
			for (let i = 0; i < infospizza.length; i++) {
				if (pedido.carrinho[p].idPizza == infospizza[i].idPizza) {
					pizzascarrinho[p] = infospizza[i]
					console.log(pizzascarrinho[p].nome)
				}
			}
		}
		for (let i = 0; i < pedido.carrinho.length; i++) {
			carrinho[i] = <CompPizza key={pedido.carrinho[i].idItem} pedido={pedido} pizza={pizzascarrinho[i]} qtd={pedido.carrinho[i].qtd} adicionavel={false} removivel={true} />
		}
	}
	else {
		carrinho = [<p>{'nenhuma pizza no carrinho'}</p>]
	}
	//let carrinho: JSX.Element[] = pedido.carrinho.length ? pedido.carrinho.map((p) => <CompPizza key={p.idItem} pizza={pizzascarrinho[p]} qtd={p.qtd} adicionavel={false} removivel={true} />) : [<p>{'nenhuma pizza no carrinho'}</p>]

	async function updateCliente() {
		let novoNome = (document.getElementById('nomeCliente') as HTMLInputElement).value
		if (criacao) {
			let novoPedido: Pedido = {
				idPedido: null,
				nomeCliente: novoNome,
				preco: null,
				carrinho: null,
			}

			await criar(novoPedido)
		}
		else {
			let novoPedido: Pedido = { ...pedido }
			novoPedido.nomeCliente = novoNome
			alterar(novoPedido)
		}
	}

	return (
		<>
			<Navbar />
			<section className="formPedido">
				<input id='nomeCliente' type="text" defaultValue={pedido.nomeCliente} />
				<span className="preco">R${pedido.preco}</span>
				<button onClick={updateCliente}>📝</button>
			</section>
			<div className="carrinho">
				<h3 className="carrinhoTitulo">Zippas no carrinho:</h3>
				<div className="carrinhoLista">
					{carrinho}
				</div>
			</div>
			<hr />
				<h2>Adicionar Zippas:</h2>
				{pizzas}
		</>
	);
}

export default EditPage;