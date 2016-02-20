/**
 * Maintains the list of entities matched by an aspect.
 * Entity Subscriptions are automatically updated during the World#process.
 * Any SubscriptionListener are informed when entities are added or removed.
 * @author : episanchez
 * Status : TODO
 */

var logger = require('winston');
var Aspect = require('./aspect');
var ExArray = require('../tools/array');

// aspectCmpSet --> Object (Aspect)
var EntitySubscription = function(world, aspect){
	this.aspect = aspect;
	this.world = world;
	this.activeEntitiesId = [];

	this.insertedIds = [];
	this.removedIds = [];
	this.listeners = [];

};

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
			insert.call(this, id);
	}
};

function removed(idArray){
	for (id in idArray){
		if (this.activeEntitiesId[id]) // Active Ids exist
			remove.call(this, id);
	}
};

module.exports = EntitySubscription;

EntitySubscription.prototype.getAspect = function(){
	return this.aspect;
};

EntitySubscription.prototype.getActiveEntities = function(){
	return this.activeEntitiesId;
};

EntitySubscription.prototype.getEntities = function(){
	return this.activeEntitiesId;
};

/**
 * Check the interesting aspect of the entity
 * @param {integer} entityId
 */

EntitySubscription.prototype.checkEntity = function(entity){
	var aspectResult = this.aspect.isInterested(entity);

	if (aspectResult === true){
		insert.call(this, entity.getUID());
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
	changed.call(this, changedIds);
	deleted.call(this, deletedIds);

	this.informEntityChanges();
};


// Add System listener who subscribe
EntitySubscription.prototype.addSubscriptionListener = function(SubscriptionListener){
	if (typeof SubscriptionListener.inserted === 'function' && typeof SubscriptionListener.removed === 'function')
		this.listeners.push(SubscriptionListener);
	else
		logger.warn('Cant add SubscriptionListener, this dont have inserted and removed method ! ')
};
