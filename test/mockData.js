
var Aspect = require('aspect/aspect');
var ComponentType = require('component/componentType');
var Component = require('component/component');
var util = require('util');

var IteratingSystem = require('system/iteratingSystem');
var IntervalIteratingSystem = require('system/intervalIteratingSystem');
var exp = module.exports;

/**
 * Own Component Without ComponentManager
 */
// Bad Component (the getter/setter are private) and deprecated (<= 0.0.3)
exp.BasicComp = function(){
	Component.call(this, new ComponentType(0, 'BasicComp', this));
	this.life = 0;
	this.mana = 0;

	function setMana(mana){
		this.mana = mana;
	};

	function getMana(){
		return this.mana;
	};

	function setLife(life){
		this.life = life;
	};

	function getLife(){
		return this.life;
	};
};

util.inherits(exp.BasicComp, Component);

// Good Component (since > 0.0.3)
var ExtendComp = exp.ExtendComp = function(){
	Component.call(this, {name : 'ExtendComp', id: 1});
	this.magic = 0;
	this.strength = 0;
};

ExtendComp.prototype.setStrength = function(strength){
	this.strength = strength;
};

ExtendComp.prototype.setMagic = function(magic){
	this.magic = magic;
};

ExtendComp.prototype.getStrength = function(){
	return this.strength;
};

ExtendComp.prototype.getMagic = function(){
	return this.magic;
};

ExtendComp.prototype.incMagic = function(inc){
	this.magic += 1;
}

util.inherits(ExtendComp, Component);

/**
 * Own Component With ComponentManager
 */

var WarriorComp = exp.WarriorComp = function(){
	Component.call(this, {name : 'WarriorComp'});

	this.heresy = 0;
	this.combo = 0;
};

WarriorComp.prototype.setHeresy = function(heresy){
	this.heresy = heresy;
}

WarriorComp.prototype.setCombo = function(combo){
	this.combo = combo;
}

WarriorComp.prototype.getCombo = function(){
	return this.combo;
}

-WarriorComp.prototype.getHeresy = function(){
	return this.heresy;
}

util.inherits(WarriorComp, Component);

var MageComp = exp.MageComp = function(){
	Component.call(this, {name : 'MageComp'});

	this.flow = 0;
	this.combo = 0;
};

MageComp.prototype.setFlow = function(flow){
	this.flow = flow;
}

MageComp.prototype.setCombo = function(combo){
	this.combo = combo;
}

MageComp.prototype.getCombo = function(combo){
	return this.combo;
}

MageComp.prototype.getFlow = function(flow){
	return this.flow;
}

util.inherits(MageComp, Component);

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
	eObj.BasicComp.mana = 42;
	eObj.BasicComp.life = 42;
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
	var eObj = this.world.em.getEntityById(entity);
	eObj.ExtendComp.incMagic(1);
};