
var EntitySubscription = require('aspect/entitySubscription');

/**
 * Manage All instances of EntitySubscription
 * @class
 * @param {World} world
 * @author : episanchez 
 */

var AspectSubscriptionManager = function(world){
	/**
	 * @member {World} world - Copy of World instance
	 * @memberof AspectSubscriptionManager
	 */
	this.world = world;
	/**
	 * @member {Object} EntitySubscriptions - Component Type of component object
	 * @memberof AspectSubscriptionManager
	 */
	this.EntitySubscriptions = {};
	/**
	 * @member {ComponentType} managers - Component Type of component object
	 * @memberof AspectSubscriptionManager
	 */
	this.managers = [];
};

module.exports = AspectSubscriptionManager;

/**
 * Create an new Entity subscription and 
 * @param {Aspect} aspect - An aspect object
 * @return {EntitySubscription} EntitySubscription linked to the aspect
 */
AspectSubscriptionManager.prototype.createSubscription = function(aspect){
	var es = this.EntitySubscriptions[aspect.getStrResult()] = new EntitySubscription(aspect, this.world);

	// Synchonize the Entity Manager
	 this.world.getEntityManager().synchronize(es);

	return (es);
};

/**
 * Register a new manager
 * @param {Manager} manager - 
 */
AspectSubscriptionManager.prototype.registerManager = function(manager){
	this.managers.push(manager);
};

/**
 * Get a subscription linked to the given aspect
 * @param {Aspect} aspect - 
 * @return {EntitySubscription} EntitySubscription linked to the given aspect
 */
AspectSubscriptionManager.prototype.getSubscription = function(aspect){
	return this.EntitySubscriptions[aspect.getStrResult()];
};

/**
 * Process of AspectSubscriptionManager
 * @param {Array} Changed Id entities
 * @param {Array} Removed Id entities
 */
AspectSubscriptionManager.prototype.process = function(changed, removed){
	/**
	 * Manager update entity changed process
	 */
	for (var i = 0; i < this.managers.length; i++){
		var manager = this.managers[i];
		if (this.world.getChangedIds().length > 0)
			manager.inserted(changed);
		if(this.world.getRemovedIds().length > 0)
			manager.removed(removed);
	}

	for (key in this.EntitySubscriptions){
		if (Object.prototype.hasOwnProperty.call(this.EntitySubscriptions, key)){

        	var EntitySubscription = this.EntitySubscriptions[key];
			EntitySubscription.process(changed, removed);
        }
	}
};


