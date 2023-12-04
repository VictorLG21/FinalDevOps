import app = require("teem");
import Pizza = require("../../models/Pizza");

class PizzaApiRoute {
  public async listar(req: app.Request, res: app.Response) {
      let lista = await Pizza.listar();

      res.json(lista);
  }

  
  @app.route.methodName("/obter/:id")
  public async obter(req: app.Request, res: app.Response) {
      let erro: string = null;

      let id = parseInt(req.params["id"]);

      let pizza: Pizza = null;

      if (isNaN(id)) {
          erro = "Id inválido";
      } else {
          pizza = await Pizza.obter(id);

          if (!pizza) {
              erro = "Pizza não encontrado!";
          }
      }

      if (erro) {
          res.status(400).json(erro);
      } else {
          res.json(pizza);
      }
  }

  @app.http.post()
  public async criar(req: app.Request, res: app.Response) {
      let erro: string = null;

      let pizza = req.body as Pizza;

      erro = await Pizza.criar(pizza);

      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }

  @app.http.post()
  public async alterar(req: app.Request, res: app.Response) {
      let erro: string = null;

      let pizza = req.body as Pizza;

      erro = await Pizza.alterar(pizza);

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
          erro = await Pizza.excluir(id);
      }
      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }
}

export = PizzaApiRoute;