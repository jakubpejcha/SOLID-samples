/************************************************************/
/* SOLID design priciples based on WebDevSimplified courses */
/************************************************************/

/* Liskov Substitution Principle */

/*
	Extending classed can fully replace its super class.
	More sutitable for other languages using inheritance, multiple inheritance etc.
*/

// Not applied
class Rectangle {
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}

	setWidth(width) {
		this.width = width;
	}

	setHeight(height) {
		this.height = height;
	}

	area() {
		return this.width * this.height;
	}
}

class Square extends Rectangle {
	setWidth(width) {
		this.width = width;
		this.height = width;
	}

	setHeight(height) {
		this.height = height;
		this.width = height;
	}

	area() {
		return this.width * this.height;
	}
}

function increaseRectangleWidth(rectangle) {
	rectangle.setWidth(rectangle.width + 1);
}

const rectangle = new Rectangle(5,5);
const square = new Square(5,5);

// function increaseRectangleWidth breaks the priciple, becouse setting width
// on square sets also height - unlike on rectangle -> square cannot substutute
// the rectangle



// Applied
// add different super class
class Shape {
	area() {

	}
}

class Rectangle extends Shape {
	// dasfsff
}

class Square extends Shape {
	// asffsafsaf
}

function increaseShapeWidth(shape) {
	// asfdsafs
}


/***************************************************/


/* Example2 */
// Not applied
class Bird {
	fly() {
		// fdfd
	}
}

class Duck extends Bird {
	quack() {
		// safsfag
	}
}

// this class violates the principle
class Penguin extends Bird {
	fly() {
		throw new Error('Cannot fly');
	}

	swim() {
		// dasfafs
	}
}

function makeBirdFly(bird) {
	bird.fly();
}

const penguin = new Penguin();
makeBirdFly(penguin); // Error

// Applied - fixed
// class Bird -> FlyingBird and SwimmingBird

class FlyingBird {
	fly() {
		// dasfdsf
	}
}

class SwimmingBird {
	swim() {
		// dsaffs
	}
}

class Duck extends FlyingBird {
	quack() {
		// dsaf
	}
}

class Penguin extends SwimmingBird {
	// faf
}


// now these functions do not care whether it is passed a parent class or a subclass
function makeFlyingBirdFly(bird) {
	bird.fly();
}

function makeSwimmingBirdSwim(bird) {
	bird.swim();
}