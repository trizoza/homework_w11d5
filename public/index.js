var app = function(){

  var pokemons = [];
  var player = [];
  var field = [];
  var ash = document.createElement('img');
  ash.src = "img/ash.png";
  var ashWidth = 40;
  var ashHeight = ashWidth;
  var increment = 20;
  var grass = document.createElement('img');
  grass.src = "img/grass.png";
  var x = 300;
  var y = 200;
  var canvas = document.querySelector("#island");
  var context = canvas.getContext('2d');
  var x1 = 0;
  var y1 = 0;
  var x2 = 0;
  var y2 = 0;
  var x3 = 0;
  var y3 = 0;

  /*
  https://img.pokemondb.net/sprites/red-blue/normal/wynaut.png
  */

  ///////////// CREATION OF POKEMON LIST //////////////////////////

  var requestPokemon = function(callback) {
    console.log('requesting Pokemon name');
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
      var eachPokemon = {
        name: "",
        attack: 0
      };
      eachPokemon.name = pokemonsObjects[i].pokemon_species.name;
      eachPokemon.attack = getRandomInt(30, 100);
      console.log(eachPokemon);
      eachPokemon.name = eachPokemon.name.substring(0, 1).toUpperCase() + eachPokemon.name.substring(1);
      pokemons.push(eachPokemon);
    }
    console.log('completing Pokemon');
    populatePokemonSelect();
  };

  var populatePokemonSelect = function() {
    var pokeSelection = document.getElementById('pokemon-select')
    for (var each of pokemons) {
      var pokeChoice = document.createElement('option');
      pokeChoice.innerText = each.name;
      pokeSelection.appendChild(pokeChoice);
    }
  };

  var handleSelectPokemon = function(event) {
    if (player.length == 0) {
      console.log(this.value);
      player.push(this.value);
      console.log('ash pokemon',player);
      for (var each of pokemons) {
        if (each === this.value) {
          var indexOfEach = pokemons.indexOf(each);
          pokemons.splice(indexOfEach, 1);
        }
      }
    }
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

    if (x === x1 && y === y1) {
      var foundScreen = document.querySelector('.found');
      var foundText = document.createElement('p');
      foundScreen.innerText = "You have found " + field[0].name + " with attack " + field[0].attack + "!";
      var questionText = document.createElement('p'); 
      questionText.innerHTML = "<p>Do you want to <u>f</u>ight him?</p>";
      foundScreen.appendChild(foundText);
      foundScreen.appendChild(questionText);
      document.querySelector("#island").classList.toggle("show");
      document.querySelector("#found").classList.toggle("show");
    }

    if (x === x2 && y === y2) {
      var foundScreen = document.querySelector('.found');
      var foundText = document.createElement('p');
      foundScreen.innerText = "You have found " + field[1].name + " with attack " + field[1].attack + "!";
      var questionText = document.createElement('p'); 
      questionText.innerHTML = "<p>Do you want to <u>f</u>ight him?</p>";
      foundScreen.appendChild(foundText);
      foundScreen.appendChild(questionText);
      document.querySelector("#island").classList.toggle("show");
      document.querySelector("#found").classList.toggle("show");
    }

    if (x === x3 && y === y3) {
      var foundScreen = document.querySelector('.found');
      var foundText = document.createElement('p');
      foundScreen.innerText = "You have found " + field[2].name + " with attack " + field[2].attack + "!";
      var questionText = document.createElement('p'); 
      questionText.innerHTML = "<p>Do you want to <u>f</u>ight him?</p>";
      foundScreen.appendChild(foundText);
      foundScreen.appendChild(questionText);
      document.querySelector("#island").classList.toggle("show");
      document.querySelector("#found").classList.toggle("show");
    }

    if (x === -40 && y === 380) {
      var cheat = prompt("You have found the chamber of cheaters! Do feel like cheating?");
      if (cheat === 'showme') {
        context.drawImage(grass, 0, 0, 335, 166);
        context.drawImage(grass, 335, 0, 335, 166);
        context.drawImage(grass, 0, 166, 335, 166);
        context.drawImage(grass, 335, 166, 335, 166);
        context.drawImage(grass, 0, 332, 335, 166);
        context.drawImage(grass, 335, 332, 335, 166);
        context.drawImage(ash, x1 -20, y1 -20, ashWidth, ashHeight);
        context.drawImage(ash, x2 -20, y2 -20, ashWidth, ashHeight);
        context.drawImage(ash, x3 -20, y3 -20, ashWidth, ashHeight);
      }
      else if (cheat === 'almighty') {
        power = 101;
      }
    }

  };

  ////////// GAME LOGIC ////////////////////////////////////////////////////
  var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var generateFreePokemons = function() {
    x1 = getRandomInt(2/2, 58/2)*increment;
    y1 = getRandomInt(2/2, 38/2)*increment;
    console.log('first free pokemon',x1, y1);
    x2 = getRandomInt(2/2, 58/2)*increment;
    y2 = getRandomInt(2/2, 38/2)*increment;
    console.log('second free pokemon',x2, y2);
    x3 = getRandomInt(2/2, 58/2)*increment;
    y3 = getRandomInt(2/2, 38/2)*increment;
    console.log('third free pokemon',x3, y3);
    for (var i = 0; i < 3; i++) {
      var indexOfRandomPokemon = getRandomInt(0, pokemons.length);
      var randomPokemon = pokemons[indexOfRandomPokemon];
      field.push(randomPokemon);
      pokemons.splice(indexOfRandomPokemon, 1);
    }
    console.log('original pokemons array', pokemons);
    console.log('pokemons on island', field);
  };

  document.onkeydown = function(event) {
    console.log(event.keyCode);
    if (event.keyCode === 80 && player.length != 0) {
      // p
      document.querySelector("#menu").classList.toggle("hide");
      document.querySelector("#island").classList.toggle("show");
      x = 300;
      y = 200;
      generateFreePokemons();
      drawAsh();
    }
    if (event.keyCode === 39) {
      // right
      if (x === x1 && y === y1) {
        moveAsh(increment, 0);
        document.querySelector("#island").classList.toggle("show");
        document.querySelector("#found").classList.toggle("show");
      }
      else if (x === x2 && y === y2) {
        moveAsh(increment, 0);
        document.querySelector("#island").classList.toggle("show");
        document.querySelector("#found").classList.toggle("show");
      }
      else if (x === x3 && y === y3) {
        moveAsh(increment, 0);
        document.querySelector("#island").classList.toggle("show");
        document.querySelector("#found").classList.toggle("show");
      }
      else if (x < 580) {
        moveAsh(increment, 0);
      }
    }
    if (event.keyCode === 37) {
      // left
      if (x === x1 && y === y1) {
        moveAsh(-increment, 0);
        document.querySelector("#island").classList.toggle("show");
        document.querySelector("#found").classList.toggle("show");
      }
      else if (x === x2 && y === y2) {
        moveAsh(-increment, 0);
        document.querySelector("#island").classList.toggle("show");
        document.querySelector("#found").classList.toggle("show");
      }
      else if (x === x3 && y === y3) {
        moveAsh(-increment, 0);
        document.querySelector("#island").classList.toggle("show");
        document.querySelector("#found").classList.toggle("show");
      }
      else if (x > 20) {
        moveAsh(-increment, 0);
      }
      else if (x > -40 && y === 380) {
        moveAsh(-increment, 0);
      }
    }
    if (event.keyCode === 38) {
      // up
      if (x === x1 && y === y1) {
        moveAsh(0, -increment);
        document.querySelector("#island").classList.toggle("show");
        document.querySelector("#found").classList.toggle("show");
      }
      else if (x === x2 && y === y2) {
        moveAsh(0, -increment);
        document.querySelector("#island").classList.toggle("show");
        document.querySelector("#found").classList.toggle("show");
      }
      else if (x === x3 && y === y3) {
        moveAsh(0, -increment);
        document.querySelector("#island").classList.toggle("show");
        document.querySelector("#found").classList.toggle("show");
      }
      if (y > 20 && x > 0) {
        moveAsh(0, -increment);        
      }
    }
    if (event.keyCode === 40) {
      // down
      if (x === x1 && y === y1) {
        moveAsh(0, increment);
        document.querySelector("#island").classList.toggle("show");
        document.querySelector("#found").classList.toggle("show");
      }
      else if (x === x2 && y === y2) {
        moveAsh(0, increment);
        document.querySelector("#island").classList.toggle("show");
        document.querySelector("#found").classList.toggle("show");
      }
      else if (x === x3 && y === y3) {
        moveAsh(0, increment);
        document.querySelector("#island").classList.toggle("show");
        document.querySelector("#found").classList.toggle("show");
      }
      if (y < 380) {
        moveAsh(0, increment);
      }
    }
    ///////// fight ///////////////////
    if (event.keyCode === 70) {
      // f
      if (x === x1 && y === y1) {
        document.querySelector("#fight").classList.toggle("show");
        document.querySelector("#found").classList.toggle("show");
      }
      else if (x === x2 && y === y2) {
        document.querySelector("#fight").classList.toggle("show");
        document.querySelector("#found").classList.toggle("show");
      }
      else if (x === x3 && y === y3) {
        document.querySelector("#fight").classList.toggle("show");
        document.querySelector("#found").classList.toggle("show");
      }
    }
  };

  var calculateWinner = function(powerNumber) {
    if (power > powerNumber) {

    }
  };

  requestPokemon(completePokemon);
  console.log('pokemons', pokemons);
  drawAsh();


};

window.onload = app;