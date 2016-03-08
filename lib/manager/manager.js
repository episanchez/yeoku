
var BaseSystem = require('../system/baseSystem');
var util = require('util');

/**
 * Base Manager
 * @class
 * @extends BaseSystem
 * @author episanchez
 */
var Manager = function(){
	BaseSystem.call(this);
};

util.inherits(Manager, BaseSystem);
module.exports = Manager;

/**
 * Initialization of the manager (register it in the aspectSubscriptionManager)
 */
Manager.prototype.initialize = function(){
	this.world.getAspectSubscriptionManager().registerManager(this);
};

/**
 * Inserted Subscription Listener (call the insert methods for each ids)
 * @param {Number[]} ids - Array of entity ids
 */
Manager.prototype.inserted = function(ids){
	for (var i = 0; i < ids.length; i++){
		this.insert(ids[i]);
	}
};

/**
 * Removed Subscription Listener (call the remove methods for each ids)
 * @param {Number[]} ids - Array of entity ids
 */
Manager.prototype.removed = function(ids){
	for (var i = 0; i < ids.length; i++){
		this.remove(ids[i]);
	}
};

/**
 * Insert Subscription listener
 * @param {number} id - id of the entity inserted
 * @virtual
 */
Manager.prototype.insert = function(id){
	throw 'need to be implemented';
};

/**
 * Remove Subscription listener
 * @param {number} id - id of the entity removed
 * @virtual
 */
Manager.prototype.remove = function(id){
	throw 'need to be implemented';
};