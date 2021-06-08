/************************************************************/
/* SOLID design priciples based on WebDevSimplified courses */
/************************************************************/

/* Open/Closed principle */

/*
	Stuff should be closed for modifications, opened for extensions.
	Changing code == adding new code
*/

// Not applied

// appearance of switch statement usually indicates a violation of this principle
// adding new qustion means modifiing the switch in function plus the array
// -> we say it is not closed for changes
function printQuiz(questions) {
	questions.forEach(question => {
		console.log(question.description);
		switch (question.type) {
			case 'boolean':
				console.log('1. True');
				console.log('2. False');
				break;
			case 'multipleChoice':
				question.options.forEach((option, index) => {
					console.log(`${index + 1}. ${option}`);
				})
				break;
			case 'text':
				console.log('Answer:_________________________');
				break;
		}
		console.log('');
	});
}

const questions = [
	{
		type: 'boolean',
		description: 'kafkashfkas',
	},
	{
		type: 'multipleChoice',
		description: 'kafkashfkas',
		options: ['one', 'two', 'three'],
	},
	{
		type: 'text',
		description: 'kafkashfkas',
	}
];

// Applied
// we can add question without modifying the inside of a function
// trick is to break the functionality into single classes
function printQuiz(questions) {
	questions.forEach(question => {
		console.log(question.description);
		question.printQuestionChoices();
		console.log('');
	});
}

class BooleanQuestion {
	constructor(description) {
		this.description = description;
	}

	printQuestionChoices() {
		console.log('1. True');
		console.log('2. False');
	}
}

class MultipleChoiceQuestion {
	constructor(description, options) {
		this.description = description;
		this.options = options;
	}

	printQuestionChoices() {
		this.options.forEach((option, index) => {
			console.log(`${index + 1}. ${option}`);
		})
	}
}

class TextQuestions {
	constructor(description) {
		this.description = description;
	}

	printQuestionChoices() {
		console.log('Answer:_________________________');
	}
}

const questions = [
	new BooleanQuestion('askdhkfsh'),
	new MultipleChoiceQuestion(
		'fsdkhgd',
		['one', 'two', 'three']
	),
	new TextQuestions('sdfkhsdfg'),
]