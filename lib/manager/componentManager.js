/**
 * It used in the world for manage all your component class
 * @author : episanchez
 * TODO : add tag, inheritance with baseSystem
 */

var ComponentType = require('../component/componentType');
var util = require('util');
var OwnArray = require('../tools/array');

var ComponentManager = function(){
	this.idx = 0;
	this.componentsType = {};
	this.componentsByType = [[]];
};

module.exports = ComponentManager;

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

	this.componentsByType[ct.getId()].push(entity.getUID());

	var type = ct.getType();
	entity[name] = new type;
};

ComponentManager.prototype.removeComponentByName = function(entity, name){
	var ct = this.getComponentTypeByName(name)
	if (ct){
		OwnArray.removeByIndex(this.componentsByType[ct.getId], entity.getUID());
		delete entity[name];
	}
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
