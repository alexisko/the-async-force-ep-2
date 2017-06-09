/*jshint esversion: 6 */
var option, input, resourceType, resourceId,
requestResourceButton, contentContainer;

option = document.getElementById('resourceType');
input = document.getElementById('resourceId');
requestResourceButton = document.getElementById('requestResourceButton');
contentContainer = document.getElementById('contentContainer');

requestResourceButton.addEventListener('click', function() {
  resourceId = input.value;
  resourceType = option.options[option.selectedIndex].value;
  if(contentContainer.firstChild !== null) {
    while(contentContainer.firstChild) {
      contentContainer.removeChild(contentContainer.firstChild);
    }
  }
  if(resourceType === 'people') {
    (function() {
      var req, name, gender, species, speciesReq;
      req = new XMLHttpRequest();
      req.addEventListener('error', function() {
        var error = document.createElement('h2');
        error.innerHTML = "Error could not be found!";
      });
      req.addEventListener('load', function() {
        var response = JSON.parse(this.responseText);

        name = document.createElement('h2');
        name.innerHTML = response.name;
        gender = document.createElement('p');
        gender.innerHTML = response.gender;
        species = document.createElement('p');
        speciesReq = new XMLHttpRequest();
        speciesReq.addEventListener('load', function() {
          var speciesResponse = JSON.parse(this.responseText);
          species.innerHTML = speciesResponse.name;
        });
        speciesReq.open('GET', response.species[0]);
        speciesReq.send();
        contentContainer.appendChild(name);
        contentContainer.appendChild(gender);
        contentContainer.appendChild(species);
      });
      req.open('GET', `http://swapi.co/api/people/${resourceId}`);
      req.send();
    })();
  } else if(resourceType === 'planets') {
    (function() {
      var req, name, terrain, population, films;
      req = new XMLHttpRequest();
      req.addEventListener('error', function() {
        var error = document.createElement('h2');
        error.innerHTML = "Error could not be found!";
      });
      req.addEventListener('load', function() {
        var response = JSON.parse(this.responseText);

        name = document.createElement('h2');
        name.innerHTML = response.name;
        terrain = document.createElement('p');
        terrain.innerHTML = response.terrain;
        population = document.createElement('p');
        population.innerHTML = response.population;
        films = document.createElement('ul');
        for(var i = 0; i < response.films.length; i++) {
          (function(ul) {
            var filmsReq, filmLi, filmResponse;
            filmsReq = new XMLHttpRequest();
            filmsReq.addEventListener('load', function() {
              filmResponse = JSON.parse(this.responseText);
              filmLi = document.createElement('li');
              filmLi.innerHTML = filmResponse.title;
              ul.appendChild(filmLi);
            });
            filmsReq.open('GET', `http://swapi.co/api/films/${i+1}/`);
            filmsReq.send();
          })(films);
        }
        contentContainer.appendChild(name);
        contentContainer.appendChild(terrain);
        contentContainer.appendChild(population);
        contentContainer.appendChild(films);
      });
      req.open('GET', `http://swapi.co/api/planets/${resourceId}`);
      req.send();
    })();
  } else if(resourceType === 'starships') {
    (function() {
      var req, name, manufacturer, starshipClass, films;
      req = new XMLHttpRequest();
      req.addEventListener('error', function() {
        var error = document.createElement('h2');
        error.innerHTML = "Error could not be found!";
        contentContainer.appendChild(error);
      });
      req.addEventListener('load', function() {
        var response = JSON.parse(this.responseText);

        name = document.createElement('h2');
        name.innerHTML = response.name;
        manufacturer = document.createElement('p');
        manufacturer.innerHTML = response.manufacturer;
        starshipClass = document.createElement('p');
        starshipClass.innerHTML = response.starship_class;
        films = document.createElement('ul');
        for(var i = 0; i < response.films.length; i++) {
          (function(ul) {
            var filmsReq, filmLi, filmResponse;
            filmsReq = new XMLHttpRequest();
            filmsReq.addEventListener('load', function() {
              filmResponse = JSON.parse(this.responseText);
              filmLi = document.createElement('li');
              filmLi.innerHTML = filmResponse.title;
              ul.appendChild(filmLi);
            });
            filmsReq.open('GET', `http://swapi.co/api/films/${i+1}/`);
            filmsReq.send();
          })(films);
        }
        contentContainer.appendChild(name);
        contentContainer.appendChild(manufacturer);
        contentContainer.appendChild(starshipClass);
        contentContainer.appendChild(films);
      });
      req.open('GET', `http://swapi.co/api/starships/${resourceId}`);
      req.send();
    })();
  }
});