/************************************************************/
/* SOLID design priciples based on WebDevSimplified courses */
/************************************************************/

/* Interface Segregation Principle */


/*
	Make interfaces smaller (segregate)
*/

// Not applied - not in js
/** Note: this does not exist in javascript **/
// Problem: need to implement all functionality, but turret does not move

interface Entity {
	attackDamage;
	health;
	name;

	move();
	attack();
	takeDamage();
}

class Character implements Entity {
	move() {
		//
	}

	attack() {
		//
	}

	takeDamage() {
		//
	}
}

class Turret implements Entity {
	move() {
		// ERROR: cannot move
	}

	attack() {
		//
	}

	takeDamage() {
		//
	}
}

/* javascript application - principle can also be used */
// Not applied
class Entity {
	constructor(name, attackDamage, health) {
		this.name = name;
		this.attackDamage = attackDamage;
		this.health = health;
	}

	move() {
		// move
	}

	attack(targetEntity) {
		// cause demage
		targetEntity.takeDamage(this.attackDamage);
	}

	takeDamage(amount) {
		this.health -= amount;
		// remaining
	}
}

class Character extends Entity {
	// same as entity
}

class Wall extends Entity {
	constructor(name, health) {
		super(name, 0, health); // explicitly need to pass attackDamage
	}

	// must override
	move() {
		return null;
	}

	attack() {
		return null;
	}
}

class Turret extends Entity {
	constructor(name, attackDamage) {
		super(name, attackDamage, -1);
	}

	move() {
		return null;
	}

	takeDamage() {
		return null;
	}
}

// now Wall.move() => ok - it should not be


// Applied
class Entity {
	constructor(name) {
		this.name = name;
	}
}

// smaller components
const mover = {
	move() {
		//
	}
}

const attacker = {
	attack(targetEntity) {
		//
	}
}

const hasHealth = {
	takeDamage(amount) {
		//
	}
}

class Character extends Entity {
	constructor(name, attackDamage, health) {
		super(name);
		this.attackDamage = attackDamage;
		this.health = health;
	}
}

Object.assign(Character.prototype, mover);
Object.assign(Character.prototype, attacker);
Object.assign(Character.prototype, hasHealth);

class Wall extends Entity {
	constructor(name, health) {
		super(name);
		this.health = health;
	}
}

Object.assign(Character.prototype, hasHealth);

// now Wall.move() => error