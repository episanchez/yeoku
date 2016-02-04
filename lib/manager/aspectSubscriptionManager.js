/**
 * Manage All instances of EntitySubscription
 * @author : episanchez 
 */


// maybe create a Manager Class (this one maybe inherit to BaseSystem)

var AspectSubscriptionManager = function(world){

	this.world = world;

	this.EntitySubscriptions = {};
	this.changedIds = [];
	this.deletedIds = [];
};

module.exports = AspectSubscriptionManager;

/**
 * Create an new Entity subscription and 
 * param {object} An aspect object
 * return {object} An Entity Subscription Object
 */

AspectSubscriptionManager.prototype.createSubscription = function(aspect){
	this.EntitySubscriptions[aspect] = new EntitySubscription(world, aspect);

	// Synchonize the Entity Manager
	 world.getEntityManager().synchronize(entitySubscriptions)

	return (this.EntitySubscriptions[aspect]);
};

AspectSubscriptionManager.prototype.getSubscription = function(aspect){
	return this.EntitySubscriptions[aspect];
};

/**
 * Process of AspectSubscriptionManager
 * param {Array} Changed Id entities
 * param {Array} Deleted Id entities
 */
AspectSubscriptionManager.prototype.process = function(changed, deleted){
	for (EntitySubscription in this.EntitySubscriptions){
		EntitySubscription.process(changed, deleted);
	}
};


