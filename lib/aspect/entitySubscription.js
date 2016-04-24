
var logger = require('winston');
var Aspect = require('aspect/aspect');
var ExArray = require('tools/array');

var Entity = require('entity/entity');

/**
 * Maintains the list of entities matched by an aspect.
 * Entity Subscriptions are automatically updated during the World#process.
 * Any SubscriptionListener are informed when entities are added or removed.
 * @class
 * @param {Aspect} aspect
 * @param {World} world
 * @author episanchez
 */
var EntitySubscription = function(aspect, world){
	/**
	 * @member {Aspect} Aspect
	 * @memberof EntitySubscription
	 */
	this.aspect = aspect;
	/**
	 * @member {World} World - Copy of World instance
	 * @memberof EntitySubscription
	 */
	this.world = world;
	/**
	 * @member {Number[]} ActiveEntitiesId
	 * @memberof EntitySubscription
	 */
	this.activeEntitiesId = [];
	/**
	 * @member {Number[]} InsertedIds
	 * @memberof EntitySubscription
	 */
	this.insertedIds = [];
	/**
	 * @member {Number[]} RemovedIds
	 * @memberof EntitySubscription
	 */
	this.removedIds = [];
	/**
	 * @member {Object[]} Listeners
	 * @memberof EntitySubscription
	 */
	this.listeners = [];

};

/**
 * Insert Id of activeEntitiesId
 * @memberof {EntitySubscription}
 * @private
 */
function insert(id){
	this.activeEntitiesId.push(id);
	this.insertedIds.push(id);
};

/**
 * Removed Id of activeEntitiesId
 * @memberof {EntitySubscription} 
 * @private
 */
function remove(id){
	ExArray.removeByValue(this.activeEntitiesId, id);
	this.removedIds.push(id);
};

/**
 * Need to check the entity to know if entities changed
 * @memberof {EntitySubscription}
 * @private
 */
function changed(idArray){
	for (var i = 0; i < idArray.length; i++){
		var id = idArray[i];
		if (this.world)
			this.checkEntity(this.world.getEntityManager().getEntityById(id));
		else
			insert.call(this, id);
	}
};

/**
 * Removed
 * @memberof {EntitySubscription}
 * @private
 */
function removed(idArray){
	for (var i = 0; i < idArray.length; i++){
		var id = idArray[i];

		if (this.activeEntitiesId[id]) // Active Ids exist
			remove.call(this, id);
	}
};

module.exports = EntitySubscription;

/**
 * Get Aspect Object
 * @return {Aspect} 
 */
EntitySubscription.prototype.getAspect = function(){
	return this.aspect;
};

/**
 * Get array of active entities ids
 * @deprecated
 */
EntitySubscription.prototype.getActiveEntities = function(){
	return this.activeEntitiesId;
}

/**
 * Get array of active entities ids
 * @return {Number[]} entitiesid
 */
EntitySubscription.prototype.getEntities = function(){
	return this.activeEntitiesId;
};

/**
 * Check the interesting aspect of the entity
 * @param {integer} entityId
 */
EntitySubscription.prototype.checkEntity = function(entity){
	if (entity instanceof Entity){
		var aspectResult = this.aspect.isInterested(entity);

		if (aspectResult === true && !this.activeEntitiesId[entity.getUID()]){
			insert.call(this, entity.getUID());
		}
		else if (aspectResult === false && this.activeEntitiesId[entity.getUID()]){
			remove.call(this, entity.getUID());
		}
	}
};


/**
 * Inform the listener of change
 * @return {boolean} If the entity changes
 */
EntitySubscription.prototype.informEntityChanges = function(){
	if (this.insertedIds.length === 0 && this.removedIds.length === 0)
		return false;

	for (var i = 0; i < this.listeners.length; i++){
		var listener = this.listeners[0];
		if (this.insertedIds.length > 0)
			listener.inserted(this.insertedIds);
		if (this.removedIds.length > 0)
			listener.removed(this.removedIds);	
	}

	this.insertedIds = [];
	this.removedIds = [];
	return (true);
};

/**
 * Process the EntitySubscription
 * @param {Number[]} changedIds - Set of changed Ids
 * @param {Number[]} removedIds - Set of removed Ids
 */
EntitySubscription.prototype.process = function(changedIds, removedIds){
	changed.call(this, changedIds);
	removed.call(this, removedIds);

	this.informEntityChanges();
};


/*
 * Add System listener who subscribe
 * @param {Object} Subscription Listener -
 */
EntitySubscription.prototype.addSubscriptionListener = function(SubscriptionListener){
	if (typeof SubscriptionListener.inserted === 'function' && typeof SubscriptionListener.removed === 'function')
		this.listeners.push(SubscriptionListener);
	else
		logger.warn('Cant add SubscriptionListener, this dont have inserted and removed method ! ')
};
