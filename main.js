
var game = require('./guess');
var wordCons = require('./word');
var letterCons = require('./letter');
var inquirer = require('inquirer');
var randomWord = game.randomWord;
var letterGuessed;

var myWord = new wordCons.wordCons(game.randomWord);
var maxGuesses = 2;

function takeAGuess(){
	console.log(myWord.toString());
	if (myWord.guessesMade.length >= maxGuesses){
		return console.log('Game over. You have no more guesses left.');
	}
	inquirer.prompt([{
		name: 'letter',
		type: 'text',
		message: 'Enter a letter:',
		validate: function(str){
			var regEx = new RegExp('^[a-zA-Z\s]{1,1}$');
			return regEx.test(str);
				}
		}]).then(function(letterInput){ //Game control
				var letter = letterInput.letter; 
				myWord.findLetter(letter); //Check
				if(myWord.isComplete()){ 
				console.log('Yes! It was ' +myWord.toString() + '!');
				return; //Winner
				}
				console.log('\nYou have ' + (maxGuesses - myWord.guessesMade.length) + ' guesses left.')
				console.log('');
				takeAGuess(); //Recursive call
				}
  );
}

takeAGuess(); //Start Game

exports.letter;