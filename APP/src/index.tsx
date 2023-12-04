import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Pedidos from "./pedidos";
import EditPage from "./editPage";
import NotFound from "./notFound";

ReactDOM.render(
	<React.StrictMode>
		<HashRouter>
			<Routes>
				<Route path="/" element={<Login/>} />
				<Route path="/home" element={<Home/>} />
				<Route path="/pedidos" element={<Pedidos/>}/>
				<Route path="/editPage/:idPedido" element={<EditPage/>}></Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</HashRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
