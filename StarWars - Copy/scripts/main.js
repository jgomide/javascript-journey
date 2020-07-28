var inputString = '';


//clean malicious code inserted
var sanitizeHTML = function (str) {
	var temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerHTML;
};

async function getStarWarsByName(name){

	console.log("getStarWarsByName1 typeof " + name + typeof(name));
	
	try {
		let response = await fetch('https://swapi.dev/api/people/?search=' + name);

		let content;

		if (!response.ok){
			throw new Error(`HTTP error! Status: ${response.status}`);
		} else {

			content = await response.json();

			console.log("getStarWarsByName2 typeof " + typeof(name));
			console.log("Body is:", content)			 		 
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

	console.log("createContent2 typeof " + typeof(html));
	console.log("createContent2  " + html);
	
	return html;
};

async function displayHtml(html) {

	// let input2 = `<h3>Search for2: ${inputString} </h3>`;
	// document.getElementById("word-typed2").innerHTML = input2;        

	// console.log("displayHtml1 typeof " + typeof(inputString));

	// let objStarWars = await getStarWarsByName(inputString);

	// console.log("displayHtml2 typeof " + typeof(objStarWars));

	// html = await createContent(objStarWars)

	console.log("displayHtml3 typeof " + typeof(html));

	document.querySelector('#listCharacters').innerHTML = html;
	
	console.log("displayHtml4 objStarWars " + typeof(html));

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
	
	//I TRIED IT BUT ALWAYS "typeof0000" get first then createContent.
	//problem: working on return of the function 
	getStarWarsByName(character.value).then(result => {

		console.log("result " + result);
		createContent(result).then(html => {
			displayHtml(html);
		}).catch(e => {
			console.log("Error createContent", e);
		});
		
	}).catch(e => {
		console.log("Error getByName", e);
	});

	console.log("typeof0000 objStarWars " + typeof(character));

	// //clear the field and return to focus
	character.value = '';
	character.focus();	

}, false);
