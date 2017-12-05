// Require the 'inquirer' package
var inquirer = require('inquirer');

// Import the flash cards constructor implementations
var flashCards = require('./flashCards.js');
// Import the full list of questions
var questions = require('./cloze_questions.js').questions;

// Variable that holds the cloze-deleted questions list
var closeQuestions = [];

// Populate the cloze-deleted questions list
for (var i = 0; i < questions.length; i++) {
	var q = new flashCards.ClozeCard(questions[i].full, questions[i].cloze);
	closeQuestions.push(q);
}

// What question the user is currently on
var currentQuestion = 0;
// How many questions the user has gotten right
var answerRight = 0;
// How many questions the user has gotten wrong
var answerWrong = 0;

// askQuestion prompts the user to answer a given cloze-deleted question
function askQuestion() {
	inquirer.prompt([
		{
			type: 'confirm',
			message: closeQuestions[currentQuestion].partial + '\nDo you want to flip the card? : ',
			name: 'userinput'
		}
	]).then(function (answers) {
		console.log('\n');

		// Check if the user 
		if (answers.userinput) {
		} 
		// Show the correct answer
		console.log(closeQuestions[currentQuestion].cloze);
		console.log('-------------------------------------\n');

		// Advance to the next question
		if (currentQuestion < closeQuestions.length - 1) {
			currentQuestion++;
			askQuestion();
		} else {
			console.log('Thats all!');

			console.log('-------------------------------------\n');

			// Prompt the user to play again
			inquirer.prompt([
				{
					type: 'confirm',
					message: 'Would you like to see again?',
					name: 'playAgain'
				}
			]).then(function (answers) {
				if (answers.playAgain) {
				// Begin asking the questions!
					askQuestion();
				} else {
					// Exit the game
					console.log('Thanks for playing! Goodbuy!');
				}
			})
		}
	})
}

// Begin asking the questions!
askQuestion();
