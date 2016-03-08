
var Aspect = require('../aspect/aspect');
var BaseSystem = require('./baseSystem');
var util = require('util');

/**
 * Track a subset of entities but does not implement any sorting or iteration
 * @class
 * @extends BaseSystem
 * @author episanchez
 */

var EntitySystem = function(){
	BaseSystem.call(this);
	/**
	 * @member {EntitySubscription} subscription - The System's EntitySubscription 
	 * @memberof EntitySystem
	 * @default null
	 */
	this.subscription = null;
	/**
	 * @member {Aspect} aspect - The EntitySystem's Aspect
	 * @memberof EntitySystem
	 */	
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

/**
 * Initialization of the EntitySystem
 * This one creates an EntitySubscription with the system's aspect and add a subscriptionListener
 */
EntitySystem.prototype.initialize = function(){
	this.subscription = this.world.getAspectSubscriptionManager().createSubscription(this.aspect);
	this.subscription.addSubscriptionListener(this);
};

/**
 * Build Aspect with ComponentsType Name
 * @param {String[]} Array of Components Type Name for aspect all components (entity need having all components type of the list)
 * @param {String[]} Array of Components Type Name for aspect one components (entity need having one components type of the list)
 * @param {String[]} Array of Components Type Name for aspect exclude components (entity need haven't component type of the list)
 */
EntitySystem.prototype.buildAspectWithComponentsTypeName = function(allComponents, oneComponents, excludeComponents){
	allIds = getComponentsTypeIds.call(this, allComponents);
	oneIds = getComponentsTypeIds.call(this, oneComponents);
	excludeIds = getComponentsTypeIds.call(this, excludeComponents);

	this.aspect.buildAll(allIds);
	this.aspect.buildOne(oneIds);
	this.aspect.buildExclude(excludeIds);
};

/**
 * Remove Subscription listener
 * @param {number} id - id of the entity removed
 */
EntitySystem.prototype.remove = function(id){};

/**
 * Insert Subscription listener
 * @param {number} id - id of the entity inserted
 */
EntitySystem.prototype.insert = function(id){};

/**
 * Removed Subscription Listener (call the remove methods for each ids)
 * @param {Number[]} entities - Array of entity ids
 */
EntitySystem.prototype.removed = function(entities){
	for (var i = 0; i < entities.length; i++){
		this.remove(entities[i]);
	}
};

/**
 * Inserted Subscription Listener (call the insert methods for each ids)
 * @param {Number[]} ids - Array of entity ids
 */
EntitySystem.prototype.inserted = function(entities){
	for (var i = 0; i < entities.length; i++){
		this.insert(entities[i]);
	}
};

