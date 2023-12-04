"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const app = require("teem");
const Pizza = require("../../models/Pizza");
class PizzaApiRoute {
    async listar(req, res) {
        let lista = await Pizza.listar();
        res.json(lista);
    }
    async obter(req, res) {
        let erro = null;
        let id = parseInt(req.params["id"]);
        let pizza = null;
        if (isNaN(id)) {
            erro = "Id inválido";
        }
        else {
            pizza = await Pizza.obter(id);
            if (!pizza) {
                erro = "Pizza não encontrado!";
            }
        }
        if (erro) {
            res.status(400).json(erro);
        }
        else {
            res.json(pizza);
        }
    }
    async criar(req, res) {
        let erro = null;
        let pizza = req.body;
        erro = await Pizza.criar(pizza);
        if (erro) {
            res.status(400).json(erro);
        }
        else {
            res.json(true);
        }
    }
    async alterar(req, res) {
        let erro = null;
        let pizza = req.body;
        erro = await Pizza.alterar(pizza);
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
            erro = await Pizza.excluir(id);
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
    app.route.methodName("/obter/:id")
], PizzaApiRoute.prototype, "obter", null);
__decorate([
    app.http.post()
], PizzaApiRoute.prototype, "criar", null);
__decorate([
    app.http.post()
], PizzaApiRoute.prototype, "alterar", null);
__decorate([
    app.route.methodName("/excluir/:id")
], PizzaApiRoute.prototype, "excluir", null);
module.exports = PizzaApiRoute;
//# sourceMappingURL=pizza.js.map