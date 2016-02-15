/**
 * The interval System (based on artemis)
 * @author : episanchez
 */

var Timers = require('Timers');

var IntervalSystem = function(interval){
	this.isTrigger = false;
	Timers.setInterval(function a(){
		this.isTrigger = true;
	}, interval);


};

module.exports = IntervalSystem;

IntervalSystem.prototype.checkProcessing = function(){
	if (this.isTrigger){
		this.isTrigger = false;
		return (true);
	}
	return (false);
};