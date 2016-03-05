/**
 * The primary instance for the game.
 * This one contains all the systems.
 * @author : episanchez
 */

var AspectSubscriptionManager = require('./manager/aspectSubscriptionManager');
var ComponentManager = require('./manager/componentManager');
var EntityManager = require('./manager/entityManager');

var OwnArray = require('./tools/array');
var util = require('util');

var World = function(){

	// Contains all systems
	this.systems = {};

	this.changedIds = [];
	this.removeIds = [];

	this.em = new EntityManager();

	this.aspectSubscriptionManager = new AspectSubscriptionManager(this);
	this.componentManager = new ComponentManager();

	this.em.setWorld(this);
	this.componentManager.setWorld(this);
	this.em.initialize();
	this.componentManager.initialize();
};

module.exports = World;

/**
 * Getter of the world
 */

World.prototype.getSystems = function(){
	return this.systems;
};

World.prototype.getSystem = function(systemName){
	return this.systems[systemName];
};
World.prototype.getEntityManager = function(){
	return (this.em);
};

World.prototype.getAspectSubscriptionManager = function(){
	return this.aspectSubscriptionManager;
};

World.prototype.getComponentManager = function(){
	return this.componentManager;
};
// Process of the world

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

/*
 * Add/Remove World's System
 */

World.prototype.addSystem = function(systemName, system){
	// check if system is {system/baseSystem} Object
	system.setWorld(this);
	system.initialize();
	system.enable();
	this.systems[systemName] = system;
};

World.prototype.removeSystem = function(systemName){
	delete this.systems[systemName];
};

/**
 * Inform subscriber of states change
 */

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
World.prototype.updateEntityStates = function(){
	console.log('')
	while (this.changedIds.length > 0 || this.removeIds.length > 0){
		this.aspectSubscriptionManager.process(this.changedIds, this.removeIds);
		this.changedIds = [];
		this.removeIds = [];
	}
};
