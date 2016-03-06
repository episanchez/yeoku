/**
 * Track a subset of entities but does not implement any sorting or iteration
 * @author episanchez
 */

var Aspect = require('../aspect/aspect');
var BaseSystem = require('./baseSystem');
var util = require('util');

var EntitySystem = function(){
	BaseSystem.call(this);

	this.subscription = null;
	this.aspect = new Aspect();
};

util.inherits(EntitySystem, BaseSystem);

module.exports = EntitySystem;

function getComponentsTypeIds(componentsType){
	var arr = [];

	for (var i = 0; i < componentsType.length; i++){
		var cType = this.world.componentManager.getComponentTypeByName(componentsType[i]);

		if (cType){
			arr.push(cType.getId());
		}
	}
	return arr;
};

EntitySystem.prototype.initialize = function(){
	this.subscription = this.world.getAspectSubscriptionManager().createSubscription(this.aspect);
	this.subscription.addSubscriptionListener({inserted: this.inserted, removed: this.removed});
};

/**
 * Build Aspect with ComponentsType Name
 * param {Array} Array of Components Type Name for aspect all components (entity need having all components type of the list)
 * param {Array} Array of Components Type Name for aspect one components (entity need having one components type of the list)
 * param {Array} Array of Components Type Name for aspect exclude components (entity need haven't component type of the list)
 */

EntitySystem.prototype.buildAspectWithComponentsTypeName = function(allComponents, oneComponents, excludeComponents){
	allIds = getComponentsTypeIds.call(this, allComponents);
	oneIds = getComponentsTypeIds.call(this, oneComponents);
	excludeIds = getComponentsTypeIds.call(this, excludeComponents);

	this.aspect.buildAll(allIds);
	this.aspect.buildOne(oneIds);
	this.aspect.buildExclude(excludeIds);
};

EntitySystem.prototype.remove = function(entity){};

EntitySystem.prototype.insert = function(entity){
	console.log('insert entites');
};

EntitySystem.prototype.removed = function(entities){
	for (var i = 0; i < entities.length; i++){
		this.remove(entities[i]);
	}
};

EntitySystem.prototype.inserted = function(entities){
	console.log('test : ' + JSON.stringify(this.aspect));
	for (var i = 0; i < entities.length; i++){
		this.insert(entities[i]);
	}
};

