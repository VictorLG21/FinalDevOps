import app = require("teem");
import Pedido = require("../../models/Pedido");
import Pizza = require("../../models/Pizza");
import Item = require("../../models/Item");

class PedidoApiRoute {

  public async listar(req: app.Request, res: app.Response) {
      let lista = await Pedido.listar();

      res.json(lista);
  }

  
  @app.route.methodName("/obter/:id")
  public async obter(req: app.Request, res: app.Response) {
      let erro: string = null;

      let id = parseInt(req.params["id"]);

      let pedido: Pedido = null;
    
      if (!id) {
          erro = "ID inválido";
      } else {
          pedido = await Pedido.obter(id);

          if (!pedido) {
              erro = "Pedido não encontrado!";
          }
      }

      if (erro) {
          res.status(400).json(erro);
      } else {
          res.json(pedido);
      }
  }

  @app.http.post()
  public async criar(req: app.Request, res: app.Response) {
      let erro: string = null;

      let pedido = req.body as Pedido;

      erro = await Pedido.criar(pedido);

      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }

  @app.http.post()
  public async alterar(req: app.Request, res: app.Response) {
      let erro: string = null;

      let pedido = req.body as Pedido;

      erro = await Pedido.alterar(pedido);

      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }

  @app.route.methodName("/criarPizzaNoPedido/:idPedido/:idPizza/:qtd")
  public async criarPizzaNoPedido(req: app.Request, res: app.Response) {
      let erro: string = null;

      let pedido = parseInt(req.params['idPedido'])
      let pizza = parseInt(req.params['idPizza'])
      let qtd = parseInt(req.params['qtd'])
      erro = await Pedido.criarPizzaNoPedido(pedido, pizza, qtd);

      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }

  @app.route.methodName("/alterarPizzaNoPedido/:idPedido/:idPizza/:qtd")
  public async alterarPizzaNoPedido(req: app.Request, res: app.Response) {
      let erro: string = null;

      let pedido = parseInt(req.params['idPedido'])
      let pizza = parseInt(req.params['idPizza'])
      let qtd = parseInt(req.params['qtd'])
      erro = await Pedido.alterarPizzaNoPedido(pedido, pizza, qtd);

      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }


  @app.route.methodName("/excluirPizzaNoPedido/:idPedido/:idPizza")
  public async excluirPizzaNoPedido(req: app.Request, res: app.Response) {
      let erro: string = null;

      let pedido = parseInt(req.params['idPedido'])
      let pizza = parseInt(req.params['idPizza'])
      erro = await Pedido.excluirPizzaNoPedido(pedido, pizza);

      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }

  @app.route.methodName("/excluir/:id")
  public async excluir(req: app.Request, res: app.Response) {
      let erro: string = null;

      let id = parseInt(req.params["id"]);

      if(isNaN(id)){
          erro = "Id inválido";
      } else{
          erro = await Pedido.excluir(id);
      }
      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }
}

export = PedidoApiRoute;