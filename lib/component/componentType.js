/**
 * Component Type, for each component class, you have to create a new ComponentType
 *
 */

var ComponentType = function(ctype){
	this.ctname = ctype._name;
	this.ctId = ctype._id;
};

module.exports = ComponentType;

ComponentType.prototype.getId = function(){
	return this.ctId;
};

ComponentType.prototype.setName = function(name){
	this.ctname = name;
};

ComponentType.prototype.getName = function(){
	return this.ctname;
};
