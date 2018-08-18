const jokes = require('./jokes.json');


function getRandomInt(min, max){
	return Math.floor(Math.random() * (max-min + 1) ) + min;
}

//decprator pattern
function jsonWrapper(jokeArray){
	/*
	//let joke = Object.assign({}, jsonHeader);
	*/
	
	let jsonStruct = {	'apiVersion': 2, 
						'numJokes': 0,
						'ok': true,
						'jokes': []
					};
	
	jsonStruct.numJokes = jokeArray.length;
	
	if (jsonStruct.numJokes == 0) {
		jsonStruct.jokes = ['Not Enough Jokes'];
		jsonStruct.ok = false;
		return jsonStruct;
	}
	
	jsonStruct.jokes = jokeArray;
	
	return jsonStruct;
}

function randomJoke(jokeArray){
	
	const min = 0;
	const max = jokeArray.length - 1;
	
	return jokeArray[getRandomInt(min,max)];
}


function getRandomJoke(){
	
	const jokeReturn = [];
	
	jokeReturn.push( randomJoke(jokes) );
	
	return jsonWrapper(jokeReturn);
}


function getRandomJokes(num){
	
	if ( num >= jokes.length ) {
		return jsonWrapper([]);
	} else {
		const jokeReturn = [];
		while( jokeReturn.length < num) {
			jokeReturn.push( randomJoke(jokes) );
		}
		return jsonWrapper(jokeReturn);
	}
}

function getRandomJokesByTag(tag, num){
	let jokesByTag = [];
	
	jokes.forEach( function(curJoke) {
		if ( curJoke.tags.indexOf(tag) != -1 ) {
			jokesByTag.push(curJoke);
		}
	});
	
	if ( num >= jokesByTag.length ) {
		return jsonWrapper([]);
	} else {
		const jokeReturn = [];
		while( jokeReturn.length < num) {
			jokeReturn.push( randomJoke(jokesByTag) );
		}
		return jsonWrapper(jokeReturn);
	}
	
}


module.exports = {
    getRandomJoke : getRandomJoke,
	getRandomJokes : getRandomJokes,
    getRandomJokesByTag : getRandomJokesByTag   
};