/**
 * The base system of ECS (based on Artemis odb)
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
	if (enabled && checkProcessing()){
		begin();
		processSystem();
		end();
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

BaseSystem.prototype.setEnabled = function(enabled){
	this.enabled = enabled;
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

