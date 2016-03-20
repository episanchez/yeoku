
var Manager = require('./manager');
var ComponentType = require('component/componentType');
var OwnArray = require('../tools/array');

var util = require('util');

/**
 * It used in the world for manage all your component class
 * @class
 * @extends Manager
 * @author : episanchez
 */
var ComponentManager = function(){
	/**
	 * @member {number} idx - current last id
	 * @memberof ComponentManager
	 * @default 0
	 */
	this.idx = 0;
	/**
	 * @member {number} componentsType - current last id
	 * @memberof ComponentManager
	 */
	this.componentsType = {};
	/**
	 * @member {Array[]} componentsByType - current last id
	 * @memberof ComponentManager
	 */
	this.componentsByType = [[]];
};

util.inherits(ComponentManager, Manager);
module.exports = ComponentManager;

/**
 * Implement insert entity event
 * @param {number} id - id of entity
 */
ComponentManager.prototype.insert = function(id){};

/**
 * Implement remove entity event
 * @param {number} id - id of entity
 */
ComponentManager.prototype.remove = function(id){
	this.removeAllComponentsByEntity(this.world.getEntityById(id));
};

/**
 * get Component Type by name
 * @param {string} name - Name of the componenty type
 * @return {ComponentType}
 */
ComponentManager.prototype.getComponentTypeByName = function(name){
	return this.componentsType[name];
};


/**
 * Create a new ComponentType
 * @param {Object} obj - Class of ComponentType
 * deprecated (<= 0.0.3) : create(name, type)
 */
ComponentManager.prototype.create = function(obj){
	/**
	 * Use the deprecated form
	 */
	if (arguments.length === 2){
		this.componentsType[arguments[0]] = new ComponentType(this.idx, arguments[0], arguments[1]);
		this.componentsByType[this.idx] = [];
	}
	else if (arguments.length < 2) {
		var name = this.optName;
		this.componentsType[name] = new ComponentType(this.idx, name, obj);
		this.componentsByType[this.idx] = [];		
	}
	else{
		throw 'Bad ComponentType creation';
	}
	this.idx++;
}

/**
 * Remove a Component Type 
 * @param {string} name - Name of Component Type
 */
ComponentManager.prototype.removeComponentType = function(name){
	var ct = getComponentTypeByName(name);

	OwnArray.removeByIndex(this.componentsByType, ct.getId());
	delete this.componentsType[name];
};


/**
 * Add component with his name to the entity
 * @param {Entity} entity - Entity that we insert a new component
 * @param {string} name - Name of ComponentType
 */
ComponentManager.prototype.addComponentByName = function(entity, name){
	var ct = this.componentsType[name];
	var type = ct.getType();

	this.componentsByType[ct.getId()].push(entity.getUID());
	entity[name] = new type;
	entity[name].setComponentType(type);

	if (this.world)
		this.world.addChangedId(entity.getUID());
};

/**
 * Remove component with his name to the entity
 * @param {Entity} entity - Entity that we remove one of its component
 * @param {string} name - Name of ComponentType
  */
ComponentManager.prototype.removeComponentByName = function(entity, name){
	var ct = this.getComponentTypeByName(name)
	if (ct){
		OwnArray.removeByIndex(this.componentsByType[ct.getId], entity.getUID());
		delete entity[name];
	}

	if (this.world)
		this.world.addChangedId(entity.getUID());
};

/**
 * Remove each value among the set parameters to the componentsByType array
 * @param {Number[]} set - set of Entity Components' set
 * @param {number} value - value has to be remove
 */
ComponentManager.prototype.removeEntityComponentsSetByValue = function(set, value){
	for (idx in set){
		OwnArray.removeByIndex(this.componentsByType[idx], value);
	}
};

/**
 * Remove All Components of one Entity
 * @param {Entity} entity - Entity that we remove all its components
 */
ComponentManager.prototype.removeAllComponentsByEntity = function(entity){
	this.removeEntityComponentsSetByValue(entity.getComponentsSet(), entity.getUID());
	entity = new Entity(this, entity.getUID());
};

/**
 * Get All components of an entity by its uid
 * @param {number} set - set of Entity Components' set
 * @return {Number[]} Array of Entity Components Set
 */
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
