const pokeApi = {}

pokeApi.getPokemonsDetails = (cadaPokemon) => { 
    return fetch(cadaPokemon.url) //pega a API requisitada e transforma em JSON
    .then((convertendoJson) => convertendoJson.json())
}

pokeApi.getPokemons = (offset = 0, limit = 20) => { //getPokemons é apenas um parametro escolhido para o que fazer. Pode ser qualquer coisa
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    return fetch(url) //Os parâmetros entre () pode ser qualquer nome!!
        .then((convertendoJson) => convertendoJson.json()) //pega a API e transforma em JSON
        .then((jsonBody) => jsonBody.results) // Agora dentro da API já em formato JSON, acessa a aba 'results'
        .then((dentroListaPokemon) => dentroListaPokemon.map(pokeApi.getPokemonsDetails))
        .then((solicitarDetalhes) => Promise.all(solicitarDetalhes))
        .then((detalhesPokemon) => detalhesPokemon)
    }
