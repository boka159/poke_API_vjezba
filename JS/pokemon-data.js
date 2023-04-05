$(document).ready(function(){

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

// let request = new XMLHttpRequest();

//priprema poziva na (pokemon) API
// request.open("GET", "https://pokeapi.co/api/v2/pokemon-color/yellow", true);

let listaPokemona = [];

function prikaziPokemone(){
    // const resp = JSON.parse(request.response);
    const sourceHTML = document.getElementById("lista-pokemona").innerHTML;
    const template = Handlebars.compile(sourceHTML);

    const ctxData = {
        pokemon: listaPokemona, tableClass: 'table'};
    const html = template(ctxData);

    document.getElementById("div-pokemoni").innerHTML = html;
}

function popuniPokemone1(podaci){
    let pokemoni = podaci.pokemon_species.slice(0,20);
    for(let i = 0; i < pokemoni.length; i++){
        let onePokemon = pokemoni[i];
        // console.log("----> " + onePokemon.name + "; url: " + onePokemon.url);
        dohvatiDetalje(onePokemon);
    }
}

function dohvatiDetalje(pokemon){
    $.ajax({
        url: pokemon.url,
      }).done(function(podaci) {
          const imePokemona = pokemon.name;
          const urlPokemona = pokemon.url;
          const habi = podaci.habitat.name;
          const grow = podaci.growth_rate.name;

          let myPokemon = {
              name: imePokemona,
              url: urlPokemona,
              habitat: habi,
              growth: grow
          };

          listaPokemona.push(myPokemon);

        //   console.log("Pokemon: " + imePokemona + "; Habitat: " + habi + "; Growth rate: " + grow);

        // console.log("pokemon detalji: " + JSON.stringify(podaci));
      });
}

function dodajPruge(){
    $("table tr").removeClass("pruge");
    $("table tr:even").addClass("pruge");
}

function dodajHeaderBoju(){
    $("table th").css("color", "darkblue");
    $("table th").css("background-color", "green");
}

function nakon2Sekunde(){
    setTimeout(function(){
        let myPokemonP = $("table td a:contains('p')").filter(function(){
            return this.innerHTML.indexOf('p') == 0;
        });
        myPokemonP.closest("tr").remove();
        dodajPruge();

        console.log("skrivenih: " + myPokemonP.length);
        $('<div id="skriveni"></div>')
            .insertAfter($('#div-pokemoni'))
            .text("Skrivenih: " + myPokemonP.length);
    }, 2000);
}

function registirajMouseEvent(){
    $("table tr").on("mouseenter", event => {
        $(event.currentTarget).css("background-color", "magenta"); 
    });

    $("table tr").on("mouseleave", event => {
        $(event.currentTarget).removeAttr("style"); 
    });
}

//funkcija koja se izvršava nakon loadanja i određuje redoslijed ostalih funckija (ako imamo više)
function odradiOstalo(){
    $('[data-bs-toggle="popover"]').popover();
    dodajPruge();
    dodajHeaderBoju();
    registirajMouseEvent();
    nakon2Sekunde();
}

//funkcija koja će se pozvati na loadanju stranice
// request.onload = function(){
//     popuniPokemone();
//     odradiOstalo();
// }

//pošalji request na (pokemon) API
    // request.send();

    // $(window).resize(() => {
    //     console.log("Width: " + window.innerWidth);
    //     console.log("Height: " + $(window).height());
    // });

    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon-color/yellow",
      }).done(function(podaci) {
        popuniPokemone1(podaci);
        prikaziPokemone(podaci);

        // odradiOstalo();
      })
      .fail(function() {
        console.log( "error" );
        $('<div id="skriveni"></div>')
            .insertAfter($('#div-pokemoni'))
            .text("Nije učitano, pokušajte kasnije!");
      });

});