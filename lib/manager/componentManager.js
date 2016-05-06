
var Manager = require('./manager');
var OwnArray = libRequire('tools/array');

var util = require('util');

/**
 * It used in the world for manage all your component class
 * @class
 * @extends Manager
 * @author : episanchez
 */
var ComponentManager = function(){
	Manager.call(this);
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
	this.componentsByType = [];
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
 * get the result if the componentType exists
 * @since 0.0.5
 * @param {string} componentName - Name of component
 * @return {boolean}
 */

ComponentManager.prototype.isComponentTypeExist = function(componentName){
	return (this.componentsType(componentName) != undefined);
}
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
 * @param {Object} obj - Class of Component
 */
ComponentManager.prototype.create = function(obj){
	// new instance obj
	obj["id"] = this.idx;
	this.componentsType[obj.typeName] = obj;
	this.componentsByType[this.idx] = [];
	this.idx++;
}

/**
 * Remove a Component Type 
 * @param {string} name - Name of Component Type
 */
ComponentManager.prototype.removeComponentType = function(name){
	var ct = this.getComponentTypeByName(name);

	OwnArray.removeByIndex(this.componentsByType, ct.id);
	delete this.componentsType[name];
};


/**
 * Add component with his name to the entity
 * @param {Entity} entity - Entity that we insert a new component
 * @param {string} name - Name of ComponentType
 */
ComponentManager.prototype.addComponentByName = function(entity, name){
	var ct = this.componentsType[name];

	this.componentsByType[ct.id][entity.getUID()] = entity.getUID();
	entity[name] = Object.create(ct);

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
		OwnArray.removeByIndex(this.componentsByType[ct.id], entity.getUID());
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
			val = parseInt(val, 10)
			if (val === uid){
				arr.push(idx);
				break;
			}
		}
	}
	return arr;
};
