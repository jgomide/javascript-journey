var data = {
  listItems: []  
};

//clean malicious code inserted
var sanitizeHTML = function (str) {
	var temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerHTML;
};

function getStarWarsByName(name){
	
	var objStarWars;
	
	fetch('https://swapi.dev/api/people/?search=' + name)
		.then(response => {
			if (!response.ok){
				throw Error("ERROR")
			}
			return response.json();	 
		})
		.then(obj => {
			
			// console.log(obj.results);
			// console.log(JSON.stringify(obj));
			// console.log("typeof " + typeof(obj));
			
			const html = obj.results.map(Character => {
				return `<h3>Name: ${Character.name}</h3>    
						<p>Birth year: ${Character.birth_year}</p>	
						<p>Hair color: ${Character.hair_color}</p>
						<p>Eye color: ${Character.eye_color}</p>
						<p>Mass: ${Character.mass}</p>`; 
			})
			.join("");
			
			// console.log(html);

			document.querySelector('#listCharacters').innerHTML = html;

			//problem: working on return of the function 
			objStarWars = obj;

			

		})	
		.catch(function(error){
			console.error('Somethign went wrong');
			console.error(error);
		});

	return objStarWars;
		
};

document.addEventListener('submit', function(event) {

	//make sure the submitted form was for our list items
	if(!event.target.matches('#search-form')) return;

	//stop the form from submitting 
	event.preventDefault();

	//get the character name from input
	var item = event.target.querySelector('#starwars-character');
    if (!item || item.length < 1) return;
	
	//searched word
	var input = `<h3>Search for: ${item.value} </h3>`;
	document.getElementById("word-typed").innerHTML = input;        
	
	//problem: working on return of the function 
	var objStarWars = getStarWarsByName(item.value);
	console.log("typeof objStarWars " + typeof(objStarWars));

	//clear the field and return to focus
	item.value = '';
	item.focus();	

}, false);
