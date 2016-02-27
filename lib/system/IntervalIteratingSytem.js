/**
 * The intervalIteratingSystem (based on artemis)
 * @author episanchez
 */


var IntervalSystem = require('./intervalSystem');
var util = require('util');

var IntervalIteratingSystem = function(interval){
	IntervalSystem.call(this, interval);

};

util.inherits(IntervalIteratingSystem, IntervalSystem);

module.exports = IntervalIteratingSystem;

IntervalIteratingSystem.prototype.process = function(entity){
	throw 'need to be implemented';
};

IntervalIteratingSystem.prototype.processSystem = function(){
	var entities = this.subscription.getEntities();

	for (var i = 0; i < entities.length; i++){
		this.process(entities[i]);
	}
};