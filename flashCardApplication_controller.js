// Require the 'inquirer' package
var inquirer = require('inquirer');

// Import the flash cards constructor implementations
var flashCards = require('./flashCards.js');
// Import the full list of questions
var questions = require('./cloze_questions.js').questions;
var questionsbasic = require('./basic.js').questionsbasic;

// Variable that holds questions list
var closeQuestions = [];

// What question the user is currently on
var currentQuestion = 0;

// askQuestion prompts the user to which option for flash cards they want
function askQuestion() {
    inquirer.prompt([
        {
            type: 'input',
            message: '\n Do you want to flip or guess? Enter (flip) or (guess): ',
            name: 'userchoice'
        }
    ]).then(function (answers) {
        console.log('\n');

        // Check user response
        if (answers.userchoice.toLowerCase() === "flip") {
            for (var i = 0; i < questionsbasic.length; i++) {
                var q = new flashCards.BasicCard(questionsbasic[i].front, questionsbasic[i].back);
                closeQuestions.push(q);
            }

            function askQuestionbasic() {
                // Show the front card
                inquirer.prompt([
                    {
                        type: 'confirm',
                        message: closeQuestions[currentQuestion].front + '\nDo you want to flip the card?: ',
                        name: 'userinput'
                    }
                ]).then(function (answers) {
                    console.log('\n');

                    // Check if the user 
                    if (answers.userinput) {
                    }
                    // Show the back card
                    console.log(closeQuestions[currentQuestion].back);
                    console.log('-------------------------------------\n');

                    // Advance to the next question
                    if (currentQuestion < closeQuestions.length - 1) {
                        currentQuestion++;
                        askQuestionbasic();
                    } else {
                        console.log('Thats all!');

                        console.log('-------------------------------------\n');

                        // Prompt the user to play again
                        inquirer.prompt([
                            {
                                type: 'confirm',
                                message: 'Would you like to flip again?',
                                name: 'playAgain'
                            }
                        ]).then(function (answers) {
                            if (answers.playAgain) {
                                // Begin asking the questions!
                                askQuestionbasic();
                            } else {
                                // Exit the game
                                console.log('Thanks! Goodbye!');
                            }
                        })
                    }
                })
            }

            // Begin asking the questions!
            askQuestionbasic()

        } else if (answers.userchoice.toLowerCase() === "guess") {
            
            for (var i = 0; i < questions.length; i++) {
                var q = new flashCards.ClozeCard(questions[i].full, questions[i].cloze);
                closeQuestions.push(q);
            }

            // askQuestionguess prompts user with cloze-deleted questions
            function askQuestionguess() {
                inquirer.prompt([
                    {
                        type: 'confirm',
                        message: closeQuestions[currentQuestion].partial + '\nDo you want to flip the card? : ',
                        name: 'userinput'
                    }
                ]).then(function (answers) {
                    console.log('\n');

                    // Check if the user confirm
                    if (answers.userinput) {
                    }
                    // Show the correct answer
                    console.log(closeQuestions[currentQuestion].cloze);
                    console.log('-------------------------------------\n');

                    // Advance to the next question
                    if (currentQuestion < closeQuestions.length - 1) {
                        currentQuestion++;
                        askQuestionguess();
                    } else {
                        console.log('Thats all!');

                        console.log('-------------------------------------\n');

                        // Prompt the user to play again
                        inquirer.prompt([
                            {
                                type: 'confirm',
                                message: 'Would you like to guess again?',
                                name: 'playAgain'
                            }
                        ]).then(function (answers) {
                            if (answers.playAgain) {
                                // Begin asking the questions!
                                askQuestionguess();
                            } else {
                                // Exit the game
                                console.log('Thanks for Guessing! Goodbye!');
                            }
                        })
                    }
                })
            }
            askQuestionguess();
        }
        // Begin asking the questions!
    })
}
askQuestion();