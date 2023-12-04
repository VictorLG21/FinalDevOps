"use strict";
const app = require("teem");
class Cliente {
    static async listar() {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select idCliente, Nome from Cliente order by idCliente asc"));
        });
        return lista || [];
    }
    static async obter(nome) {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select idCliente, Nome from Cliente where Nome = ?", [nome,]));
        });
        return (lista && lista[0]) || null;
    }
    static async criar(p) {
        let erro;
        if ((erro = Cliente.validar(p)))
            return erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("insert into Cliente (Nome) values (?)", [p.Nome]);
            }
            catch (e) {
                if (e.cod && e.code === "ER_DUP_ENTRY")
                    erro = `O Cliente ${p.Nome} já existe`;
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
            await sql.query("delete from Cliente where id = ?", [id]);
            if (!sql.affectedRows)
                erro = "Cliente não encontrada";
        });
        return erro;
    }
}
module.exports = Cliente;
//# sourceMappingURL=Cliente.js.map