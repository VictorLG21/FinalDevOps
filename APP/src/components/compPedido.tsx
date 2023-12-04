import React from "react";
import Pedido from "../models/pedido";
import { Link } from "react-router-dom";
import {excluir} from '../assets/rotasPedido'

interface CompPedidoProps {
    pedido: Pedido
}

function CompPedidos(props: CompPedidoProps) {

    async function deletePedido() {
        await excluir(props.pedido.idPedido)
        window.location.reload()
    }

    return (
        <div>
            <div className="pedidoCabecalho">
                <h3>{props.pedido.nomeCliente}</h3> <span className="preco">Preço total: R${props.pedido.preco}</span>
            </div>
            <button className='botaoPedido'> <Link className="noLine" to={`/editPage/${props.pedido.idPedido}`}>📝</Link></button>
            <button onClick={deletePedido}>❌</button>
        </div>
    );

}

export default CompPedidos;
