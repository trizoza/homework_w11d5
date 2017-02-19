var app = function(){

  var pokemons = ["pikachu", "raichu", "charmander"];
  var player = [];
  var field = [];
  var ash = document.createElement('img');
  ash.src = "img/ash.png";
  var ashWidth = 40; 
  var ashHeight =ashWidth;
  var grass = document.createElement('img');
  grass.src = "img/grass.png";
  var x = 300;
  var y = 200;
  var canvas = document.querySelector("#island");
  var context = canvas.getContext('2d');

  /*
  https://img.pokemondb.net/sprites/red-blue/normal/wynaut.png
  */

  ///////////// CREATION OF POKEMON LIST //////////////////////////

  var requestPokemon = function(callback) {
    console.log('requesting Pokemon');
    var request = new XMLHttpRequest();
    var link = 'https://pokeapi.co/api/v2/pokedex/2/';
    request.open("GET", link);
    request.onload = callback;
    request.send();
  };

  var completePokemon = function() {
    if (this.status !== 200) return;
    var jsonString = this.responseText;
    var jsonObject = JSON.parse(jsonString);
    var pokemonsObjects = jsonObject.pokemon_entries;
    for (var i = 0; i < pokemonsObjects.length; i ++) {
      pokemons.push(pokemonsObjects[i].pokemon_species.name);
    }
    console.log('completing Pokemon');
  };

  var populatePokemonSelect = function() {
    var pokeSelection = document.getElementById('pokemon-select')
    for (var each of pokemons) {
      var pokeChoice = document.createElement('option');
      pokeChoice.innerText = each;
      pokeSelection.appendChild(pokeChoice);
    }
  };

  var handleSelectPokemon = function(event) {
    if (player.length != 0) {
      for (var each of player) {
        player.pop();
      }
    }
    player.push(this.value);
    console.log(this.value);
    console.log(player);
  }

  var select = document.querySelector('#pokemon-select');
  select.onchange = handleSelectPokemon;

  ///////////// FIELD GRAPHIC SETUP ////////////////////////////////////

  var drawAsh = function() {
    context.drawImage(grass, 0, 0, 335, 166);
    context.drawImage(grass, 335, 0, 335, 166);
    context.drawImage(grass, 0, 166, 335, 166);
    context.drawImage(grass, 335, 166, 335, 166);
    context.drawImage(grass, 0, 332, 335, 166);
    context.drawImage(grass, 335, 332, 335, 166);
    context.drawImage(ash, x - 20, y - 20, 40, 40);
  };

  var moveAsh = function(xIncrement, yIncrement) {
    context.drawImage(grass, 0, 0, 335, 166);
    context.drawImage(grass, 335, 0, 335, 166);
    context.drawImage(grass, 0, 166, 335, 166);
    context.drawImage(grass, 335, 166, 335, 166);
    context.drawImage(grass, 0, 332, 335, 166);
    context.drawImage(grass, 335, 332, 335, 166);
    context.drawImage(ash, x -20 + xIncrement, y -20 + yIncrement, ashWidth, ashHeight);
    x += xIncrement;
    y += yIncrement;
    console.log(x,y);
  };

  document.onkeydown = function(event) {
    var increment = 10;
    console.log(event.keyCode);
    if (event.keyCode === 80) {
      // p
      document.querySelector("#menu").classList.toggle("hide");
      document.querySelector("#island").classList.toggle("show");
      drawAsh();
      // document.querySelector('#island').classList.toggle('show');
    }
    if (event.keyCode === 39) {
      // right
      if (x < 580) {
        moveAsh(increment, 0);
      }
    }
    if (event.keyCode === 37) {
      // left
      if (x > 20) {
        moveAsh(-increment, 0);
      }
      else if (x > -20 && y === 380) {
        moveAsh(-increment, 0);
      }
    }
    if (event.keyCode === 38) {
      // up
      if (y > 20) {
        moveAsh(0, -increment);        
      }
    }
    if (event.keyCode === 40) {
      // down
      if (y < 380) {
        moveAsh(0, increment);
      }
    }
  };

  // requestPokemon(completePokemon);
  populatePokemonSelect();
  console.log('pokemons', pokemons);
  drawAsh();


};

window.onload = app;