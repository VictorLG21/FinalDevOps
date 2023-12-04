import { criar } from "../../src/assets/rotasPedido";

describe("CriarPedido", () => {
    it("Criacao de pedido", async () => {
        let novoPedido = {
            idPedido: null,
            nomeCliente: "Victor",
            preco: 23.99,
            carrinho: null
        };

        let pedido = await (criar(novoPedido));
        expect(pedido).toBe(true);

    })


})
