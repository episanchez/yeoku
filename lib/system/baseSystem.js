/**
 * The base system of ECS (based on Artemis odb)
 * @class
 * @author : episanchez
 */ 

var BaseSystem = function(){
	/**
	 * @member {World} world - Copy of the current world
	 * @memberof BaseSystem
	 * @default null
	 */
	this.world = null;
	/**
	 * @member {boolean} enabled - The system's status
	 * @memberof BaseSystem
	 * @default false
	 */
	this.enabled = false;
};

module.exports = BaseSystem;

/**
 * Begin processing of system
 */
BaseSystem.prototype.begin = function(){};

/**
 * Processing of system, calls if check processing is true : begin, processSystem, end methods 
 */
BaseSystem.prototype.process = function(){
	if (this.enabled && this.checkProcessing()){
		this.begin();
		this.processSystem();
		this.end();
	}
};

/**
 * Initialization of system
 * @virtual
 */
BaseSystem.prototype.initialize = function(){
	throw 'Have to be implemented';
};

/**
 * Check if the system could be process.
 */
BaseSystem.prototype.checkProcessing = function(){
	return true;
};

/**
 * Process the system
 * Have to be impemented
 * @virtual
 */
BaseSystem.prototype.processSystem = function(){
	throw 'Have to be implemented';
};

/**
 * End Processing of system
 */
BaseSystem.prototype.end = function(){};

/**
 * Enable system
 */
BaseSystem.prototype.enable = function(){
	this.enabled = true;
};

/**
 * Disable System
 */
BaseSystem.prototype.disable = function(){
	this.enabled = false;
};

/**
 * Set a world to the system
 * @param {World} world -
 */
BaseSystem.prototype.setWorld = function(world){
	this.world  = world;
};

/**
 * Give the status boolean of system
 * @return {boolean} IsEnable
 */
BaseSystem.prototype.getEnabled = function(){
	return this.enabled;
};

/**
 * Get the World
 * return {World}
 */
BaseSystem.prototype.getWorld = function(){
	return this.world;
};

