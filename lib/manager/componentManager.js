
var Manager = require('./manager');
var ComponentType = require('../component/componentType');
var OwnArray = require('../tools/array');

var util = require('util');

/**
 * It used in the world for manage all your component class
 * @class
 * @extends Manager
 * @author : episanchez
 */

var ComponentManager = function(){
	this.idx = 0;
	this.componentsType = {};
	this.componentsByType = [[]];
};

util.inherits(ComponentManager, Manager);
module.exports = ComponentManager;

/**
 * Implement insert and remove entity event
 */

ComponentManager.prototype.insert = function(id){};

ComponentManager.prototype.remove = function(id){
	this.removeAllComponentsByEntity(this.world.getEntityById(id));
};

/**
 * Manage the componentsType
 */
ComponentManager.prototype.getComponentTypeByName = function(name){
	return this.componentsType[name];
};

// Create a new components, add Class

ComponentManager.prototype.create = function(name, type){
	this.componentsType[name] = new ComponentType(this.idx, name, type);
	this.componentsByType[this.idx] = [];
	this.idx++;
};

ComponentManager.prototype.removeComponentType = function(name){
	var ct = getComponentTypeByName(name);

	OwnArray.removeByIndex(this.componentsByType, ct.getId());
	delete this.componentsType[name];
};

/**
 * Manage for entity
 */

ComponentManager.prototype.addComponentByName = function(entity, name){
	var ct = this.componentsType[name];
	var type = ct.getType();

	this.componentsByType[ct.getId()].push(entity.getUID());
	entity[name] = new type;

	if (this.world)
		this.world.addChangedId(entity.getUID());
};

ComponentManager.prototype.removeComponentByName = function(entity, name){
	var ct = this.getComponentTypeByName(name)
	if (ct){
		OwnArray.removeByIndex(this.componentsByType[ct.getId], entity.getUID());
		delete entity[name];
	}

	if (this.world)
		this.world.addChangedId(entity.getUID());
};

ComponentManager.prototype.removeEntityComponentsSetByValue = function(set, value){
	for (idx in set){
		OwnArray.removeByIndex(this.componentsByType[idx], value);
	}
};

ComponentManager.prototype.removeAllComponentsByEntity = function(entity){
	this.removeEntityComponentsSetByValue(entity.getComponentsSet(), entity.getUID());
	entity = new Entity(this, entity.getUID());
};

ComponentManager.prototype.getAllComponentsByUID = function(uid){
	var arr = [];

	for (var idx = 0; idx < this.componentsByType.length; idx++){
		for (val in this.componentsByType[idx]){
			if (val === uid){
				arr.push(idx);
				break;
			}
		}
	}
	return arr;
};
