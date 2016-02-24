/**
 * An Aspect is used by systems as a matcher to check if this one is interested by the entity.
 * @author : episanchez
 */

var ArrayUtils = require('../tools/array');

var Aspect = function(){
	this.allSet = []; // The entity must have all component of this set
	this.oneSet = []; // The entity must have one component of this set 
	this.excludeSet = []; // The entity must haven't all component of this set
};

module.exports = Aspect;

Aspect.prototype.getAllIds = function(){
	return this.allSet;
};

Aspect.prototype.getOneIds = function(){
	return this.oneSet;
};

Aspect.prototype.getExcludeIds = function(){
	return this.excludeSet;
};

Aspect.prototype.isInterested = function(entity){
	var componentSet = entity.getComponentsSet();

	if (ArrayUtils.intersect(this.allSet, componentSet).length !== this.allSet.length){
		return false;
	}
	if (ArrayUtils.isIntersect(this.excludeSet, componentSet) === true){
		return false;
	}
	if (this.oneSet.length > 0 && ArrayUtils.isIntersect(this.oneSet, componentSet) === false){
		return false;
	}
	return true;
};

Aspect.prototype.buildAll = function(componentSet){
	if (componentSet instanceof Array){
		this.allSet = this.allSet.concat(componentSet);
	}
};

Aspect.prototype.buildOne = function(componentSet){
	if (componentSet instanceof Array){
		this.oneSet = this.oneSet.concat(componentSet);
	}
};

Aspect.prototype.buildExclude = function(componentSet){
	if (componentSet instanceof Array){
		this.excludeSet = this.excludeSet.concat(componentSet);
	}
};

/**
 * Build an Aspect with the next string format : 1,2,3#4,5#6,7 
 * That means, this aspect has all of [1,2,3], has one of [4,5], exclude all of [6,7]
 */
Aspect.prototype.buildWithStrResult = function(string){
	var arrStrSet = string.split('#');

	if (arrStrSet.length == 3){
		this.allSet = arrStrSet[0].split(',');
		this.oneSet = arrStrSet[1].split(',');
		this.excludeSet = arrStrSet[2].split(',');
	}
};

/*
 * Get a String Result of entity sets
 */

Aspect.prototype.getStrResult = function(){
	var result = '';

	result += this.allSet.join() + '#';
	result += this.oneSet.join() + '#';
	result += this.excludeSet.join();
	return result;
};

/*
 * If the aspect is equals to the string result
 */

Aspect.prototype.equals = function(string){
	var arrStrSet = string.split('#');

	if (arrStrSet.length < 3 || arrStrSet > 3)
		return false;

	if (ArrayUtils.equals(this.allSet, arrStrSet[0].split(',')) && 
		ArrayUtils.equals(this.oneSet, arrStrSet[1].split(',')) &&
		ArrayUtils.equals(this.excludeSet, arrStrSet[2].split(',')))
			return true;
	return false;
};