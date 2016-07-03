
var Manager = require('./manager');
var Entity = libRequire('entity/entity');
var Aspect = libRequire('aspect/aspect');
var ArrayUtil = libRequire('tools/array.js');
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
 * @return {Entity}
 */
EntityManager.prototype.createEntity = function(){
  var entity = new Entity(this.world.componentManager, this._number);

	this._entities.push(entity);
	this.world.addChangedId(this._number);
	this._number++;
  return (entity);
};

/**
 * Create an entity with its archetype
 * @param {Object} archetype - Entity Archetype
 * @param {Object} values - Init Values for Archetype
 * @return {Entity}
 */
EntityManager.prototype.createEntityWithArchetype = function(archetype, values){
	var entity = new Entity(this.world.componentManager, this._number);
  var components = archetype.getComponents();

	this._entities.push(entity);
	for (var i = 0; i < components.length; i++){
		var componentName = components[i]["name"];
		entity.addComponent(componentName, components[i]["attributes"]);
    entity[componentName].update
	}
  for (component in values){
    if (entity.hasComponent(component) && values[component]){
      entity[component].update(values[component]);
    }
  }
	this.world.addChangedId(this._number);
	this._number++;
  return (entity);
};

/**
 * Create an entity with its archetype name
 * @param {string} name - Name of the entity's archetype
 * @param {Object} values - Init Values for Archetype
 * @return {Entity}
 */
EntityManager.prototype.createEntityWithArchetypeName = function(name, values){
	var arch = this.world.getArchetypeManager().getArchetypeByName(name);

  if (arch){
		return this.createEntityWithArchetype(arch, values);
	}
  return false;
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

/**
 * Get Size of Entities
 * @return {number}
 */
EntityManager.prototype.getSize = function(){
  return this._number;
}

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
