/**
 * The component class of ECS, each component have their ComponentType, this one will be manage in the ComponentTypeManager which wile instanciate in the Area(World).
 * @class
 * @param {Object} parameters - All parameters of Component {id, name}
 * @author episanchez
 */

var ComponentType = require('component/componentType');

var Component = function(parameters){
	/**
	 * @member {ComponentType} ctype - Component Type of component object
	 * @memberof Component
	 */
	 this.ctype = undefined;
	 	/**
	 * @member {ComponentType} optName - Name of component's ComponentType before the creation in ComponentManager
	 * @memberof Component
	 */
	 this.optName = null;

	if (!parameters || typeof parameters !== "object" || (!parameters instanceof ComponentType && !parameters.hasOwnProperty('name'))){
		throw 'bad component instanciation (example new Component({id:0, name:"test"}))';
	}
	 /**
	  * old compatibility (<= 0.0.3)
	  * Will be removed for ~=0.0.5
	  */
	else if (parameters instanceof ComponentType){
		this.ctype = parameters;
	}
	/**
	 * new compability (> 0.0.3)
	 */
	else if (parameters.hasOwnProperty('id') && parameters.hasOwnProperty('name')){
		this.ctype = new ComponentType(parameters.id, parameters.name, this);
	}
	else{
		this.optName = parameters.name;
	}
};

module.exports = Component;

/**
 * Get component type
 * @return {ComponentType}
 */
Component.prototype.getComponentType = function(){
	return this.ctype;
};

/**
 * Set component type
 * @param {ComponentType} componentType - 
 */
Component.prototype.setComponentType = function(componentType){
	this.ctype = componentType;
};