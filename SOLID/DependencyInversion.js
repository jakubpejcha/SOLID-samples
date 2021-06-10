/************************************************************/
/* SOLID design priciples based on WebDevSimplified courses */
/************************************************************/

/* Dependency Inversion Principle */


/*
	Example: shop application: app Store depends on for example Stripe API (payment handling)
	problem -> we want to switch payment API, or just test it
	Solution (principle) ->insert middle interface (middleware) "payment processor
	that handles all payment - the app only knows of this interface
	//  Store --> Payment processor --> Stripe API //
	
	Also called Adapter or Fasade pattern

	Do not change high-level code when dependency changes
*/


// Not applied
class Store {
	constructor(user) {
		this.stripe = new Stripe(user);
	}

	purchaseBike(quantity) {
		this.stripe.makePayment(200 * quantity * 100);
	}

	purchaseHelmet(quantity) {
		this.stripe.makePayment(15 * quantity * 100);
	}
}

class Stripe {
	constructor(user) {
		this.user = user;
	}

	makePayment(amountInCents) {
		//
	}
}

class Paypal {
	makePayment(user, amountInDollars) {
		//
	}
}

// to use paypal means changing the Store
class Store {
	constructor(user) {
		this.user = user;
		this.paypal = new Paypal();
	}

	purchaseBike(quantity) {
		this.paypal.makePayment(this.user, 200 * quantity);
	}

	purchaseHelmet(quantity) {
		this.paypal.makePayment(this.user, 15 * quantity);
	}
}


// Applied
class Store {
	constructor(paymentProcessor) {
		// paymentProcessor = StripePaymentProcessor, PaypalPaymentProcessor
		this.paymentProcessor = paymentProcessor;
	}

	purchaseBike(quantity) {
		this.paymentProcessor.pay(200 * quantity);
	}

	purchaseHelmet(quantity) {
		this.paymentProcessor.pay(15 * quantity);
	}
}

class StripePaymentProcessor {
	constructor(user) {
		this.stripe = new Stripe(user);
	}

	pay(amountInDollars) {
		this.stripe.makePayment(amountInDollars * 100);
	}
}

// PaypalPaymentProcessor ...

const store = new Store(new StripePaymentProcessor('Jakub'));
const store = new Store(new PaypalPaymentProcessor('Jakub'));
