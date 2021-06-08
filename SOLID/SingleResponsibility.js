/************************************************************/
/* SOLID design priciples based on WebDevSimplified courses */
/************************************************************/

/* Single Responsibility Principles */

/*
	single responsibility -> one reason to change
*/ 

// Not applied
// two reasons to change: tracking and logging calories
class CalorieTracker {
	constructor(maxCalories) {
		this.maxCalories = maxCalories;
		this.currentCalories = 0;
	}

	trackCalories(calorieCount) {
		this.currentCalories += calorieCount;
		if (this.currentCalories > this.maxCalories) {
			this.logCaloriesSurplus();
		}
	}

	logCaloriesSurplus() {
		console.log('Max calories exceeded');
	}
}

/**************************************************************/

// Principle applied

// would be in its own module
const logMessage = (message) => {
	console.log(message);
}

// CalorieTracker has nothing to do with logging
// point is to make changes on sigle place only
class CalorieTracker {
	constructor(maxCalories) {
		this.maxCalories = maxCalories;
		this.currentCalories = 0;
	}

	trackCalories(calorieCount) {
		this.currentCalories += calorieCount;
		if (this.currentCalories > this.maxCalories) {
			logMessage('Max calories exceeded');
		}
	}

}