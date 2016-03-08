/**
 * Component Type, for each component class, you have to create a new ComponentType
 * @class
 * @param {number} id - id of Component Type
 * @param {string} name - Name of Component Type
 * @param {Object} type - Class of Component
 * @author episanchez
 */

var ComponentType = function(id, name, type){
	/**
	 * @member {string} _name - Name of Component Type
	 * @memberof ComponentType
	 */
	this._name = name;
	/**
	 * @member {number} _id - id of Component Type
	 * @memberof ComponentType
	 */
	this._id = id;
	/**
	 * @member {Object} _type - Class of Component
	 * @memberof ComponentType
	 */
	this._type = type;
};

module.exports = ComponentType;

/**
 * Get the id of Component Type
 * @return {number} id of component type
 */
ComponentType.prototype.getId = function(){
	return this._id;
};

/**
 * Set the name of Component Type
 * @param {string} name - Name of component Type
 */
ComponentType.prototype.setName = function(name){
	this._name = name;
};

/**
 * Get the name of ComponentType
 * @return {string} name of component type
 */
ComponentType.prototype.getName = function(){
	return this._name;
};

/*
 * Set the Component Class of component type
 * @param {Object} type - class of component
 */
ComponentType.prototype.setType = function(type){
	this._type = type;
};

/**
 * Get the Component's Class of component type
 * @return {Object} class of component
 */
ComponentType.prototype.getType = function(){
	return this._type;
};
