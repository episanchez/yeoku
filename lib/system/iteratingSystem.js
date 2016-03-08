
var EntitySystem = require('./entitySystem');
var util = require('util');

/**
 * The Iterating System (based on artemis)
 * @class
 * @extends EntitySystem
 * @author episanchez
 */
var IteratingSystem = function(interval){
	EntitySystem.call(this);

};

util.inherits(IteratingSystem, EntitySystem);

module.exports = IteratingSystem;

/**
 * Process one entity
 * @param {number} entity - id of entity
 * @virtual
 */
IteratingSystem.prototype.processEntity = function(entity){
	throw 'need to be implemented';
};

/**
 * Processing System (in this case, each entity subscriber will be process in process Entity methods)
 */
IteratingSystem.prototype.processSystem = function(){
	var entities = this.subscription.getEntities();

	for (var i = 0; i < entities.length; i++){
		this.processEntity(entities[i]);
	}
};