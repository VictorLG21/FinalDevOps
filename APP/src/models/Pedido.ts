import Item from "./item"

export default interface Pedido {
	idPedido: number
	nomeCliente: string
	preco: number
	carrinho: Item[]
}
