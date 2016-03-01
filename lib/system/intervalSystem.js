/**
 * The interval System (based on artemis)
 * @author : episanchez
 */

var Timers = require('timers');
var EntitySystem = require('./entitySystem');
var util = require('util');

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