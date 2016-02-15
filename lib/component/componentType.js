/**
 * Component Type, for each component class, you have to create a new ComponentType
 *
 */

var ComponentType = function(id, name, type){
	this._name = name;
	this._id = id;
	this._type = type;
};

module.exports = ComponentType;

ComponentType.prototype.getId = function(){
	return this._id;
};

ComponentType.prototype.setName = function(name){
	this._name = name;
};

ComponentType.prototype.getName = function(){
	return this._name;
};

ComponentType.prototype.setType = function(type){
	this._type = type;
};

ComponentType.prototype.getType = function(){
	return this._type;
};
