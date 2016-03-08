
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

Manager.prototype.initialize = function(){
	this.world.getAspectSubscriptionManager().registerManager(this);
};

Manager.prototype.inserted = function(ids){
	for (var i = 0; i < ids.length; i++){
		this.insert(ids[i]);
	}
};

Manager.prototype.removed = function(ids){
	for (var i = 0; i < ids.length; i++){
		this.remove(ids[i]);
	}
};

Manager.prototype.insert = function(id){
	throw 'need to be implemented';
};

Manager.prototype.remove = function(id){
	throw 'need to be implemented';
};