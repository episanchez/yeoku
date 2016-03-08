
var IntervalSystem = require('./intervalSystem');
var util = require('util');

/**
 * The intervalIteratingSystem (based on artemis)
 * @class
 * @extends IntervalSystem
 * @author episanchez
 */

var IntervalIteratingSystem = function(interval){
	IntervalSystem.call(this, interval);

};

util.inherits(IntervalIteratingSystem, IntervalSystem);

module.exports = IntervalIteratingSystem;

/**
 * Process one entity
 * @param {number} entity - id of entity
 * @virtual
 */
IntervalIteratingSystem.prototype.processEntity = function(entity){
	throw 'need to be implemented';
};

/**
 * Processing System (in this case, each entity subscriber will be process in process Entity methods)
 */
IntervalIteratingSystem.prototype.processSystem = function(){
	var entities = this.subscription.getEntities();

	for (var i = 0; i < entities.length; i++){
		this.processEntity(entities[i]);
	}
};