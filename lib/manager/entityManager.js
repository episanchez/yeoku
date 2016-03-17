
var Manager = require('./manager');
var Entity = require('entity');
var Aspect = require('aspect/aspect');
var ArrayUtil = require('tools/array.js');
var util = require('util');

/**
 * Manage, Create and destroy entities. Can use methods directly or via facade on the Entity.
 * @class
 * @extends Manager
 * @author episanchez
 */

 var EntityManager = function() {
 	Manager.call(this);

 	/**
	 * @member {Aspect} aspect - Aspect of this system
	 * @memberof EntityManager
	 */
 	this._aspect = new Aspect();
 	/**
	 * @member {number} entities - Array of all entities of the world
	 * @memberof EntityManager
	 */
 	this._entities = [];
 	/**
	 * @member {number} number - current last number of entities
	 * @memberof EntityManager
	 */
 	this._number = 0;
 };

util.inherits(EntityManager, Manager);
module.exports = EntityManager;

/**
 * Create an entity
 */
EntityManager.prototype.createEntity = function(){
	this._entities.push(new Entity(this.world.componentManager, this._number));
	this.world.addChangedId(this._number);
	this._number++;
};

/**
 * Create an entity with its archetype
 * @param {Object} archetype - Entity Archetype
 * @todo Features expected for the 0.0.4/0.0.5 version
 */
EntityManager.prototype.createEntityWithArchetype = function(archetype){
	throw 'have not implemented';
};


/**
 * Insert Subscription listener
 * @param {number} id - id of the entity inserted
 */
EntityManager.prototype.insert = function(id){};

/**
 * Remove Subscription listener
 * @param {number} id - id of the entity removed
 */
EntityManager.prototype.remove = function(id){
	OwnArray.removeByIndex(this._entities, id);
	this._number--;
};

/**
 * Get an Entity by its id
 * @param {number} id - Id of the entity
 */
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
