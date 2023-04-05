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

function popuniPokemone(data){
    // const resp = JSON.parse(request.response);
    const sourceHTML = document.getElementById("lista-pokemona").innerHTML;
    const template = Handlebars.compile(sourceHTML);

    const ctxData = {pokemon: data.pokemon_species.slice(0,20), tableClass: 'table'};
    const html = template(ctxData);

    document.getElementById("div-pokemoni").innerHTML = html;
    $('[data-bs-toggle="popover"]').popover();
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

    $(window).resize(() => {
        console.log("Width: " + window.innerWidth);
        console.log("Height: " + $(window).height());
    });

    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon-color/yellow",
        timeout: 20
      }).done(function(data) {
        popuniPokemone(data);
        odradiOstalo();
      })
      .fail(function() {
        console.log( "error" );
        $('<div id="skriveni"></div>')
            .insertAfter($('#div-pokemoni'))
            .text("Nije učitano, pokušajte kasnije!");
      });

});