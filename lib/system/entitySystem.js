/**
 * Track a subset of entities but does not implement any sorting or iteration
 * @author episanchez
 */

var BaseSystem = require('./baseSytem');
var util = require('util');

var EntitySystem = function(){
	BaseSystem.call(this);

	this.subscription = null;
};

util.inherits(EntitySystem, BaseSystem);

module.exports = EntitySystem;

EntitySystem.prototype.initialize = function(){
	var entitySubscription = this.world.getAspectSubscriptionManager().createSubscription(new Aspect());
	entitySubscription.addSubscriptionListener({inserted: this.inserted, removed: this.removed});
};

EntitySystem.prototype.removed = function(entities){
	for (var i = 0; i < entities.length; i++){
		this.remove(entities[i]);
	}
};

EntitySystem.prototype.inserted = function(entities){
	for (var i = 0; i < entities.length; i++){
		this.insert(entities[i]);
	}
};

EntitySystem.prototype.remove = function(entity){};

EntitySystem.prototype.insert = function(entity){};
