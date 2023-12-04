import Pedido from "../models/Pedido";

export async function listarPedido(): Promise<Pedido[]> {
    try {
        let pedidos = await fetch("http://localhost:3000/api/pedido/listar");
        return await pedidos.json() as Pedido[]

    } catch (motivoDoErro) {
        alert("Algo saiu errado" + motivoDoErro);
    }
}

export async function obterPedido(id: number): Promise<Pedido> {
    try {
        let pedidos = await fetch(`http://localhost:3000/api/pedido/obter/${id}`);
        return await pedidos.json() as Pedido;
    }
    catch (motivoDoErro) {
        alert("Algo saiu errado" + motivoDoErro);
    }
}

export async function criar(p:Pedido): Promise<Pedido> {
    try {
        let resposta = await fetch("http://localhost:3000/api/pedido/criar", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(p),
        });

        if (await resposta.ok) {
            
        }
        
        return resposta.json()

    } catch (motivoDoErro) {
        alert("Algo saiu errado" + motivoDoErro);
    
    }

}

export async function alterar(p:Pedido) {
    try {

        let resposta = await fetch("http://localhost:3000/api/pedido/alterar", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(p),
        });

        if (await resposta.ok) {
            
        }

    } catch (motivoDoErro) {
        alert("Algo saiu errado" + motivoDoErro);

    }

}

export async function criarPizzaPedido(idPedido: number, idPizza: number, qtd: number) {

    try {
        console.log('id pedido:' + idPedido + ', id pizza:' + idPizza)
        let resposta = await fetch(`http://localhost:3000/api/pedido/criarPizzaNoPedido/${idPedido}/${idPizza}/${qtd}`);
        if (await resposta.ok) {

            listarPedido()
            
        }
        else{
            alert('Não poe a mesma pizza não parceiro, põe pelas abas de cima pf🐱‍👤')
        }
    }
    catch (motivoDoErro) {
        alert("Algo saiu errado" + motivoDoErro);

    }
}

export async function alterarPizzaPedido(idPedido: number, idPizza: number, qtd: number) {
debugger
    try {
        console.log('id pedido:' + idPedido + ', id pizza:' + idPizza)
        let resposta = await fetch(`http://localhost:3000/api/pedido/alterarPizzaNoPedido/${idPedido}/${idPizza}/${qtd}`);
        if (await resposta.ok) {

            listarPedido()
            
        }
    }
    catch (motivoDoErro) {
        alert("Algo saiu errado" + motivoDoErro);

    }
}

export async function excluirPizzaPedido(idPedido: number, idPizza: number) {

    try {
        console.log('id pedido:' + idPedido + ', id pizza:' + idPizza)
        let resposta = await fetch(`http://localhost:3000/api/pedido/excluirPizzaNoPedido/${idPedido}/${idPizza}`);
        if (await resposta.ok) {

            listarPedido()
            
        }
    }
    catch (motivoDoErro) {
        alert("Algo saiu errado" + motivoDoErro);

    }
}

export async function excluir(idPedido: number) {

    try {
        console.log('id pedido:' + idPedido)
        let resposta = await fetch(`http://localhost:3000/api/pedido/excluir/${idPedido}`);
        if (await resposta.ok) {

            listarPedido()
            
        }
    }
    catch (motivoDoErro) {
        alert("Algo saiu errado" + motivoDoErro);

    }
}
