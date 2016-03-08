/**
 * The base system of ECS (based on Artemis odb)
 * @class
 * @author : episanchez
 */ 

var BaseSystem = function(){
	this.world = null;
	this.enabled = false;
};

module.exports = BaseSystem;

BaseSystem.prototype.begin = function(){
	//nothing
};

BaseSystem.prototype.process = function(){
	if (this.enabled && this.checkProcessing()){
		this.begin();
		this.processSystem();
		this.end();
	}
};

BaseSystem.prototype.initialize = function(){
	throw 'Have to be implemented';
};


BaseSystem.prototype.checkProcessing = function(){
	return true;
};

/**
 * Process the system
 * Have to be impemented
 */
BaseSystem.prototype.processSystem = function(){
	throw 'Have to be implemented';
};

BaseSystem.prototype.end = function(){
	//nothing
};

BaseSystem.prototype.enable = function(){
	this.enabled = true;
};

BaseSystem.prototype.disable = function(){
	this.enabled = false;
};

BaseSystem.prototype.setWorld = function(world){
	this.world  = world;
};

BaseSystem.prototype.getEnabled = function(){
	return this.enabled;
};

BaseSystem.prototype.getWorld = function(){
	return this.world;
};

