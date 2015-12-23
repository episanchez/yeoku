/**
 * It used in the world for manage all your component class
 * @author : episanchez
 * TODO : add pool
 */

var componentType = require('./componentType');

var ComponentTypeManager = function(){
	this.idx = 0;
	this.componentsType = {};
};

module.exports = ComponentTypeManager;

ComponentTypeManager.prototype.addComponentType = function(args){
	var ctype = new ComponentType({ctname : args.ctname, ctid: idx});

	this.componentsType[args.ctname] = ctype;
	this.idx++;
};


ComponentTypeManager.prototype.removeComponentTypeByName = function(name){
	if (this.componentsType.hasOwnProperty(name)){
		delete this.componentsType[name];
	}
};

ComponentTypeManager.prototype.getComponentTypeByName = function(name){
	if (this.componentsType.hasOwnProperty(name)){
		return (this.componentsType[name]);
	}
	return null;
};

ComponentTypeManager.prototype.getComponentTypeId = function(id){
	if (this.componentsType.hasOwnProperty(name)){
		return (this.componentsType[name].getId());
	}
	return (-1);
};



