/**
 * Maintains the list of entities matched by an aspect.
 * Entity Subscriptions are automatically updated during the World#process.
 * Any SubscriptionListener are informed when entities are added or removed.
 * @author : episanchez
 * Status : TODO
 */

var logger = require('pomelo-logger').getLogger(__filename);
var Aspect = require('./aspect');
var ExArray = require('./tools/array');

// aspectCmpSet --> Object (Aspect)
var EntitySubscription = function(world, aspect){
	this.aspect = aspect;
	this.world = world;
	this.entities = [];
	this.activeEntitiesId = [];

	this.insertedIds = [];
	this.removedIds = [];
	this.listeners = [];

	/**
	 * Private functions
	 */

	function insert(id){
		this.activeEntitiesId.push(id);
		this.insertedIds.push(id);
	};

	function remove(id){
		ExArray.removeByValue(this.activeEntitiesId, id);
		this.removedIds.push(id);
	};

	function changed(idArray){
		for (id in idArray){
			if (this.activeEntitiesId[id])
				this.insert(id);
		}
	};

	function removed(idArray){
		for (id in idArray){
			if (this.activeEntitiesId[id]) // Active Ids exist
				this.remove(id);
		}
	};
};


module.exports = EntitySubscription;

EntitySubscription.prototype.getAspect = function(){
	return this.aspect;
};

EntitySubscription.prototype.getActiveEntities = function(){

};

// dont Manage this feature
EntitySubscription.prototype.getEntities = function(){
	return null;
};

/**
 * Check the interesting aspect of the entity
 * @param {integer} entityId
 */

EntitySubscription.prototype.checkEntity = function(entityId){
	var em = this.world.getEntityManager();
	var entity = em.getEntityById(entityId);

	var aspectResult = this.aspect.isInterested(entity);

	if (aspectResult === true){
		insert(entity);
	}
};

// Inform the listener of change
EntitySubscription.prototype.informEntityChanges = function(){
	if (this.insertedIds.length === 0 && this.removedIds.length === 0)
		return false;

	for (listener in this.listener){
		if (this.insertedIds.length > 0)
			listener.inserted(this.insertedIds);
		if (this.removedIds.length > 0)
			listener.removed(this.removedIds);		
	}

	this.insertedIds = [];
	this.removedIds = [];
	return (true);
};

EntitySubscription.prototype.process = function(changedIds, deletedIds){
	this.changed(changedIds);
	this.deleted(deletedIds);

	this.informEntityChanges();
};


// Add System listener who subscribe
EntitySubscription.prototype.addSubscriptionListener = function(SubscriptionListener){
	if (typeof SubscriptionListener.inserted === 'function' && typeof SubscriptionListener.removed === 'function')
		this.listeners.push(SubscriptionListener);
	else
		logger.warn('Cant add SubscriptionListener, this dont have inserted and removed method ! ')
};
