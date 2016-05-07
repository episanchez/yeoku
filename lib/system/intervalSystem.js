
var EntitySystem = require('./entitySystem');
var util = require('util');

/**
 * The interval System (based on artemis)
 * @class
 * @param {number} interval - interval in ms
 * @extends EntitySystem
 * @author episanchez
 */

var IntervalSystem = function(interval){
	EntitySystem.call(this);
	this.lastTime = Math.floor(Date.now());
	this.interval = interval;
};

util.inherits(IntervalSystem, EntitySystem);

module.exports = IntervalSystem;

IntervalSystem.prototype.processSystem = function(){
};

IntervalSystem.prototype.checkProcessing = function(){
	if ((this.lastTime + this.interval) > Math.floor(Date.now())){
		return false;
	}
	this.lastTime = Math.floor(Date.now());
	return true;
};