/**
 * The primary instance for the game.
 * This one contains all the systems.
 * @author : episanchez
 */

var AspectSubscriptionManager = require('./manager/aspectSubscriptionManager');
var OwnArray = require('tools/arrays');

var World = function(){

	// Contains all systems
	this.systems = [];

	this.changedId = [];
	this.deletedId = [];

	this.em = null;

	this.aspectSubscriptionManager = new AspectSubscriptionManager(this);
};

module.exports = World;

/**
 * Getter of the world
 */

World.prototype.getSystems = function(){
	return this.systems;
};

World.prototype.getEntityManager = function(){
	return (this.em);
};

World.prototype.getAspectSubscriptionManager = function(){
	return this.aspectSubscriptionManager;
};

// Process of the world

World.prototype.process = function(){
	this.updateEntityStates();
	for (var i = 0; i < this.systems.length; i++){
		var system = this.systems[i];
		system.process();
		updateEntityStates();
	}
};

/*
 * Add/Remove World's System
 */

World.prototype.addSystem = function(system){
	// check if system is {system/baseSystem} Object
	system.setWorld(this);
	system.initialize();
	this.systems.push(system);
};

World.prototype.removeSystem = function(system){
	OwnArray.removeByValue(this.systems, system);
};

/**
 * Inform subscriber of states change
 */

World.updateEntityStates = function(){
	while (this.changedId.length > 0 && this.deletedId.length > 0){
		this.aspectSubscriptionManager.process(changedId, deletedId);
	}
};
