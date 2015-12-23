/**
 * Manage, Create and destroy entities. Can use methods directly or via facade on the Entity.
 * status : TODO
 * Author : episanchez
 */

 var EntityManager = function() {

 	this._entities = [];

 };

 module.exports = EntityManager;

EntityManager.prototype.initialize = function(){
	// add subscription listener
};

EntityManager.prototype.processSystem = function(){

};

// Subscription listener

/*
 * param {Array} Array of entities inserted
 */
EntityManager.prototype.inserted = function(entities){

};

/*
 * param {Array} Array of entities deleted
 */
EntityManager.prototype.deleted = function(entities){

};

// Getter

EntityManager.prototype.getEntityById = function(id){
	return this._entities[id];
};

EntityManager.prototype.isActive = function(id){

};

/**
 * Synchronize the new subscription
 * @param {object} take an EntitySubscription Object
 */

EntityManager.prototype.synchronize = function(entitySubscription){

};


// Manage the entity component (get, add, remove ...)

EntityManager.prototype.entityAddComponent = function(entity, TComponent){

};

EntityManager.prototype.entityRemoveComponent = function(entity, TComponent){

};

EntitManager.prototype.entityRemoveAllComponents = function(entity, TComponent){

};