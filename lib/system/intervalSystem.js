
var Timers = require('timers');
var EntitySystem = require('./entitySystem');
var util = require('util');

/**
 * The interval System (based on artemis)
 * @class
 * @param {number} interval - interval's time
 * @extends EntitySystem
 * @author episanchez
 */

var IntervalSystem = function(interval){
	EntitySystem.call(this);
	this.triggered = false;

	Timers.setInterval(function a(){
		this.trigerred = true;
	}, interval);


};

util.inherits(IntervalSystem, EntitySystem);

module.exports = IntervalSystem;

IntervalSystem.prototype.processSystem = function(){
	this.triggered = false;
	console.log('processSystem');
};

IntervalSystem.prototype.checkProcessing = function(){
	return this.triggered;
};