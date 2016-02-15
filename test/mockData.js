var Aspect = require('../lib/aspect/aspect');
var ComponentType = require('../lib/component/componentType');
var Component = require('../lib/component/component');
var util = require('util');

var exp = module.exports;

/**
 * Components without ComponentManager (it is not compatible with ComponentManager)
 */

// bad Component
exp.BasicComp = function(){
	Component.call(new ComponentType(0, 'BasicComp', this));
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

// Good Component
var ExtendComp = exp.ExtendComp = function(){
	Component.call(new ComponentType(1,'ExtendComp', this));
	this.strength = 0;
	this.magic = 0;
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

util.inherits(ExtendComp, Component);

/**
 * Components With ComponentManager
 */


/**
 * Entities for Testing
 */

