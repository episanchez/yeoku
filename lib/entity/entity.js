
var OwnArray = libRequire('tools/array');

/**
 * Containers of components
 * @class
 * @param {ComponentManager} manager - The component manager related to the entity
 * @param {number} uid - uid of the entity
 * @author episanchez
 */
var Entity = function(manager, uid){
	/**
	 * @member {number} uid - uid of the entity
	 * @memberof Entity
	 */
 	this.uid = uid;
	/**
	 * @member {ComponentManager} manager - Component manager of the entity
	 * @memberof Entity
	 */
 	this._Manager = manager;
	/**
	 * @member {number} componentsSet - Components Ids of the entity
	 * @memberof Entity
	 */
 	this._ComponentsSet = [];
};

 module.exports = Entity;

/**
 * Get the id of Entity
 * @return {number} uid
 */
Entity.prototype.getUID = function(){
	return this.uid;
};

/**
 * Add a component to the entity
 * @param {string} name - Name of The Component
 * @param {object} values - init values of component's attributes
 */
Entity.prototype.addComponent = function(name, values){
 	var ct = this._Manager.getComponentTypeByName(name);

 	if (ct){
 		this._Manager.addComponentByName(this, name, values);
 		this._ComponentsSet.push(ct.id);
 	}
 };

/**
 * Remove a component to the entity
 * @param {string} name - Name of the component
 */
Entity.prototype.removeComponent = function(name){
 	var ct = this._Manager.getComponentTypeByName(name);

 	if (ct){
 		this._Manager.removeComponentByName(this, name);
 		OwnArray.removeByValue(this._ComponentsSet, ct.id);
 	}
 };

/**
 * Get the component of the entity with the name in parameter
 * @param {string} name - Name of Component
 * @return {boolean} Boolean if the entity exists
 */
Entity.prototype.hasComponent = function(name){
  if (Object.prototype.hasOwnProperty.call(this, name))
 		return (true);
 	else
 		return (false);
 };

/**
 * Remove all components of the entity
 */
Entity.prototype.removeAllComponents = function(){
 	this._Manager.removeAllComponentsByEntity(this);
 };

/**
 * Get all components of the entity
 * @return {Component[]} Array of entity's components
 */
Entity.prototype.getAllComponents = function(){
 	return this._Manager.getAllComponentsByUID(this.uid);
 };

/**
 * Get the Components Set of the entity
 * @return {Array} Set of components' id
 */
Entity.prototype.getComponentsSet = function(){
	return (this._ComponentsSet);
};
