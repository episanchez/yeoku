/**
 * Manage, Create and destroy entities. Can use methods directly or via facade on the Entity.
 * status : TODO
 * Author : episanchez
 */

var BaseSystem = require('../system/baseSystem');
var Entity = require('../entity');
var Aspect = require('../aspect/aspect')

var util = require('util');

 var EntityManager = function() {
 	BaseSystem.call(this);

 	this._entities = [];
 	this._number = 0;
 };

util.inherits(EntityManager, BaseSystem);
module.exports = EntityManager;

EntityManager.prototype.createEntity = function(){
	this._entities.push(new Entity(this.world.cm, this._number));
	this._number++;
};

EntityManager.prototype.createEntityWithArchetype = function(archetype){
	throw 'have not implemented';
};

EntityManager.prototype.initialize = function(){
	var entitySubscription = this.world.getAspectSubscriptionManager().createSubscription(new Aspect());
	entitySubscription.addSubscriptionListener({inserted: this.inserted, removed: this.removed});
};

EntityManager.prototype.processSystem = function(){
	//nothing
};

// Subscription listener

/*
 * param {Array} Array of entities inserted
 */
EntityManager.prototype.inserted = function(entities){
	// nothing
};

/*
 * param {Array} Array of entities removed
 */
EntityManager.prototype.removed = function(entities){
	// nothing
};

// Getter

EntityManager.prototype.getEntityById = function(id){
	return this._entities[id];
};

EntityManager.prototype.isActive = function(id){
	throw 'Have not implemented';
};

/**
 * Synchronize the new subscription
 * @param {object} take an EntitySubscription Object
 */

EntityManager.prototype.synchronize = function(entitySubscription){
	for (entity in  this._entities){
		entitySubscription.checkEntity(entity.uid);
	}
	entitySubscription.informEntityChanges();
};
