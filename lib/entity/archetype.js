/**
 * Archetype 
 * @author episanchez
 */

var Archetype = function(components){
	if (components instanceof Array)
		this.components = components;
	else
		this.components = null;
};

module.exports = Archetype;

Archetype.prototype.getComponents = function(){
	return this.components;
}

Archetype.prototype.addComponent = function(component){
	if (this.components != null)
		this.components.push(component);
}

Archetype.prototype.setComponents = function(components){
	if (components instanceof Array){
		this.components = components;
	}
}