/**
 * The primary instance for the game.
 * This one contains all the systems.
 * @author : episanchez
 */

var aspectSubscriptionManager = require('./manager/aspectSubscriptionManager');

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

World.prototype.getSytems = function(){
	return this.systems;
};

World.prototype.getSytem = function(systemName){

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
	for (system in this.systems){
		system.process();
		updateEntityStates();
	}
};

//
/**
 * Inform subscriber of states change
 */

World.updateEntityStates = function(){
	while (){
		this.aspectSubscriptionManager.process(changedId, deletedId);
	}
};
