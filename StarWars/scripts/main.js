//clean malicious code inserted
var sanitizeHTML = function (str) {
	var temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerHTML;
};

async function getStarWarsByName(name){
	
	try {
		let response = await fetch('https://swapi.dev/api/people/?search=' + name);

		let content;

		if (!response.ok){
			throw new Error(`HTTP error! Status: ${response.status}`);
		} else {

			content = await response.json();			
		}		

		return content.results;
		
	} catch(e) {
		console.log(e);
	}
	
};

async function createContent(stringStarWars) {

	console.log("createContent1 typeof " + typeof(stringStarWars));
	
	let html = await stringStarWars.map(Character => {
		return `
			<div>
				<h3>Name: ${Character.name}</h3>    
				<p>Birth year: ${Character.birth_year}</p>	
				<p>Hair color: ${Character.hair_color}</p>
				<p>Eye color: ${Character.eye_color}</p>
				<p>Mass: ${Character.mass}</p>
			</div>
			`; 			
	})
	.join("");	
	
	return html;
};

async function displayHtml(html) {

	document.querySelector('#listCharacters').innerHTML = html;

};

document.addEventListener('submit', function(event) {

	//make sure the submitted form was for our list items
	if(!event.target.matches('#search-form')) return;

	//stop the form from submitting 
	event.preventDefault();

	//get the character name from input
	let character = event.target.querySelector('#starwars-character');
	if (!character || character.length < 1) return;
	
	//searched word
	let input = `<h3>Search for: ${character.value} </h3>`;
	document.getElementById("word-typed").innerHTML = input;        
	
	//promisses / async
	getStarWarsByName(character.value).then(result => {

		createContent(result).then(html => {
			displayHtml(html);
		}).catch(e => {
			console.log("Error createContent", e);
		});
		
	}).catch(e => {
		console.log("Error getByName", e);
	});

	// //clear the field and return to focus
	character.value = '';
	character.focus();	

}, false);
