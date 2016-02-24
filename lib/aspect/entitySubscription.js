/**
 * Maintains the list of entities matched by an aspect.
 * Entity Subscriptions are automatically updated during the World#process.
 * Any SubscriptionListener are informed when entities are added or removed.
 * @author : episanchez
 */

var logger = require('winston');
var Aspect = require('./aspect');
var ExArray = require('../tools/array');

// aspectCmpSet --> Object (Aspect)
var EntitySubscription = function(aspect){
	this.aspect = aspect;
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

/**
 * Need to check the entity to know if entities changed
 */
function changed(idArray){
	for (var i = 0; i < idArray.length; i++){
		var id = idArray[i];
		if (this.activeEntitiesId[id]){
			insert.call(this, id);
		}
	}
};

function removed(idArray){
	for (var i = 0; i < idArray.length; i++){
		var id = idArray[i];

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
}

EntitySubscription.prototype.getEntities = function(){
	return this.activeEntitiesId;
};

/**
 * Check the interesting aspect of the entity
 * @param {integer} entityId
 */

EntitySubscription.prototype.checkEntity = function(entity){
	var aspectResult = this.aspect.isInterested(entity);

	if (aspectResult === true && !this.activeEntitiesId[entity.getUID()]){
		insert.call(this, entity.getUID());
	}
	else if (aspectResult === false && this.activeEntitiesId[entity.getUID()]){
		remove.call(this, entity.getUID());
	}
};


// Inform the listener of change
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

EntitySubscription.prototype.process = function(changedIds, removedIds){
	changed.call(this, changedIds);
	removed.call(this, removedIds);

	this.informEntityChanges();
};


// Add System listener who subscribe
EntitySubscription.prototype.addSubscriptionListener = function(SubscriptionListener){
	if (typeof SubscriptionListener.inserted === 'function' && typeof SubscriptionListener.removed === 'function')
		this.listeners.push(SubscriptionListener);
	else
		logger.warn('Cant add SubscriptionListener, this dont have inserted and removed method ! ')
};
