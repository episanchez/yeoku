/**
 * The component class of ECS, each component have their ComponentType, this one will be manage in the ComponentTypeManager which wile instanciate in the Area(World).
 * @class
 * @author : episanchez
 */

var Component = function(componentType){

	this.ctype = null;
};

module.exports = Component;

Component.prototype.getComponentType = function(){
	return this.ctype;
};