function getStarWarsByName(){
    // alert('do something');
    // console.log('do something')

    let name = "White";
    let hair = "White";
    let color = "White";
    let eyeColor = "White";
    let birthYear = "White";
    let mass = "White";

    document.getElementById("name").innerHTML = name; 
    document.getElementById("hair").innerHTML = hair; 
    document.getElementById("color").innerHTML = color; 
    document.getElementById("eyeColor").innerHTML = eyeColor; 
    document.getElementById("birthYear").innerHTML = birthYear;
    document.getElementById("mass").innerHTML = mass;

    fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(response => {
        return response.json();                     
    }).then(json => {
        console.log(json);
    })
}

