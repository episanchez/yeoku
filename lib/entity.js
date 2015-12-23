/**
 * @title : ECS - Entity
 * @author : episanchez
 */

 var Entity = function(manager){
 	this.uid = 0;

 	this._Manager = manager;

 	this._Components = {};
 };

 module.exports = Entity;

 Entity.prototype.addComponent = function(TComponent){
 	this._Manager.entityAddComponent(this, TComponent);
 };

 Entity.prototype.removeComponent = function(TComponent){
 	this._Manager.entityRemoveComponent(this, TComponent);
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
