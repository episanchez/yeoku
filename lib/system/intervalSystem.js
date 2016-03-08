
var Timers = require('timers');
var EntitySystem = require('./entitySystem');
var util = require('util');

/**
 * The interval System (based on artemis)
 * @class
 * @extends EntitySystem
 * @author episanchez
 */

var IntervalSystem = function(interval){
	EntitySystem.call(this);

	this.isTrigger = false;
	Timers.setInterval(function a(){
		this.isTrigger = true;
	}, interval);


};

util.inherits(IntervalSystem, EntitySystem);

module.exports = IntervalSystem;


IntervalSystem.prototype.checkProcessing = function(){
	if (this.isTrigger){
		this.isTrigger = false;
		return (true);
	}
	return (false);
};