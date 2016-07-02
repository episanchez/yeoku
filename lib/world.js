
var AspectSubscriptionManager = require('./manager/aspectSubscriptionManager');
var ComponentManager = require('./manager/componentManager');
var EntityManager = require('./manager/entityManager');
var ArchetypeManager = require('./manager/archetypeManager');

var OwnArray = require('./tools/array');
var util = require('util');

/**
 * The primary instance for the game.
 * @class
 * @author episanchez
 */

var World = function(){
	/**
	 * @member {Object} systems - Systems' Containers
	 * @memberof World
	 */
	this.systems = {};
	/**
	 * @member {number} changedIds- Array of Entities Id which will be add or change
	 * @memberof World
	 */
	this.changedIds = [];
	/**
	 * @member {number[]} removeIds - Array of Entities Id which will be remove
	 * @memberof World
	 */
	this.removeIds = [];
	/**
	 * @member {EntityManager} em
	 * @memberof World
	 */
	this.em = new EntityManager();
	/**
	 * @member {AspectSubscriptionManager} aspectSubscriptionManager
	 * @memberof World
	 */
	this.aspectSubscriptionManager = new AspectSubscriptionManager(this);
	/**
	 * @member {ComponentManager} componentManager
	 * @memberof World
	 */
	this.componentManager = new ComponentManager();

	/**
	 * @member {ArchetypeManager} archetypeManager
	 * @memberof World
	 */
	this.archetypeManager = new ArchetypeManager(this);

	this.em.setWorld(this);
	this.componentManager.setWorld(this);
	this.em.initialize();
	this.componentManager.initialize();
};

module.exports = World;

/**
 * Get all systems
 * @return {array} Array of Systems
 */
World.prototype.getSystems = function(){
	return this.systems;
};

/**
 * Get a specific function with this name.
 * @param {string} systemName - System's name
 * @return {Object} the system's object
 */
World.prototype.getSystem = function(systemName){
	return this.systems[systemName];
};

/**
 * Get the Entity Manager
 * @return {EntityManager}
 */
World.prototype.getEntityManager = function(){
	return (this.em);
};

/**
 * Get the Aspect Subscription Manager
 * @return {AspectSubscriptionManager}
 */
World.prototype.getAspectSubscriptionManager = function(){
	return this.aspectSubscriptionManager;
};

/**
 * Get the Archetype Manager
 * @return {ArchetypeManager}
 */
World.prototype.getArchetypeManager = function(){
	return this.archetypeManager;
};

/**
 * Get the component manager
 * @return {ComponentManager}
 */
World.prototype.getComponentManager = function(){
	return this.componentManager;
};

/*
 * World processing
 */
World.prototype.process = function(){
	this.updateEntityStates();
	for (key in this.systems){
        if (Object.prototype.hasOwnProperty.call(this.systems, key)){
        	var system = this.systems[key];
			system.process();
			this.updateEntityStates();
        }
      }
};

/**
 * Add a new system with its name and class
 * @param {string} systemName
 * @param {Object} system
 */
World.prototype.addSystem = function(systemName, system){
	// check if system is {system/baseSystem} Object
	system.setWorld(this);
	system.initialize();
	system.enable();
	this.systems[systemName] = system;
};

World.prototype.addManager = function(name, manager){
	manager.setWorld(this);
	manager.initialize();
	
	var self = this;
	self["get" + name.charAt(0).toUpperCase() + name.slice(1)] = function(){
		return manager;
	};
}

/**
 * Remove a system
 * @param {string} systemName
 */
World.prototype.removeSystem = function(systemName){
	delete this.systems[systemName];
};

World.prototype.addChangedId = function(id){
	this.changedIds.push(id);
};

World.prototype.addRemovedId = function(id){
	this.removeIds.push(id);
};

World.prototype.getChangedIds = function(){
	return this.changedIds;
};

World.prototype.getRemovedIds = function(){
	return this.removeIds;
};

/**
 * For each change (add, change component of an id, remove), the aspect Subscription Manager is call
 */
World.prototype.updateEntityStates = function(){
	while (this.changedIds.length > 0 || this.removeIds.length > 0){
		this.aspectSubscriptionManager.process(this.changedIds, this.removeIds);
		this.changedIds = [];
		this.removeIds = [];
	}
};
