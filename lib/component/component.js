/**
 * The component class of ECS, each component have their ComponentType, this one will be manage in the ComponentTypeManager which wile instanciate in the Area(World).
 * @class
 * @param {ComponentType} componentType
 * @author episanchez
 */

var Component = function(componentType){
	/**
	 * @member {ComponentType} ctype - Component Type of component object
	 * @memberof Component
	 */
	this.ctype = componentType;
};

module.exports = Component;

/**
 * Get component type
 * @return {ComponentType}
 */
Component.prototype.getComponentType = function(){
	return this.ctype;
};