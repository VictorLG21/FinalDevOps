import React, { useState } from "react";
import { excluirPizzaPedido, alterarPizzaPedido, criarPizzaPedido, alterar } from "../assets/rotasPedido";
import Pedido from "../models/pedido";
import Pizza from "../models/pizza";

interface PizzaProps {
	pizza: Pizza
	adicionavel: boolean
	removivel: boolean
	qtd?: number
	pedido?: Pedido
}

function CompPizza(props: PizzaProps) {
	async function addPizza(qtd: number) {
		await criarPizzaPedido(props.pedido.idPedido, props.pizza.idPizza, qtd)

		props.pedido.preco += parseFloat(props.pizza.preco) * qtd
		await alterar(props.pedido)

		window.location.reload()
	}

	async function editPizza(qtd: number) {
		if (qtd <= 0) {
			await excluirPizzaPedido(props.pedido.idPedido, props.pizza.idPizza)

			props.pedido.preco -= parseFloat(props.pizza.preco) * props.qtd
			await alterar(props.pedido)

			window.location.reload()
		}
		else {
			await alterarPizzaPedido(props.pedido.idPedido, props.pizza.idPizza, qtd)

			if (qtd > props.qtd) {
				props.pedido.preco += parseFloat(props.pizza.preco) * (qtd - props.qtd)
			}
			else {
				props.pedido.preco -= parseFloat(props.pizza.preco) * (props.qtd - qtd)
			}
			await alterar(props.pedido)
		}
	}

	function parseInputValue(id: string) {
		return parseInt((document.getElementById(id) as HTMLInputElement).value)
	}

	return (
		<div className="pizza">
			<div className="pizzaCabecalho">
				<h3>{props.pizza.nome}</h3> <span className="preco">R${props.pizza.preco}</span>
			</div>
			<p>{props.pizza.descricao}</p>

			{props.adicionavel ? <>
				<input type="number" id={`qtdAdd${props.pizza.idPizza}`} defaultValue={1} min="1" />
				<button onClick={() => addPizza(parseInputValue(`qtdAdd${props.pizza.idPizza}`))}>➕</button>
			</> : <></>}

			{props.removivel ? <>
				<input type="number" id={`qtdDelete${props.pizza.idPizza}`} defaultValue={props.qtd} min="0" />
				<button onClick={() => editPizza(parseInputValue(`qtdDelete${props.pizza.idPizza}`))}>📝</button>
			</> : <></>}

		</div>
	);
}

export default CompPizza;
