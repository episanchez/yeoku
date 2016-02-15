/**
 * @title : ECS - Entity
 * @author : episanchez
 * Todo : add all Components function
 */

var OwnArray = require('./tools/array');

 var Entity = function(manager, uid){
 	this.uid = uid;

 	this._Manager = manager;

 	this._ComponentsSet = [];
 };

 module.exports = Entity;

Entity.prototype.getUID = function(){
	return this.uid;
};

Entity.prototype.addComponent = function(name){
 	var ct = this._Manager.getComponentTypeByName(name);

 	if (ct){
 		this._Manager.addComponentByName(this, name);
 		this._ComponentsSet.push(ct.getId());
 	}
 };

Entity.prototype.removeComponent = function(name){
 	var ct = this._Manager.getComponentTypeByName(name);

 	if (ct){
 		this._Manager.removeComponentByName(this, TComponent);
 		OwnArray.removeByValue(this._ComponentsSet, ct.getId());
 	}
 };

Entity.prototype.hasComponent = function(name){
 	if (this._Manager.getComponentTypeByName(name))
 		return (true);
 	else
 		return (false);
 };

Entity.prototype.removeAllComponents = function(){
 	this._Manager.removeAllComponentsByEntity(this);
 };

Entity.prototype.getAllComponents = function(){
 	return this._Manager.getAllComponentsByUID(this.uid);
 };

Entity.prototype.getComponentsSet = function(){
	return (this._ComponentsSet);
};

