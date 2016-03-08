
var ArrayUtils = require('../tools/array');
var Entity = require('../entity');

/**
 * An Aspect is used by systems as a matcher to check if this one is interested by the entity.
 * @class
 * @author  episanchez
 */

var Aspect = function(){
	/**
	 * @member {Number[]} allSet - The entity must have all component of this set
	 * @memberof Aspect
	 */ 
	this.allSet = [];
	/**
	 * @member {Number[]} oneSet - The entity must have one component of this set
	 * @memberof Aspect
	 */ 
	this.oneSet = [];
	/**
	 * @member {Number[]} excludeSet - The entity must haven't all component of this set
	 * @memberof Aspect
	 */ 
	this.excludeSet = [];
};

module.exports = Aspect;

/**
 * Get all Ids
 * @return {Number[]} Set of all interested ids
 */
Aspect.prototype.getAllIds = function(){
	return this.allSet;
};

/**
 * Get One Ids
 * @return {Number[]} Set of one interested ids
 */
Aspect.prototype.getOneIds = function(){
	return this.oneSet;
};

/**
 * Get Exclude Ids
 * @return {Number[]} Set of exclude ids
 */
Aspect.prototype.getExcludeIds = function(){
	return this.excludeSet;
};

/**
 * Match the interest with the entity
 * @param {Entity} entity - Entity instance
 */
Aspect.prototype.isInterested = function(entity){
	if (entity instanceof Entity)
		var componentSet = entity.getComponentsSet();
	else
		return false;

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

/**
 * Build all ids set
 * @param {Number[]} ComponentSet - Set of components' id
 */
Aspect.prototype.buildAll = function(componentSet){
	if (componentSet instanceof Array){
		this.allSet = this.allSet.concat(componentSet);
	}
};

/**
 * Build one ids set
 * @param {Number[]} ComponentSet - Set of components' id
 */
Aspect.prototype.buildOne = function(componentSet){
	if (componentSet instanceof Array){
		this.oneSet = this.oneSet.concat(componentSet);
	}
};

/**
 * Build exclude ids set
 * @param {Number[]} ComponentSet - Set of components' id
 */
Aspect.prototype.buildExclude = function(componentSet){
	if (componentSet instanceof Array){
		this.excludeSet = this.excludeSet.concat(componentSet);
	}
};

/**
 * Build an Aspect with the next string format : 1,2,3#4,5#6,7 
 * That means, this aspect has all of [1,2,3], has one of [4,5], exclude all of [6,7]
 * @param {string} StringFormat - String Formated with previous format
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
 * @return {string} String Result of String formated 
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
 * @param {string} StringFormat - Aspect's String Formated
 * @return {boolean} String Format matching
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