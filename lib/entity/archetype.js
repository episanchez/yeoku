/**
 * Archetype 
 * @author episanchez
 * @class
 * @param {array} Array of components
 */

var Archetype = function(components){
	if (components instanceof Array)
		this.components = components;
	else
		this.components = null;
};

module.exports = Archetype;

/**
 * Get the components' array
 * @return {array} array of components
 */
Archetype.prototype.getComponents = function(){
	return this.components;
}

/**
 * Add a component to the archetype
 * @param {Object} component -
 */
Archetype.prototype.addComponent = function(component){
	if (this.components != null)
		this.components.push(component);
}

/*
 * Set an array of components
 * @param {array} components - array of components
 */
Archetype.prototype.setComponents = function(components){
	if (components instanceof Array){
		this.components = components;
	}
}