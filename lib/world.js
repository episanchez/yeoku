/**
 * The primary instance for the game.
 * This one contains all the systems.
 * @author : episanchez
 */

var AspectSubscriptionManager = require('./manager/aspectSubscriptionManager');

var World = function(){

	// Contains all systems
	this.systems = [];

	this.changedId = [];
	this.deletedId = [];


	this.entityManager = null;
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
	return this.entityManager;
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

//
/**
 * Inform subscriber of states change
 */

World.updateEntityStates = function(){
	while (this.changedId.length > 0 && this.deletedId.length > 0){
		this.aspectSubscriptionManager.process(changedId, deletedId);
	}
};
