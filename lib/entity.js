/**
 * @title : ECS - Entity
 * @author : episanchez
 */

var OwnArray = require('./tools/array');

 var Entity = function(manager, uid){
 	this.uid = uid;

 	this._Manager = manager;

 	this._Components = {};
 	this._ComponentsSet = [];
 };

 module.exports = Entity;

 Entity.prototype.addComponent = function(TComponent){
 	this._Manager.entityAddComponent(this, TComponent);
 	this._ComponentsSet.push(TComponent.getType().ctId);
 };

 Entity.prototype.removeComponent = function(TComponent){
 	this._Manager.entityRemoveComponent(this, TComponent);
 	OwnArray.removeByValue(this._ComponentsSet, TComponent.getType().ctId);
 };

 Entity.prototype.hasComponent = function(TComponent){
 	if (this._Components[TComponent])
 		return (true);
 	else
 		return (false);
 };

 Entity.prototype.removeAllComponents = function(){
 	this._Manager.entityRemoveAllComponents(this);
 };

 Entity.prototype.hasAllComponents = function(){
 	return (this._Components);
 };

Entity.prototype.getComponentsSet = function(){
	return (this._ComponentsSet);
};

