Handlebars.registerHelper("matematika", function(indexNr, operator, brojN){
    let tmpPrviBr = parseInt(indexNr);
    let tmpDrugiBr = parseInt(brojN);

    return {
        "+": tmpPrviBr + tmpDrugiBr,
        "-": tmpPrviBr - tmpDrugiBr,
        "*": tmpPrviBr * tmpDrugiBr,
        "/": tmpPrviBr / tmpDrugiBr,
        "%": tmpPrviBr % tmpDrugiBr,
    }[operator];
})

let request = new XMLHttpRequest();

//priprema poziva na (pokemon) API
request.open("GET", "https://pokeapi.co/api/v2/pokemon-color/yellow", true);

function popuniPokemone(){
    const resp = JSON.parse(request.response);
    const sourceHTML = document.getElementById("lista-pokemona").innerHTML;
    const template = Handlebars.compile(sourceHTML);

    const ctxData = {pokemon: resp.pokemon_species.slice(0,20)};
    const html = template(ctxData);

    document.getElementById("div-pokemoni").innerHTML = html;
}

//funkcija koja će se pozvati na loadanju stranice
request.onload = function(){
    popuniPokemone();
}

//pošalji request na (pokemon) API
request.send();