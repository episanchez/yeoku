
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

IteratingSystem.prototype.processEntity = function(entity){
	throw 'need to be implemented';
};

IteratingSystem.prototype.processSystem = function(){
	var entities = this.subscription.getEntities();

	for (var i = 0; i < entities.length; i++){
		this.processEntity(entities[i]);
	}
};