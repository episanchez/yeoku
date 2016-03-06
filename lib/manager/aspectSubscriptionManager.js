/**
 * Manage All instances of EntitySubscription
 * @author : episanchez 
 */


// maybe create a Manager Class (this one maybe inherit to BaseSystem)

var EntitySubscription = require('../aspect/entitySubscription');

var AspectSubscriptionManager = function(world){

	this.world = world;

	this.EntitySubscriptions = {};
	this.managers = [];
};

module.exports = AspectSubscriptionManager;

/**
 * Create an new Entity subscription and 
 * param {object} An aspect object
 * return {object} An Entity Subscription Object
 */

AspectSubscriptionManager.prototype.createSubscription = function(aspect){
	var es = this.EntitySubscriptions[aspect.getStrResult()] = new EntitySubscription(aspect, this.world);

	// Synchonize the Entity Manager
	 this.world.getEntityManager().synchronize(es);

	return (es);
};

AspectSubscriptionManager.prototype.registerManager = function(manager){
	this.managers.push(manager);
};

AspectSubscriptionManager.prototype.getSubscription = function(aspect){
	return this.EntitySubscriptions[aspect.getStrResult()];
};

/**
 * Process of AspectSubscriptionManager
 * param {Array} Changed Id entities
 * param {Array} Removed Id entities
 */
AspectSubscriptionManager.prototype.process = function(changed, removed){
	/**
	 * Manager update entity changed process
	 */
	for (var i = 0; i < this.managers.length; i++){
		var manager = this.managers[i];
		console.log(changed);
		if (this.world.getChangedIds().length > 0)
			manager.inserted(changed);
		if(this.world.getRemovedIds().length > 0)
			manager.removed(removed);
	}

	for (key in this.EntitySubscriptions){
		if (Object.prototype.hasOwnProperty.call(this.EntitySubscriptions, key)){

        	var EntitySubscription = this.EntitySubscriptions[key];
        	console.log('EntitySubscription : '+ EntitySubscription);
			EntitySubscription.process(changed, removed);
        }
	}
};


