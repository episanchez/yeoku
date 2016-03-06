/**
 * Manage, Create and destroy entities. Can use methods directly or via facade on the Entity.
 * status : TODO
 * Author : episanchez
 */

var Manager = require('./manager');
var Entity = require('../entity');
var Aspect = require('../aspect/aspect');
var ArrayUtil = require('../tools/array.js');
var util = require('util');

 var EntityManager = function() {
 	Manager.call(this);

 	this._aspect = new Aspect();
 	this._entities = [];
 	this._number = 0;
 };

util.inherits(EntityManager, Manager);
module.exports = EntityManager;

EntityManager.prototype.createEntity = function(){
	this._entities.push(new Entity(this.world.componentManager, this._number));
	this.world.addChangedId(this._number);
	this._number++;
};

EntityManager.prototype.createEntityWithArchetype = function(archetype){
	throw 'have not implemented';
};


// Subscription listener
EntityManager.prototype.insert = function(id){};

EntityManager.prototype.remove = function(id){
	OwnArray.removeByIndex(this._entities, id);
	this._number--;
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
		entitySubscription.checkEntity(entity);
	}
	entitySubscription.informEntityChanges();
};
