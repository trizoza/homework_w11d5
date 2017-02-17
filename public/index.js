/*

https://img.pokemondb.net/sprites/red-blue/normal/wynaut.png

*/

var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
};

var requestComplete = function() {
  console.log("We made a request");
  if( this.status !== 200) return;
  var jsonString = this.responseText;
  var pokemons = JSON.parse(jsonString);
  console.log('this is pokemons:', pokemons);
  console.log('results:', pokemons.pokemon);
  console.log('results:', pokemons.pokemon[0]);
  console.log('results:', pokemons.pokemon[0].name);
  populateList(pokemons.pokemon);
};


var populateList = function(APIarray) {
  var ul = document.getElementById('country-list');
  for (var i = 0; i < APIarray.length; i++) {
    var li = document.createElement('li');
    li.innerText = APIarray[i].name;
    ul.appendChild(li);
  };
};

var onButtonClick = function() {
  var url = "https://pokeapi.co/api/v1/pokedex/1/";
  makeRequest(url, requestComplete);
};

var app = function(){
  var button = document.querySelector('#populate-button');
  button.onclick = onButtonClick;
};

window.onload = app;