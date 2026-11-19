const shownIds = new Set();
let searchText = "";     // "" = show every card
const saved = JSON.parse(localStorage.getItem("pokemonCache"));
const pokemonCache = new Map(saved || []);

const form = document.getElementById("pokemon-form");


pokemonCache.forEach(function (pokemon) {
    renderCard(pokemon);
});
fillTypeFilter();

const typeFilter = document.getElementById("type-filter");

const statusMessage = document.getElementById("status-message");
statusMessage.hidden = true;    

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const pokemon_name = document.getElementById("name").value.trim().toLowerCase();

    if(pokemon_name){
        loadPokemon(pokemon_name);
    }

});

async function getPokemon(pokemon_name) {
    if (pokemonCache.has(pokemon_name)) {
        return pokemonCache.get(pokemon_name);
    }

    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon_name);
        if (!response.ok) return null;       

        const data = await response.json();

        const slim = {
            id: data.id,
            name: data.name,
            image: data.sprites.other.home.front_default || data.sprites.front_default,
            types: data.types.map((t) => t.type.name),
            height: data.height,
            weight: data.weight,
            abilities: data.abilities.map((a) => a.ability.name),
            stats: data.stats.map((s) => ({ name: s.stat.name, value: s.base_stat }))
        };

        pokemonCache.set(pokemon_name, slim);
        localStorage.setItem("pokemonCache", JSON.stringify([...pokemonCache]));

        return slim;
    } catch (error) {
        console.error("Fetch failed:", error);
        return null;
    }
}

function findInCache(query) {
    return [...pokemonCache.values()].filter(
        (p) => p.name.includes(query) || String(p.id) === query
    );
}

async function loadPokemon(pokemon_name) {
    let matches = findInCache(pokemon_name);        // 1. local storage first, partial is fine

    if (matches.length === 0) {                     // 2. only then the API (it needs the full name)
        statusMessage.hidden = false;
        const pokemon = await getPokemon(pokemon_name);
        statusMessage.hidden = true;
        if (pokemon) matches = [pokemon];
    }

    if (matches.length > 0) {
        // one match: use its real name (the user may have typed an id)
        searchText = matches.length === 1 ? matches[0].name : pokemon_name;
        typeFilter.value = "all";                   // otherwise a type filter could hide the result
        matches.forEach(renderCard);                // cards already on screen are skipped
        fillTypeFilter();
        filterPokemons();
    } else {
        alert("not found");
    }
}

async function renderCard(pokemon) {

    if (shownIds.has(pokemon.id)) return;  
    shownIds.add(pokemon.id);

    const parentList = document.getElementById("pokemon-grid");

    var div1 = document.createElement("div");
    div1.classList.add("pokemon-card");
    div1.dataset.id = pokemon.id;  
    div1.dataset.name = pokemon.name;
    var img = document.createElement("img");
    img.classList.add("pokemon-img");
    img.src = pokemon.image;
    var p = document.createElement("p");
    p.classList.add("pokemon-id");
    p.innerText = "#"+ String(pokemon.id).padStart(3, "0");
    var h3 = document.createElement("h3");
    h3.classList.add("pokemon-name");
    h3.innerText = pokemon.name;
    var div2 = document.createElement("div");
    div2.classList.add("type-list");

    pokemon.types.forEach(function(typeName) {
        var span = document.createElement("span");
        span.classList.add("type-badge","type-" + typeName);
        span.innerText = typeName;
        div2.appendChild(span);
    })

    div1.dataset.types = pokemon.types.join(",");  
    parentList.appendChild(div1);
    div1.appendChild(img);
    div1.appendChild(p);
    div1.appendChild(h3);
    div1.appendChild(div2);
    
    [...grid.children]
        .sort((a, b) => Number(a.dataset.id) - Number(b.dataset.id))
        .forEach((card) => grid.appendChild(card));
}

function showDetails(id){    
    const pokemon = [...pokemonCache.values()].find((p) => p.id === id);
        console.log("pokemon : ", pokemon);
        console.log("saved : ", saved);
    const pokemonName = document.getElementById("detail-name");
    pokemonName.innerText = pokemon.name;  
    const pokemonId = document.getElementById("detail-id");
    pokemonId.innerText = "#"+ String(pokemon.id).padStart(3, "0");
    const parentList = document.getElementById("detail-card");    
    const img = document.getElementById("detail-image");
    img.src = pokemon.image;   
    const height = document.getElementById("detail-height");
    height.innerText = pokemon.height;
    const weight = document.getElementById("detail-weight");
    weight.innerText = pokemon.weight;
    const abilities = document.getElementById("detail-abilities");
    abilities.innerText = pokemon.abilities;

    
    const pokemonType= document.getElementById("detail-types");

    pokemonType.innerText = "";
    pokemon.types.forEach(function(pType) {
        var span = document.createElement("span");
        span.classList.add("type-badge","type-" + pType);
        span.innerText = pType;
        pokemonType.appendChild(span);
    });

    var div1a =  document.getElementById("detail-stats");

    pokemon.stats.forEach(function(stats) {
        var div1 = document.createElement("div");
        div1.classList.add("stat-row");
        var spanName = document.createElement("span");
        spanName.classList.add("stat-name");
        spanName.innerText = stats.name;
        var spanValue = document.createElement("span");
        spanValue.classList.add("stat-value");
        spanValue.innerText =  stats.value;
        
        var div2 = document.createElement("div");
        div2.classList.add("stat-bar");     
        var div3 = document.createElement("div");
        div3.classList.add("stat-fill");
        div3.style.width =  stats.value + "%";
        
        div1.appendChild(spanName);
        div1.appendChild(spanValue);
        div2.appendChild(div3);
        div1.appendChild(div2);
        div1a.appendChild(div1);
    });
    
    document.getElementById("list_screen").hidden = true;
    document.getElementById("detail_screen").hidden = false;
}

document.getElementById("pokemon-grid").addEventListener("click", function (event) {
    const card = event.target.closest(".pokemon-card");
    if (!card) return;
    const id = Number(card.dataset.id);
    showDetails(id);
});

document.getElementById("back-btn").addEventListener("click", function (event) {
    document.getElementById("list_screen").hidden = false;
    document.getElementById("detail_screen").hidden = true ;
});


function fillTypeFilter() {
    const select = document.getElementById("type-filter");
    const current = select.value;            // remember what's selected

    const types = new Set();
    pokemonCache.forEach(function (pokemon) {
        pokemon.types.forEach(function (typeName) {
            types.add(typeName);
        });
    });

    select.innerHTML = '<option value="all">All types</option>';

    [...types].sort().forEach(function (typeName) {
        var option = document.createElement("option");
        option.value = typeName;
        option.innerText = typeName;
        select.appendChild(option);
    });

    select.value = current; 
}

function filterPokemons(){
    const selected = typeFilter.value;

    document.querySelectorAll(".pokemon-card").forEach(function (card) {
        const types = card.dataset.types.split(",");
        const typeOk = selected === "all" || types.includes(selected);
        const searchOk = searchText === "" ||
                         card.dataset.name.includes(searchText) ||
                         card.dataset.id === searchText;
        card.hidden = !(typeOk && searchOk);
    });
}

// attached once, outside the function
typeFilter.addEventListener("change", filterPokemons);

// emptying the search box brings the full list back
document.getElementById("name").addEventListener("input", function (event) {
    if (event.target.value.trim() === "") {
        searchText = "";
        filterPokemons();
    }
});
