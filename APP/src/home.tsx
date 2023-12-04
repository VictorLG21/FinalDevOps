import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/navbar";
import Pizza from "./models/pizza"
import CompPizza from "./components/compPizza"
import listarPizza from "./assets/rotasPizza"

function Home() {
	const [atualizando, setAtualizando] = useState(false)
	const [infospizza, setInfospizza] = useState<Pizza[]>(null)

	async function getPizzas() {
		setAtualizando(true);
		setInfospizza(await listarPizza() || [])
		setAtualizando(false);
	}

	useEffect(() => {
		if (!atualizando && !infospizza)
			getPizzas()
	});

	if(!infospizza){
		return <> <Navbar /> Carregando...</>
	}

	let pizzas: JSX.Element[] = infospizza.map((pizza) => <CompPizza key={pizza.idPizza} pizza={pizza} adicionavel={false} removivel={false} />)
	return (
		atualizando ? (<>Carregando...</>) : (<>
			<Navbar />
			{pizzas}
		</>));
}

export default Home;
