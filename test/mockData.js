
var Aspect = libRequire('aspect/aspect');
var util = require('util');

var IteratingSystem = libRequire('system/iteratingSystem');
var IntervalIteratingSystem = libRequire('system/intervalIteratingSystem');
var exp = module.exports;

/**
 * Systems Example
 */

var BasicSystem = exp.BasicSystem = function(){
	IteratingSystem.call(this);

	this._name = "BasicSystem";
};

util.inherits(BasicSystem, IteratingSystem);

BasicSystem.prototype.initialize = function(){
	this.buildAspectWithComponentsTypeName(["WarriorComp"], [], ["MageComp"]);
	IteratingSystem.prototype.initialize.call(this);
};

BasicSystem.prototype.processEntity = function(entity){
	var eObj = this.world.em.getEntityById(entity);
	eObj.WarriorComp.heresy = 42;
	eObj.WarriorComp.combo = 42;
};

var ExtendSystem = exp.ExtendSystem = function(){
	IntervalIteratingSystem.call(this, 1);

	this._name = "ExtendSystem";
};

util.inherits(ExtendSystem, IntervalIteratingSystem);

ExtendSystem.prototype.initialize = function(){
	this.buildAspectWithComponentsTypeName(["MageComp"], [], ["WarriorComp"]);
	IntervalIteratingSystem.prototype.initialize.call(this);
};
ExtendSystem.prototype.processEntity = function(entity){
	eObj.ExtendComp.incMagic(1);
};