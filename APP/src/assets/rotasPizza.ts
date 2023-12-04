import Pizza from "../models/pizza";

export default async function listarPizza(): Promise<Pizza[]> {
    try {
        let response = await fetch("http://localhost:3000/api/pizza/listar");
        return await response.json() as Pizza[]
    }

    catch (motivoDoErro) {
        alert("Algo saiu errado" + motivoDoErro);
    }
}
