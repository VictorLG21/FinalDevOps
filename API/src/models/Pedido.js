"use strict";
const app = require("teem");
class Pedido {
    static async listar() {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select idPedido, nomeCliente, preco from Pedido order by idPedido asc"));
        });
        return lista || [];
    }
    static async obter(idPedido) {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select idPedido, nomeCliente, preco from Pedido where idPedido = ?", [idPedido]));
            if (lista && lista.length) {
                lista[0].carrinho = await sql.query("select idItem, idPedido, idPizza, qtd from Item where idPedido = ?", [idPedido]);
            }
        });
        return (lista && lista[0]) || null;
    }
    static async criar(p) {
        let erro;
        let novopedido;
        await app.sql.connect(async (sql) => {
            try {
                novopedido = await sql.query("insert into Pedido (nomeCliente, preco) values (?,0.00)", [p.nomeCliente]);
            }
            catch (e) {
                if (e.cod && e.code === "ER_DUP_ENTRY")
                    erro = `A Pedido ${p.idPedido} já existe`;
                else
                    throw e;
            }
        });
        return (novopedido && novopedido[0]) || null;
    }
    static async alterar(p) {
        let erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("update Pedido set nomeCliente = ?, preco = ? where idPedido = ?", [p.nomeCliente, p.preco, p.idPedido]);
            }
            catch (e) {
                if (e.cod && e.code === "ER_DUP_ENTRY")
                    erro = `O Pedido ${p.idPedido} já existe`;
                else
                    throw e;
            }
        });
        return erro;
    }
    static validar(p) {
        // throw new Error("Method not implemented.");
        return null;
    }
    static async excluir(id) {
        let erro = null;
        await app.sql.connect(async (sql) => {
            await sql.query("delete from Pedido where idPedido = ?", [id]);
            if (!sql.affectedRows)
                erro = "Pedido não encontrada";
        });
        return erro;
    }
    static async criarPizzaNoPedido(idPedido, idPizza, qtd) {
        let erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("insert into Item (idPedido, idPizza, qtd) values (?,?,?)", [idPedido, idPizza, qtd]);
            }
            catch (e) {
                if (e.cod && e.code === "ER_DUP_ENTRY")
                    erro = `A Pizza já existe neste pedido`;
                else
                    throw e;
            }
        });
        return erro;
    }
    static async excluirPizzaNoPedido(idPedido, idPizza) {
        let erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("delete from Item where idPedido = ? and idPizza = ? ", [idPedido, idPizza]);
            }
            catch (e) {
                if (e.cod && e.code === "ER_DUP_ENTRY")
                    erro = `A Pedido já existe`;
                else
                    throw e;
            }
        });
        return erro;
    }
    static async alterarPizzaNoPedido(idPedido, idPizza, qtd) {
        let erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("update Item set qtd = ? where idPedido = ? and idPizza = ?", [qtd, idPedido, idPizza]);
            }
            catch (e) {
                if (e.cod && e.code === "ER_DUP_ENTRY")
                    erro = `A Pedido já existe`;
                else
                    throw e;
            }
        });
        return erro;
    }
}
module.exports = Pedido;
//# sourceMappingURL=Pedido.js.map