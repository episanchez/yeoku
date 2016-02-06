/**
 * Track a subset of entities but does not implement any sorting or iteration
 * @author episanchez
 */

var BaseSystem = require('./baseSytem');
var util = require('util');

var EntitySystem = function(){
	BaseSystem.call(this);
};

util.inherits(EntitySystem, BaseSystem);

module.exports = EntitySystem;
