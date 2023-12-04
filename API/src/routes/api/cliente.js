"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const app = require("teem");
const Cliente = require("../../models/Cliente");
class ClienteApiRoute {
    async listar(req, res) {
        let lista = await Cliente.listar();
        res.json(lista);
    }
    async obter(req, res) {
        let erro = null;
        let nome = req.params["nome"];
        let cliente = null;
        if (!nome) {
            erro = "Nome inválido";
        }
        else {
            cliente = await Cliente.obter(nome);
            if (!cliente) {
                erro = "Cliente não encontrado!";
            }
        }
        if (erro) {
            res.status(400).json(erro);
        }
        else {
            res.json(cliente);
        }
    }
    async criar(req, res) {
        let erro = null;
        let cliente = req.body;
        erro = await Cliente.criar(cliente);
        if (erro) {
            res.status(400).json(erro);
        }
        else {
            res.json(true);
        }
    }
    async excluir(req, res) {
        let erro = null;
        let id = parseInt(req.params["id"]);
        if (isNaN(id)) {
            erro = "Id inválido";
        }
        else {
            erro = await Cliente.excluir(id);
        }
        if (erro) {
            res.status(400).json(erro);
        }
        else {
            res.json(true);
        }
    }
}
__decorate([
    app.route.methodName("/obter/:nome")
], ClienteApiRoute.prototype, "obter", null);
__decorate([
    app.http.post()
], ClienteApiRoute.prototype, "criar", null);
__decorate([
    app.route.methodName("/excluir/:id")
], ClienteApiRoute.prototype, "excluir", null);
module.exports = ClienteApiRoute;
//# sourceMappingURL=cliente.js.map